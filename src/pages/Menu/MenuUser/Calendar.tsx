import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jadwal Posyandu</Text>
      <Calendar
        // Menyesuaikan gaya pada kalender
        style={styles.calendar}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#FFFF',
          textSectionTitleColor: '#2F4666',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
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
        markedDates={{
          '2024-12-25': {marked: true, dotColor: 'blue'},
          '2024-01-01': {marked: true, dotColor: 'green'},
        }}
      />
      <View style={styles.importantDates}>
        <Text style={styles.dateImportant}>19</Text>
        <View>
          <Text style={styles.importantTitle}>Posyandu Harapan Kita</Text>
          <Text style={styles.importantSchedule}>
            Kamis, Jam 08:00 - Selesai
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
    width: 350,
    height: 76,
    borderRadius: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
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
