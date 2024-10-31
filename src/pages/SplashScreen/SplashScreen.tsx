import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
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
    // Memulai animasi ketika komponen dimount
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 2000, // Durasi animasi 2 detik
      useNativeDriver: true, // Memanfaatkan native driver untuk performa lebih baik
    }).start(() => {
      navigation.navigate('OnBoarding');
    });
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
