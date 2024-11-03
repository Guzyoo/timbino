import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Timbino from '../../assets/images/timbino.png';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '../../navigation/RootParamList';

type OnBoardingScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'OnBoarding'
>;

const OnBoarding = () => {
  const navigation = useNavigation<OnBoardingScreenNavigationProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value: 0

  useEffect(() => {
    // Animasi fade in
    Animated.timing(fadeAnim, {
      toValue: 1, // opacity ke 1
      duration: 1000, // durasi animasi dalam milidetik
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container1, {opacity: fadeAnim}]}>
      <Text style={styles.h1}>TIMBINO</Text>
      <Text style={styles.text}>
        Timbangan IoT untuk Monitoring Bayi dan Integrasi Nutrisi Optimal
      </Text>
      <Image source={Timbino} style={styles.image} />
      <Text style={styles.h2}>Ayo Mulai!</Text>
      <Text style={styles.textBaris}>
        Untuk membantu orang tua memantau tumbuh kembang dan informasi kesehatan
        bayi melalaui aplikasi.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Mulai</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F9FF',
    paddingVertical: 30, // Memberikan margin vertikal dari tepi layar
  },
  image: {
    width: 250,
    height: 250,
  },
  h1: {
    fontSize: 64,
    color: '#FF8261',
    fontWeight: '400',
    fontFamily: 'Lilita One',
    marginVertical: 18,
  },
  h2: {
    fontSize: 20,
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
    alignSelf: 'flex-start',
    marginHorizontal: 38,
  },
  textBaris: {
    fontSize: 16,
    fontFamily: 'Livvic-Regular',
    color: '#2F4666',
    textAlign: 'left',
    marginVertical: 15,
    marginLeft: 25,
    marginRight: 50,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#2F4666',
    fontFamily: 'Livvic-Bold',
    marginHorizontal: 10,
    marginBottom: 57,
  },
  button: {
    backgroundColor: '#2F4666',
    height: 46,
    width: 325,
    borderRadius: 20,
    marginTop: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Warna teks pada tombol
    fontSize: 18,
    fontFamily: 'Livvic-Black',
    textAlign: 'center',
  },
});

export default OnBoarding;
