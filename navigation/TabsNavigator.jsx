import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from '@expo/vector-icons/MaterialIcons';
import CustomBottomTabs from '../navigation/CustomBottomTabs';
import Home from '../screens/Home/Home';
import Cart from '../screens/Home/Cart';
import Profile from '../screens/Home/Profile';
import ItemListHistory from '../components/item/ItemListHistory';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchProduct from '../screens/Home/SearchProduct';
import SearchDetail from '../screens/Home/SearchDetail';
import Person from '../screens/Home/Person'
import ChangePassword from '../screens/Home/ChangePassword'

const TabsStack = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackSetting = () => {
  return (
    <Stack.Navigator initialRouteName="Person" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Person" component={Person} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  )
}

const TabsNavigator = () => {
  return (
    <TabsStack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <CustomBottomTabs {...props} />}
    >
      <TabsStack.Screen
        name="Trang chủ"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="home" {...props} />;
          },
        }}
      />

      <TabsStack.Screen
        name="Tìm kiếm"
        component={SearchProduct}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="search" {...props} />;
          },
        }}
      />
      <TabsStack.Screen
        name="Giỏ hàng"
        component={Cart}
        options={{
          headerShown: false,
          tabBarBadge: '5',
          tabBarIcon: (props) => {
            return <Icons name="shopping-cart" {...props} />;
          },
        }}
      />
      <TabsStack.Screen
        name="Bạn"
        component={StackSetting}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="person" {...props} />;
          },
        }}
      />
    </TabsStack.Navigator>
  );
};

export default TabsNavigator;
