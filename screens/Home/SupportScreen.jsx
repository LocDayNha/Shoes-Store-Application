import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
const SupportScreen = () => {
  const navigation = useNavigation();
  const sendMessage = () => {
    Linking.canOpenURL('fb-messenger://')
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: fb-messenger://");
        } else {
          Linking.openURL('fb-messenger://user-thread/61554434832138');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };
  return (
    <SafeAreaView style={styles.contrainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" size={30} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>Liên hệ & Hỗ trợ</Text>
        </View>
      </View>
      <ScrollView>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            margin: 10,
            backgroundColor: '#F8F8FF',
            borderRadius: 10,
            height: 60,
            alignItems: 'center',
          }}
          onPress={sendMessage}
        >
          <Icon name="facebook-messenger" size={40} color="blue" />
          <Text style={styles.text}>Liên hệ qua Messenger</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            margin: 10,
            backgroundColor: '#F8F8FF',
            borderRadius: 10,
            height: 60,
            alignItems: 'center',
          }}
          onPress={() => Linking.openURL('sms:0869072730')}
        >
          <Ionicons name="chatbox" size={30} />
          <Text style={styles.text}>Liên hệ qua SMS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            margin: 10,
            backgroundColor: '#F8F8FF',
            borderRadius: 10,
            height: 60,
            alignItems: 'center',
          }}
          onPress={() => Linking.openURL('tel:0869072730')}
        >
          <Ionicons name="phone-portrait-sharp" size={30} />
          <Text style={styles.text}>Liên hệ qua Điện thoại</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            margin: 10,
            backgroundColor: '#F8F8FF',
            borderRadius: 10,
            height: 60,
            alignItems: 'center',
          }}
          onPress={() => Linking.openURL('mailto:thefivemensshoesshop@gmail.com')}
        >
          <Ionicons name="mail-unread-outline" size={30} color="red" />
          <Text style={styles.text}>Liên hệ qua Gmail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            margin: 10,
            backgroundColor: '#F8F8FF',
            borderRadius: 10,
            height: 60,
            alignItems: 'center',
          }}
          onPress={() => Linking.openURL('https://www.facebook.com/profile.php?id=61554434832138')}
        >
          <Ionicons name="logo-facebook" size={30} color="blue" />
          <Text style={styles.text}>Xem trang Facebook</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  contrainer: {
    flex: 1,
    flexDirection: 'column',
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 12,
  },
});
