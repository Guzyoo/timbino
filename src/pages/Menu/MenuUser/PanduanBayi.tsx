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
import Back from '../../../assets/icons/Arrow.png';
import Tumbuh from '../../../assets/images/tumbuh2.png';

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
        <Text style={styles.panduan}>Panduan Tumbuh Kembang {'\n'}Bayi</Text>
      </View>
      <View></View>
      <View></View>
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
  tumbuh: {
    width: 249,
    height: 91,
  },
});

export default PanduanBayi;
