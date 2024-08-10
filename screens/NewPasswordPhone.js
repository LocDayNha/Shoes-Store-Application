import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SIZES, COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import AxiosInstance from '../components/ultil/AxiosIntance';

const NewPasswordPhone = (props) => {
  const navigation = useNavigation();

  const [isSecureEntry1, setIsSecureEntry1] = useState(true);
  const [isSecureEntry2, setIsSecureEntry2] = useState(true);

  const { phoneNumber } = props.route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPass) {
      Alert.alert('Mật khẩu không trùng khớp');
      return;
    }
    try {
      console.log('PhoneNumber log : ', phoneNumber);
      console.log('New Password log:', newPassword);
      console.log('Confirm password log ', confirmPass);

      const response = await AxiosInstance().put('user/change-password-phone', {
        phoneNumber: phoneNumber,
        newPassword: confirmPass,
      });
      console.log(response);
      if (response.result === true) {
        Alert.alert('Thành công', 'Đã đổi mật khẩu thành công.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đổi mật khẩu.');
      }
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={{ width: 350, height: 300 }}
          source={require('../assets/images/newpass.jpg')}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: SIZES.xLarge }}>
            Tạo mật khẩu mới của bạn
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            borderRadius: 5,
            borderWidth: 0.5,
            marginTop: 35,
          }}
        >
          <Ionicons style={{ padding: 5 }} name="lock-closed" size={24} color="grey" />
          <TextInput
            onChangeText={setNewPassword}
            value={newPassword}
            secureTextEntry={isSecureEntry1}
            style={{ width: 250 }}
            placeholder="Mật khẩu"
          />
          <Ionicons
            style={{ padding: 5 }}
            name={isSecureEntry1 ? 'eye' : 'eye-off'}
            size={24}
            color="grey"
            onPress={() => setIsSecureEntry1(!isSecureEntry1)}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            borderRadius: 5,
            borderWidth: 0.5,
            marginTop: 15,
          }}
        >
          <Ionicons style={{ padding: 5 }} name="lock-closed" size={24} color="grey" />
          <TextInput
            onChangeText={setConfirmPass}
            value={confirmPass}
            secureTextEntry={isSecureEntry2}
            style={{ width: 250 }}
            placeholder="Nhập lại mật khẩu"
          />
          <Ionicons
            style={{ padding: 5 }}
            name={isSecureEntry2 ? 'eye' : 'eye-off'}
            size={24}
            color="grey"
            onPress={() => setIsSecureEntry2(!isSecureEntry2)}
          />
        </View>

        <View style={{ marginTop: 30 }} />

        <TouchableOpacity
          onPress={handleChangePassword}
          style={{
            width: 300,
            backgroundColor: '#D80032',
            borderRadius: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 10,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.white,
              fontSize: SIZES.Large,
            }}
          >
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewPasswordPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkbox: {
    flexDirection: 'row',
    marginLeft: 3,
    marginTop: 15,
  },
  text: {
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'center',
    top: 10,
  },
  imgView: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  img: {
    width: 50,
    height: 50,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 10,
    resizeMode: 'center',
  },
});
