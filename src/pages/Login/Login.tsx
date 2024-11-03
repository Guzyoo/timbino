import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Timbino from '../../assets/images/timbino.png';
import Google from '../../assets/images/google.png';
import Person from '../../assets/images/person.png';
import {RootParamList} from '../../navigation/RootParamList';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {Button} from 'react-native';

type LoginScreenNavigationProp = StackNavigationProp<RootParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleGoogleLogin = async () => {
    try {
      // Pastikan Play Services tersedia
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      // Mendapatkan data login pengguna
      const userInfo = await GoogleSignin.signIn();

      // Mendapatkan tokens dari userInfo
      const tokens = await GoogleSignin.getTokens();

      // Mendapatkan idToken dari tokens
      const idToken = tokens.idToken;

      if (!idToken) {
        throw new Error('ID token tidak ditemukan');
      }

      // Membuat kredensial Google dengan idToken
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Login dengan Firebase menggunakan kredensial Google
      await auth().signInWithCredential(googleCredential);

      console.log('Login berhasil!');
    } catch (error) {
      console.error('Google Sign In Error:', error);
    }
  };

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
      <Button
        title="Google Sign-In"
        onPress={() =>
          handleGoogleLogin().then(() => console.log('Signed in with Google!'))
        }
      />
      {/* <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
        <View style={styles.buttonContent}>
          <Image source={Google} style={styles.googleLogo} />
          <Text style={styles.buttonText}>Masuk dengan Google</Text>
        </View>
      </TouchableOpacity> */}
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
    backgroundColor: '#D7E7F1',
    height: 46,
    width: 325,
    borderRadius: 20,
    marginTop: 20,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    color: '#2F4666',
    fontSize: 16,
    fontFamily: 'Livvic-Black',
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default Login;
function setState(arg0: {
  userInfo: import('@react-native-google-signin/google-signin').User | null;
}) {
  throw new Error('Function not implemented.');
}
