import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '../../../navigation/RootParamList';
import firestore from '@react-native-firebase/firestore';
import Timbino from '../../../assets/images/timbino.png';
import Person from '../../../assets/icons/person.png';
import Back from '../../../assets/icons/Arrow.png';

type KelolaAkunScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'KelolaAkunScreen'
>;

interface UserData {
  uid: string; // Tambahkan ini
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

const {width} = Dimensions.get('screen');

const formatTanggal = (tanggal: any) => {
  // Jika tanggal adalah Firestore Timestamp, konversi ke Date
  const date = new Date(
    tanggal instanceof firestore.Timestamp ? tanggal.toDate() : tanggal,
  );

  // Cek apakah tanggal valid
  if (isNaN(date.getTime())) {
    return 'Tidak ada data';
  }

  // Format tanggal jika valid
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const KelolaAkunScreen = () => {
  const navigation = useNavigation<KelolaAkunScreenNavigationProp>();
  const [usersData, setUsersData] = useState<UserData[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(async usersSnapshot => {
        try {
          console.log('Listener aktif. Mengambil data terbaru dari Firestore.');
          const usersDataPromises = usersSnapshot.docs.map(async userDoc => {
            const user = userDoc.data();
            const uid = userDoc.id;

            const dataDoc = await firestore().collection('data').doc(uid).get();
            const userData = dataDoc.exists ? dataDoc.data() : {};

            const records = (userData?.records || []).map((record: any) => ({
              ...record,
              date:
                record.date instanceof firestore.Timestamp
                  ? record.date.toDate()
                  : new Date(record.date),
            }));

            console.log(`UID: ${uid}, Records:`, records);

            return {
              uid,
              email: user.email,
              namaBayi: userData?.namaBayi || 'Tidak ada data',
              tanggalLahir: userData?.tanggalLahir || 'Tidak ada data',
              jenisKelamin: userData?.jenisKelamin || 'Tidak ada data',
              ibuKandung: userData?.ibuKandung || 'Tidak ada data',
              usia: userData?.usia || 'Tidak ada data',
              alamat: userData?.alamat || 'Tidak ada data',
              records,
            };
          });

          const allUsersData = await Promise.all(usersDataPromises);
          setUsersData(allUsersData);
          console.log('Data terbaru berhasil disinkronisasi.');
        } catch (error) {
          console.error('Error fetching user accounts in real-time:', error);
        }
      });

    return () => unsubscribe(); // Cleanup listener saat komponen unmount
  }, []);

  return (
    <View style={styles.container1}>
      <Image source={Timbino} style={styles.timbino} />
      <Image source={Person} style={styles.person} />
      <Text style={styles.h1}>KELOLA AKUN</Text>
      <ScrollView>
        {usersData.map((userData, index) => (
          <View key={index} style={styles.dataContainer}>
            <View style={styles.profile}>
              <Text style={styles.data}>Nama Bayi</Text>
              <Text style={styles.titik}>:</Text>
              <Text style={styles.isiData}>
                {userData.namaBayi || 'Tidak ada data'}
              </Text>
            </View>
            <View style={styles.profile}>
              <Text style={styles.data}>TTL</Text>
              <Text style={styles.titik}>:</Text>
              <Text style={styles.isiData}>
                {userData.tanggalLahir
                  ? formatTanggal(userData.tanggalLahir)
                  : 'Tidak ada data'}
              </Text>
            </View>
            <View style={styles.profile}>
              <Text style={styles.data}>Jenis Kelamin</Text>
              <Text style={styles.titik}>:</Text>
              <Text style={styles.isiData}>
                {userData.jenisKelamin || 'Tidak ada data'}
              </Text>
            </View>
            <View style={styles.profile}>
              <Text style={styles.data}>Ibu Kandung</Text>
              <Text style={styles.titik}>:</Text>
              <Text style={styles.isiData}>
                {userData.ibuKandung || 'Tidak ada data'}
              </Text>
            </View>
            <View style={styles.profile}>
              <Text style={styles.data}>Email</Text>
              <Text style={styles.titik}>:</Text>
              <Text style={styles.isiData}>
                {userData.email || 'Tidak ada data'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.kelolaContainer}
              onPress={() =>
                navigation.navigate('DetailAkun', {
                  userData: {
                    ...userData,
                    records: userData.records.map(record => ({
                      ...record,
                      date: record.date.toString(), // Konversi ke string ISO
                    })),
                  },
                })
              }>
              <Text style={styles.kelolaText}>Kelola</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.navigate('DashboardAdminScreen')}>
        <Image source={Back} style={styles.backIcon} />
        <Text style={styles.backText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#E3F9FF',
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E3F9FF',
  },
  timbino: {
    height: 86,
    width: 90,
    marginTop: 40,
    marginBottom: 15,
  },
  person: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  h1: {
    fontSize: 24,
    color: '#2F4666',
    fontFamily: 'Livvic-Bold',
  },

  // Data Container
  dataContainer: {
    width: '100%',
    flexShrink: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 20,
    marginBottom: 5,
    padding: 16,
  },
  text: {
    fontSize: 15,
    color: '#2F4666',
    marginLeft: 40,
    fontFamily: 'Livvic-Bold',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 10,
  },
  data: {
    fontSize: 15,
    width: 100,
    color: '#2F4666',
    fontFamily: 'Livvic-Medium',
    marginBottom: 5,
  },
  titik: {
    fontSize: 15,
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
    width: 10,
    marginBottom: 5,
  },
  isiData: {
    fontSize: 15,
    flex: 1,
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
    marginBottom: 5,
  },
  kelolaContainer: {
    width: 284.76,
    height: 36,
    marginBottom: 10,
    backgroundColor: '#2F4666',
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  kelolaText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Livvic-Black',
  },

  // Back Container
  backContainer: {
    flexDirection: 'row',
    width: 134,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 2,
  },
  backIcon: {
    width: 18,
    height: 18,
    marginLeft: -10,
  },
  backText: {
    fontSize: 15,
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
    textAlignVertical: 'center',
    marginLeft: -40,
    marginBottom: 5,
  },
});

export default KelolaAkunScreen;
