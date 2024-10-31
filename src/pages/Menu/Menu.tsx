import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import database from '@react-native-firebase/database'; // Realtime Database
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker'; // Import types

const Menu = () => {
  const [sensorData, setSensorData] = useState(null);
  const [names, setNames] = useState<string[]>([]); // Menyimpan daftar nama dari Firestore
  const [selectedName, setSelectedName] = useState(''); // Menyimpan nama yang dipilih
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);

  // Fungsi untuk membaca data dari Firebase Realtime Database
  useEffect(() => {
    const reference = database().ref('DHT'); // Path ke data di Firebase
    const onValueChange = reference.on('value', snapshot => {
      // Data berhasil diambil
      const data = snapshot.val();
      setSensorData(data); // Set data ke state
    });

    // Cleanup listener saat komponen di-unmount
    return () => reference.off('value', onValueChange);
  }, []);

  // Fungsi untuk mengambil nama-nama dari Firestore dan mengurutkannya
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const snapshot = await firestore().collection('data').get();
        const fetchedNames = snapshot.docs.map(doc => doc.data().name);
        // Mengurutkan nama secara alfabetis
        const sortedNames = fetchedNames.sort();
        setNames(sortedNames);
      } catch (error) {
        console.error('Error fetching names from Firestore:', error);
      }
    };

    fetchNames();
  }, []);

  // Fungsi untuk menyimpan data ke Firestore, termasuk data sensor
  const saveDataToFirestore = async () => {
    if (!selectedName || !sensorData) {
      Alert.alert(
        'Error',
        'Please make sure a name is selected and sensor data is available.',
      );
      return;
    }

    try {
      // Mendapatkan referensi ke dokumen yang ingin diperbarui (misalnya dokumen "users" dengan ID tertentu)
      const docRef = firestore().collection('data').doc('user');

      // Menggunakan update untuk menambah data baru ke array (arrayUnion)
      await docRef.update({
        records: firestore.FieldValue.arrayUnion({
          name: selectedName,
          date: date.toISOString(), // Menyimpan tanggal dalam format ISO string
          sensorData: sensorData,
        }),
      });

      console.log('Data successfully updated in Firestore!');
      Alert.alert('Success', 'Data successfully updated in Firestore!');
    } catch (error) {
      console.error('Error updating data in Firestore:', error);
      Alert.alert('Error', 'Failed to update data in Firestore.');
    }
  };

  // Fungsi untuk menampilkan Date Picker
  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined,
  ) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Fungsi untuk menampilkan dialog konfirmasi sebelum menyimpan data
  const confirmSaveData = () => {
    Alert.alert('Konfirmasi', 'Apakah data sudah valid?', [
      {
        text: 'Tidak',
        onPress: () => {
          const reference = database().ref('DHT');
          reference.once('value').then(snapshot => {
            const data = snapshot.val();
            setSensorData(data);
            console.log('Data updated from Realtime Database:', data);
          });
        },
        style: 'cancel',
      },
      {
        text: 'Iya',
        onPress: () => saveDataToFirestore(),
      },
    ]);
  };
  return (
    <View style={styles.container}>
      {/* Menampilkan data dari Realtime Database */}
      <Text style={styles.sensorText}>
        Sensor Data: {sensorData ? JSON.stringify(sensorData) : 'Loading...'}
      </Text>

      {/* Dropdown untuk memilih nama */}
      <Picker
        selectedValue={selectedName}
        onValueChange={itemValue => setSelectedName(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Pilih Nama" value="" />
        {names.map((name, index) => (
          <Picker.Item key={index} label={name} value={name} />
        ))}
      </Picker>

      <Text>Tanggal Yang Dipilih: {date.toDateString()}</Text>

      {/* TextField untuk menampilkan dan memilih tanggal */}
      <TouchableOpacity onPress={() => showMode('date')}>
        <TextInput
          style={styles.textInput}
          value={date.toDateString()} // Menampilkan tanggal yang dipilih
          editable={false} // Non-editable sehingga pengguna harus memilih tanggal
        />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}

      <Button title="Save to Firestore" onPress={confirmSaveData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
  },
  picker: {
    height: 50,
    width: 250,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  sensorText: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  textInput: {
    height: 50,
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Menu;
