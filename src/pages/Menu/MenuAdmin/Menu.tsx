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
import Bayi from '../../../assets/icons/bayi.png';
import Back from '../../../assets/icons/Arrow.png';

type MenuTimbangScreenNavigationProp = StackNavigationProp<
  RootParamList,
  'MenuTimbang'
>;

const Menu = () => {
  const navigation = useNavigation<MenuTimbangScreenNavigationProp>();

  const [sensorData, setSensorData] = useState(null);
  const [names, setNames] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState('');
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showPicker, setShowPicker] = useState(false);
  const [uid, setUid] = useState<string | null>(null);
  const [tanggalTimbang, setTanggalTimbangDisplay] = useState<string>('');

  const openDatePicker = () => setShowPicker(true);

  useEffect(() => {
    // Deklarasikan reference di dalam useEffect
    const reference = database().ref('timbangan');

    const onValueChange = reference.on('value', snapshot => {
      const data = snapshot.val();
      setSensorData(data);
    });

    // Hapus listener saat komponen di-unmount
    return () => reference.off('value', onValueChange);
  }, []);

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
    if (!selectedName || !sensorData) {
      Alert.alert(
        'Error',
        'Please make sure a name is selected and sensor data is available.',
      );
      return;
    }

    try {
      const snapshot = await firestore()
        .collection('data')
        .where('namaBayi', '==', selectedName)
        .get();
      if (snapshot.empty) {
        Alert.alert('Error', 'User UID not found for the selected name.');
        return;
      }
      const userDoc = snapshot.docs[0];
      const userUid = userDoc.id;
      const userDocRef = firestore().collection('data').doc(userUid);

      await userDocRef.set(
        {
          records: firestore.FieldValue.arrayUnion({
            namaBayi: selectedName,
            date: date ? date.toISOString() : new Date().toISOString(), // Simpan sebagai ISO
            sensorData: sensorData,
          }),
        },
        {merge: true},
      );

      Alert.alert('Success', 'Data successfully updated in Firestore!');
    } catch (error) {
      console.error('Error updating data in Firestore:', error);
      Alert.alert('Error', 'Failed to update data in Firestore.');
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
    Alert.alert('Konfirmasi', 'Apakah data sudah valid?', [
      {
        text: 'Tidak',
        onPress: () => {
          const reference = database().ref('timbangan');
          reference.once('value').then(snapshot => {
            const data = snapshot.val();
            setSensorData(data);
          });
        },
        style: 'cancel',
      },
      {text: 'Iya', onPress: saveDataToFirestore},
    ]);
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Image source={Timbino} style={styles.timbino} />
        <Image source={Bayi} style={styles.baby} />
        <Text style={styles.h1}>DATA BAYI</Text>
        <Text style={styles.sensorText}>Sensor Data:</Text>
        <Text style={styles.sensorData}>
          {sensorData ? JSON.stringify(sensorData) : 'Loading...'}
        </Text>
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
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#E3F9FF',
  },
  timbino: {
    height: 86,
    width: 90,
    marginTop: 30,
    marginBottom: 10,
  },
  baby: {
    height: 48,
    width: 48,
    marginBottom: 13,
  },
  h1: {
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
    fontSize: 24,
    marginBottom: 80,
  },
  sensorText: {
    marginBottom: 20,
    color: '#2F4666',
    fontSize: 22,
    alignSelf: 'flex-start',
    fontFamily: 'Livvic-Bold',
    marginHorizontal: 5,
  },
  sensorData: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2F4666',
    paddingHorizontal: 10,
    fontFamily: 'Livvic-Bold',
    fontSize: 15,
    color: '#2F4666',
  },

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
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2F4666',
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

export default Menu;
