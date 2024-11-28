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
import Tumbuh from '../../../../assets/images/tumbuh2.png';
import Tabel from '../../../../assets/images/tabel.png';
import TabelTumbuh from '../../../../assets/images/tabel2.png';
import {RootParamList} from '../../../../navigation/RootParamList';

type PanduanTumbuhScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'PanduanTumbuh'
>;
const PanduanTumbuh = () => {
  const navigation = useNavigation<PanduanTumbuhScreenNavigationProp>();
  return (
    <View style={styles.contentContainer}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => navigation.navigate('PanduanBayi')}>
          <Image source={Back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.panduan}>Informasi Tumbuh {'\n'}Kembang Bayi</Text>
      </View>
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.contentScroll}>
        <Image source={Tumbuh} style={styles.tumbuhImage} />
        <Image source={Tabel} style={styles.tabelImage} />
        <ScrollView
          style={styles.scrollContainer}
          horizontal={true}
          contentContainerStyle={{flexGrow: 1}}>
          <Image source={TabelTumbuh} style={styles.tabelTumbuh} />
        </ScrollView>
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
    marginBottom: 40,
  },

  // Informasi Utama
  tumbuhImage: {
    width: 249,
    height: 91,
    marginBottom: 20,
  },
  tabelImage: {
    resizeMode: 'contain',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  scrollContent: {
    flex: 1,
    backgroundColor: '#E3F9FF',
  },
  contentScroll: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  // Swipe Image
  scrollContainer: {
    flex: 1,
  },
  tabelTumbuh: {
    width: 788,
    height: 594,
    marginTop: 20,
    marginBottom: 30,
  },
});

export default PanduanTumbuh;
