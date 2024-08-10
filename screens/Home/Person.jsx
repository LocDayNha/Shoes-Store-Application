import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/index';
import { AppContext } from '../../components/ultil/AppContext';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const Person = () => {
  const navigation = useNavigation();
  const { inforuser, setisLogin } = useContext(AppContext);

  const logOut = () => {
    setisLogin(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Cài đặt</Text>
          </View>
          <View style={styles.viewAvatar}>
            <Image style={styles.avatar} source={require('../../assets/images/logo.png')} />
          </View>
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>
            {inforuser?.name}
          </Text>
          <Text style={{ textAlign: 'center' }}>{inforuser?.email}</Text>
        </View>
        <View style={{}}>
          <View style={{ padding: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Dành cho bạn</Text>
          </View>

          <TouchableOpacity
            style={{ paddingHorizontal: 5 }}
            onPress={() => {
              navigation.navigate('OrderProgress');
            }}
          >
            <View style={styles.item}>
              <View
                style={{
                  justifyContent: 'center',
                  paddingLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Ionicons name="reader-outline" size={25} color="orange" />
                <View style={{}}>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>Lịch sử mua hàng</Text>
                </View>
              </View>

              <View style={{ justifyContent: 'center' }}>
                <Ionicons name="chevron-forward-outline" size={25} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ paddingHorizontal: 5 }}
            onPress={() => {
              navigation.navigate('Favorite');
            }}
          >
            <View style={styles.item}>
              <View
                style={{
                  justifyContent: 'center',
                  paddingLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Ionicons name="heart" size={25} color="red" />
                <View style={{}}>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>Sản phẩm yêu thích</Text>
                </View>
              </View>

              <View style={{ justifyContent: 'center' }}>
                <Ionicons name="chevron-forward-outline" size={25} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingHorizontal: 5 }}
            onPress={() => {
              navigation.navigate('statistical');
            }}
          >
            <View style={styles.item}>
              <View
                style={{
                  justifyContent: 'center',
                  paddingLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Ionicons name="stats-chart" size={25} color="green" />
                <View style={{}}>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>Thống kê</Text>
                </View>
              </View>

              <View style={{ justifyContent: 'center' }}>
                <Ionicons name="chevron-forward-outline" size={25} />
              </View>
            </View>
          </TouchableOpacity>

          <View style={{ paddingBottom: 10, paddingLeft: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cài đặt chung</Text>
          </View>

          <TouchableOpacity
            style={{ paddingHorizontal: 5 }}
            onPress={() => {
              navigation.navigate('Profile');
            }}
          >
            <View style={styles.item}>
              <View
                style={{
                  justifyContent: 'center',
                  paddingLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Ionicons name="person-outline" size={25} color="green" />
                <View style={{}}>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>Cập nhật thông tin</Text>
                </View>
              </View>

              <View style={{ justifyContent: 'center' }}>
                <Ionicons name="chevron-forward-outline" size={25} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingHorizontal: 5 }}
            onPress={() => {
              navigation.navigate('Forgot Password');
            }}
          >
            <View style={styles.item}>
              <View
                style={{
                  justifyContent: 'center',
                  paddingLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Ionicons name="key-outline" size={25} color="blue" />
                <View style={{}}>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>Đổi mật khẩu</Text>
                </View>
              </View>

              <View style={{ justifyContent: 'center' }}>
                <Ionicons name="chevron-forward-outline" size={25} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={logOut}>
            <View style={styles.item}>
              <View
                style={{
                  justifyContent: 'center',
                  paddingLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Ionicons name="log-out-outline" size={25} color="red" />
                <View style={{}}>
                  <Text style={{ fontSize: 16, fontWeight: 500, color: 'red' }}>Đăng xuất</Text>
                </View>
              </View>

              <View style={{ justifyContent: 'center' }}>
                <Ionicons name="chevron-forward-outline" size={25} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ paddingHorizontal: 5 }}
          onPress={() => {
            navigation.navigate('SupportScreen');
          }}
        >
          <View style={styles.item}>
            <View
              style={{
                justifyContent: 'center',
                paddingLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Ionicons name="information-circle-outline" size={25} color="black" />
              <View style={{}}>
                <Text style={{ fontSize: 16, fontWeight: 500 }}>Thông tin cửa hàng</Text>
              </View>
            </View>

            <View style={{ justifyContent: 'center' }}>
              <Ionicons name="chevron-forward-outline" size={25} />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Person;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginStart: 10,
    marginEnd: 10,
    // marginBottom: 20,
  },
  header: {
    height: '32%',
    backgroundColor: COLORS.lightWhite,
    borderRadius: 30,
    marginBottom: 30,
  },
  viewAvatar: {
    alignItems: 'center',
    borderRadius: 30,
    height: '65%',
    // backgroundColor: 'white',
  },
  avatar: {
    width: '50%',
    height: '100%',
    borderRadius: 60,
    aspectRatio: 1,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 70,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  item: {
    backgroundColor: '#F5F7F8',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
