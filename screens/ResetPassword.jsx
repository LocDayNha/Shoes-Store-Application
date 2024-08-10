import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { SIZES, COLORS } from '../constants';
import { TouchableOpacity } from 'react-native';

const ResetPassword = () => {
  const et1 = useRef();
  const et2 = useRef();
  const et3 = useRef();
  const et4 = useRef();

  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [f3, setF3] = useState('');
  const [f4, setF4] = useState('');

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

  const otpValidate = () => {
    let otp = '1234';
    let enterOtp = f1 + f2 + f3 + f4;
    if (enterOtp == otp) {
      Alert.alert('OTP Match');
    } else {
      Alert.alert('Wrong OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đã gửi mã</Text>
      <View style={styles.otpView}>
        <TextInput
          onChangeText={(txt) => {
            setF1(txt);
            if (txt.length >= 1) {
              et2.current.focus();
            }
          }}
          value={f1}
          ref={et1}
          maxLength={1}
          keyboardType="numeric"
          style={[styles.inputView, { borderColor: f1.length >= 1 ? 'blue' : 'black' }]}
        />
        <TextInput
          onChangeText={(txt) => {
            setF2(txt);
            if (txt.length >= 1) {
              et3.current.focus();
            } else if (txt.length == 0) {
              et1.current.focus();
            }
          }}
          value={f2}
          ref={et2}
          maxLength={1}
          keyboardType="numeric"
          style={[styles.inputView, { borderColor: f2.length >= 1 ? 'blue' : 'black' }]}
        />
        <TextInput
          onChangeText={(txt) => {
            setF3(txt);
            if (txt.length >= 1) {
              et4.current.focus();
            } else if (txt.length == 0) {
              et2.current.focus();
            }
          }}
          value={f3}
          ref={et3}
          maxLength={1}
          keyboardType="numeric"
          style={[styles.inputView, { borderColor: f3.length >= 1 ? 'blue' : 'black' }]}
        />
        <TextInput
          onChangeText={(txt) => {
            setF4(txt);
            if (txt.length >= 1) {
              et4.current.focus();
            } else if (txt.length == 0) {
              et3.current.focus();
            }
          }}
          value={f4}
          ref={et4}
          maxLength={1}
          keyboardType="numeric"
          style={[styles.inputView, { borderColor: f4.length >= 1 ? 'blue' : 'black' }]}
        />
      </View>

      <View style={styles.resendReview}>
        <Text
          onPress={() => {
            setCount(60);
          }}
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: count == 0 ? 'blue' : 'grey',
          }}
        >
          Gửi lại
        </Text>
        <Text style={{ fontSize: 20, marginLeft: 10 }}>{count + 's'}</Text>
      </View>

      <TouchableOpacity
        disabled={f1 !== '' && f2 !== '' && f3 !== '' && f4 !== '' ? false : true}
        style={[
          styles.submit,
          {
            backgroundColor: f1 !== '' && f2 !== '' && f3 !== '' && f4 !== '' ? 'blue' : 'grey',
          },
        ]}
        onPress={() => otpValidate()}
      >
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
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 100,
    alignSelf: 'center',
  },
  otpView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 100,
  },
  inputView: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 10,
    textAlign: 'center',
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
