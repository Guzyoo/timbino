import React, {useState} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '../../../navigation/RootParamList';

// Import Images
import Back from '../../../assets/icons/Arrow.png';
import Makanan from '../../../assets/images/kiri.png';
import Pendamping from '../../../assets/images/kanan.png';
import Tumbuh from '../../../assets/images/bayi4.png';

type PanduanBayiScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'PanduanBayi'
>;
const PanduanBayi = () => {
  const navigation = useNavigation<PanduanBayiScreenNavigationProp>();
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => navigation.navigate('DashboardUser')}>
          <Image source={Back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.panduan}>Panduan Tumbuh{'\n'}Kembang Bayi</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('MakananSehat')}>
        <View style={styles.containerImages}>
          <Image source={Makanan} style={styles.makanan} />
          <Text style={styles.makananText}>
            Makanan Sehat Untuk Ibu{'\n'}Menyusui
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ResepMakanan')}>
        <View style={styles.containerImages}>
          <Image source={Pendamping} style={styles.makanan} />
          <Text style={styles.makananText}>Resep Makanan Pendamping ASI</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PanduanTumbuh')}>
        <View style={styles.containerImages}>
          <Image source={Tumbuh} style={styles.makanan} />
          <Text style={styles.imageText}>
            Informasi Tumbuh{'\n'}Kembang Bayi
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#E3F9FF',
  },

  contentContainer: {
    alignItems: 'center',
  },

  // Style Container 1
  container1: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 20,
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
    lineHeight: 27,
    marginRight: 5,
  },

  // Card
  containerImages: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 90,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  makanan: {
    width: 80,
    height: 72,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  makananText: {
    flex: 1,
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
    fontSize: 18,
    textAlign: 'center',
    paddingRight: 10,
  },
  imageText: {
    flex: 1,
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default PanduanBayi;
