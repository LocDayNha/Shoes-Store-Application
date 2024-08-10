import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import React, { useState } from 'react';
import AxiosInstance from '../components/ultil/AxiosIntance';
import { Formik } from 'formik';
import * as yup from 'yup';

export default function SignupScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const emailValidation = yup
    .string()
    .email('Email không hợp lệ')
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Email không hợp lệ');

  const nameValidation = yup
    .string()
    .matches(/^[a-zA-Z0-9 ]{5,}$/, 'Tên phải có ít nhất 5 ký tự và không có ký tự đặc biệt');

  const phoneValidation = yup
    .string()
    .matches(/^\+84[3|5|7|8|9][0-9]{8}\b/, 'Số điện thoại không hợp lệ (bắt đầu với +84)');

  const initialValues = {
    name: name,
    email: email,
    phoneNumber: phoneNumber,
  };
  const validationSchema = yup.object().shape({
    name: nameValidation,
    email: emailValidation,
    phoneNumber: phoneValidation,
  });

  const handleSubmit = async () => {
    console.log(email, password);
    try {
      const response = await AxiosInstance().post('/user/register', {
        email: email,
        password: password,
        name: name,
        phoneNumber: phoneNumber,
        address: address,
      });
      console.log(response);
      if (response.result == true) {
        ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT);

        navigation.navigate('Login');
      } else {
        ToastAndroid.show('Đăng ký không thành công', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Error RegisterUser', error);
      ToastAndroid.show('Chưa nhập thông tin hoặc thông tin bị trùng', ToastAndroid.SHORT);
    }
  };

  return (
    <View className="bg-slate-100 h-full w-full">
      <StatusBar style="light" />
      <Image
        className="h-full w-full absolute"
        source={require('../assets/images/backgroundd.png')}
      />

      <View className="h-full w-full flex justify-around pt-48">
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl"
          >
            Đăng ký
          </Animated.Text>
        </View>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, touched, errors }) => (
            <View className="flex items-center mx-5 space-y-4">
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className="bg-white p-3 rounded-2xl w-full"
              >
                <TextInput
                  value={name}
                  style={{ width: 250 }}
                  placeholder="Tên của bạn"
                  placeholderTextColor={'gray'}
                  onChangeText={(text) => {
                    handleChange('name')(text);
                    setName(text);
                  }}
                />
                {touched.name && errors.name && (
                  <Text style={{ marginTop: 5, color: 'red' }}>{errors.name}</Text>
                )}
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                className="bg-white p-3 rounded-2xl w-full"
              >
                <TextInput
                  value={email}
                  style={{ width: 250 }}
                  placeholder="Email"
                  placeholderTextColor={'gray'}
                  onChangeText={(text) => {
                    handleChange('email')(text);
                    setEmail(text);
                  }}
                />
                {touched.email && errors.email && (
                  <Text style={{ marginTop: 5, color: 'red' }}>{errors.email}</Text>
                )}
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
                className="bg-white p-3 rounded-2xl w-full "
              >
                <TextInput
                  value={password}
                  style={{ width: 250 }}
                  placeholder="Mật khẩu"
                  placeholderTextColor={'gray'}
                  secureTextEntry
                  onChangeText={(text) => setPassword(text)}
                />
              </Animated.View>

              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
                className="bg-white p-3 rounded-2xl w-full "
              >
                <TextInput
                  value={address}
                  onChangeText={(text) => setAddress(text)}
                  style={{ width: 250 }}
                  placeholder="Địa chỉ của bạn"
                  placeholderTextColor={'gray'}
                />
              </Animated.View>

              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
                className="bg-white p-3 rounded-2xl w-full mb-3 "
              >
                <View className="w-full items-center flex-row ">
                  <Image
                    style={{ width: 24, height: 24, marginRight: 5 }}
                    source={require('../assets/images/vietnam.png')}
                  />
                  <TextInput
                    value={phoneNumber}
                    style={{ width: 250 }}
                    defaultValue="+84"
                    placeholder="+84"
                    placeholderTextColor={'gray'}
                    keyboardType="phone-pad"
                    onChangeText={(text) => {
                      handleChange('phoneNumber')(text);
                      setPhoneNumber(text);
                    }}
                  />
                </View>
                {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={{ marginTop: 5, color: 'red' }}>{errors.phoneNumber}</Text>
                )}
              </Animated.View>

              <Animated.View
                className="w-full"
                entering={FadeInDown.delay(600).duration(1000).springify()}
              >
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
                >
                  <Text className="text-xl font-bold text-white text-center">Đăng ký</Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View
                entering={FadeInDown.delay(800).duration(1000).springify()}
                className="flex-row justify-center"
              >
                <Text>Đã có tài khoản? </Text>
                <TouchableOpacity onPress={() => navigation.push('Login')}>
                  <Text className="text-sky-600">Đăng nhập</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
