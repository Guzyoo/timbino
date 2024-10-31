import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '../../../navigation/RootParamList';
import {ScrollView} from 'react-native-gesture-handler';
import Bayi from '../../../assets/images/bayi3.png';
import Avatar from '../../../assets/images/Avatar.png';
import Pen from '../../../assets/icons/pen.png';

type ProfileUserScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'ProfileUser'
>;

const {width} = Dimensions.get('screen');

const ProfileUser = () => {
  const navigation = useNavigation<ProfileUserScreenNavigationProp>();

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}>
      <Image source={Pen} style={styles.pen} />
      <Image source={Bayi} style={styles.bayi} />
      <Text style={styles.profile}>Profile Bayi</Text>
      <View style={styles.profileContainer}>
        <View style={styles.profileBayi}>
          <Text style={styles.isiProfile1}>Nama:</Text>
          <Text style={styles.isiProfile2}>Hendra</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.profileBayi}>
          <Text style={styles.isiProfile1}>Jenis Kelamin:</Text>
          <Text style={styles.isiProfile2}>Laki-laki</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.profileBayi}>
          <Text style={styles.isiProfile1}>Usia:</Text>
          <Text style={styles.isiProfile2}>6 Bulan</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.profileBayi}>
          <Text style={styles.isiProfile1}>Tanggal Lahir:</Text>
          <Text style={styles.isiProfile2}>10 Mei 2024</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.profileBayi}>
          <Text style={styles.isiProfile1}>Ibu Kandung:</Text>
          <Text style={styles.isiProfile2}>Wiwin</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.profileBayi}>
          <Text style={styles.isiProfile1}>Alamat:</Text>
          <Text style={styles.isiProfile2}>Jl Yogya kecil no.23</Text>
        </View>
        <View style={styles.line}></View>
      </View>
      <Text style={styles.profile}>Profile Akun</Text>
      <View style={styles.userContainer}>
        <Image source={Avatar} style={styles.avatar} />
        <View style={styles.profileBayi}>
          <Text style={styles.isiProfile1}>Nama:</Text>
          <Text style={styles.isiProfile2}>QuenWin</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.profileBayi}>
          <Text style={styles.isiProfile1}>Email:</Text>
          <Text style={styles.isiProfile2}>winwin01@gmail.com</Text>
        </View>
        <View style={styles.line}></View>
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
    flexGrow: 1,
    alignItems: 'center',
  },
  bayi: {
    width: 94.14,
    height: 112,
    marginTop: 40,
    marginBottom: 20,
  },
  pen: {
    position: 'absolute',
    width: 31,
    height: 30,
    top: 15,
    right: 15,
  },
  profile: {
    fontSize: 22,
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
    marginLeft: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },

  //Profile Bayi
  profileContainer: {
    width: 380,
    height: 350,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 20,
  },
  profileBayi: {
    flexDirection: 'row',
  },
  isiProfile1: {
    color: '#2F4666',
    fontSize: 20,
    marginLeft: 3,
    fontFamily: 'Livvic-Bold',
  },
  isiProfile2: {
    color: '#2F4666',
    fontSize: 20,
    fontFamily: 'Livvic-Medium',
    marginLeft: 15,
    lineHeight: 30,
  },
  line: {
    height: 2,
    marginVertical: 10,
    marginHorizontal: 2,
    backgroundColor: '#2F4666',
  },

  //User Profil
  userContainer: {
    width: 380,
    height: 212,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 20,
  },
  avatar: {
    width: 52,
    height: 52,
    alignSelf: 'center',
    marginBottom: 15,
  },
});

export default ProfileUser;
