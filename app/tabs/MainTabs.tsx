import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import ProfileScreen from '../screens/profile';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="screens/home" component={HomeScreen} options={{title: 'Home' }}/>
      <Tab.Screen name="screens/profile" component={ProfileScreen} options={{title: 'Profile' }}/>
    </Tab.Navigator>
  );
};

export default MainTabs;
