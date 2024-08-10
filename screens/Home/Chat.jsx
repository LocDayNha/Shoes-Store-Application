import { StyleSheet, Text, TouchableOpacity, View ,Linking} from 'react-native'
import React from 'react'
import * as Facebook from 'expo-facebook';
import Communications from 'react-native-communications';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const  logInWithFacebook= async()=> {
    try {
      await Facebook.initializeAsync({
        appId: '1462022904359391',
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Đăng nhập thành công, bạn có thể sử dụng token để tích hợp Messenger vào ứng dụng của mình
        // Ví dụ: gửi tin nhắn
        await Facebook.sendMessengerLink('61554523297880', 'Hello from my app!');
      } else {
        // Đăng nhập không thành công
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
  }
//   const sendMessage = () => {
//     SendIntentAndroid.openAppWithUri('fb-messenger://user/61554523297880', 'Hello from my app!')
//       .then(isOpened => {
//         if (!isOpened) {
//           // Xử lý khi không thể mở Messenger
//         }
//       })
//       .catch(error => {
//         // Xử lý lỗi
//       });
//   };

const Chat = () => {
    const sendMessage = () => {
        Linking.canOpenURL('fb-messenger://').then(supported => {
          if (!supported) {
            console.log("Can't handle url: fb-messenger://");
          } else {
            Linking.openURL('fb-messenger://user-thread/61554523297880');
          }
        }).catch(err => console.error('An error occurred', err));
      };
      // const openZalo = () => {
      //   Linking.canOpenURL('zalo://').then(supported => {
      //     if (!supported) {
      //       console.log("Can't handle url: zalo://");
      //     } else {
      //       Linking.openURL('zalo://');
      //     }
      //   }).catch(err => console.error('An error occurred', err));
      // };
    
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={sendMessage}>
        <Text>Chat mess</Text>
      </TouchableOpacity> */}
      
      {/* <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 16 }}>
      <Button
        icon={
          <Icon
            name="facebook-messenger"
            size={30}
            color="white"
          />
        }
        // title="Messenger"
        type="solid"
        buttonStyle={{ borderRadius: 50, width: 50, height: 50, marginBottom: 50 }}
      />
    </View> */}
    <TouchableOpacity style={styles.floadingButton}>
    <Icon
            name="facebook-messenger"
            size={50}
            color="blue"
          />
    </TouchableOpacity>
    </View>

  )
}

export default Chat

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:50
    },
    floadingButton:{
      position:'absolute',
      width:60,
      bottom:30,
      height:60,
      alignItems:'center',
      justifyContent:'center',
      right:  20,
      borderRadius:60
    }
})