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
  const [isProcessing, setIsProcessing] = useState(false);
  const [tanggalLahirDisplay, setTanggalLahirDisplay] = useState<string>('');
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

      // Format tanggal untuk tampilan
      const formattedDisplayDate = selectedDate.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      setTanggalLahirDisplay(formattedDisplayDate); // Set state tampilan

      // Simpan tanggal dalam format ISO untuk database
      handleChange('tanggalLahir', selectedDate.toISOString());
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const userId = currentUser.uid;

          // Ambil data dari koleksi `users` untuk profil dasar
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

          // Ambil data dari koleksi `data` untuk detail profil pengguna
          const profileDoc = await firestore()
            .collection('data')
            .doc(userId) // Gunakan `userId` untuk dokumen unik pengguna
            .get();

          if (profileDoc.exists) {
            const profileData = profileDoc.data();

            // Periksa apakah profileData.tanggalLahir adalah string dan dapat dikonversi
            const formattedTanggalLahir = profileData?.tanggalLahir
              ? new Date(profileData.tanggalLahir).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })
              : '';

            setProfileData({
              namaBayi: profileData?.namaBayi || 'Tidak ada data',
              jenisKelamin: profileData?.jenisKelamin || 'Tidak ada data',
              usia: profileData?.usia || 'Tidak ada data',
              tanggalLahir: profileData?.tanggalLahir || 'Tidak ada data',
              ibuKandung: profileData?.ibuKandung || 'Tidak ada data',
              alamat: profileData?.alamat || 'Tidak ada data',
            });

            // Set tanggal tampilan
            setTanggalLahirDisplay(formattedTanggalLahir);
          }
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = () => {
    if (isProcessing) return; // Abaikan jika masih dalam proses
    setIsProcessing(true);
    setIsEditing(true);
    setTimeout(() => setIsProcessing(false), 500); // 500ms adalah waktu buffer
  };

  const handleSave = async () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah data sudah sesuai?',
      [
        {
          text: 'Tidak',
          onPress: () => console.log('Data tidak disimpan'),
          style: 'cancel', // Tombol pembatalan
        },
        {
          text: 'Ya',
          onPress: async () => {
            try {
              const currentUser = auth().currentUser;
              if (!currentUser) return; // Pastikan user sudah login

              const userId = currentUser.uid;

              // Jika ada date yang dipilih, simpan dalam format ISO
              const isoTanggalLahir = date
                ? date.toISOString()
                : profileData.tanggalLahir;

              // Simpan profileData dengan format ISO di database
              await firestore()
                .collection('data')
                .doc(userId) // Gunakan userId sebagai ID dokumen
                .update({
                  ...profileData,
                  tanggalLahir: isoTanggalLahir,
                });

              // Setelah menyimpan, tampilkan tanggal dalam format lokal
              const formattedTanggalLahir = new Date(
                isoTanggalLahir,
              ).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              });

              // Update tanggal untuk tampilan
              setTanggalLahirDisplay(formattedTanggalLahir);
              setIsEditing(false); // Kembali ke mode tampilan
              Alert.alert('Data berhasil disimpan!');
            } catch (error) {
              console.error('Error saving document: ', error);
              Alert.alert('Terjadi kesalahan saat menyimpan data.');
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleChange = (field: keyof typeof profileData, value: string) => {
    setProfileData(prevData => ({...prevData, [field]: value}));
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled">
      <TouchableOpacity
        onPress={handleEdit}
        style={[styles.touchArea, {padding: 10}]}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
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
              multiline={true}
              onChangeText={text => handleChange('namaBayi', text)}
            />
          ) : (
            <Text style={styles.isiProfile2}>{profileData.namaBayi}</Text>
          )}
        </View>
        <View style={styles.line}></View>
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
              keyboardType="numeric" // Memastikan keyboard hanya menampilkan angka
              onChangeText={text => {
                // Hanya izinkan karakter angka dengan regex
                const filteredText = text.replace(/[^0-9]/g, '');

                // Konversi text ke angka
                const numericValue = parseInt(filteredText, 10);

                // Validasi agar hanya angka 1-24 yang diperbolehkan
                if (
                  filteredText === '' ||
                  (numericValue >= 1 && numericValue <= 24)
                ) {
                  handleChange('usia', filteredText);
                }
              }}
            />
          ) : (
            <Text style={styles.isiProfile2}>{profileData.usia}</Text>
          )}
          <Text style={styles.bulan}>Bulan</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.profileBayi}>
          <Text style={styles.isiProfile1}>Tanggal Lahir:</Text>
          {isEditing ? (
            <TouchableOpacity onPress={() => setShowPicker(true)}>
              <TextInput
                value={tanggalLahirDisplay}
                editable={false}
                style={styles.isiEdit}
              />
            </TouchableOpacity>
          ) : (
            <Text style={styles.isiProfile2}>{tanggalLahirDisplay}</Text>
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
        <View style={styles.line}></View>
        <View style={styles.profileBayi}>
          <Text style={styles.isiProfile1}>Ibu Kandung:</Text>
          {isEditing ? (
            <TextInput
              style={styles.isiEdit}
              value={profileData.ibuKandung}
              multiline={true}
              onChangeText={text => handleChange('ibuKandung', text)}
            />
          ) : (
            <Text style={styles.isiProfile2}>{profileData.ibuKandung}</Text>
          )}
        </View>
        <View style={styles.line}></View>
        <View style={styles.profileBayi}>
          <Text style={styles.isiProfile1}>Alamat:</Text>
          {isEditing ? (
            <TextInput
              style={styles.isiEdit}
              value={profileData.alamat}
              multiline={true}
              onChangeText={text => handleChange('alamat', text)}
            />
          ) : (
            <Text style={styles.isiProfile2}>{profileData.alamat}</Text>
          )}
        </View>
        <View style={styles.line}></View>
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
  touchArea: {
    position: 'absolute',
    top: 15,
    right: 10,
    zIndex: 10,
    backgroundColor: 'transparent', // Tidak terlihat
    alignItems: 'center',
    justifyContent: 'center',
  },
  pen: {
    width: 31,
    height: 30,
    resizeMode: 'contain',
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
    width: '90%',
    flexShrink: 1,
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
    flexWrap: 'wrap',
  },
  profileBayi: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'nowrap',
  },
  isiProfile1: {
    color: '#2F4666',
    fontSize: 20,
    marginLeft: 3,
    fontFamily: 'Livvic-Bold',
    flexWrap: 'wrap',
  },
  isiProfile2: {
    color: '#2F4666',
    fontSize: 20,
    fontFamily: 'Livvic-Medium',
    marginLeft: 15,
    lineHeight: 30,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  bulan: {
    color: '#2F4666',
    fontSize: 20,
    fontFamily: 'Livvic-Medium',
    marginLeft: 10,
    flex: 1,
  },
  line: {
    height: 2,
    width: '100%',
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
    marginTop: -10,
    paddingRight: 10,
    flexShrink: 1,
    lineHeight: 28,
    width: 'auto',
  },
  radioContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    marginTop: 30,
  },
  radioButton: {
    flexDirection: 'row',
    marginRight: 130,
    marginLeft: -100,
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
    color: '#2F4666',
  },
  submit: {
    width: '90%',
    height: 50,
    backgroundColor: '#FF8261',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: 'center',
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
    width: '90%',
    flexShrink: 1,
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
    flexWrap: 'wrap',
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
