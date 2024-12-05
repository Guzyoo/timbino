import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CalendarScreen = () => {
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});
  const [currentMonth, setCurrentMonth] = useState('');

  // Fungsi untuk menandai tanggal 19 setiap bulan
  const generateMarkedDates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const dates: Record<string, any> = {};

    // Tandai tanggal 19 untuk setiap bulan pada tahun berjalan
    for (let month = 0; month < 12; month++) {
      const monthString = (month + 1).toString().padStart(2, '0');
      dates[`${year}-${monthString}-14`] = {
        selected: true,
        selectedColor: '#00ADF5',
      };
    }
    setMarkedDates(dates);

    // Menyimpan bulan saat ini untuk tampilan importantDates
    const monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    setCurrentMonth(monthNames[today.getMonth()]);
  };

  useEffect(() => {
    generateMarkedDates();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jadwal Posyandu</Text>
      <Calendar
        style={styles.calendar}
        markedDates={markedDates}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#FFFF',
          textSectionTitleColor: '#2F4666',
          selectedDayBackgroundColor: '#FF8261',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#FF8261',
          dayTextColor: '#2F4666',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: '#2F4666',
          monthTextColor: '#2F4666',
          textDayFontFamily: 'Livvic-Bold',
          textMonthFontFamily: 'Livvic-Bold',
          textDayHeaderFontFamily: 'Livvic-SemiBold',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
      />

      <View style={styles.importantDates}>
        <Text style={styles.dateImportant}>14</Text>
        <View>
          <Text style={styles.importantTitle}>Posyandu Cempaka</Text>
          <Text style={styles.importantSchedule}>
            {`Tanggal 14 ${currentMonth}, Jam 08:00 - Selesai`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F9FF',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#2F4666',
    marginBottom: 40,
    marginTop: 30,
    fontFamily: 'Livvic-Bold',
    textAlign: 'center',
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  importantDates: {
    marginTop: 20,
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    height: 76,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  dateImportant: {
    fontSize: 24,
    fontFamily: 'Livvic-Bold',
    color: '#FFFFFF',
    width: 44,
    backgroundColor: '#00ADF5',
    height: 44,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 22,
  },
  importantTitle: {
    fontSize: 15,
    fontFamily: 'Livvic-Bold',
    color: '#2F4666',
    marginBottom: 5,
  },
  importantSchedule: {
    fontFamily: 'Livvic-SemiBold',
    color: '#2F4666',
    fontSize: 13,
  },
});

export default CalendarScreen;
