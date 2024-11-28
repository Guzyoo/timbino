import React from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '../../../../../navigation/RootParamList';
import {SvgXml} from 'react-native-svg';

// Import Images
import Back from '../../../../../assets/icons/Arrow.png';
import Bayi from '../../../../../assets/images/kanan2.png';

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

type MpasiScreenNavigationProp = StackNavigationProp<RootParamList, 'Mpasi'>;
const Mpasi = () => {
  const navigation = useNavigation<MpasiScreenNavigationProp>();

  const handleLinkPress = () => {
    Alert.alert('Konfirmasi', 'Apakah Anda ingin mengunjungi halaman ini?', [
      {text: 'Batal', style: 'cancel'},
      {
        text: 'Ya',
        onPress: () =>
          Linking.openURL(
            'https://www.siloamhospitals.com/informasi-siloam/artikel/menu-mpasi-bayi-6-bulan',
          ),
      },
    ]);
  };

  const items = [
    'Pukul 06:00 = ASI.',
    'Pukul 08:00 = Pemberian MPASI pertama.',
    'Pukul 10:00 = ASI.',
    'Pukul 12:00 = ASI.',
    'Pukul 14:00 = ASI.',
    'Pukul 16:00 = Pemberian MPASI kedua.',
    'Pukul 18:00 = ASI.',
  ];

  return (
    <View style={styles.contentContainer}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => navigation.navigate('ResepMakanan')}>
          <Image source={Back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.panduan}>Jadwal MP-ASI</Text>
      </View>
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.contentScroll}>
        <View style={styles.informasi}>
          <View style={styles.rowHeader}>
            <View style={styles.container}></View>
            <Text style={styles.textHeader}>MP-ASI Untuk Bayi</Text>
          </View>
          <Image source={Bayi} style={styles.makananImage} />

          <View style={styles.textContainer}>
            <Text style={styles.paragraph}>
              {'     '}Perlu orang tua ketahui bahwa menurut Angka Kecukupan
              Gizi, jumlah energi total yang dibutuhkan oleh bayi usia 6 bulan
              adalah sekitar 550 kilokalori (kkal) per hari. Sementara itu,
              jumlah pemberian MPASI setiap makan adalah 2–3 sdm dengan tekstur
              MPASI yang sudah dilumatkan atau semi kental (puree) sebanyak dua
              kali sehari.
            </Text>
          </View>
          <View style={styles.jadwalContainer}>
            <MingcuteTimeFillIcon color="#68D3E7" size={34} />
            <Text style={styles.jadwalHeader}>Jadwal Pemberian</Text>
          </View>
          <View style={styles.containerItem}>
            {items.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.bullet} />
                <Text style={styles.itemText}>{item}</Text>
              </View>
            ))}
          </View>
          <View style={styles.linkContainer}>
            <Text style={styles.sumberText}>Sumber: </Text>
            <TouchableOpacity onPress={handleLinkPress}>
              <Text style={styles.linkText}>
                https://www.siloamhospitals.com/informasi-{'\n'}
                siloam/artikel/menu-mpasi-bayi-6-bulan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#E3F9FF',
  },

  // Style Container 1
  container1: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 25,
    marginBottom: 34,
  },
  back: {
    width: 29,
    marginHorizontal: 20,
  },
  panduan: {
    fontSize: 22,
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
  },

  // Informasi Utama
  scrollContent: {
    flex: 1,
    backgroundColor: '#E3F9FF',
  },
  contentScroll: {
    alignItems: 'center',
  },
  informasi: {
    width: '90%',
    marginBottom: 10,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ccc',
  },
  rowHeader: {
    flexDirection: 'row',
    marginBottom: 5,
    padding: 5,
    flexWrap: 'wrap',
  },
  container: {
    width: 5,
    height: 25,
    backgroundColor: '#52B199',
    marginRight: 10,
  },
  textHeader: {
    color: '#2F4666',
    fontSize: 24,
    fontFamily: 'Livvic-Bold',
    lineHeight: 30,
  },
  makananImage: {
    width: '100%',
    marginBottom: 10,
  },

  // Text Container
  textContainer: {
    padding: 10,
  },
  nomorText: {
    color: '#2F4666',
    fontSize: 16,
    fontFamily: 'Livvic-Bold',
  },
  paragraph: {
    fontSize: 16,
    fontFamily: 'Livvic-Medium',
    color: '#2F4666',
    marginBottom: 5,
    textAlign: 'justify',
    lineHeight: 20,
    overflow: 'hidden',
    flexShrink: 1,
  },

  //Jadwal
  jadwalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
  },
  jadwalHeader: {
    color: '#2F4666',
    fontSize: 20,
    fontFamily: 'Livvic-Bold',
    marginLeft: 10,
    marginBottom: 5,
  },
  containerItem: {
    paddingLeft: 20,
    paddingTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    width: 7,
    height: 7,
    borderRadius: 4, // Membuatnya bulat
    backgroundColor: '#2F4666',
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#2F4666',
    fontFamily: 'Livvic-Medium',
    marginBottom: 2,
  },

  // Link Sumber
  linkContainer: {
    padding: 10,
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  sumberText: {
    fontFamily: 'Livvic-Medium',
    fontSize: 14,
    color: 'black',
  },
  linkText: {
    fontFamily: 'Livvic-Medium',
    fontSize: 14,
    color: '#6093D9',
  },
});

export default Mpasi;
