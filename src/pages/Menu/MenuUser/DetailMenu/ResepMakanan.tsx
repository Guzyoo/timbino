import React, {useState} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// Import Images
import Back from '../../../../assets/icons/Arrow.png';
import Pendamping from '../../../../assets/images/kanan.png';
import {RootParamList} from '../../../../navigation/RootParamList';

type ResepMakananScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'ResepMakanan'
>;
const ResepMakanan = () => {
  const navigation = useNavigation<ResepMakananScreenNavigationProp>();
  return (
    <View style={styles.contentContainer}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => navigation.navigate('PanduanBayi')}>
          <Image source={Back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.panduan}>Resep Makanan Pendamping {'\n'}ASI</Text>
      </View>
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.contentScroll}>
        <Image source={Pendamping} style={styles.pendampingImage} />
        <View style={styles.textContainer}>
          <Text style={styles.paragraph}>
            {'     '}Saat memasuki usia 6 bulan, ASI hanya mampu memenuhi 60-80%
            kebutuhan energi dan zat gizi bayi, selain itu simpanan vitamin dan
            mineral yang didapat bayi sudah mulai menurun.
          </Text>
          <Text style={styles.paragraph}>
            {'     '}Oleh karena itu sudah saatnya bayi mengonsumsi makanan
            padat atau Makanan Pendamping ASI (MP-ASI).
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Resep6')}
          style={{width: '90%'}}>
          <View style={styles.card}>
            <Text style={styles.cardText}>Menu 6-12 Bulan</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Resep13')}
          style={{width: '90%'}}>
          <View style={styles.card}>
            <Text style={styles.cardText}>Menu 13-24 Bulan</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Mpasi')}
          style={{width: '90%'}}>
          <View style={styles.card}>
            <Text style={styles.cardText}>Jadwal MP-ASI</Text>
          </View>
        </TouchableOpacity>
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
    flexWrap: 'wrap',
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
    marginRight: 10,
  },

  // Informasi Utama
  scrollContent: {
    flex: 1,
    backgroundColor: '#E3F9FF',
    width: '100%',
  },
  contentScroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
    width: '100%',
    flexDirection: 'column',
  },
  pendampingImage: {
    width: 259,
    height: 173,
    marginBottom: 15,
  },

  // Text Container
  textContainer: {
    padding: 16,
  },
  paragraph: {
    fontSize: 16,
    fontFamily: 'Livvic-Medium',
    color: '#2F4666',
    marginBottom: 20,
    textAlign: 'justify',
    lineHeight: 20,
  },

  // Card
  card: {
    width: '100%',
    height: 90,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardText: {
    color: '#2F4666',
    fontSize: 24,
    fontFamily: 'Livvic-Bold',
  },
});

export default ResepMakanan;
