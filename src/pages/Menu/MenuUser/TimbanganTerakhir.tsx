import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '../../../navigation/RootParamList';
import {SvgXml} from 'react-native-svg';

// Import Images
import Back from '../../../assets/icons/Arrow.png';
import Bayi from '../../../assets/images/bayi.png';
import Weight from '../../../assets/icons/berat.png';

// Import Iconify
const MingcuteTimeFillIcon = ({color = '#68D3E7', size = 24}) => {
  const svgMarkup = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
        <g fill="none">
          <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
          <path fill="${color}" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 4a1 1 0 0 0-1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V7a1 1 0 0 0-1-1"></path>
        </g>
      </svg>
    `;

  return <SvgXml xml={svgMarkup} width={size} height={size} />;
};

const GameIconsBodyHeightIcon = ({color = '#68D3E7', size = 45}) => {
  const svgMarkup = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
        <path fill="${color}" d="M384 22.545L307.271 99.27l25.458 25.458L366 91.457v329.086l-33.271-33.272l-25.458 25.458L384 489.455l76.729-76.726l-25.458-25.458L402 420.543V91.457l33.271 33.272L460.73 99.27zm-242.443.258c-23.366 3.035-44.553 30.444-44.553 65.935c0 19.558 6.771 36.856 16.695 48.815l11.84 14.263l-18.217 3.424c-12.9 2.425-22.358 9.24-30.443 20.336c-8.085 11.097-14.266 26.558-18.598 44.375c-7.843 32.28-9.568 71.693-9.842 106.436h42.868l11.771 157.836c29.894 6.748 61.811 6.51 90.602.025l10.414-157.861h40.816c-.027-35.168-.477-75.125-7.584-107.65c-3.918-17.933-9.858-33.371-18.04-44.342c-8.185-10.97-18.08-17.745-32.563-19.989l-18.592-2.88l11.736-14.704c9.495-11.897 15.932-28.997 15.932-48.082c0-37.838-23.655-65.844-49.399-65.844z"></path>
      </svg>
    `;
  return <SvgXml xml={svgMarkup} width={size} height={size} />;
};

type TimbanganBayiScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'TimbanganBayi'
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
    hari: string;
    tanggal: string;
  }[];
}

const TimbanganBayi = () => {
  const navigation = useNavigation<TimbanganBayiScreenNavigationProp>();

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
                const sortedRecords = (profileData?.records || []).sort(
                  (a: {date: string}, b: {date: string}) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
                );

                setProfileData({
                  uid: currentUser.uid,
                  email: currentUser.email || 'Tidak ada email',
                  namaBayi: profileData?.namaBayi || 'Tidak ada data',
                  jenisKelamin: profileData?.jenisKelamin || 'Tidak ada data',
                  usia: profileData?.usia || 0,
                  tanggalLahir: profileData?.tanggalLahir || 'Tidak ada data',
                  ibuKandung: profileData?.ibuKandung || 'Tidak ada data',
                  alamat: profileData?.alamat || 'Tidak ada data',
                  records: sortedRecords,
                });
              } else {
                console.log('Document does not exist.');
              }
            },
            error => {
              console.error('Error fetching data: ', error);
            },
          );

        return unsubscribe; // Bersihkan listener
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const formatHariDanTanggal = (dateString: string) => {
    const date = new Date(dateString);
    const options = {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    } as const;
    const formattedDate = date.toLocaleDateString('id-ID', options);

    // Pecah hasil menjadi hari dan tanggal
    const [hari, ...tanggal] = formattedDate.split(', ');
    return {hari, tanggal: tanggal.join(', ')};
  };

  const formattedRecords = profileData.records.map(record => {
    const {hari, tanggal} = formatHariDanTanggal(record.date);
    return {
      ...record,
      hari,
      tanggal,
    };
  });

  return (
    <View style={styles.containerUtama}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => navigation.navigate('DashboardUser')}>
          <Image source={Back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.panduan}>Timbangan Terakhir</Text>
      </View>
      <Image source={Bayi} style={styles.bayi} />
      <Text style={styles.status}>STATUS</Text>
      <Text style={styles.statusBayi}>
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
      <ScrollView style={styles.scrollBayi}>
        <View style={styles.containerBayi}>
          <Text style={styles.riwayatText}>Riwayat</Text>

          <View style={styles.containerImages}>
            <MingcuteTimeFillIcon color="#68D3E7" size={45} />
            <Image source={Weight} style={styles.weight} />
            <GameIconsBodyHeightIcon color="#F6C987" size={40} />
          </View>
          {formattedRecords.map((record, index) => (
            <View key={index} style={styles.dataContainer}>
              <View>
                <Text style={styles.hari}>{record.hari},</Text>
                <Text style={styles.tanggalNomor}>{record.tanggal}</Text>
              </View>
              <View style={styles.line}></View>
              <Text style={styles.isiData}>
                {`${record.sensorData.berat.toFixed(1)} kg`}
              </Text>
              <View style={styles.line}></View>
              <Text style={styles.isiData}>
                {`${record.sensorData.tinggi.toFixed(1)} cm`}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerUtama: {
    flex: 1,
    backgroundColor: '#E3F9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentContainer: {
    alignItems: 'center',
  },

  // Style Container 1
  container1: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  back: {
    width: 29,
    marginHorizontal: 20,
  },
  panduan: {
    fontSize: 22,
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
    lineHeight: 27,
  },
  bayi: {
    width: 145,
    height: 127,
    marginTop: 20,
  },
  // Status Bayi
  status: {
    color: '#2F4666',
    fontSize: 14,
    fontFamily: 'Livvic-Regular',
    marginTop: 11,
  },
  statusBayi: {
    fontFamily: 'Livvic-SemiBold',
    fontSize: 32,
    color: '#2F4666',
  },

  // Data
  scrollBayi: {
    backgroundColor: '#FFFFFF',
    width: '94%',
    height: 575,
    marginVertical: 14,
    borderRadius: 31,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  containerBayi: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  riwayatText: {
    fontFamily: 'Livvic-Bold',
    fontSize: 22,
    color: '#2F4666',
    marginTop: 30,
    marginLeft: 30,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  containerImages: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    width: '100%',
  },
  weight: {
    height: 38,
    width: 31,
  },
  dataContainer: {
    width: '90%',
    height: 65,
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    backgroundColor: 'rgba(245, 183, 177, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  hari: {
    color: '#2F4666',
    fontSize: 15,
    fontFamily: 'Livvic-Bold',
  },
  tanggalNomor: {
    color: '#2F4666',
    fontSize: 15,
    fontFamily: 'Livvic-SemiBold',
  },
  line: {
    backgroundColor: '#2F4666',
    height: 40,
    width: 2,
  },
  isiData: {
    color: '#2F4666',
    fontSize: 24,
    fontFamily: 'Livvic-Bold',
  },
  satuanIsi: {
    color: '#2F4666',
    fontSize: 24,
    fontFamily: 'Livvic-Bold',
    marginLeft: -15,
  },
});

export default TimbanganBayi;
