// AppNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../pages/SplashScreen/SplashScreen';
import OnBoarding from '../pages/OnBoarding/Index';
import Login from '../pages/Login/Login';
import Admin from '../pages/Admin/Admin';
import BeratBadan from '../pages/Menu/MenuUser/BeratBadan';
import TinggiBadan from '../pages/Menu/MenuUser/TinggiBadan';
import HubungiScreen from '../pages/Menu/MenuUser/Hubungi';
import ProfileUser from '../pages/Profile/ProfileUser/ProfileUser';
import DashboardTabs from '../pages/Home/DashboardUser';
import Calendar from '../pages/Menu/MenuUser/Calendar';
import PanduanBayi from '../pages/Menu/MenuUser/PanduanBayi';
import DashboardAdminScreen from '../pages/Home/DashboardAdmin';
import Daftar from '../pages/Daftar/Daftar';
import Menu from '../pages/Menu/Menu';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="Daftar" component={Daftar} />
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="PanduanBayi" component={PanduanBayi} />
      <Stack.Screen
        name="DashboardAdminScreen"
        component={DashboardAdminScreen}
      />
      <Stack.Screen name="DashboardUser" component={DashboardTabs} />
      <Stack.Screen name="ProfileUser" component={ProfileUser} />
      <Stack.Screen name="BeratBadan" component={BeratBadan} />
      <Stack.Screen name="TinggiBadan" component={TinggiBadan} />
      <Stack.Screen name="HubungiScreen" component={HubungiScreen} />
      {/* <Stack.Screen name="Menu" component={Menu} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
