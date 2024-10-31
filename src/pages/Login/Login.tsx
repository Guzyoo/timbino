import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Timbino from '../../assets/images/timbino.png';
import Google from '../../assets/images/google.png';
import Person from '../../assets/images/person.png';
import {RootParamList} from '../../navigation/RootParamList';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type LoginScreenNavigationProp = StackNavigationProp<RootParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={() => navigation.navigate('Admin')}>
          <Image source={Person} style={styles.person} />
        </TouchableOpacity>
      </View>
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
        onPress={() => navigation.navigate('Daftar')}>
        <View style={styles.buttonContent}>
          <Image source={Google} style={styles.googleLogo} />
          <Text style={styles.buttonText}>Masuk dengan Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F9FF',
    position: 'relative',
  },
  container2: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    marginRight: 15,
    position: 'absolute',
    top: 20,
    right: 3,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  person: {
    width: 35,
    height: 35,
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
    marginBottom: 18,
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
    backgroundColor: '#D7E7F1', // Ubah warna sesuai keinginan
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 20, // Membuat sudut tombol melengkung
    marginTop: 20,
  },
  buttonContent: {
    flexDirection: 'row', // Atur agar logo dan teks berada di satu baris
    alignItems: 'center', // Vertikal tengah
  },
  googleLogo: {
    width: 20, // Sesuaikan ukuran logo
    height: 20,
    marginRight: 10, // Jarak antara logo dan teks
  },
  buttonText: {
    color: '#2F4666', // Warna teks pada tombol
    fontSize: 16,
    fontFamily: 'Livvic-Black',
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default Login;
