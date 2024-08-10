import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { AppContext } from '../../components/ultil/AppContext';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { UIActivityIndicator } from 'react-native-indicators';
import { Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CartDetail = (props) => {
  const [data, setdata] = useState([]);
  const { inforuser } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const [isVnpayChecked, setVnpayChecked] = useState(true);
  const [isCodChecked, setCodChecked] = useState(false);
  const navigation = useNavigation();
  const [addressText, setAddressText] = useState(inforuser.address);
  const [phoneNbText, setPhoneNbText] = useState(inforuser.phoneNumber);

  useEffect(() => {
    getDetailByIdUser();
    return () => {};
  }, []);
  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      for (const item of data) {
        //tính giá trị của mỗi sản phẩm và cộng vào tổng giá trị
        total += item?.idProduct?.price * item?.quantity;
      }
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [data]);

  const getDetailByIdUser = async () => {
    try {
      const response = await AxiosIntance().get('/cart/get-by-idUser?idUser=' + inforuser._id);
      if (response?.result === true) {
        setdata(response?.cart);
        console.log(response?.cart[0]);
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

  const handleSubmit = async () => {
    if (isVnpayChecked) {
      navigation.navigate('VnPayWebView', {
        address: addressText,
        phoneNumber: phoneNbText,
        inforuser: inforuser,
        cartData: data,
        totalAmount: totalPrice,
      });
    }

    if (isCodChecked) {
      navigation.navigate('CodPayment', {
        address: addressText,
        phoneNumber: phoneNbText,
        inforuser: inforuser,
        cartData: data,
        totalAmount: totalPrice,
      });
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.cartDetailContainer}>
          <View style={{ height: '53%' }}>
            <View>
              <Text style={styles.cartDetailTitle}>CHI TIẾT ĐƠN HÀNG</Text>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <Text style={styles.placeToShip}>Giao đến cho {inforuser.name}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 26,
                  alignItems: 'center',
                  borderBottomWidth: 0.5,
                  borderBottomColor: COLORS.gray2,
                }}
              >
                <Entypo style={{ marginRight: 5 }} name="location-pin" size={28} color="green" />
                <View style={{ flexDirection: 'column', alignSelf: 'flex-start', flex: 1 }}>
                  <Text style={{ color: 'grey' }}>Địa chỉ của bạn</Text>
                  <TextInput
                    style={{ fontSize: 18 }}
                    defaultValue={inforuser.address}
                    placeholder="Địa chỉ"
                    onChangeText={(text) => setAddressText(text)}
                  />
                </View>
                <SimpleLineIcons
                  style={{
                    justifyContent: 'flex-end',
                    alignContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}
                  name="arrow-right"
                  size={14}
                  color="grey"
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 26,
                  //   justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottomWidth: 0.5,
                  borderBottomColor: COLORS.gray2,
                }}
              >
                <Entypo style={{ marginRight: 5 }} name="phone" size={28} color="green" />
                <View style={{ flexDirection: 'column', alignSelf: 'flex-start', flex: 1 }}>
                  <Text style={{ color: 'grey' }}>Số điện thoại</Text>
                  <TextInput
                    style={{ fontSize: 18 }}
                    defaultValue={inforuser.phoneNumber.toString()}
                    placeholder="Số điện thoại"
                    onChangeText={(text) => setPhoneNbText(text)}
                  />
                </View>
              </View>
            </ScrollView>
            <View>
              <Text style={styles.placeToShip}>Hình thức giao hàng</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 26,
                  alignItems: 'center',
                  borderBottomWidth: 0.5,
                  borderBottomColor: COLORS.gray2,
                }}
              >
                <MaterialCommunityIcons
                  style={{ marginRight: 5 }}
                  name="truck-cargo-container"
                  size={28}
                  color="green"
                />
                <Text style={{ fontSize: 16 }}>Vận chuyển nhanh</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'colunm',
                marginBottom: 26,
                borderBottomWidth: 0.5,
                borderBottomColor: COLORS.gray2,
              }}
            >
              <Text style={styles.placeToShip}>Phương thức thanh toán</Text>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <BouncyCheckbox
                    isChecked={isVnpayChecked}
                    fillColor="green"
                    disableBuiltInState
                    onPress={() => {
                      setVnpayChecked((pre) => {
                        if (!pre) {
                          setCodChecked(false);
                        }
                        return !pre;
                      });
                    }}
                  />
                  <Text>VNPAY</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <BouncyCheckbox
                    isChecked={isCodChecked}
                    fillColor="green"
                    disableBuiltInState
                    onPress={() => {
                      setCodChecked((pre) => {
                        if (!pre) {
                          setVnpayChecked(false);
                        }
                        return !pre;
                      });
                    }}
                  />
                  <Text>COD</Text>
                </View>
              </View>
            </View>
          </View>
          {isLoading ? (
            <View
              style={{
                height: '30%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <UIActivityIndicator size={30} color={COLORS.primary} />
            </View>
          ) : (
            <View style={{ height: '40%' }}>
              <View>
                <Text style={styles.cartInShort}>Tóm tắt đơn hàng</Text>
              </View>
              <FlatList
                // showsVerticalScrollIndicator={false}
                style={{ height: '100%' }}
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => <CartItem item={item} />}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={
                  <View
                    style={{
                      height: Dimensions.get('window').height * 0.25,
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
        <View
          style={{
            width: '100%',
            padding: 10,

            position: 'absolute',
            bottom: 0,
          }}
        >
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 18, color: COLORS.red, textAlign: 'right' }}>
              Tổng thanh toán: ₫{totalPrice.toLocaleString()}
            </Text>
            <TouchableOpacity style={styles.buttonBuy} onPress={() => handleSubmit()}>
              <Text style={styles.textBuy}>Đặt hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const CartItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            alignSelf: 'center',
            alignContent: 'center',
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: 'green',
              borderRadius: 30,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}
          >
            <Text style={styles.quantity}>{item?.quantity}x</Text>
          </View>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text style={styles.title}>{item.idProduct?.title}</Text>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}
              >
                <Text style={styles.colorSizeText}>
                  {item?.color.charAt(0).toUpperCase() + item?.color.slice(1)}
                </Text>
                <Text style={styles.colorSizeText}> - Kích cỡ: {item.size}</Text>
              </View>
              <View style={styles.priceQuantityContainer}>
                <Text style={styles.price}>
                  ₫{(item?.idProduct?.price * item?.quantity).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    // padding: 10,
    // elevation: 5,
    borderBottomWidth: 0.2,
    marginBottom: 5,
    borderBottomColor: COLORS.gray2,
    marginTop: 5,
  },
  detailsContainer: {
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  colorSizeText: {
    fontSize: 14,
    marginBottom: 5,
  },
  priceQuantityContainer: {
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignSelf: 'flex-end',
  },
  unitPrice: {
    fontSize: 16,
    // marginRight: 15,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.red,
  },
  quantity: {
    fontSize: 16,
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  cartDetailContainer: {
    flexDirection: 'column',
    padding: 16,
  },
  cartDetailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  cartInShort: {
    fontSize: 18,
    fontWeight: 'normal',
  },
  placeToShip: {
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 5,
  },
  buttonBuy: {
    height: 48,
    backgroundColor: 'green',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'flex-end',
    marginTop: 10,
  },
  textBuy: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
  },
});

export default CartDetail;
