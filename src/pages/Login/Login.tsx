import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import Timbino from '../../assets/images/timbino.png';
import Google from '../../assets/images/google.png';
import Person from '../../assets/images/person.png';
import {RootParamList} from '../../navigation/RootParamList';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = StackNavigationProp<RootParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        navigation.replace('DashboardUser');
      }
    };

    checkLoginStatus();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const isPlayServicesAvailable = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      if (!isPlayServicesAvailable) {
        throw new Error('Google Play Services tidak tersedia.');
      }

      // Mendapatkan informasi pengguna dari Google Sign-In
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      const idToken = tokens.idToken;

      if (!idToken) {
        throw new Error('ID token tidak ditemukan');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      const user = userCredential.user;

      // Periksa apakah pengguna sudah ada di collection 'data'
      const dataDoc = await firestore().collection('data').doc(user.uid).get();

      if (dataDoc.exists) {
        // Jika pengguna sudah ada di collection 'data', arahkan ke DashboardUser
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('uid', user.uid);
        navigation.replace('DashboardUser');
      } else {
        // Jika pengguna belum ada di collection 'data', arahkan ke halaman Daftar
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
        };

        // Simpan data pengguna di collection 'users' sebagai cadangan
        await firestore()
          .collection('users')
          .doc(user.uid)
          .set(userData, {merge: true});

        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('uid', user.uid);
        navigation.navigate('Daftar');
      }

      console.log('Login berhasil!');
    } catch (error: unknown) {
      // Menambahkan tipe `unknown` pada parameter error
      const err = error as Error; // Meng-cast error ke tipe Error
      console.error('Google Sign-In Error:', err);
      Alert.alert(
        'Login Gagal',
        err.message || 'Terjadi kesalahan saat login.',
      );
    }
  };

  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={() => navigation.navigate('Admin')}>
          <Image source={Person} style={styles.person} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}>
        <Text style={styles.h1}>TIMBINO</Text>
        <Text style={styles.text}>
          Timbangan IoT untuk Monitoring Bayi dan Integrasi Nutrisi Optimal
        </Text>
        <Image source={Timbino} style={styles.image} />
        <View>
          <Text style={styles.h2}>Ayo Mulai!</Text>
          <Text style={styles.textBaris}>
            Untuk membantu orang tua memantau tumbuh kembang dan informasi
            kesehatan bayi melalui aplikasi.
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
          <Image source={Google} style={styles.google} />
          <Text style={styles.buttonText}>Masuk dengan Google</Text>
        </TouchableOpacity>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      </ScrollView>
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
    zIndex: 10,
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 100,
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
    marginLeft: 25,
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
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#D7E7F1',
    flexDirection: 'row',
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
  google: {
    height: 16.84,
    width: 16.84,
  },
  buttonText: {
    color: '#2F4666',
    fontSize: 16,
    marginHorizontal: 10,

    fontFamily: 'Livvic-Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 3,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Login;
