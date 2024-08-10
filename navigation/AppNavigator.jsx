import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Cart from '../screens/Home/Cart';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsNavigator from './TabsNavigator';
import Intro from '../screens/Intro';
import Guide from '../screens/Begin/Guide';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';
import ProductDetail from '../components/products/ProductDetail';
import PhoneScreen from '../screens/PhoneScreen';
import EmailScreen from '../screens/EmailScreen';
import NewPassword from '../screens/NewPassword';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import { AppContext } from '../components/ultil/AppContext';
import CartDetail from '../screens/Home/CartDetail';
import SearchDetail from '../screens/Home/SearchDetail';
import VnPayWebView from '../screens/Payment/VnPayWebView';
import CodPayment from '../screens/Payment/CodPayment';
import FavoriteScreen from '../screens/Home/FavoriteScreen';
import OrderProcessing from '../components/order/OrderProcessing';
import OrderProgress from '../screens/Home/OrderProgress';
import OrderProgressDetail from '../screens/Home/OrderProgressDetail';
import ProductListScreen from '../screens/Home/ProductListScreen';
import SearchResultScreen from '../screens/Home/SearchResultScreen';
import SearchAllResultScreen from '../screens/Home/SearchAllResultScreen';
import NewPasswordEmail from '../screens/NewPasswordEmail';
import NewPasswordPhone from '../screens/NewPasswordPhone';
import StatisticalScreen from '../screens/Home/StatisticalSceen';
import RatingScreen from '../screens/Home/RatingScreen';
import SupportScreen from '../screens/Home/SupportScreen';
const Stack = createNativeStackNavigator();
const TabsStack = createBottomTabNavigator();
const NotAuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Intro">
      <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
      <Stack.Screen name="Guide" component={Guide} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

      <Stack.Screen
        name="Forgot Password"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Reset" component={ResetPassword} options={{ headerShown: false }} />

      <Stack.Screen name="Phone Screen" component={PhoneScreen} options={{ headerShown: false }} />

      <Stack.Screen name="Email Screen" component={EmailScreen} options={{ headerShown: false }} />

      <Stack.Screen
        name="New Password Email"
        component={NewPasswordEmail}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="New Password Phone"
        component={NewPasswordPhone}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={TabsNavigator}
      ></Stack.Screen>
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
      <Stack.Screen name="CartDetail" component={CartDetail} options={{ headerShown: false }} />
      <Stack.Screen name="SearchDetail" component={SearchDetail} options={{ headerShown: false }} />
      <Stack.Screen
        name="VnPayWebView"
        component={VnPayWebView}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="CodPayment"
        component={CodPayment}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="OrderProgress"
        component={OrderProgress}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="OrderProgressDetail"
        component={OrderProgressDetail}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ProductListScreen"
        component={ProductListScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="SearchResultScreen"
        component={SearchResultScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="SearchAllResultScreen"
        component={SearchAllResultScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Forgot Password"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
         <Stack.Screen
        name="RatingScreen"
        component={RatingScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
       <Stack.Screen
        name="SupportScreen"
        component={SupportScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen name="Reset" component={ResetPassword} options={{ headerShown: false }} />

      <Stack.Screen name="Phone Screen" component={PhoneScreen} options={{ headerShown: false }} />

      <Stack.Screen name="Email Screen" component={EmailScreen} options={{ headerShown: false }} />

      <Stack.Screen
        name="New Password Email"
        component={NewPasswordEmail}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="New Password Phone"
        component={NewPasswordPhone}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="statistical"
        component={StatisticalScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};
const AppNavigator = () => {
  const { isLogin } = useContext(AppContext);

  return (
    <>
      {
        isLogin == false ? <NotAuthNavigator /> : <AuthNavigator />
        // <Mains></Mains>
      }
    </>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
