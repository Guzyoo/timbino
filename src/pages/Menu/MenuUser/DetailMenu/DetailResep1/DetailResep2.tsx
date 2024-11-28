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
import Rolade from '../../../../../assets/images/rolade.png';
import Tempe from '../../../../../assets/images/tempe.png';
import Wortel from '../../../../../assets/images/wortel.png';
import Bayam from '../../../../../assets/images/bayam.png';
import Nasi from '../../../../../assets/images/nasi.png';
import Pisang from '../../../../../assets/images/pisang.png';
import {RootParamList} from '../../../../../navigation/RootParamList';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Resep13ScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'Resep13'
>;
const Resep13 = () => {
  const navigation = useNavigation<Resep13ScreenNavigationProp>();

  const [isExpandedRolade, setIsExpandedRolade] = useState(false);
  const [isExpandedTempe, setIsExpandedTempe] = useState(false);
  const [isExpandedWortel, setIsExpandedWortel] = useState(false);
  const [isExpandedBayam, setIsExpandedBayam] = useState(false);
  const [isExpandedNasi, setIsExpandedNasi] = useState(false);
  const [isExpandedPisang, setIsExpandedPisang] = useState(false);

  const toggleCard = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    value: boolean,
  ) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setter(!value);
  };

  // Buat Rolade
  const itemsRolade = [
    'Daging sapi giling (10 gram).',
    'Telur Ayam 6 gram.',
    'Bawang putih secukupnya.',
    'Garam dan Gula secukupnya.',
    'Daun pisang dan plastik.',
  ];
  const buatRolade = [
    'Kocok telur, tambahkan sedikit \ngaram.',
    'Buat dadar tipis, sisihkan.',
    'Campur semua bahan dan bumbu-\nbumbu rolade, aduk hingga merata.',
    'Ambil selembar kulit dadar, ratakan \nadonan rolade merata di permukaan \nkulit dadar.',
    'Gulung dan rapatkan rolade.',
    'Kemudian bungkus dengan plastik \natau daun pisang.',
    'Kukus kurang lebih 30 menit.',
    'Angkat dan dinginkan.',
    'Ambil gulungan rolade, potong-\npotong dengan ketebalan sesuai \nselera',
  ];

  // Buat Tempe
  const itemsTempe = [
    'Tempe 13 g.',
    'Telur 5 gr.',
    'Maizena secukupnya.',
    'Garam secukupnya.',
    'Tepung Keju 5 gr.',
    'Minyak secukupnya.',
  ];
  const buatTempe = [
    'Kukus tempe kurang lebih 10 menit \nlalu haluskan.',
    'Campurkan tempe, telur, maizena \ndan garam, aduk rata dan uleni \nhingga adonan dapat dibentuk.',
    'Bentuk adonan menjadi bulat.',
    'Sisihkan.',
    'Siapkan kocokan telur dan tepung \npanir.',
    'Celupkan adonan ke dalam kocokan \ntelur lalu panir adonan.',
    'Panaskan minyak di dalam wajan, \nlalu goreng adonan hingga warna \nkeemasan.',
    'Angkat dan sajikan.',
  ];

  // Buat Wortel
  const itemsWortel = [
    'Bayam 25 g.',
    'Wortel 25 g.',
    'Bawang merah 1 buah.',
    'Bawang putih 1 siung.',
    'Garam dan gula secukupnya.',
    'Air secukupnya.',
  ];
  const buatWortel = [
    'Cuci daun bayam dan wortel lalu \npotong sesuai selera.',
    'Iris tipis-tipis bawang merah dan \nbawang putih.',
    'Rebus air masukan bawang merah \ndan bawang putih, lalu tambahkan \nwortel tunggu sampai wortel agak \nempuk.',
    'Masukkan daun bayam, tambahkan \ngaram, dan gula pasir aduk sampai \nmerata.',
    'Tunggu sampai daun bayam \nmatang, angkat dan sajikan',
  ];

  // Buat Bayam
  const itemsBayam = [
    '50 gram kacang almond.',
    '1 ikat bayam segar.',
    '50 gram tepung roti.',
    '2 buah telur.',
    '1 sdt oregano.',
    '1 sdt garam.',
    '50 gram keju parut.',
  ];
  const buatBayam = [
    'Bersihkan bayam, lalu cacah dengan \nmenggunakan food processor.',
    'Tambahkan kacang almond, \noregano, garam, dan juga keju parut.',
    'Lalu, cacah kembali hingga lebih \nhalus.',
    'Keluarkan adonan ke sebuah wadah \ndan tambahkan telur ke dalam \nadonannya.',
    'Bentuk adonan menjadi ukuran \nsesuap dan bubuhkan dengan \ntepung roti hingga merata.',
    'Panaskan minyak pada wajan dan \ngoreng nugget hingga berwarna \nkuning kecokelatan.',
    'Sajikan ketika masih panas.',
  ];

  // Buat Nasi
  const itemsNasi = [
    '1 centong Nasi.',
    '1 buah wortel parut.',
    '1 buah tahu, haluskan.',
    '3 sdm daging ayam giling.',
    '2 btr telur.',
    '2 sdm tepung serba guna.',
    '1 btr bawang putih. cincang kasar.',
    '1 btg daun bawang.',
    'Tepung roti, secukupnya.',
    'Garam, secukupnya.',
    'Lada, secukupnya.',
    'Minyak Goreng, secukupnya.',
  ];
  const buatNasi = [
    'Kocok butir telur kemudian \nmasukkan nasi, tahu, wortel, tepung, \ndaging ayam giling, bawang putih, \ndaun bawang serta garam dan lada.',
    'Aduk rata hingga semua bahan \ntercampur dengan sempurna.',
    'Ambil adonan lalu bentuk menjadi \nbola-bola. Kemudian kukus selama \nkurang lebih 15-20 menit agar bola-\nbola nasi matang sempurna.',
    'Kocok lepas 1 butir telur, celupkan \nbola-bola nasi satu persatu kedalam \ntelur.',
    'Kemudian balur dengan tepung roti. \nLakukan hingga bola-bola nasi habis.',
    'Panaskan minyak, kemudian goreng \nbola-bola nasi hingga kecokelatan.',
    'Angkat dan sajikan.',
  ];

  // Buat Pisang
  const itemsPisang = [
    '2 buah pisang matang.',
    '2 butir telur.',
    '50 gram oatmeal.',
    '½ sendok teh baking powder.',
    'Sedikit garam.',
    'Greek yoghurt, madu, keju, atau \npotongan buah segar.',
  ];
  const buatPisang = [
    'Blender pisang, telur, oatmeal, \nbaking powder, dan garam hingga \nhalus dan tercampur dengan rata.',
    'Diamkan adonan selama 10-20 \nmenit sampai teksturnya menjadi \nagak kental.',
    'Panaskan wajan anti lengket dengan \napi sedang.',
    'Tuangkan satu sendok makan besar \nadonan ke wajan, lalu goreng hingga \nkedua sisinya berwarna cokelat \nkeemasan.',
    'Sajikan dengan madu atau topping \nyang disukai oleh balita.',
  ];

  return (
    <View style={styles.contentContainer}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => navigation.navigate('ResepMakanan')}>
          <Image source={Back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.panduan}>Menu 13-24 Bulan</Text>
      </View>
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.contentScroll}>
        <TouchableWithoutFeedback
          onPress={() => toggleCard(setIsExpandedRolade, isExpandedRolade)}
          style={{width: '100%'}}>
          <Animated.View style={[styles.card]}>
            <View style={styles.containerText}>
              <View style={styles.containerOren}></View>
              <Text style={styles.cardText}>Rolade Daging</Text>
            </View>
            <Image source={Rolade} style={styles.buburImage} />
            {isExpandedRolade && (
              <View style={styles.containerResep}>
                <View style={styles.containerBahan}>
                  <Image source={Bahan} />
                  <Text style={styles.bahan}>Bahan-bahan</Text>
                </View>
                <View style={styles.containerItem}>
                  {itemsRolade.map((item, index) => (
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
                  {buatRolade.map((item: string, index: number) => (
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
          onPress={() => toggleCard(setIsExpandedTempe, isExpandedTempe)}
          style={{width: '100%'}}>
          <Animated.View style={[styles.card]}>
            <View style={styles.containerText}>
              <View style={styles.containerHijau}></View>
              <Text style={styles.cardText}>Bola Bola Tempe</Text>
            </View>
            <Image source={Tempe} style={styles.alpukatImage} />
            {isExpandedTempe && (
              <View style={styles.containerResep}>
                <View style={styles.containerBahan}>
                  <Image source={Bahan} />
                  <Text style={styles.bahan}>Bahan-bahan</Text>
                </View>
                <View style={styles.containerItem}>
                  {itemsTempe.map((item, index) => (
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
                  {buatTempe.map((item: string, index: number) => (
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
          onPress={() => toggleCard(setIsExpandedWortel, isExpandedWortel)}
          style={{width: '100%'}}>
          <Animated.View style={[styles.card]}>
            <View style={styles.containerText}>
              <View style={styles.containerMerah}></View>
              <Text style={styles.cardText}>Bening Bayam Wortel</Text>
            </View>
            <Image source={Wortel} />
            {isExpandedWortel && (
              <View style={styles.containerResep}>
                <View style={styles.containerBahan}>
                  <Image source={Bahan} />
                  <Text style={styles.bahan}>Bahan-bahan</Text>
                </View>
                <View style={styles.containerItem}>
                  {itemsWortel.map((item, index) => (
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
                  {buatWortel.map((item: string, index: number) => (
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
          onPress={() => toggleCard(setIsExpandedBayam, isExpandedBayam)}
          style={{width: '100%'}}>
          <Animated.View style={[styles.card]}>
            <View style={styles.containerText}>
              <View style={styles.containerBiru}></View>
              <Text style={styles.cardText}>Nugget Bayam</Text>
            </View>
            <Image source={Bayam} />
            {isExpandedBayam && (
              <View style={styles.containerResep}>
                <View style={styles.containerBahan}>
                  <Image source={Bahan} />
                  <Text style={styles.bahan}>Bahan-bahan</Text>
                </View>
                <View style={styles.containerItem}>
                  {itemsBayam.map((item, index) => (
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
                  {buatBayam.map((item: string, index: number) => (
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
          onPress={() => toggleCard(setIsExpandedNasi, isExpandedNasi)}
          style={{width: '100%'}}>
          <Animated.View style={[styles.card]}>
            <View style={styles.containerText}>
              <View style={styles.containerKuning}></View>
              <Text style={styles.cardText}>Bola Bola Nasi</Text>
            </View>
            <Image source={Nasi} style={styles.alpukatImage} />
            {isExpandedNasi && (
              <View style={styles.containerResep}>
                <View style={styles.containerBahan}>
                  <Image source={Bahan} />
                  <Text style={styles.bahan}>Bahan-bahan</Text>
                </View>
                <View style={styles.containerItem}>
                  {itemsNasi.map((item, index) => (
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
                  {buatNasi.map((item: string, index: number) => (
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
          onPress={() => toggleCard(setIsExpandedPisang, isExpandedPisang)}
          style={{width: '100%'}}>
          <Animated.View style={[styles.card]}>
            <View style={styles.containerText}>
              <View style={styles.containerAbu}></View>
              <Text style={styles.cardText}>Pancake Pisang</Text>
            </View>
            <Image source={Pisang} style={styles.alpukatImage} />
            {isExpandedPisang && (
              <View style={styles.containerResep}>
                <View style={styles.containerBahan}>
                  <Image source={Bahan} />
                  <Text style={styles.bahan}>Bahan-bahan</Text>
                </View>
                <View style={styles.containerItem}>
                  {itemsPisang.map((item, index) => (
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
                  {buatPisang.map((item: string, index: number) => (
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

export default Resep13;
