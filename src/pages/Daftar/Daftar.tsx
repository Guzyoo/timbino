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
  const [babyName, setBabyName] = useState('');
  const [age, setAge] = useState('');
  const [motherName, setMotherName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedGender, setSelectedGender] = useState<
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

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.container1}>
        <Image source={Timbino} style={styles.image} />
        <Text style={styles.inputBayi}>Nama Bayi</Text>
        <TextInput
          value={babyName}
          onChangeText={setBabyName}
          placeholder="Masukkan Nama Bayi"
          style={styles.input}
        />
        <Text style={styles.inputBayi}>Jenis Kelamin</Text>

        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              selectedGender === 'Laki-laki' && styles.radioButtonSelected,
            ]}
            onPress={() => setSelectedGender('Laki-laki')}>
            <View style={styles.circle}>
              {selectedGender === 'Laki-laki' && (
                <View style={styles.innerCircle} />
              )}
            </View>
            <Text style={styles.radioText}>Laki-laki</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.radioButton,
              selectedGender === 'Perempuan' && styles.radioButtonSelected,
            ]}
            onPress={() => setSelectedGender('Perempuan')}>
            <View style={styles.circle}>
              {selectedGender === 'Perempuan' && (
                <View style={styles.innerCircle} />
              )}
            </View>
            <Text style={styles.radioText}>Perempuan</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.inputBayi}>Usia</Text>
        <TextInput
          value={age}
          onChangeText={setAge}
          placeholder="Masukkan Usia Bayi"
          style={styles.input}
        />
        <Text style={styles.inputBayi}>Tanggal Lahir</Text>
        <View style={styles.buttonContent}>
          <TouchableOpacity onPress={openDatePicker}>
            <TextInput
              value={date ? date.toLocaleDateString() : ''}
              placeholder="Masukkan Tanggal Lahir"
              editable={false} // Agar user tidak bisa mengetik manual
              style={styles.inputLahir}
            />
          </TouchableOpacity>
          <Image source={calendar} style={styles.calendar} />

          {showPicker && (
            <DateTimePicker
              value={date || new Date()} // Default ke tanggal hari ini
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>
        <Text style={styles.inputBayi}>Nama Ibu Kandung</Text>
        <TextInput
          value={motherName}
          onChangeText={setMotherName}
          placeholder="Masukkan Nama Ibu Kandung"
          style={styles.input}
        />
        <Text style={styles.inputBayi}>Alamat</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Masukkan Alamat Rumah"
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DashboardUser')}>
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
  },
  input: {
    height: 45,
    alignContent: 'center',
    textAlign: 'center',
    width: 369,
    borderColor: '#2F4666',
    borderWidth: 2,
    fontSize: 20,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    fontFamily: 'Livvic-SemiBold',
  },
  inputLahir: {
    alignSelf: 'flex-start',
    height: 45,
    textAlign: 'center',
    width: 300,
    borderColor: '#2F4666',
    borderWidth: 2,
    fontSize: 20,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#f0f0f0',
    fontFamily: 'Livvic-SemiBold',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 20,
  },
  calendar: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#2F4666', // Ubah warna sesuai keinginan
    height: 50,
    width: 357,
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
    color: '#FFFFFF', // Warna teks pada tombol
    fontSize: 18,
    fontFamily: 'Livvic-Black',
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default Daftar;
