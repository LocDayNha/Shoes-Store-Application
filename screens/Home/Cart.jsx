import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
  Button,
} from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemCart from '../../components/item/ItemCart';
import { useEffect } from 'react';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { ToastAndroid } from 'react-native';
import { useContext } from 'react';
import { AppContext } from '../../components/ultil/AppContext';
import { useIsFocused, useTheme, useNavigation } from '@react-navigation/native';
import { UIActivityIndicator } from 'react-native-indicators';
import { Dimensions } from 'react-native';
import { COLORS } from '../../constants';
import FixedBottom from './FixedBottom';

const Cart = (props) => {
  const { navigation } = props;
  const [data, setdata] = useState([]);
  const { inforuser } = useContext(AppContext);
  const { cartItemCount, setCartItemCount } = useContext(AppContext); // Truy cập cartItemCount
  const { cartCount, setCartCount } = useContext(AppContext); // Truy cập cartItemCount
  const [totalPrice, setTotalPrice] = useState(0);
  const [hasItems, setHasItems] = useState(false);

  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const { colors } = useTheme();

  const calculateCartItemCount = () => {
    let itemCount = 0;
    data.forEach((item) => {
      itemCount += 1;
    });
    return itemCount;
  };

  const calculateItemCount = () => {
    let itemCartCount = 0;
    data.forEach((item) => {
      itemCartCount += 1;
    });
    return itemCartCount;
  };

  const itemCount = calculateCartItemCount();
  const itemCartCount = calculateItemCount();

  useEffect(() => {
    setCartItemCount(itemCount);
    if (isFocused) {
      calculateCartItemCount();
      getDetailByIdUser();
    }
    return () => {
      setCartCount(itemCartCount);
      setdata([]);
      setTotalPrice(0);
      setIsLoading(true);
    };
  }, [isFocused]);

  useEffect(() => {
    // setHasItems khi data thay đổi
    setHasItems(data.length > 0);
  }, [data]);

  const getDetailByIdUser = async () => {
    try {
      const response = await AxiosIntance().get('/cart/get-by-idUser?idUser=' + inforuser._id);
      if (response?.result === true) {
        setdata(response?.cart);
        // console.log(response?.cart[0]);
      } else {
        ToastAndroid.show('Lấy dữ liệu thất bại', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      ToastAndroid.show('Lỗi kết nối', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItemFromCart = async (productId) => {
    try {
      const response = await AxiosIntance().delete(`/cart/remove-from-cart/${productId}`);
      console.log(response);
      if (response?.result === true) {
        //xóa sản phẩm thành công
        getDetailByIdUser();
        ToastAndroid.show('Sản phẩm đã được xóa khỏi giỏ hàng', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Xóa sản phẩm thất bại', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
      ToastAndroid.show('Lỗi kết nối', ToastAndroid.SHORT);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.viewContent}>
          <View style={styles.rightContent}>
            <Text style={styles.text}>GIỎ HÀNG</Text>
          </View>
        </View>

        {isLoading ? (
          <View
            style={{
              height: '88%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UIActivityIndicator size={30} color={colors.text} />
          </View>
        ) : (
          <View style={{ height: '88%' }}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <ItemCart
                  dulieu={item}
                  navigation={navigation}
                  removeItemFromCart={removeItemFromCart}
                />
              )}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View
                  style={{
                    height: Dimensions.get('window').height * 0.75,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text>Rất tiếc, không có sản phẩm nào.</Text>
                </View>
              }
            />
          </View>
        )}
      </View>
      <View>
        {hasItems ? (
          <FixedBottom>
            <TouchableOpacity
              disabled={isLoading || !hasItems} // Disable nút khi isLoading hoặc không có sản phẩm
              style={[styles.buttonBuy, !hasItems && { opacity: 0.5 }]}
              onPress={() => {
                navigation.navigate('CartDetail', { data });
              }}
            >
              <Text style={styles.textBuy}>Tiếp tục</Text>
            </TouchableOpacity>
          </FixedBottom>
        ) : (
          <FixedBottom>
            <TouchableOpacity
              style={[styles.buttonBuy, !hasItems && { opacity: 0.5 }]}
              onPress={() => {
                navigation.navigate('Trang chủ');
              }}
            >
              <Text style={styles.textBuy}>Hãy mua hàng để thanh toán!</Text>
            </TouchableOpacity>
          </FixedBottom>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  viewContent: {
    flexDirection: 'row',
    margin: 15,
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    borderColor: COLORS.gray2,
  },
  textAndCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContent: {
    flexDirection: 'row',
    // marginBottom: 12,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    // marginRight: 100,
  },
  checkboxText: {
    fontSize: 18,
    marginRight: 5,
  },
  viewIcSearch: {
    marginLeft: 90,
  },
  viewBuy: {
    // flexDirection: 'row',
    // paddingTop: 20,
  },
  buttonBuy: {
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
    paddingHorizontal: 20,
  },
  textBuy: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartItemCountBadge: {
    backgroundColor: 'red',
    borderRadius: 15,
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemCountText: {
    color: 'white',
    fontSize: 13,
  },
});
