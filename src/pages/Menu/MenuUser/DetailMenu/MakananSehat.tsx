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
import {RootParamList} from '../../../../navigation/RootParamList';

// Import Images
import Back from '../../../../assets/icons/Arrow.png';
import Makanan from '../../../../assets/images/kiri.png';
import Sayuran from '../../../../assets/images/sayuran.png';
import Gandum from '../../../../assets/images/Gandum.png';
import Bawang from '../../../../assets/images/bawang.png';
import Kacang from '../../../../assets/images/kacang.png';
import Biji from '../../../../assets/images/biji.png';
import Ikan from '../../../../assets/images/ikan.png';

type MakananSehatScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'MakananSehat'
>;
const MakananSehat = () => {
  const navigation = useNavigation<MakananSehatScreenNavigationProp>();

  const handleLinkPress = () => {
    Alert.alert('Konfirmasi', 'Apakah Anda ingin mengunjungi halaman ini?', [
      {text: 'Batal', style: 'cancel'},
      {
        text: 'Ya',
        onPress: () =>
          Linking.openURL(
            'https://www.alodokter.com/ini-ragam-makanan-untuk-memperbanyak-asi',
          ),
      },
    ]);
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => navigation.navigate('PanduanBayi')}>
          <Image source={Back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.panduan}>
          Makanan Sehat Untuk Ibu {'\n'}Menyusui
        </Text>
      </View>
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.contentScroll}>
        <View style={styles.informasi}>
          <View style={styles.rowHeader}>
            <View style={styles.container}></View>
            <Text style={styles.textHeader}>
              Ragam Makanan untuk {'\n'}Memperbanyak ASI
            </Text>
          </View>
          <Image source={Makanan} style={styles.makananImage} />
          <View style={styles.textContainer}>
            <Text style={styles.paragraph}>
              {'     '}Makanan untuk memperbanyak air susu ibu (ASI) disebut
              juga makanan laktogenik atau ASI booster. Makanan laktogenik
              adalah jenis makanan yang mengandung galaktagog, yaitu senyawa
              pada tanaman yang dapat merangsang dan meningkatkan produksi ASI
              pada ibu menyusui
            </Text>
          </View>
          <Image source={Sayuran} style={styles.sayuranImage} />
          <View style={styles.textContainer}>
            <Text style={styles.nomorText}>1. Sayuran hijau</Text>
            <Text style={styles.paragraph}>
              Salah satu jenis makanan sumber galaktagog adalah sayuran hijau,
              seperti bayam, brokoli, kale, daun katuk, sayur alfalfa, dan daun
              jinten atau daun bangun-bangun. Busui dianjurkan untuk makan 1-2
              porsi sayuran berdaun hijau setiap hari.
            </Text>
          </View>
          <Image source={Gandum} style={styles.gandumImage} />
          <View style={styles.textContainer}>
            <Text style={styles.nomorText}>2. Gandum utuh dan oat</Text>
            <Text style={styles.paragraph}>
              Gandum utuh dan oat memiliki kandungan serat yang tinggi. Selain
              bisa membuat Busui merasa kenyang lebih lama, mengonsumsi bubur
              gandum atau bubur oat juga dipercaya dapat meningkatkan produksi
              ASI.
            </Text>
          </View>
          <Image source={Bawang} style={styles.bawangImage} />
          <View style={styles.textContainer}>
            <Text style={styles.nomorText}>3. Bawang putih</Text>
            <Text style={styles.paragraph}>
              Bawang putih diyakini bisa membantu meningkatkan produksi ASI pada
              ibu menyusui. Sebuah penelitian menunjukkan bahwa bayi akan
              menyusu lebih lama jika ibunya mengonsumsi bawang putih.
            </Text>
          </View>
          <Image source={Kacang} style={styles.kacangImage} />
          <View style={styles.textContainer}>
            <Text style={styles.nomorText}>4. Kacang-kacangan</Text>
            <Text style={styles.paragraph}>
              Kacang-kacangan, seperti kacang merah, kacang almond, dan kacang
              kenari, juga baik dijadikan makanan penambah ASI. Selain
              mengandung serat yang baik untuk kesehatan pencernaan,
              kacang-kacangan juga mengandung protein, kalsium, dan zat besi
              yang dapat menambah produksi ASI. Makanan ini juga cocok dijadikan
              camilan yang enak dan bernutrisi bagi ibu menyusui.
            </Text>
          </View>
          <Image source={Biji} style={styles.bijiImage} />
          <View style={styles.textContainer}>
            <Text style={styles.nomorText}>5. Biji-bijian</Text>
            <Text style={styles.paragraph}>
              Biji-bijian yang berkhasiat untuk memperbanyak ASI antara lain
              wijen, biji chia, dan biji rami atau flaxseed. Biji-bijian ini
              mengandung senyawa fitoestrogen yang baik untuk meningkatkan
              produksi ASI.
            </Text>
          </View>
          <Image source={Ikan} style={styles.ikanImage} />
          <View style={styles.textContainer}>
            <Text style={styles.nomorText}>6. Ikan dan telur</Text>
            <Text style={styles.paragraph}>
              Selama masa menyusui, Busui perlu mencukupi asupan protein dan
              energi. Kedua asupan tersebut bisa diperoleh dengan cara
              mengonsumsi makanan tinggi protein, seperti ikan dan telur. Namun,
              pastikan untuk mengonsumsi ikan dan telur yang matang, ya.
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.paragraph}>
              {'     '}Selain berbagai jenis makanan di atas, masih banyak bahan
              makanan lain yang bisa Busui konsumsi untuk menambah produksi ASI,
              misalnya kurma, pepaya, buah bit, dan wortel. Khasiat yang sama
              juga dimiliki oleh beberapa jenis rempah, seperti jahe, adas, dan
              kelabat.
            </Text>
          </View>
          <View style={styles.linkContainer}>
            <Text style={styles.sumberText}>Sumber: </Text>
            <TouchableOpacity onPress={handleLinkPress}>
              <Text style={styles.linkText}>
                https://www.alodokter.com/ini-ragam-makanan-untuk-memperbanyak-asi
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
    lineHeight: 23,
    marginBottom: 10,
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
    height: 2270,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  rowHeader: {
    flexDirection: 'row',
    marginBottom: 5,
    padding: 20,
  },
  container: {
    width: 5,
    height: 53,
    backgroundColor: '#FF8261',
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
    height: 222,
    marginBottom: 10,
  },

  // Text Container
  textContainer: {
    padding: 16,
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
  },

  // Sayuran
  sayuranImage: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  //  Gandum
  gandumImage: {
    width: 116,
    height: 65,
    alignSelf: 'center',
  },
  // Bawang
  bawangImage: {
    width: 100,
    height: 101.1,
    alignSelf: 'center',
  },
  // Kacang
  kacangImage: {
    width: 125,
    height: 82,
    alignSelf: 'center',
  },
  // Biji
  bijiImage: {
    width: 84,
    height: 83,
    alignSelf: 'center',
  },
  // Ikan
  ikanImage: {width: 100, height: 100, alignSelf: 'center'},

  // Link Sumber
  linkContainer: {
    padding: 16,
    flexDirection: 'row',
  },
  sumberText: {
    fontFamily: 'Livvic-Medium',
    fontSize: 16,
    color: 'black',
  },
  linkText: {
    fontFamily: 'Livvic-Medium',
    fontSize: 16,
    color: '#6093D9',
  },
});

export default MakananSehat;
