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

const inputs = Array(6).fill();
let newInputIndex = 0;

const PhoneScreen = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState({ 0: '', 1: '', 2: '', 3: '', 4: '', 5: '' });
  const [nextInputIndex, setNextInputIndex] = useState(0);
  const [count, setCount] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count == 0) {
        clearInterval(interval);
      } else {
        setCount(count - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

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

  const sendOTP = async () => {
    try {
      const result = await AxiosInstance().post('user/send-otp-phone', {
        phoneNumber: phoneNumber,
      });
      console.log(result);
      if (result) {
        ToastAndroid.show('Gửi OTP thành công', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Gửi OTP không thành công', ToastAndroid.SHORT);
        console.log(err.result.data);
      }
    } catch (err) {
      console.log(err.result);
      ToastAndroid.show('Lỗi khi gửi OTP', ToastAndroid.SHORT);
    }
  };

  const confirmCode = async () => {
    try {
      const otpCode = parseInt(Object.values(code).join(''), 10);
      const response = await AxiosInstance().post('user/verify-otp-phone', {
        phoneNumber: phoneNumber,
        otpCode: otpCode,
      });
      if (response) {
        ToastAndroid.show('Xác nhận OTP thành công', ToastAndroid.SHORT);
        navigation.navigate('New Password Phone', { phoneNumber: phoneNumber });
      } else {
        ToastAndroid.show('Xác nhận OTP không thành công', ToastAndroid.SHORT);
        console.log(err.response.data);
      }
    } catch (err) {
      ToastAndroid.show('Lỗi khi xác nhận OTP', ToastAndroid.SHORT);
      console.log(err.response.data);
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
        Nhập số điện thoại của bạn
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
        label="Số điện thoại"
        mode="outlined"
        outlineColor="#000000"
        activeOutlineColor="#000000"
        keyboardType="phone-pad"
        onChangeText={setPhoneNumber}
        autoComplete="tel"
        style={{ width: 350, marginTop: 10 }}
      />

      <TouchableOpacity
        onPress={sendOTP}
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

      {/* lhjo */}

      <TouchableOpacity onPress={confirmCode} style={[styles.submit]}>
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

export default PhoneScreen;

const { width } = Dimensions.get('window');
const inputWidth = Math.round(width / 8);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    top: 10,
  },
  otpView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    marginTop: 50,
  },
  inputView: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 10,
    fontWeight: '700',
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
});
