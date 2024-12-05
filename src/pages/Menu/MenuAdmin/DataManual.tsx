import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '../../../navigation/RootParamList';
import {Picker} from '@react-native-picker/picker';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import Images
import Timbino from '../../../assets/images/timbino.png';
import Timbangan from '../../../assets/icons/timbangan.png';
import Back from '../../../assets/icons/Arrow.png';

type DataManualScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'DataManual'
>;

const DataManual = () => {
  const navigation = useNavigation<DataManualScreenNavigationProp>();

  const [names, setNames] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState('');
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showPicker, setShowPicker] = useState(false);
  const [uid, setUid] = useState<string | null>(null);
  const [tanggalTimbang, setTanggalTimbangDisplay] = useState<string>('');

  const [berat, setBerat] = useState('');
  const [tinggi, setTinggi] = useState('');
  const [status, setStatus] = useState('');
  const [bmi, setBmi] = useState('');

  const openDatePicker = () => setShowPicker(true);

  useEffect(() => {
    const fetchAllNames = async () => {
      try {
        const snapshot = await firestore().collection('data').get();
        if (!snapshot.empty) {
          const allNames = snapshot.docs
            .map(doc => doc.data().namaBayi)
            .filter(Boolean);
          setNames(allNames);
        } else {
          console.log('No documents in the data collection.');
        }
      } catch (error) {
        console.error('Error fetching names from Firestore:', error);
      }
    };
    fetchAllNames();
  }, []);

  useEffect(() => {
    const fetchUid = async () => {
      const storedUid = await AsyncStorage.getItem('uid');
      setUid(storedUid);
    };
    fetchUid();
  }, []);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDisplayDate = formatDateToIndonesian(selectedDate);
      setTanggalTimbangDisplay(formattedDisplayDate);
    }
  };

  const saveDataToFirestore = async () => {
    if (!selectedName || !berat || !tinggi || !status || !bmi || !date) {
      Alert.alert('Error', 'Harap lengkapi semua data.');
      return;
    }

    // Validasi status: hanya menerima angka 1-4
    const statusValue = parseInt(status, 10);
    if (statusValue < 1 || statusValue > 4) {
      Alert.alert('Error', 'Status hanya boleh bernilai antara 1-4.');
      return;
    }

    try {
      const snapshot = await firestore()
        .collection('data')
        .where('namaBayi', '==', selectedName)
        .get();

      if (snapshot.empty) {
        Alert.alert('Error', 'Nama bayi tidak ditemukan.');
        return;
      }

      const userDoc = snapshot.docs[0];
      const userUid = userDoc.id;

      // Struktur data untuk disimpan
      const newRecord = {
        date: date.toISOString(),
        namaBayi: selectedName,
        sensorData: {
          berat: parseFloat(berat), // Simpan sebagai angka
          tinggi: parseFloat(tinggi),
          status: statusValue,
          BMI: parseFloat(bmi),
        },
      };

      // Menambahkan data ke dalam array records
      await firestore()
        .collection('data')
        .doc(userUid)
        .set(
          {
            records: firestore.FieldValue.arrayUnion(newRecord),
          },
          {merge: true}, // Menggabungkan dengan data yang sudah ada
        );

      Alert.alert('Success', 'Data berhasil disimpan!');
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat menyimpan data.');
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const formatDateToIndonesian = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const confirmSaveData = () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah data sudah valid?',
      [
        {
          text: 'Tidak',
          onPress: () => {
            Alert.alert(
              'Info',
              'Silakan periksa dan lengkapi data sebelum menyimpan.',
            );
          },
          style: 'cancel',
        },
        {
          text: 'Iya',
          onPress: saveDataToFirestore,
        },
      ],
      {cancelable: false}, // Tidak bisa ditutup tanpa memilih "Tidak" atau "Iya"
    );
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Image source={Timbino} style={styles.timbino} />
        <Image source={Timbangan} style={styles.timbangan} />
        <Text style={styles.h1}>DATA MANUAL</Text>
        <View style={styles.input}>
          <Text style={styles.sensorText}>Berat :</Text>
          <TextInput
            style={styles.isiEdit}
            value={berat}
            onChangeText={
              value =>
                setBerat(
                  value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'),
                ) // Validasi hanya angka dan satu desimal
            }
            keyboardType="decimal-pad"
          />
          <Text style={styles.sensorText}>kg</Text>
        </View>
        <View style={styles.input}>
          <Text style={styles.sensorText}>Tinggi :</Text>
          <TextInput
            style={styles.isiEdit}
            value={tinggi}
            onChangeText={
              value =>
                setTinggi(
                  value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'),
                ) // Validasi hanya angka dan satu desimal
            }
            keyboardType="decimal-pad"
          />
          <Text style={styles.sensorText}>cm</Text>
        </View>
        <View style={styles.input}>
          <Text style={styles.sensorText}>Status:</Text>
          <TextInput
            style={styles.isiEdit}
            value={status}
            onChangeText={value => {
              // Pastikan hanya angka 1-4 yang diterima
              const sanitizedValue = value.replace(/[^1-4]/g, '');

              // Batasi panjang input hanya satu karakter
              if (sanitizedValue.length <= 1) {
                setStatus(sanitizedValue);
              }
            }}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.sensorText}>BMI :</Text>
          <TextInput
            style={styles.isiEdit}
            value={bmi}
            onChangeText={
              value =>
                setBmi(
                  value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1'),
                ) // Validasi hanya angka dan satu desimal
            }
            keyboardType="decimal-pad"
          />
          <Text style={styles.sensorText}>kg/m²</Text>
        </View>
        <Text style={styles.namaBayi}>Nama Bayi</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedName}
            onValueChange={itemValue => setSelectedName(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}>
            <Picker.Item label="Pilih Nama" value="" />
            {names.map((name, index) => (
              <Picker.Item key={index} label={name} value={name} />
            ))}
          </Picker>
        </View>

        <Text style={styles.namaBayi}>Tanggal</Text>
        <TouchableOpacity
          onPress={() => showMode('date')}
          style={{width: '100%'}}>
          <TextInput
            style={styles.textInput}
            value={date ? formatDateToIndonesian(date) : ''}
            editable={false}
          />
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            value={date || new Date()}
            mode={mode} // Gunakan mode yang sesuai
            display="default"
            onChange={onDateChange}
          />
        )}

        {showPicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() => {
              navigation.navigate('DashboardAdminScreen');
            }}>
            <Image source={Back} style={styles.backIcon} />
            <Text style={styles.backText}>Kembali</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.simpanContainer}
            onPress={confirmSaveData}>
            <Text style={styles.simpanText}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#E3F9FF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#E3F9FF',
  },
  timbino: {
    height: 86,
    width: 90,
    marginTop: 30,
    marginBottom: 10,
  },
  timbangan: {
    height: 45,
    width: 52,
    resizeMode: 'contain',
    marginBottom: 13,
  },
  h1: {
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
    fontSize: 24,
    marginBottom: 50,
  },
  sensorText: {
    marginBottom: 20,
    color: '#2F4666',
    fontSize: 22,
    alignSelf: 'flex-start',
    fontFamily: 'Livvic-Bold',
    marginHorizontal: 5,
    marginRight: 16,
    width: 90,
  },

  //Input Data Bayi
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
  },
  isiEdit: {
    color: '#2F4666',
    fontSize: 20,
    fontFamily: 'Livvic-Medium',
    lineHeight: 5,
    backgroundColor: '#fff',
    height: 40,
    width: 60,
    borderRadius: 5,
    textAlign: 'center',
  },

  // Input Nama
  namaBayi: {
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
    fontSize: 22,
    alignSelf: 'flex-start',
    marginHorizontal: 5,
    marginTop: 20,
    marginBottom: 10,
  },
  pickerContainer: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2F4666',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: '100%',
    fontSize: 15,
    color: '#2F4666',
  },
  pickerItem: {
    fontFamily: 'Livvic-Bold',
    fontSize: 15,
    color: '#2F4666',
  },
  textInput: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2F4666',
    paddingHorizontal: 10,
    marginBottom: 20,
    fontFamily: 'Livvic-Bold',
    fontSize: 15,
    color: '#2F4666',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },

  // Simpan Container
  simpanContainer: {
    width: '50%',
    height: 50,
    marginHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: '#2F4666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  simpanText: {
    fontSize: 18,
    fontFamily: 'Livvic-Black',
    color: '#fff',
  },

  // Back Container
  backContainer: {
    flexDirection: 'row',
    width: '50%',
    height: 50,
    marginHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  backIcon: {
    width: 18,
    height: 18,
    marginHorizontal: 10,
  },
  backText: {
    color: '#2F4666',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    fontSize: 18,
    fontFamily: 'Livvic-Black',
  },
});

export default DataManual;
