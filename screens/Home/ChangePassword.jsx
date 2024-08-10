import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView , TextInput, Pressable, ToastAndroid} from 'react-native';
import React, { useState , useContext, useEffect} from "react";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../../components/ultil/AppContext';
import AxiosIntance from '../../components/ultil/AxiosIntance';
const ChangePassword = () => {
  const navigation = useNavigation();
  const [isSecureEntry1, setIsSecureEntry1] = useState(true);
  const [isSecureEntry2, setIsSecureEntry2] = useState(true);
  const [isSecureEntry3, setIsSecureEntry3] = useState(true);
  const { inforuser } = useContext(AppContext);
  const [email, setEmail] = useState('');

  const [oldPassword, setOldPassword] = useState('')
  const [password, setpassword] = useState('');
  const [confirmPass, setconfirmPass] = useState('')



  const getInfoUser = async () => {
    try {
      const response = await AxiosIntance().get("user/get-by-id?id=" + inforuser._id);
      console.log(response.user);
      if (response.result) {
        setEmail(response.user.email);
      } else {
        console.log("Failed to get info User");
      }
    } catch (error) {
      console.log("=========>", error);
    }
  }
  useEffect(() => {
    getInfoUser()
  }, [])
  const changePassword = async () => {
    try {
      console.log(email);
      console.log(oldPassword);
      console.log(confirmPass);
      const response = await AxiosIntance().put("user/change-password", { email: email, oldPassword: oldPassword, newPassword: confirmPass });
      if (response.result) {
        ToastAndroid.show("Đổi mật khẩu thành công", ToastAndroid.SHORT);
        navigation.navigate('Person');
      }
      else {
        ToastAndroid.show("Đổi mật khẩu thất bại", ToastAndroid.SHORT);
      }
    } catch (error) {

    }
  }
  return (
    <View >
      <View style={{ flexDirection: 'row', top: "10%"}}>
        <View >
          <TouchableOpacity
            style={{marginLeft:10}}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" size={30} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>Đổi mật khẩu</Text>
        </View>
      </View>
      <KeyboardAvoidingView>
      <View
         style={styles.viewItem}
        >
          <Ionicons
            style={{ padding: 5 }}
            name="lock-closed-outline"
            size={24}
            color="grey"
          />
          <TextInput
            style={styles.textHint}
            secureTextEntry={isSecureEntry1}
            placeholder="Mật khẩu cũ"
            onChangeText={setOldPassword} value={oldPassword}
          />
          <Ionicons
            style={{ padding: 5, }}
            name={isSecureEntry1 ? "eye-outline" : "eye-off-outline"}
            size={24}
            color="grey"
            onPress={() => setIsSecureEntry1(!isSecureEntry1)}
          />
        </View>
        <View
         style={styles.viewItem}
        >
          <Ionicons
            style={{ padding: 5 }}
            name="lock-closed-outline"
            size={24}
            color="grey"
          />
          <TextInput
            style={styles.textHint}
            secureTextEntry={isSecureEntry2}
            placeholder="Mật khẩu mới"
            onChangeText={setpassword} value={password}
          />
          <Ionicons
            style={{ padding: 5, }}
            name={isSecureEntry2 ? "eye-outline" : "eye-off-outline"}
            size={24}
            color="grey"
            onPress={() => setIsSecureEntry2(!isSecureEntry2)}
          />
        </View>
        <View
         style={styles.viewItem}
        >
          <Ionicons
            style={{ padding: 5 }}
            name="lock-closed-outline"
            size={24}
            color="grey"
          />
          <TextInput
            style={styles.textHint}
            secureTextEntry={isSecureEntry3}
            placeholder="Mật khẩu mới"
            onChangeText={setconfirmPass} value={confirmPass}
          />
          <Ionicons
            style={{ padding: 5, }}
            name={isSecureEntry3 ? "eye-outline" : "eye-off-outline"}
            size={24}
            color="grey"
            onPress={() => setIsSecureEntry3(!isSecureEntry3)}
          />
        </View>
          <Pressable style={styles.btn} onPress={changePassword}>
            <Text style={styles.btnUpdate}>HOÀN TẤT</Text>
          </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 70,
    marginBottom: 30,
  },
  viewItem: {
    alignItems: "center",
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical: 0,
    marginHorizontal: 10,
    marginTop: 25,
    height: 50,
    backgroundColor: '#F5F7F8',
    borderRadius: 10,
  },
  textHint: {
    lineHeight: 20,
    color: 'black',
    fontSize: 16,
    right:'180%'
  },
  btn: {
    backgroundColor: 'black',
    height: 50,
    borderRadius: 10,
    top:'30%',
    left:'5%',
    width:"90%"
  },
  btnUpdate: {
    color: 'white',
    textAlign: 'center',
    top: '20%',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
