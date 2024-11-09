import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Button,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '../../../navigation/RootParamList';
import {ScrollView} from 'react-native-gesture-handler';
import {firebase} from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import Bayi from '../../../assets/images/bayi3.png';
import Avatar from '../../../assets/images/Avatar.png';
import Pen from '../../../assets/icons/pen.png';
import Submit from '../../../assets/icons/submit.png';

type ProfileUserScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'ProfileUser'
>;

const {width} = Dimensions.get('screen');

const ProfileUser = () => {
  const navigation = useNavigation();

  const [isEditing, setIsEditing] = useState(false);
  const [jenisKelamin, setJenisKelamin] = useState<
    'Laki-laki' | 'Perempuan' | null
  >(null);
  const [profileData, setProfileData] = useState({
    namaBayi: '',
    jenisKelamin: '',
    usia: '',
    tanggalLahir: '',
    ibuKandung: '',
    alamat: '',
  });
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showPicker, setShowPicker] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    avatar: Avatar,
  });

  const openDatePicker = () => setShowPicker(true);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      handleChange('tanggalLahir', selectedDate.toISOString());
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const userId = currentUser.uid;
          const userDoc = await firestore()
            .collection('users')
            .doc(userId)
            .get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setUserProfile({
              name: userData?.displayName || 'Nama tidak ditemukan',
              email: userData?.email || 'Email tidak ditemukan',
              avatar: userData?.photoURL || Avatar,
            });
          }
        }
        const profileDoc = await firestore()
          .collection('data')
          .doc('user')
          .get();
        if (profileDoc.exists) {
          const profileData = profileDoc.data();
          setProfileData({
            namaBayi: profileData?.namaBayi || '',
            jenisKelamin: profileData?.jenisKelamin || '',
            usia: profileData?.usia || '',
            tanggalLahir: profileData?.tanggalLahir || '',
            ibuKandung: profileData?.ibuKandung || '',
            alamat: profileData?.alamat || '',
          });
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    setIsEditing(false);
    try {
      await firestore().collection('data').doc('user').update(profileData);
      Alert.alert('Data berhasil disimpan!');
    } catch (error) {
      console.error('Error saving document: ', error);
      Alert.alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  const handleChange = (field: keyof typeof profileData, value: string) => {
    setProfileData(prevData => ({...prevData, [field]: value}));
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity onPress={handleEdit}>
        <Image source={Pen} style={styles.pen} />
      </TouchableOpacity>
      <Image source={Bayi} style={styles.bayi} />
      <Text style={styles.profile}>Profile Bayi</Text>
      <View style={styles.profileContainer}>
        {/* Profile Bayi */}
        <View style={styles.profileBayi}>
          <Text style={styles.isiProfile1}>Nama:</Text>
          {isEditing ? (
            <TextInput
              style={styles.isiEdit}
              value={profileData.namaBayi}
              onChangeText={text => handleChange('namaBayi', text)}
            />
          ) : (
            <Text style={styles.isiProfile2}>{profileData.namaBayi}</Text>
          )}
        </View>
        <View style={isEditing ? styles.line2 : styles.line}></View>
        <View style={styles.profileBayi}>
          <Text style={styles.isiProfile1}>Jenis Kelamin:</Text>
          {isEditing ? (
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  jenisKelamin === 'Laki-laki' && styles.radioButtonSelected,
                ]}
                onPress={() => {
                  setJenisKelamin('Laki-laki');
                  handleChange('jenisKelamin', 'Laki-laki'); // Update profileData
                }}>
                <View style={styles.circle}>
                  {jenisKelamin === 'Laki-laki' && (
                    <View style={styles.innerCircle} />
                  )}
                </View>
                <Text style={styles.radioText}>Laki-laki</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.radioButton,
                  jenisKelamin === 'Perempuan' && styles.radioButtonSelected,
                ]}
                onPress={() => {
                  setJenisKelamin('Perempuan');
                  handleChange('jenisKelamin', 'Perempuan'); // Update profileData
                }}>
                <View style={styles.circle}>
                  {jenisKelamin === 'Perempuan' && (
                    <View style={styles.innerCircle} />
                  )}
                </View>
                <Text style={styles.radioText}>Perempuan</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.isiProfile2}>{profileData.jenisKelamin}</Text>
          )}
        </View>
        {!isEditing && <View style={styles.line}></View>}
        <View style={styles.profileBayi}>
          <Text style={styles.isiProfile1}>Usia:</Text>
          {isEditing ? (
            <TextInput
              style={styles.isiEdit}
              value={profileData.usia}
              onChangeText={text => handleChange('usia', text)}
            />
          ) : (
            <Text style={styles.isiProfile2}>{profileData.usia}</Text>
          )}
          <Text style={styles.isiProfile2}>Bulan</Text>
        </View>
        <View style={isEditing ? styles.line2 : styles.line}></View>
        <View style={styles.profileBayi}>
          <Text style={styles.isiProfile1}>Tanggal Lahir:</Text>
          {isEditing ? (
            <TouchableOpacity onPress={() => setShowPicker(true)}>
              <TextInput
                value={date ? date.toLocaleDateString() : ''}
                editable={false}
                style={styles.isiEdit}
              />
            </TouchableOpacity>
          ) : (
            <Text style={styles.isiProfile2}>
              {date ? date.toLocaleDateString() : 'tidak ada data'}
            </Text>
          )}
          {showPicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>
        <View style={isEditing ? styles.line2 : styles.line}></View>
        <View style={styles.profileBayi}>
          <Text style={styles.isiProfile1}>Ibu Kandung:</Text>
          {isEditing ? (
            <TextInput
              style={styles.isiEdit}
              value={profileData.ibuKandung}
              onChangeText={text => handleChange('ibuKandung', text)}
            />
          ) : (
            <Text style={styles.isiProfile2}>{profileData.ibuKandung}</Text>
          )}
        </View>
        <View style={isEditing ? styles.line2 : styles.line}></View>
        <View style={styles.profileBayi}>
          <Text style={styles.isiProfile1}>Alamat:</Text>
          {isEditing ? (
            <TextInput
              style={styles.isiEdit}
              value={profileData.alamat}
              onChangeText={text => handleChange('alamat', text)}
            />
          ) : (
            <Text style={styles.isiProfile2}>{profileData.alamat}</Text>
          )}
        </View>
        <View style={isEditing ? styles.line2 : styles.line}></View>
      </View>
      {isEditing && (
        <TouchableOpacity style={styles.submit} onPress={handleSave}>
          <Text style={styles.submitText}>Simpan</Text>
          <Image source={Submit} style={styles.submitIcon} />
        </TouchableOpacity>
      )}

      {/* Profile Akun */}
      {!isEditing && (
        <>
          <Text style={styles.profile}>Profile Akun</Text>
          <View style={styles.userContainer}>
            {typeof userProfile.avatar === 'string' ? (
              <Image source={{uri: userProfile.avatar}} style={styles.avatar} />
            ) : (
              <Image source={userProfile.avatar} style={styles.avatar} />
            )}
            <View style={styles.profileBayi}>
              <Text style={styles.isiProfile1}>Nama:</Text>
              <Text style={styles.isiProfile2}>{userProfile.name}</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.profileBayi}>
              <Text style={styles.isiProfile1}>Email:</Text>
              <Text style={styles.isiProfile2}>{userProfile.email}</Text>
            </View>
            <View style={styles.line}></View>
          </View>
        </>
      )}
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
    right: -180,
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
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
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

  // Mode edit
  isiEdit: {
    color: '#2F4666',
    fontSize: 20,
    fontFamily: 'Livvic-Medium',
    marginLeft: 5,
    lineHeight: 5,
  },
  line2: {
    height: 2,
    backgroundColor: '#2F4666',
  },
  radioContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    marginTop: 30,
  },
  radioButton: {
    flexDirection: 'row',
    marginRight: 90,
    marginLeft: -70,
  },
  radioButtonSelected: {
    borderColor: '#FF8261',
  },
  circle: {
    width: 27,
    height: 27,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  innerCircle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: '#FF8261',
  },
  radioText: {
    fontSize: 16,
    fontFamily: 'Livvic-SemiBold',
  },
  submit: {
    width: 357,
    height: 50,
    backgroundColor: '#FF8261',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: 'center',
    position: 'relative',
  },
  submitText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Livvic-Black',
    textAlign: 'center',
  },
  submitIcon: {
    height: 34,
    width: 34,
    right: 10,
    position: 'absolute',
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
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignSelf: 'center',
    marginBottom: 15,
  },
});

export default ProfileUser;
