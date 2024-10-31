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
import Bayi from '../../../assets/images/bayi2.png';
import Back from '../../../assets/icons/Arrow.png';

type TinggiBadanScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'TinggiBadan'
>;
const TinggiBadan = () => {
  const navigation = useNavigation<TinggiBadanScreenNavigationProp>();
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => navigation.navigate('DashboardUser')}>
          <Image source={Back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.timbangan}>TINGGI BADAN</Text>
      </View>
      <Image source={Bayi} style={styles.bayi} />
      <View style={styles.container2}>
        <Text style={styles.riwayat}>Riwayat</Text>
        <View style={styles.card}>
          <View style={styles.cardContainer}>
            <View>
              <View style={styles.container}>
                <Text style={styles.dayText}>Senin,</Text>
                <Text style={styles.dateText}>14/10/2024</Text>
              </View>
              <Text style={styles.clock}>09.41</Text>
            </View>
            <View style={styles.line}></View>
            <Text style={styles.berat}>64,1 cm</Text>
          </View>
        </View>
      </View>
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
  timbangan: {
    fontSize: 22,
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
    lineHeight: 27,
  },
  bayi: {
    width: 133,
    height: 174,
    marginBottom: 24,
  },

  // Style Container 2
  container2: {
    width: 390,
    height: 575,
    backgroundColor: '#FFFFFF',
    borderRadius: 31,
    alignItems: 'center',
  },
  riwayat: {
    alignSelf: 'flex-start',
    marginLeft: 35,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 22,
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
  },
  card: {
    width: 364,
    height: 65,
    borderRadius: 20,
    backgroundColor: '#F5B7B1',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-around',
  },
  line: {
    width: 4,
    height: 40,
    marginLeft: 60,
    backgroundColor: '#2F4666',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayText: {
    fontFamily: 'Livvic-Bold',
    fontSize: 20,
    color: '#2F4666',
    marginRight: 4,
    lineHeight: 24,
  },
  dateText: {
    fontFamily: 'Livvic-SemiBold',
    fontSize: 16,
    color: '#2F4666',
    lineHeight: 24,
  },
  clock: {
    fontFamily: 'Livvic-SemiBold',
    fontSize: 16,
    color: '#2F4666',
  },
  berat: {
    color: '#2F4666',
    fontFamily: 'Livvic-Bold',
    fontSize: 20,
    lineHeight: 24,
  },
});

export default TinggiBadan;
