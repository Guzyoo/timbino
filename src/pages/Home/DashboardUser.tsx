// Import Packages
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Linking} from 'react-native';

import {RootParamList} from '../../navigation/RootParamList';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Import Images dan Pages
import Timbino from '../../assets/images/timbino.png';
import Mid from '../../assets/images/tengah.png';
import Right from '../../assets/images/kanan.png';
import Left from '../../assets/images/kiri.png';
import Tumbuh from '../../assets/images/tumbuh.png';
import Exit from '../../assets/icons/exit.png';
import Line from '../../assets/icons/line.png';
import Weight from '../../assets/icons/berat.png';
import Height from '../../assets/icons/tinggi.png';
import Tanggal from '../../assets/icons/time.png';
import Call from '../../assets/icons/call.png';
import HomeIcon from '../../assets/icons/home.png';
import CalendarIcon from '../../assets/icons/calendar.png';
import ProfileIcon from '../../assets/icons/profile.png';
import ImageSlider from './ImageSlider';
import ProfileUser from '../Profile/ProfileUser/ProfileUser';
import Calendar from '../Menu/MenuUser/Calendar';
import {ScrollView} from 'react-native-gesture-handler';

type DashboardUserScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'DashboardUser'
>;

interface UserData {
  uid: string;
  email: string;
  namaBayi?: string;
  tanggalLahir?: string;
  jenisKelamin?: string;
  ibuKandung?: string;
  usia?: number;
  alamat?: string;
  records: {
    date: string;
    sensorData: {
      BMI: number;
      berat: number;
      tinggi: number;
      status: number;
    };
  }[];
}

const formatTanggalRecord = (tanggal: any) => {
  console.log('Tanggal yang diterima:', tanggal); // Debugging log

  // Konversi string ISO ke Date jika diperlukan
  const dateObj = typeof tanggal === 'string' ? new Date(tanggal) : tanggal;

  // Pastikan dateObj adalah Date yang valid
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return 'Tidak ada data';
  }

  return dateObj.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
};

const {width} = Dimensions.get('screen');

const DashboardUser = () => {
  const navigation = useNavigation<DashboardUserScreenNavigationProp>();
  const [profileData, setProfileData] = useState<UserData>({
    uid: '',
    email: '',
    namaBayi: '',
    tanggalLahir: '',
    jenisKelamin: '',
    ibuKandung: '',
    usia: 0,
    alamat: '',
    records: [], // Tambahkan records sebagai array kosong
  });

  const sortedRecords = (profileData.records || []).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const latestRecord = sortedRecords[0] || null;

  // Image Slider
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [Left, Mid, Right];

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / (width * 0.7));
    setActiveIndex(slide);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const currentUser = auth().currentUser;
        if (!currentUser) return;

        const userId = currentUser.uid;

        const unsubscribe = firestore()
          .collection('data')
          .doc(userId)
          .onSnapshot(
            docSnapshot => {
              if (docSnapshot.exists) {
                const profileData = docSnapshot.data();
                setProfileData(prevData => ({
                  uid: currentUser.uid,
                  email: currentUser.email || 'Tidak ada email',
                  namaBayi: profileData?.namaBayi || 'Tidak ada data',
                  jenisKelamin: profileData?.jenisKelamin || 'Tidak ada data',
                  usia: profileData?.usia || 0,
                  tanggalLahir: profileData?.tanggalLahir || 'Tidak ada data',
                  ibuKandung: profileData?.ibuKandung || 'Tidak ada data',
                  alamat: profileData?.alamat || 'Tidak ada data',
                  records: profileData?.records || [],
                }));
              } else {
                console.log('Document does not exist.');
              }
            },
            error => {
              console.error('Error fetching data: ', error);
            },
          );

        return unsubscribe; // Pastikan listener dihapus saat komponen unmount
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  // Handle Logout
  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Keluar',
      'Apakah Anda yakin ingin keluar?',
      [
        {
          text: 'Batal',
          onPress: () => console.log('Logout dibatalkan'),
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: async () => {
            try {
              await GoogleSignin.signOut();
              await AsyncStorage.clear(); // Menghapus semua data di AsyncStorage
              console.log('Logout berhasil!');
              navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              });
            } catch (error) {
              console.error('Error saat logout:', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.header}>
        <Image source={Timbino} style={styles.timbino} />
        <Text style={styles.timbinoText}>Timbino</Text>
      </View>
      <View style={styles.container1}>
        <View style={styles.container2}>
          <View>
            <Text style={styles.welcomeText}>Selamat Datang</Text>
            <Text style={styles.usernameText}>{profileData?.namaBayi}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.exitContainer}>
              <Image source={Exit} style={styles.exit} />
              <Text style={styles.exitText}> Keluar</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', top: 120}}>
          <ImageSlider
            images={images}
            onScroll={onScroll}
            activeIndex={activeIndex}
          />
        </View>

        <View style={styles.containerNavigasi}>
          <View style={styles.container3}>
            <Image source={Line} style={styles.line} />
            <Text style={styles.navigasi}>Navigasi</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.container4}
          onPress={() => navigation.navigate('TimbanganBayi')}>
          <View style={styles.statusContainer}>
            <View style={styles.kotak}></View>
            <Text style={styles.status}>
              {latestRecord
                ? latestRecord.sensorData.status === 1
                  ? 'Kurus'
                  : latestRecord.sensorData.status === 2
                  ? 'Proporsional'
                  : latestRecord.sensorData.status === 3
                  ? 'Gemuk'
                  : 'Obesitas'
                : 'Tidak ada data'}
            </Text>
          </View>
          <View style={styles.navigation}>
            <Image source={Tanggal} style={styles.time} />
            <Text style={styles.navigationText}>Tanggal</Text>
            <Text style={styles.isiRiwayat}>
              {latestRecord
                ? formatTanggalRecord(latestRecord.date)
                : 'Tidak ada'}
            </Text>
          </View>
          <View style={styles.navigation}>
            <Image source={Weight} style={styles.weight} />
            <Text style={styles.navigationText}>Berat Badan</Text>
            <Text style={styles.isiRiwayat}>
              {latestRecord
                ? latestRecord.sensorData.berat % 1 === 0
                  ? `${latestRecord.sensorData.berat} kg`
                  : `${latestRecord.sensorData.berat.toFixed(1)} kg`
                : 'Tidak ada'}
            </Text>
          </View>
          <View style={styles.navigation}>
            <Image source={Height} style={styles.height} />
            <Text style={styles.navigationText}>Tinggi Badan</Text>
            <Text style={styles.isiRiwayat}>
              {latestRecord
                ? latestRecord.sensorData.tinggi % 1 === 0
                  ? `${latestRecord.sensorData.tinggi} cm`
                  : `${latestRecord.sensorData.tinggi.toFixed(1)} cm`
                : 'Tidak ada'}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('PanduanBayi')}
          style={{width: '100%'}}>
          <View style={styles.container5}>
            <Image source={Tumbuh} style={styles.tumbuh} />
            <Text style={styles.tumbuhText}>Panduan Tumbuh Kembang Bayi</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const phoneNumber = '+6281808213600'; // Nomor dengan kode negara
            const url = `whatsapp://send?phone=${+6281808213600}&text=Halo, saya tertarik untuk bertanya tentang layanan Posyandu.`;

            Linking.openURL(url).catch(() => {
              Alert.alert(
                'Error',
                'WhatsApp tidak terinstal atau URL tidak valid.',
              );
            });
          }}
          style={{width: '100%'}}>
          <View style={styles.containerPos}>
            <Text style={styles.namaPos}>Posyandu Cempaka</Text>
            <Text style={styles.alamatPos}>Benggala Tengah RW 11</Text>
            <Text style={styles.nomor}>0818-0821-3600</Text>
            <Image source={Call} style={styles.call} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Tab = createBottomTabNavigator();

const DashboardTabs = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen
        name="Home"
        component={DashboardUser}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={HomeIcon}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#FF8261' : '#B0B0B0',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar} // Ganti dengan komponen lain jika ada
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={CalendarIcon}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#FF8261' : '#B0B0B0',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileUser} // Ganti dengan komponen lain jika ada
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={ProfileIcon}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#FF8261' : '#B0B0B0',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: '#E3F9FF',
    justifyContent: 'flex-start',
  },
  scrollView: {
    backgroundColor: '#E3F9FF',
  },

  // Style Header
  header: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  timbino: {
    height: 55,
    width: 51,
    marginLeft: 20,
  },
  timbinoText: {
    fontSize: 24,
    color: '#FF8261',
    fontFamily: 'Lilita One',
    marginLeft: 6,
    marginBottom: 8,
  },

  // Container Selamat Datang
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginVertical: 20,
    paddingHorizontal: 16,
    height: 67,
    borderRadius: 20,
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  welcomeText: {
    fontSize: 16,
    color: '#2F4666',
    fontFamily: 'Livvic-Regular',
  },
  usernameText: {
    fontSize: 22,
    fontFamily: 'Livvic-Bold',
    color: '#FF8261',
  },

  // Exit Style
  exitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    height: 37,
    width: 84,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  exit: {
    height: 15,
    width: 15,
    marginHorizontal: 4,
  },
  exitText: {
    color: '#2F4666',
    fontSize: 14,
    fontFamily: 'Livvic-Regular',
    marginBottom: 3,
  },

  // Navigasi
  containerNavigasi: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  container3: {
    marginTop: 220,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width: 22,
    height: 16,
    marginRight: 10,
    marginLeft: 10,
  },
  navigasi: {
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
    fontSize: 22,
    marginBottom: 5,
  },

  // Navigasi Style Container
  container4: {
    flexDirection: 'row',
    height: 177,
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  navigation: {
    width: 93,
    height: 103,
    borderRadius: 15,
    backgroundColor: '#EEF6FE',
    alignItems: 'center',
    marginTop: 25,
  },
  status: {
    color: '#2F4666',
    fontFamily: 'Livvic-SemiBold',
    fontSize: 20,
    marginLeft: 8,
    marginTop: -2,
  },
  statusContainer: {
    flexDirection: 'row',
    position: 'absolute',
    left: 15,
    top: 15,
    textAlignVertical: 'center',
  },
  kotak: {
    backgroundColor: '#FF8261',
    width: 5,
    height: 25,
  },
  isiRiwayat: {
    marginTop: 10,
    fontFamily: 'Livvic-SemiBold',
    fontSize: 16,
    color: '#2F4666',
  },
  navigationText: {
    color: '#2F4666',
    fontSize: 12,
    fontFamily: 'Livvic-Regular',
  },
  time: {
    height: 34,
    width: 34,
    marginTop: 10,
  },
  weight: {
    width: 29,
    height: 34,
    marginTop: 10,
  },
  height: {
    width: 34,
    height: 34,
    marginTop: 10,
  },
  container5: {
    height: 177,
    marginVertical: 20,
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  tumbuh: {},
  tumbuhText: {
    color: '#2F4666',
    fontSize: 20,
    fontFamily: 'Livvic-Medium',
    marginVertical: 8,
  },

  // Posyandu Section
  containerPos: {
    height: 147,
    width: '100%',
    paddingLeft: 20,
    marginBottom: 40,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  namaPos: {
    color: '#2F4666',
    fontFamily: 'Livvic-Bold',
    fontSize: 20,
    marginBottom: 7,
    textAlign: 'left',
  },
  alamatPos: {
    color: '#2F4666',
    fontFamily: 'Livvic-SemiBold',
    fontSize: 13,
    marginBottom: 7,
    textAlign: 'left',
  },
  nomor: {
    fontFamily: 'Livvic-SemiBold',
    fontSize: 24,
    color: '#2F4666',
    textAlign: 'left',
  },

  call: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 20,
    top: 30,
  },
});

export default DashboardTabs;
