import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../pages/SplashScreen/SplashScreen';
import OnBoarding from '../pages/OnBoarding/Index';
import Login from '../pages/Login/Login';
import Admin from '../pages/Admin/Admin';
import BeratBadan from '../pages/Menu/MenuUser/BeratBadan';
import TinggiBadan from '../pages/Menu/MenuUser/TinggiBadan';
import HubungiScreen from '../pages/Menu/MenuUser/Hubungi';
import ProfileUser from '../pages/Profile/ProfileUser/ProfileUser';
import DashboardUser from '../pages/Home/DashboardUser';
import Calendar from '../pages/Menu/MenuUser/Calendar';
import PanduanBayi from '../pages/Menu/MenuUser/PanduanBayi';
import DashboardAdminScreen from '../pages/Home/DashboardAdmin';
import Daftar from '../pages/Daftar/Daftar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../pages/Menu/Menu';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loginStatus = await AsyncStorage.getItem('isLoggedIn');
        const onboardingStatus = await AsyncStorage.getItem(
          'hasSeenOnboarding',
        );

        setIsLoggedIn(loginStatus === 'true');
        setHasSeenOnboarding(onboardingStatus === 'true');
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null || hasSeenOnboarding === null) {
    return null; // Sembunyikan layar sementara pengecekan berlangsung
  }

  return (
    <Stack.Navigator
      initialRouteName={
        !hasSeenOnboarding
          ? 'SplashScreen'
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
      <Stack.Screen
        name="DashboardAdminScreen"
        component={DashboardAdminScreen}
      />
      <Stack.Screen name="ProfileUser" component={ProfileUser} />
      <Stack.Screen name="BeratBadan" component={BeratBadan} />
      <Stack.Screen name="TinggiBadan" component={TinggiBadan} />
      <Stack.Screen name="HubungiScreen" component={HubungiScreen} />
      <Stack.Screen name="DashboardUser" component={DashboardUser} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
