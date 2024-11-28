import React, {useState, useEffect} from 'react';
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
import {RootParamList} from '../../../navigation/RootParamList';
import {useRoute, RouteProp} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

// Images
import Person from '../../../assets/icons/person.png';
import Back from '../../../assets/icons/Arrow.png';
import {ScrollView} from 'react-native-gesture-handler';

type DetailAkunRouteProp = RouteProp<RootParamList, 'DetailAkun'>;
type DetailAkunScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'DetailAkun'
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

type RecordType = {
  date: string;
  sensorData: {
    BMI: number;
    berat: number;
    tinggi: number;
    status: number;
  };
};

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

const DetailAkun = () => {
  const navigation = useNavigation<DetailAkunScreenNavigationProp>();
  const route = useRoute<DetailAkunRouteProp>();
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const {userData} = route.params;
  const records = (userData?.records || []).map((record: any) => ({
    ...record,
    date:
      record.date instanceof firestore.Timestamp
        ? record.date.toDate().toISOString() // Jika Timestamp, konversi ke ISO string
        : typeof record.date === 'string'
        ? new Date(record.date).toISOString() // Jika string, konversi ke Date dan ke ISO string
        : record.date, // Jika sudah berupa Date, biarkan
  }));

  const sorted = records.sort((a, b) => a.date - b.date);
  const [sortedRecords, setSortedRecords] = useState<RecordType[]>([]);

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
                  ? record.date.toDate().toISOString() // Jika Timestamp, konversi ke ISO string
                  : typeof record.date === 'string'
                  ? new Date(record.date).toISOString() // Jika string, konversi ke Date dan ke ISO string
                  : record.date, // Jika sudah berupa Date, biarkan
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

  useEffect(() => {
    if (userData) {
      const userRecords =
        usersData.find(user => user.uid === userData.uid)?.records || [];
      const sorted = userRecords.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setSortedRecords(sorted); // Gunakan fungsi setter untuk memperbarui state
    }
  }, [usersData]);

  const handleDeleteRecords = () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin menghapus semua riwayat timbangan?',
      [
        {text: 'Batal', style: 'cancel'},
        {
          text: 'Hapus',
          onPress: async () => {
            try {
              const uid = userData?.uid;
              if (!uid) {
                console.error('UID tidak ditemukan.');
                return;
              }

              // Hapus data records di Firestore
              await firestore().collection('data').doc(uid).update({
                records: [],
              });

              // Kosongkan data sortedRecords dan perbarui state
              setSortedRecords([]); // Tambahkan ini
              setUsersData(prevUsersData =>
                prevUsersData.map(user =>
                  user.uid === uid ? {...user, records: []} : user,
                ),
              );

              // Tampilkan popup berhasil
              Alert.alert('Sukses', 'Riwayat timbangan berhasil dihapus.');

              console.log('Riwayat berhasil dihapus.');
            } catch (error) {
              console.error('Gagal menghapus riwayat:', error);
              Alert.alert('Error', 'Gagal menghapus riwayat.');
            }
          },
        },
      ],
    );
  };

  const confirmDeleteAccount = (
    uid: string | undefined,
    deleteAccount: () => void,
  ) => {
    if (!uid) {
      Alert.alert('Error', 'UID pengguna tidak ditemukan.');
      return;
    }

    Alert.alert('Konfirmasi', 'Apakah Anda yakin ingin menghapus akun ini?', [
      {text: 'Tidak', style: 'cancel'},
      {
        text: 'Iya',
        onPress: deleteAccount,
      },
    ]);
  };

  const deleteAccount = async (
    uid: string | undefined,
    setUsersData: React.Dispatch<React.SetStateAction<UserData[]>>,
  ) => {
    try {
      if (!uid) {
        console.error('UID tidak ditemukan.');
        return;
      }

      // Hapus data akun di Firestore
      await firestore().collection('users').doc(uid).delete();
      await firestore().collection('data').doc(uid).delete();

      // Perbarui state lokal untuk menghapus akun dari daftar
      setUsersData(prevUsersData =>
        prevUsersData.filter(user => user.uid !== uid),
      );

      // Tampilkan notifikasi sukses
      Alert.alert('Sukses', 'Akun berhasil dihapus.');
    } catch (error) {
      console.error('Gagal menghapus akun:', error);
      Alert.alert('Error', 'Gagal menghapus akun.');
    }
  };

  return (
    <View style={styles.container1}>
      <View style={styles.headerContainer}>
        <Image source={Person} style={styles.person} />
        <Text style={styles.h1}>KELOLA AKUN</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.dataHeader}>DATA BAYI</Text>
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
        <View style={styles.profile}>
          <Text style={styles.data}>Usia</Text>
          <Text style={styles.titik}>:</Text>
          <Text style={styles.isiData}>
            {userData.usia ? `${userData.usia} bulan` : 'Tidak ada data'}
          </Text>
        </View>
        <View style={styles.profile}>
          <Text style={styles.data}>Alamat</Text>
          <Text style={styles.titik}>:</Text>
          <Text style={styles.isiData}>
            {userData.alamat || 'Tidak ada data'}
          </Text>
        </View>
        <Text style={styles.dataHeader2}>RIWAYAT TIMBANGAN</Text>
        <View style={styles.riwayatContainer}>
          <Text style={styles.riwayatHeader}>Tgl</Text>
          <Text style={styles.riwayatHeader}>Berat</Text>
          <Text style={styles.riwayatHeader}>Tinggi</Text>
          <Text style={styles.riwayatHeader}>Status</Text>
        </View>
        {sortedRecords.map((record, index) => (
          <View key={index} style={styles.riwayatContainer}>
            <Text style={styles.riwayatText}>
              {formatTanggalRecord(record.date)}
            </Text>
            <Text style={styles.riwayatText}>
              {record.sensorData.berat % 1 === 0
                ? `${record.sensorData.berat} kg`
                : `${record.sensorData.berat.toFixed(1)} kg`}
            </Text>
            <Text style={styles.riwayatText}>
              {record.sensorData.tinggi % 1 === 0
                ? `${record.sensorData.tinggi} cm`
                : `${record.sensorData.tinggi.toFixed(1)} cm`}
            </Text>
            <Text style={styles.riwayatText}>
              {record.sensorData.status === 1
                ? 'Kurus'
                : record.sensorData.status === 2
                ? 'Proporsional'
                : record.sensorData.status === 3
                ? 'Gemuk'
                : 'Obesitas'}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.kelolaContainer}>
        <TouchableOpacity
          style={styles.hapusRiwayat}
          onPress={handleDeleteRecords}>
          <Text style={styles.hapusRiwayatText}>Hapus Riwayat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.hapusAkun}
          onPress={() =>
            confirmDeleteAccount(userData?.uid, () =>
              deleteAccount(userData?.uid, setUsersData),
            )
          }>
          <Text style={styles.hapusAkunText}>Hapus Akun</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => {
          navigation.navigate('KelolaAkunScreen');
        }}>
        <Image source={Back} style={styles.backIcon} />
        <Text style={styles.backText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 15,
    marginBottom: 30,
    padding: 16,
  },
  container1: {
    flex: 1,
    backgroundColor: '#E3F9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 25,
    marginTop: 25,
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
    marginLeft: 20,
  },

  // Data Container
  text: {
    fontSize: 15,
    color: '#2F4666',
    marginLeft: 40,
    fontFamily: 'Livvic-Bold',
  },
  dataHeader: {
    fontSize: 15,
    width: '100%',
    color: '#2F4666',
    fontFamily: 'Livvic-Medium',
    marginBottom: 15,
    marginLeft: 9,
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

  //Riwayat Style
  dataHeader2: {
    fontSize: 15,
    width: '100%',
    color: '#2F4666',
    fontFamily: 'Livvic-Medium',
    marginBottom: 15,
    marginLeft: 9,
    marginTop: 20,
  },
  riwayatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  riwayatHeader: {
    color: '#2F4666',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Livvic-SemiBold',
    marginBottom: 10,
    marginLeft: 10,
  },
  riwayatText: {
    color: '#2F4666',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Livvic-SemiBold',
    marginBottom: 10,
  },

  //Button Kelola
  kelolaContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 107,
  },
  hapusRiwayat: {
    width: 134,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  hapusRiwayatText: {
    color: '#2F4666',
    fontSize: 15,
    fontFamily: 'Livvic-Bold',
  },
  hapusAkun: {
    width: 134,
    height: 44,
    backgroundColor: '#C23F1C',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  hapusAkunText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Livvic-Bold',
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
    alignSelf: 'center',
    marginBottom: 5,
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

export default DetailAkun;
