// Import Packages
import React, {useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
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
import Contact from '../../assets/icons/kontak.png';
import HomeIcon from '../../assets/icons/home.png';
import CalendarIcon from '../../assets/icons/calendar.png';
import ProfileIcon from '../../assets/icons/profile.png';
import ImageSlider from './ImageSlider';
import ProfileUser from '../Profile/ProfileUser/ProfileUser';
import Calendar from '../Menu/MenuUser/Calendar';

type DashboardUserScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'DashboardUser'
>;

const {width} = Dimensions.get('screen');

const DashboardUser = () => {
  const navigation = useNavigation<DashboardUserScreenNavigationProp>();

  // Image Slider
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [Left, Mid, Right];

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / (width * 0.7));
    setActiveIndex(slide);
  };

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
    <View style={styles.container1}>
      <View style={styles.header}>
        <Image source={Timbino} style={styles.timbino} />
        <Text style={styles.timbinoText}>Timbino</Text>
      </View>

      <View style={styles.container2}>
        <View>
          <Text style={styles.welcomeText}>Selamat Datang</Text>
          <Text style={styles.usernameText}>IKHSAN</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.exitContainer}>
            <Image source={Exit} style={styles.exit} />
            <Text style={styles.exitText}> Keluar</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{position: 'absolute', top: 180}}>
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

      <View style={styles.container4}>
        <TouchableOpacity onPress={() => navigation.navigate('BeratBadan')}>
          <View style={styles.navigation}>
            <Image source={Weight} style={styles.weight} />
            <Text style={styles.navigationText}>Berat Badan</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TinggiBadan')}>
          <View style={styles.navigation}>
            <Image source={Height} style={styles.height} />
            <Text style={styles.navigationText}>Tinggi Badan</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HubungiScreen')}>
          <View style={styles.navigation}>
            <Image source={Contact} style={styles.contact} />
            <Text style={styles.navigationText}>Hubungi</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('PanduanBayi')}>
        <View style={styles.container5}>
          <Image source={Tumbuh} style={styles.tumbuh} />
          <Text style={styles.tumbuhText}>Panduan Tumbuh Kembang Bayi</Text>
        </View>
      </TouchableOpacity>
    </View>
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
    width: '90%',
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
    marginBottom: 20,
  },
  container3: {
    marginTop: 220,
    marginBottom: 20,
    flexDirection: 'row',
    paddingLeft: 20,
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
    marginHorizontal: 8,
  },
  navigation: {
    width: 110,
    height: 110,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  navigationText: {
    color: '#2F4666',
    fontSize: 12,
    fontFamily: 'Livvic-Regular',
  },
  weight: {
    width: 45,
    height: 52,
    marginBottom: 8,
  },
  height: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  contact: {
    width: 42,
    height: 52,
    marginBottom: 8,
  },
  container5: {
    height: 120,
    width: 380,
    marginTop: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  tumbuh: {
    width: 168,
    height: 66,
  },
  tumbuhText: {
    color: '#2F4666',
    fontSize: 20,
    fontFamily: 'Livvic-Medium',
    marginVertical: 8,
  },
});

export default DashboardTabs;
