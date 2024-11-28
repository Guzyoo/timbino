import React, {useRef, useState} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// Import Images
import Back from '../../../../../assets/icons/Arrow.png';
import Bahan from '../../../../../assets/icons/bahan.png';
import Buat from '../../../../../assets/icons/buat.png';
import Bubur from '../../../../../assets/images/bubur.png';
import Alpukat from '../../../../../assets/images/alpukat.png';
import Daging from '../../../../../assets/images/daging.png';
import Ayam from '../../../../../assets/images/ayam.png';
import Tahu from '../../../../../assets/images/tahu.png';
import Puyuh from '../../../../../assets/images/puyuh.png';
import {RootParamList} from '../../../../../navigation/RootParamList';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Resep6ScreenNavigationProp = StackNavigationProp<RootParamList, 'Resep6'>;
const Resep6 = () => {
  const navigation = useNavigation<Resep6ScreenNavigationProp>();

  const [isExpandedBubur, setIsExpandedBubur] = useState(false);
  const [isExpandedAlpukat, setIsExpandedAlpukat] = useState(false);
  const [isExpandedDaging, setIsExpandedDaging] = useState(false);
  const [isExpandedAyam, setIsExpandedAyam] = useState(false);
  const [isExpandedTahu, setIsExpandedTahu] = useState(false);
  const [isExpandedPuyuh, setIsExpandedPuyuh] = useState(false);

  const toggleCard = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    value: boolean,
  ) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setter(!value);
  };

  // Buat Bubur
  const itemsBubur = [
    '50 g beras pulen, cuci.',
    '1 liter kaldu ayam.',
    '1 siung bawang putih, cincang.',
    '1/8 sdt garam.',
    '1 sdm daging dada ayam cincang  \n halus.',
    '20 g wortel, potong kecil atau parut.',
    '2 sdm biji jagung manis, cincang.',
  ];
  const buatBubur = [
    'Masak beras bersama kaldu ayam,\nbawang putih dan garam hingga \nberas teksturnya pecah dan menjadi \nbubur yang kental.',
    'Saat bubur hampir kental, masukkan \nayam cincang, wortel dan jagung \nmanis.',
    'Angkat, selagi panas bisa disaring \natau diblender hingga halus.',
    'Jika bayi sudah tumbuh gigi bisa \ndiberikan langsung tanpa disaring.',
  ];

  // Buat Alpukat
  const itemsAlpukat = [
    '½ buah alpukat.',
    '⅓ kembang kol.',
    '½ cangkir beras putih.',
  ];
  const buatAlpukat = [
    'Haluskan buah alpukat \nmenggunakan garpu.',
    'Kukus sampai matang dan haluskan \nkembang kol.',
    'Campurkan nasi, alpukat, dan \nkembang kol dalam wadah lalu aduk \nsampai rata.',
  ];

  // Buat Daging
  const itemsDaging = [
    'Daging sapi giling (50 gram).',
    'Nasi.',
    'Minyak kelapa.',
    'Bayam rebus, iris tipis-tipis.',
    'Garam secukupnya.',
    'Bawang merah dan putih yang \ndihaluskan.',
  ];
  const buatDaging = [
    'Campurkan daging sapi giling \ndengan bumbu-bumbu yang sudah dihaluskan dalam wadah lalu kukus \nsampai matang.',
    'Tambahkan bayam.',
    'Masukkan garam dan minyak kelapa \nsecukupnya.',
    'Tambahkan nasi dan lembutkan \nsemua campuran bahan tersebut.',
  ];

  // Buat Ayam
  const itemsAyam = [
    '2 sdm beras.',
    '1 potong hati ayam.',
    '30 ml kaldu ayam.',
    '20 ml ASI.',
    '2 kuntum brokoli.',
  ];
  const buatAyam = [
    'Siapkan panci. Masukkan beras, \nkaldu dan ASI kemudian masak \nhingga melunak dan menjadi tekstur \nnasi tim yang diinginkan. Sisihkan.',
    'Di tempat terpisah, kukus hati ayam \ndan brokoli.',
    'Campur kukusan hati ayam dan \nbrokoli dengan nasi tim. Aduk \nmerata.',
    'Sajikan kepada si Kecil.',
  ];

  // Buat Tahu
  const itemsTahu = [
    '2 sdm beras, cuci bersih.',
    '1 buah tahu putih, hancurkan.',
    '1 siung bawang putih, cincang.',
    '½ siung bawang putih, cincang \nhalus.',
    '3 lembar daun bayam, cincang \nhalus.',
    '200 ml air.',
    'Secukupnya keju.',
    'Secukupnya daun bawang.',
  ];
  const buatTahu = [
    'Pertama, masak air dan beras \nmenggunakan rice cooker hingga \nteksturnya lunak.',
    'Tambahkan tahu yang sudah \ndihancurkan, daun bayam, bawang \nputih dan irisan daun bawang masak \nhingga air menyusut. Angkat dan \nsisihkan.',
    'Setelah agak dingin, pindahkan nasi \ntim tahu ke panci dan kukus sekitar \n30 menit.',
    'Setelah matang, diamkan dalam \nsuhu ruang sebelum disajikan untuk \nsi Kecil.',
  ];

  // Buat Puyuh
  const itemsPuyuh = [
    '6 sdm nasi putih.',
    '6 butir telur puyuh rebus, potong \ndua.',
    '2 buah wortel, potong kecil.',
    '2 batang daun bawang, iris tipis.',
    '200 ml kaldu ayam.',
    '100 ml air.',
  ];
  const buatPuyuh = [
    'Siapkan panci. Masukkan beras, \nkaldu dan ASI kemudian masak \nhingga melunak dan menjadi tekstur \nnasi tim yang diinginkan. Sisihkan.',
    'Di tempat terpisah, kukus hati ayam \ndan brokoli.',
    'Campur kukusan hati ayam dan \nbrokoli dengan nasi tim. Aduk \nmerata.',
    'Sajikan kepada si Kecil.',
  ];

  return (
    <View style={styles.contentContainer}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => navigation.navigate('ResepMakanan')}>
          <Image source={Back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.panduan}>Menu 6-12 Bulan</Text>
      </View>
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.contentScroll}>
        <TouchableWithoutFeedback
          onPress={() => toggleCard(setIsExpandedBubur, isExpandedBubur)}
          style={{width: '100%'}}>
          <Animated.View style={[styles.card]}>
            <View style={styles.containerText}>
              <View style={styles.containerOren}></View>
              <Text style={styles.cardText}>Bubur Sayur</Text>
            </View>
            <Image source={Bubur} style={styles.buburImage} />
            {isExpandedBubur && (
              <View style={styles.containerResep}>
                <View style={styles.containerBahan}>
                  <Image source={Bahan} />
                  <Text style={styles.bahan}>Bahan-bahan</Text>
                </View>
                <View style={styles.containerItem}>
                  {itemsBubur.map((item, index) => (
                    <View key={index} style={styles.listItem}>
                      <View style={styles.bullet} />
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.containerBahan}>
                  <Image source={Buat} />
                  <Text style={styles.bahan}>Cara Membuat</Text>
                </View>
                <View style={styles.containerItem}>
                  {buatBubur.map((item: string, index: number) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.number}>{index + 1}.</Text>
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => toggleCard(setIsExpandedAlpukat, isExpandedAlpukat)}
          style={{width: '100%'}}>
          <Animated.View style={[styles.card]}>
            <View style={styles.containerText}>
              <View style={styles.containerHijau}></View>
              <Text style={styles.cardText}>Pure Alpukat</Text>
            </View>
            <Image source={Alpukat} style={styles.alpukatImage} />
            {isExpandedAlpukat && (
              <View style={styles.containerResep}>
                <View style={styles.containerBahan}>
                  <Image source={Bahan} />
                  <Text style={styles.bahan}>Bahan-bahan</Text>
                </View>
                <View style={styles.containerItem}>
                  {itemsAlpukat.map((item, index) => (
                    <View key={index} style={styles.listItem}>
                      <View style={styles.bullet} />
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.containerBahan}>
                  <Image source={Buat} />
                  <Text style={styles.bahan}>Cara Membuat</Text>
                </View>
                <View style={styles.containerItem}>
                  {buatAlpukat.map((item: string, index: number) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.number}>{index + 1}.</Text>
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => toggleCard(setIsExpandedDaging, isExpandedDaging)}
          style={{width: '100%'}}>
          <Animated.View style={[styles.card]}>
            <View style={styles.containerText}>
              <View style={styles.containerMerah}></View>
              <Text style={styles.cardText}>Bubur Daging Sapi</Text>
            </View>
            <Image source={Daging} />
            {isExpandedDaging && (
              <View style={styles.containerResep}>
                <View style={styles.containerBahan}>
                  <Image source={Bahan} />
                  <Text style={styles.bahan}>Bahan-bahan</Text>
                </View>
                <View style={styles.containerItem}>
                  {itemsDaging.map((item, index) => (
                    <View key={index} style={styles.listItem}>
                      <View style={styles.bullet} />
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.containerBahan}>
                  <Image source={Buat} />
                  <Text style={styles.bahan}>Cara Membuat</Text>
                </View>
                <View style={styles.containerItem}>
                  {buatDaging.map((item: string, index: number) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.number}>{index + 1}.</Text>
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => toggleCard(setIsExpandedAyam, isExpandedAyam)}
          style={{width: '100%'}}>
          <Animated.View style={[styles.card]}>
            <View style={styles.containerText}>
              <View style={styles.containerBiru}></View>
              <Text style={styles.cardText}>Nasi Tim Ayam</Text>
            </View>
            <Image source={Ayam} />
            {isExpandedAyam && (
              <View style={styles.containerResep}>
                <View style={styles.containerBahan}>
                  <Image source={Bahan} />
                  <Text style={styles.bahan}>Bahan-bahan</Text>
                </View>
                <View style={styles.containerItem}>
                  {itemsAyam.map((item, index) => (
                    <View key={index} style={styles.listItem}>
                      <View style={styles.bullet} />
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.containerBahan}>
                  <Image source={Buat} />
                  <Text style={styles.bahan}>Cara Membuat</Text>
                </View>
                <View style={styles.containerItem}>
                  {buatAyam.map((item: string, index: number) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.number}>{index + 1}.</Text>
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => toggleCard(setIsExpandedTahu, isExpandedTahu)}
          style={{width: '100%'}}>
          <Animated.View style={[styles.card]}>
            <View style={styles.containerText}>
              <View style={styles.containerKuning}></View>
              <Text style={styles.cardText}>Nasi Tim Tahu</Text>
            </View>
            <Image source={Tahu} style={styles.alpukatImage} />
            {isExpandedTahu && (
              <View style={styles.containerResep}>
                <View style={styles.containerBahan}>
                  <Image source={Bahan} />
                  <Text style={styles.bahan}>Bahan-bahan</Text>
                </View>
                <View style={styles.containerItem}>
                  {itemsTahu.map((item, index) => (
                    <View key={index} style={styles.listItem}>
                      <View style={styles.bullet} />
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.containerBahan}>
                  <Image source={Buat} />
                  <Text style={styles.bahan}>Cara Membuat</Text>
                </View>
                <View style={styles.containerItem}>
                  {buatTahu.map((item: string, index: number) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.number}>{index + 1}.</Text>
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => toggleCard(setIsExpandedPuyuh, isExpandedPuyuh)}
          style={{width: '100%'}}>
          <Animated.View style={[styles.card]}>
            <View style={styles.containerText}>
              <View style={styles.containerAbu}></View>
              <Text style={styles.cardText}>Nasi Tim Telur Puyuh</Text>
            </View>
            <Image source={Puyuh} style={styles.alpukatImage} />
            {isExpandedPuyuh && (
              <View style={styles.containerResep}>
                <View style={styles.containerBahan}>
                  <Image source={Bahan} />
                  <Text style={styles.bahan}>Bahan-bahan</Text>
                </View>
                <View style={styles.containerItem}>
                  {itemsPuyuh.map((item, index) => (
                    <View key={index} style={styles.listItem}>
                      <View style={styles.bullet} />
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.containerBahan}>
                  <Image source={Buat} />
                  <Text style={styles.bahan}>Cara Membuat</Text>
                </View>
                <View style={styles.containerItem}>
                  {buatPuyuh.map((item: string, index: number) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.number}>{index + 1}.</Text>
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
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
    marginTop: 5,
  },

  // Informasi Utama
  scrollContent: {
    flex: 1,
    backgroundColor: '#E3F9FF',
  },
  contentScroll: {
    alignItems: 'center',
  },

  // Card
  card: {
    width: '90%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    padding: 10,
  },
  containerText: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingLeft: 10,
    marginBottom: 10,
    paddingTop: 10,
  },
  cardText: {
    color: '#2F4666',
    fontSize: 24,
    fontFamily: 'Livvic-Bold',
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  containerResep: {
    alignSelf: 'flex-start',
  },
  containerBahan: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingLeft: 10,
    marginBottom: 5,
    paddingTop: 10,
    marginTop: 10,
  },
  bahan: {
    color: '#2F4666',
    fontSize: 20,
    fontFamily: 'Livvic-Bold',
    marginLeft: 8,
  },
  containerItem: {
    paddingLeft: 30,
    paddingTop: 10,
    marginBottom: 10,
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
  number: {
    fontSize: 16,
    color: '#2F4666',
    fontFamily: 'Livvic-Medium',
    alignSelf: 'flex-start',
    marginRight: 6,
  },

  // Styling Images
  buburImage: {
    width: '100%',
    height: 213,
  },
  alpukatImage: {
    width: '100%',
    height: 213,
  },

  // Container Warna
  containerOren: {
    width: 5,
    height: 25,
    backgroundColor: '#FF8261',
  },
  containerHijau: {
    width: 5,
    height: 25,
    backgroundColor: '#52B199',
  },
  containerMerah: {
    width: 5,
    height: 25,
    backgroundColor: '#C23F1C',
  },
  containerBiru: {
    width: 5,
    height: 25,
    backgroundColor: '#8394F2',
  },
  containerKuning: {
    width: 5,
    height: 25,
    backgroundColor: '#F6C987',
  },
  containerAbu: {
    width: 5,
    height: 25,
    backgroundColor: '#E3F9FF',
  },
});

export default Resep6;
