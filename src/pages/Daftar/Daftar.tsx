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
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Timbino from '../../assets/images/timbino.png';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '../../navigation/RootParamList';

import calendar from '../../assets/icons/calendar.png';

type DaftarScreenNavigationProp = StackNavigationProp<RootParamList, 'Daftar'>;

const Daftar = () => {
  const navigation = useNavigation<DaftarScreenNavigationProp>();
  const [namaBayi, setNamaBayi] = useState('');
  const [usia, setUsia] = useState('');
  const [ibuKandung, setIbuKandung] = useState('');
  const [alamat, setAlamat] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState<
    'Laki-laki' | 'Perempuan' | null
  >(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showPicker, setShowPicker] = useState(false);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowPicker(false);
  };

  const openDatePicker = () => {
    setShowPicker(true);
  };

  const ageOptions = Array.from({length: 24}, (_, i) => `${i + 1}`);

  const saveDataToFirestore = async () => {
    const user = auth().currentUser;
    if (!user) return; // pastikan user sudah login

    try {
      const userDoc = await firestore().collection('users').doc(user.uid).get();
      if (userDoc.exists) {
        // Data yang akan disimpan
        const data = {
          namaBayi,
          usia,
          ibuKandung,
          alamat,
          jenisKelamin: jenisKelamin,
          tanggalLahir: date?.toISOString(),
          uid: user.uid, // UID pengguna yang login
        };

        // Simpan ke Firestore di koleksi `data`, dokumen dengan nama `user.uid`
        await firestore()
          .collection('data')
          .doc(user.uid) // dokumen unik untuk setiap pengguna berdasarkan `uid`
          .set(data, {merge: true});

        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('uid', user.uid);

        // Navigasi ke DashboardUser setelah data tersimpan
        navigation.navigate('DashboardUser');
      } else {
        console.log('User document not found.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.container1}>
        <Image source={Timbino} style={styles.image} />
        <Text style={styles.inputBayi}>Nama Bayi</Text>
        <TextInput
          value={namaBayi}
          onChangeText={setNamaBayi}
          placeholder="Masukkan Nama Bayi  "
          placeholderTextColor="#4d4e4e"
          style={styles.input}
        />
        <Text style={styles.inputBayi}>Jenis Kelamin</Text>

        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              jenisKelamin === 'Laki-laki' && styles.radioButtonSelected,
            ]}
            onPress={() => setJenisKelamin('Laki-laki')}>
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
            onPress={() => setJenisKelamin('Perempuan')}>
            <View style={styles.circle}>
              {jenisKelamin === 'Perempuan' && (
                <View style={styles.innerCircle} />
              )}
            </View>
            <Text style={styles.radioText}>Perempuan</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.inputBayi}>Usia</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={usia}
            onValueChange={(value: string) => setUsia(value)}
            style={styles.picker}>
            <Picker.Item label="Masukkan Usia Bayi" value="" />
            {ageOptions.map((option, index) => (
              <Picker.Item
                key={index}
                label={`${option} bulan`}
                value={option}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.inputBayi}>Tanggal Lahir</Text>
        <View style={styles.buttonContent}>
          <TouchableOpacity onPress={openDatePicker} style={{width: '100%'}}>
            <TextInput
              value={date ? date.toLocaleDateString() : ''}
              placeholder="Masukkan Tanggal Lahir   "
              placeholderTextColor="#4d4e4e"
              editable={false}
              style={styles.inputLahir}
            />
          </TouchableOpacity>
          <Image source={calendar} style={styles.calendar} />

          {showPicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>

        <Text style={styles.inputBayi}>Nama Ibu Kandung</Text>
        <TextInput
          value={ibuKandung}
          onChangeText={setIbuKandung}
          placeholder="Masukkan Nama Ibu Kandung    "
          placeholderTextColor="#4d4e4e"
          style={styles.input}
        />
        <Text style={styles.inputBayi}>Alamat</Text>
        <TextInput
          value={alamat}
          onChangeText={setAlamat}
          placeholderTextColor="#4d4e4e"
          placeholder="Masukkan Alamat Rumah   "
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={saveDataToFirestore}>
          <Text style={styles.buttonText}>Lanjutkan</Text>
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
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 30,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  inputBayi: {
    alignSelf: 'flex-start',
    fontSize: 22,
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
    marginHorizontal: 25,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 8,
    paddingHorizontal: 30,
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
  input: {
    alignContent: 'center',
    textAlign: 'center',
    width: '100%',
    flexShrink: 1,
    borderColor: '#2F4666',
    borderWidth: 2,
    fontSize: 18,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    color: '#2F4666',
    fontFamily: 'Livvic-SemiBold',
  },
  inputLahir: {
    alignContent: 'center',
    textAlign: 'center',
    width: '90%',
    borderColor: '#2F4666',
    borderWidth: 2,
    fontSize: 18,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    color: '#2F4666',
    fontFamily: 'Livvic-SemiBold',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '98%',
  },
  calendar: {
    width: 35,
    height: 35,
    marginLeft: -30,
  },
  button: {
    backgroundColor: '#2F4666',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Livvic-Black',
    textAlign: 'center',
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#2F4666',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
    width: '100%',
  },
  picker: {
    height: 50,
    fontSize: 20,
    color: '#2F4666',
    fontFamily: 'Livvic-SemiBold',
  },
});

export default Daftar;
