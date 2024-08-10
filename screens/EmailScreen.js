import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useRef, useEffect, createRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SIZES, COLORS } from '../constants';
import { KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../config';
import firebase from 'firebase/compat/app';
import { TextInput } from 'react-native-paper';
import AxiosInstance from '../components/ultil/AxiosIntance';
import { ToastAndroid } from 'react-native';
import { Dimensions } from 'react-native';
import { Keyboard } from 'react-native';

const inputs = Array(6).fill();
let newInputIndex = 0;

const EmailScreen = () => {
  let clockCall = null;
  const navigation = useNavigation();
  const [code, setCode] = useState({ 0: '', 1: '', 2: '', 3: '', 4: '', 5: '' });
  const [nextInputIndex, setNextInputIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [resendCount, setResendCount] = useState(0);

  const defaultCountdown = 30;
  const [internalVal, setInternalVal] = useState('');
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);

  const startCountdown = () => {
    setCountdown(defaultCountdown);
    setEnableResend(true);
    clearInterval(clockCall);
    clockCall = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(clockCall);
          setEnableResend(false);
        }
        return prevCountdown > 0 ? prevCountdown - 1 : 0;
      });
    }, 1000);
  };

  const onResendOTP = () => {
    console.log('Gửi lại OTP');
    sendOTPNew();
    if (enableResend) {
      setEnableResend(false);
      clearInterval(clockCall);
    }
  };

  const input = useRef();
  const handleChangeText = (text, index) => {
    const newOTP = { ...code };
    newOTP[index] = text;
    setCode(newOTP);

    const lastInputIndex = inputs.length - 1;
    if (!text) {
      newInputIndex = index === 0 ? 0 : index - 1;
      setNextInputIndex(newInputIndex);
    } else {
      newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
      setNextInputIndex(newInputIndex);
    }
  };

  useEffect(() => {
    input.current.focus();
  }, [nextInputIndex]);

  const sendOTPNew = async () => {
    try {
      const result = await AxiosInstance().post('/user/send-otp-new', { email: email });
      console.log(result);
      if (result) {
        ToastAndroid.show('Gửi lại OTP thành công', ToastAndroid.SHORT);
        startCountdown();
      } else {
        ToastAndroid.show('Gửi OTP không thành công', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Gửi OTP không thành công!!', ToastAndroid.SHORT);
      return;
    }
  };

  const sendOTPEmail = async () => {
    try {
      const result = await AxiosInstance().post('user/send-otp', { email: email });
      console.log(result);
      if (result) {
        ToastAndroid.show('Gửi OTP thành công', ToastAndroid.SHORT);
        startCountdown();
      } else {
        ToastAndroid.show('Gửi OTP không thành công', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Gửi OTP không thành công!!', ToastAndroid.SHORT);
      return;
    }
  };

  const confirmOTP = async () => {
    try {
      const verifyCode = Object.values(code).join('');
      const result = await AxiosInstance().post('user/confirm-otp', { verifyCode, email: email });
      console.log(result);
      if (result) {
        ToastAndroid.show('Xác thực OTP thành công', ToastAndroid.SHORT);
        navigation.navigate('New Password Email', { email: email });
      } else {
        ToastAndroid.show('Xác thực OTP không thành công', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Xác thực OTP không thành công!!', ToastAndroid.SHORT);
      return;
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          flexWrap: 'wrap',
          margin: 5,
          textAlign: 'center',
          fontWeight: '700',
        }}
      >
        Nhập địa chỉ email của bạn
      </Text>
      <Text
        style={{
          fontSize: 17,
          flexWrap: 'wrap',
          margin: 5,
          textAlign: 'center',
        }}
      >
        Chúng tôi sẽ gửi cho bạn đoạn mã 6 ký tự số
      </Text>

      <TextInput
        value={setEmail}
        onChangeText={setEmail}
        label="Địa chỉ email"
        mode="outlined"
        outlineColor="#000000"
        activeOutlineColor="#000000"
        keyboardType="email-address"
        autoComplete="email"
        style={{ width: 350, marginTop: 10 }}
      />

      <TouchableOpacity
        onPress={sendOTPEmail}
        style={{
          width: 300,
          backgroundColor: '#D80032',
          borderRadius: 10,
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: 10,
          top: 20,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: COLORS.white,
            fontSize: SIZES.Large,
          }}
        >
          Gửi mã OTP
        </Text>
      </TouchableOpacity>

      <View style={styles.otpContainer}>
        {inputs.map((inp, index) => {
          return (
            <View key={index.toString()} style={styles.inputContainer}>
              <TextInput
                value={code[index]}
                onChangeText={(text) => handleChangeText(text, index)}
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                maxLength={1}
                ref={nextInputIndex === index ? input : null}
              />
            </View>
          );
        })}
      </View>

      <TouchableOpacity onPress={onResendOTP}>
        <View style={styles.btnResend}>
          <Text style={[styles.textResend, { color: enableResend ? 'gray' : '#234DB7' }]}>
            {' '}
            {enableResend && countdown > 0 ? `Gửi lại OTP (${countdown}s)` : 'Gửi lại OTP'}{' '}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.submit]} onPress={confirmOTP}>
        <Text
          style={{
            textAlign: 'center',
            color: COLORS.white,
            fontSize: SIZES.Large,
          }}
        >
          Xác nhận
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default EmailScreen;

const { width } = Dimensions.get('window');
const inputWidth = Math.round(width / 8);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    top: 10,
  },

  otpContainer: {
    flexDirection: 'row',

    marginTop: 40,
    paddingHorizontal: inputWidth / 2,
  },

  inputContainer: {
    width: inputWidth,
    height: inputWidth,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#D80032',
    textAlign: 'center',
  },

  input: {
    fontSize: 25,
  },
  submit: {
    width: 300,
    backgroundColor: '#D80032',
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    marginTop: 20,
  },

  resendReview: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  btnResend: {
    top: 10,
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textResend: {
    alignItems: 'center',
  },
});
