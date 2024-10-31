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
import Call from '../../../assets/icons/call.png';
import Back from '../../../assets/icons/Arrow.png';
import Comment from '../../../assets/icons/message.png';

type HubungiScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'HubungiScreen'
>;
const HubungiScreen = () => {
  const navigation = useNavigation<HubungiScreenNavigationProp>();
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => navigation.navigate('DashboardUser')}>
          <Image source={Back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.timbangan}>Hubungi</Text>
      </View>
      <View style={styles.container2}>
        <View>
          <Text style={styles.posyandu}>Posyandu Harapan Kita</Text>
          <Text style={styles.alamat}>
            Jl Raya Ki Agung KM 11 Majalengka {'\n'}Jawa Barat
          </Text>
        </View>
        <Image source={Call} style={styles.call} />
      </View>
      <View style={styles.container3}>
        <View style={styles.container4}>
          <Image source={Comment} />
          <Text style={styles.keluhan}>Tuliskan Keluhan Anda</Text>
        </View>
        <View style={styles.commentContainer}></View>
        <TouchableOpacity style={styles.simpan}>
          <Text style={styles.simpanText}>Simpan</Text>
        </TouchableOpacity>
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
    width: 380,
    height: 101,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 45,
    paddingHorizontal: 20,
  },
  call: {
    width: 40,
    height: 40,
  },
  posyandu: {
    fontSize: 20,
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
    marginBottom: 7,
  },
  alamat: {
    color: '#2F4666',
    fontSize: 13,
    fontFamily: 'Livvic-SemiBold',
  },

  // Style Container 3
  container3: {
    width: 380,
    height: 369,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  container4: {
    flexDirection: 'row',
  },
  comment: {
    width: 44,
    height: 44,
  },
  keluhan: {
    fontSize: 20,
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
    marginTop: 5,
    marginLeft: 10,
  },
  commentContainer: {
    width: 333,
    height: 219,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  simpan: {
    width: 333,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8261',
    borderRadius: 5,
  },
  simpanText: {
    fontSize: 20,
    fontFamily: 'Livvic-SemiBold',
    color: '#FFFFFF',
  },
});

export default HubungiScreen;
