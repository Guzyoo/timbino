import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Timbino from '../../assets/images/timbino.png';
import Person from '../../assets/icons/person.png';
import Bayi from '../../assets/icons/bayi.png';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '../../navigation/RootParamList';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

type DashboardAdminScreenScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'DashboardAdminScreen'
>;

const {width} = Dimensions.get('screen');

const DashboardAdminScreen = () => {
  return (
    <View style={styles.container1}>
      <Image source={Timbino} style={styles.timbino} />
      <Text style={styles.timbinoText}>ADMIN</Text>
      <View style={styles.container2}>
        <Image source={Person} style={styles.person} />
        <Text style={styles.text}>KELOLA AKUN</Text>
      </View>
      <View style={styles.container2}>
        <Image source={Bayi} style={styles.person} />
        <Text style={styles.text}> KELOLA AKUN</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E3F9FF',
    justifyContent: 'center',
  },
  timbino: {
    height: 86,
    width: 90,
  },
  timbinoText: {
    marginTop: 20,
    fontSize: 22,
    color: '#2F4666',
    fontFamily: 'Livvic-Bold',
  },

  // Menu
  container2: {
    width: 350,
    marginTop: 40,
    height: 84,
    backgroundColor: '#ffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  person: {
    width: 40,
    height: 40,
  },
  text: {
    fontSize: 15,
    color: '#2F4666',
    marginLeft: 40,
    fontFamily: 'Livvic-Bold',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default DashboardAdminScreen;
