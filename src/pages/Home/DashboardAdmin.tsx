import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '../../navigation/RootParamList';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Images
import Timbino from '../../assets/images/timbino.png';
import Person from '../../assets/icons/person.png';
import Bayi from '../../assets/icons/bayi.png';
import Timbangan from '../../assets/icons/timbangan.png';
import Logout from '../../assets/icons/logout.png';

type DashboardAdminScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'DashboardAdminScreen'
>;

const {width} = Dimensions.get('screen');

const DashboardAdminScreen = () => {
  const navigation = useNavigation<DashboardAdminScreenNavigationProp>();

  // Fungsi untuk menampilkan dialog konfirmasi logout
  const confirmLogout = () => {
    Alert.alert(
      'Konfirmasi Keluar',
      'Apakah Anda yakin ingin keluar?',
      [
        {
          text: 'Tidak',
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: handleLogout,
        },
      ],
      {cancelable: false},
    );
  };

  // Fungsi untuk logout
  const handleLogout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('isAdminLoggedIn'); // Hapus status login

      Alert.alert('Logout Berhasil', 'Anda telah keluar.');
      navigation.replace('Admin'); // Arahkan ke halaman Admin
    } catch (error) {
      Alert.alert('Logout Gagal', 'Terjadi kesalahan saat logout.');
      console.error('Error signing out: ', error);
    }
  };

  return (
    <View style={styles.container1}>
      <Image source={Timbino} style={styles.timbino} />
      <Text style={styles.timbinoText}>ADMIN</Text>
      <TouchableOpacity onPress={() => navigation.navigate('KelolaAkunScreen')}>
        <View style={styles.container2}>
          <Image source={Person} style={styles.person} />
          <Text style={styles.text}>KELOLA AKUN</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MenuTimbang')}>
        <View style={styles.container2}>
          <Image source={Bayi} style={styles.person} />
          <Text style={styles.text}> DATA BAYI</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('DataManual')}>
        <View style={styles.container2}>
          <Image source={Timbangan} style={styles.timbangan} />
          <Text style={styles.text}> DATA MANUAL</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={confirmLogout}>
        <View style={styles.logout}>
          <Image source={Logout} style={styles.logoutImage} />
          <Text style={styles.logoutText}>KELUAR</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E3F9FF',
    justifyContent: 'center',
  },
  timbino: {
    height: 86,
    width: 90,
  },
  timbinoText: {
    marginTop: 20,
    fontSize: 22,
    color: '#2F4666',
    fontFamily: 'Livvic-Bold',
  },
  container2: {
    width: '90%',
    marginTop: 40,
    height: 84,
    backgroundColor: '#ffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  person: {
    width: 40,
    height: 40,
  },
  timbangan: {
    width: 45,
    height: 52,
  },
  text: {
    fontSize: 15,
    color: '#2F4666',
    flex: 1,
    fontFamily: 'Livvic-Bold',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  logout: {
    width: 134,
    height: 44,
    marginTop: 60,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  logoutImage: {
    width: 24,
    height: 24,
  },
  logoutText: {
    fontSize: 15,
    color: '#2F4666',
    fontFamily: 'Livvic-Bold',
  },
});

export default DashboardAdminScreen;
