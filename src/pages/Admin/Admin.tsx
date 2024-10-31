import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Timbino from '../../assets/images/timbino.png';
import Lock from '../../assets/icons/lock.png';
import Email from '../../assets/icons/email.png';
import Visible from '../../assets/icons/visible.png';
import NonVisible from '../../assets/icons/visible-off.png';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootParamList} from '../../navigation/RootParamList';

type AdminScreenNavigationProp = StackNavigationProp<RootParamList, 'Admin'>;

const Admin = () => {
  const navigation = useNavigation<AdminScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <View style={styles.container1}>
      <Image source={Timbino} style={styles.image} />
      <Text style={styles.h1}>TIMBINO</Text>
      <Text style={styles.text}>
        Timbangan IoT untuk Monitoring Bayi dan Integrasi Nutrisi Optimal
      </Text>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Login Admin</Text>

        <Text style={styles.label}>Email</Text>
        <View
          style={[
            styles.container2,
            {borderColor: isEmailFocused ? '#007EC6' : '#000000'},
          ]}>
          <Image source={Email} style={styles.email} />
          <TextInput
            style={styles.input}
            placeholder="Masukkan email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View
          style={[
            styles.container2,
            {borderColor: isPasswordFocused ? '#007EC6' : '#000000'},
          ]}>
          <Image source={Lock} style={styles.lock} />
          <TextInput
            style={styles.input}
            placeholder="Masukkan password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
          <TouchableOpacity
            style={styles.visibilityToggle}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Image source={isPasswordVisible ? Visible : NonVisible} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('DashboardAdminScreen')}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E3F9FF',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  image: {
    width: 250,
    height: 250,
  },
  h1: {
    fontSize: 36,
    color: '#FF8261',
    fontFamily: 'Lilita One',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    color: '#2F4666',
    fontFamily: 'Lilita One',
    marginHorizontal: 50,
    marginBottom: 20,
  },
  loginContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  loginText: {
    fontSize: 22,
    fontFamily: 'Livvic-SemiBold',
    color: '#000000',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
    fontFamily: 'Livvic-SemiBold',
  },
  email: {
    height: 24,
    width: 24,
    marginRight: 10,
  },
  lock: {
    width: 19,
    height: 19,
    marginRight: 15,
  },
  input: {
    width: '100%',
    flex: 1,
    height: 45,
    fontFamily: 'Livvic-Regular',
    fontSize: 13,
  },
  visibilityToggle: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
  loginButton: {
    backgroundColor: '#2F4666',
    width: '100%',
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Livvic-Bold',
  },
  backButton: {
    marginTop: 15,
    backgroundColor: '#D7E7F1',
    width: '100%',
    height: 45,
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#2F4666',
    fontSize: 16,
    fontFamily: 'Livvic-Bold',
  },
});

export default Admin;
