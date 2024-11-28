import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Timbino from '../../assets/images/timbino.png';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootParamList} from '../../navigation/RootParamList'; // Sesuaikan path file

// Tipe navigasi untuk SplashScreen
type SplashScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'SplashScreen'
>;

const SplashScreen = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current; // Inisialisasi animasi
  const navigation = useNavigation<SplashScreenNavigationProp>(); // Hook untuk navigasi dengan tipe

  useEffect(() => {
    // Fungsi untuk memeriksa status login
    const checkLoginStatus = async () => {
      const isAdminLoggedIn = await AsyncStorage.getItem('isAdminLoggedIn');
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

      if (isAdminLoggedIn === 'true') {
        navigation.navigate('DashboardAdminScreen');
      } else if (isLoggedIn === 'true') {
        navigation.navigate('DashboardUser');
      } else {
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }).start(() => {
          navigation.replace('OnBoarding');
        });
      }
    };

    // Panggil fungsi untuk memeriksa status login
    checkLoginStatus();
  }, [scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={Timbino}
        style={[styles.image, {transform: [{scale: scaleAnim}]}]} // Terapkan animasi scale
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Background splash screen
  },
  image: {
    width: 200, // Ukuran gambar awal
    height: 200, // Ukuran gambar awal
  },
});

export default SplashScreen;
