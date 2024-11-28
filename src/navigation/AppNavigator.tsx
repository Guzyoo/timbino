import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../pages/SplashScreen/SplashScreen';
import OnBoarding from '../pages/OnBoarding/Index';
import Login from '../pages/Login/Login';
import Admin from '../pages/Admin/Admin';
import ProfileUser from '../pages/Profile/ProfileUser/ProfileUser';
import DashboardUser from '../pages/Home/DashboardUser';
import Calendar from '../pages/Menu/MenuUser/Calendar';
import PanduanBayi from '../pages/Menu/MenuUser/PanduanBayi';
import DashboardAdminScreen from '../pages/Home/DashboardAdmin';
import Daftar from '../pages/Daftar/Daftar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimbanganBayi from '../pages/Menu/MenuUser/TimbanganTerakhir';
import KelolaAkunScreen from '../pages/Menu/MenuAdmin/KelolaAkun';
import DetailAkun from '../pages/Menu/MenuAdmin/DetailAkun';
import Menu from '../pages/Menu/MenuAdmin/Menu';
import PanduanTumbuh from '../pages/Menu/MenuUser/DetailMenu/InformasiTumbuh';
import ResepMakanan from '../pages/Menu/MenuUser/DetailMenu/ResepMakanan';
import MakananSehat from '../pages/Menu/MenuUser/DetailMenu/MakananSehat';
import DataManual from '../pages/Menu/MenuAdmin/DataManual';
import Resep6 from '../pages/Menu/MenuUser/DetailMenu/DetailResep1/DetailResep1';
import Mpasi from '../pages/Menu/MenuUser/DetailMenu/DetailResep1/JadwalMPASI';
import Resep13 from '../pages/Menu/MenuUser/DetailMenu/DetailResep1/DetailResep2';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null,
  );
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loginStatus = await AsyncStorage.getItem('isLoggedIn');
        const onboardingStatus = await AsyncStorage.getItem(
          'hasSeenOnboarding',
        );
        const adminStatus = await AsyncStorage.getItem('isAdminLoggedIn');

        setIsLoggedIn(loginStatus === 'true');
        setHasSeenOnboarding(onboardingStatus === 'true');
        setIsAdminLoggedIn(adminStatus === 'true');
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  if (
    isLoggedIn === null ||
    hasSeenOnboarding === null ||
    isAdminLoggedIn === null
  ) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={
        !hasSeenOnboarding
          ? 'SplashScreen'
          : isAdminLoggedIn
          ? 'DashboardAdminScreen'
          : isLoggedIn
          ? 'DashboardUser'
          : 'Login'
      }
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Daftar" component={Daftar} />
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="PanduanBayi" component={PanduanBayi} />
      <Stack.Screen name="PanduanTumbuh" component={PanduanTumbuh} />
      <Stack.Screen name="ResepMakanan" component={ResepMakanan} />
      <Stack.Screen name="MakananSehat" component={MakananSehat} />
      <Stack.Screen name="TimbanganBayi" component={TimbanganBayi} />
      <Stack.Screen name="Resep6" component={Resep6} />
      <Stack.Screen name="Resep13" component={Resep13} />
      <Stack.Screen name="Mpasi" component={Mpasi} />
      <Stack.Screen
        name="DashboardAdminScreen"
        component={DashboardAdminScreen}
      />
      <Stack.Screen name="ProfileUser" component={ProfileUser} />
      <Stack.Screen name="DashboardUser" component={DashboardUser} />
      <Stack.Screen name="KelolaAkunScreen" component={KelolaAkunScreen} />
      <Stack.Screen name="DetailAkun" component={DetailAkun} />
      <Stack.Screen name="MenuTimbang" component={Menu} />
      <Stack.Screen name="DataManual" component={DataManual} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
