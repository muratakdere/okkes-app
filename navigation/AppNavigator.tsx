import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { EmployeeProvider } from '../contexts/EmployeeContext';

// Screens
import AddEmployee from '../screens/AddEmployee';
import Dashboard from '../screens/Dashboard';
import EmployeeDetail from '../screens/EmployeeDetail';
import EmployeeList from '../screens/EmployeeList';
import ForgotPassword from '../screens/ForgotPassword';
import GelirGider from '../screens/GelirGider';
import Login from '../screens/Login';
import MaasTakip from '../screens/MaasTakip';
import Profile from '../screens/Profil';
import Register from '../screens/Register';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} options={{ title: 'Ana Sayfa' }} />
      <Tab.Screen name="GelirGider" component={GelirGider} options={{ title: 'Gelir & Gider' }} />
      <Tab.Screen name="MaasTakip" component={MaasTakip} options={{ title: 'Maaş Takip' }} />
      <Tab.Screen name="Profil" component={Profile} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <EmployeeProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="EmployeeList" component={EmployeeList} options={{ headerShown: true, title: 'Personel Listesi' }} />
            <Stack.Screen name="EmployeeDetail" component={EmployeeDetail} options={{ headerShown: true, title: 'Personel Detayı' }} />
            <Stack.Screen name="AddEmployee" component={AddEmployee} options={{ headerShown: true, title: 'Personel Ekle' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        )}
      </Stack.Navigator>
    </EmployeeProvider>
  );
}
