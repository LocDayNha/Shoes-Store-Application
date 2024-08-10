import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { COLORS } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { AppContext } from '../../components/ultil/AppContext';
import { UIActivityIndicator } from 'react-native-indicators';
import { Dimensions } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { SimpleLineIcons } from '@expo/vector-icons';

const DeliveringOrder = () => {
  const [orders, setOrders] = useState([]);
  const { inforuser } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const paidOrders = orders.filter((order) => order.status === 'COMPLETED');
  const { width, height } = Dimensions.get('window');
  const paddingPercentage = 2;

  //api lấy ds đơn hàng của usser
  const fetchProducts = async () => {
    try {
      const userId = inforuser._id;

      const response = await AxiosIntance().get(`order/user-orders/${userId}`);

      if (response.orders) {
        const reverseOrders = await response?.orders.reverse();
        setOrders(reverseOrders);
      } else {
        console.error('Failed to fetch products:', response.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      fetchProducts();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{}}>
      <View style={styles.orderList}>
        {isLoading ? (
          <View
            style={{
              height: Dimensions.get('window').height * 0.25,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UIActivityIndicator size={30} color={COLORS.primary} />
          </View>
        ) : (
          <View style={{ height: '100%' }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={paidOrders}
              renderItem={({ item }) => <OrderItem item={item} navigation={navigation} />}
              keyExtractor={(item) => item._id}
              ListEmptyComponent={
                <View
                  style={{
                    height: Dimensions.get('window').height * 0.25,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text>Rất tiếc, không có đơn hàng nào.</Text>
                </View>
              }
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const OrderItem = ({ item }) => {
  const { width, height } = Dimensions.get('window');
  const paddingPercentage = 2;
  const statusColor = item.isPaid === true ? 'green' : 'orange';
  const statusPayment = item.isPaid === true ? 'Đã thanh toán' : 'Chưa thanh toán';
  const navigation = useNavigation();

  //truyền dữ liệu từ order(item) qua detail
  const handleOrderPress = () => {
    navigation.navigate('OrderProgressDetail', { order: item });
  };
  return (
    <View style={{ justifyContent: 'center', backgroundColor: COLORS.lightWhite }}>
      <View
        style={{
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={handleOrderPress}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            paddingHorizontal: 2,
            paddingHorizontal: (width * paddingPercentage) / 100,
            borderBottomWidth: 0.2,
            borderBottomColor: 'lightgrey',
            paddingBottom: 20,
            paddingTop: 20,
          }}
        >
          <View style={{}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ height: 70, width: 70 }}
                source={require('../../assets/images/logo.png')}
              />
              <View style={{ gap: 3 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 18 }}>{moment(item?.createdAt).format('HH:mm')}, </Text>
                  <Text style={{ fontSize: 18 }}>
                    {moment(item?.createdAt).format('DD-MM-YYYY')}
                  </Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  {/* <Text style={{ fontSize: 16 }}>{item?.productCount} mặt hàng</Text> */}
                  <View style={{}}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'left' }}>
                      {item?.totalAmount.toLocaleString()}đ
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'left',
                        color: statusColor,
                      }}
                    >
                      {statusPayment}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 3, alignSelf: 'center' }}>
            <Text style={{ fontSize: 16, color: 'grey' }}>Xem chi tiết</Text>
            <SimpleLineIcons name="arrow-right" size={14} color="grey" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeliveringOrder;

const styles = StyleSheet.create({
  orderList: {
    marginTop: 0,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.gray2,
  },
  detailsContainer: {
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  colorSizeText: {
    fontSize: 14,
  },

  unitPrice: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.red,
  },

  cartDetailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cartInShort: {
    fontSize: 18,
    fontWeight: 'normal',
  },
  placeToShip: {
    fontSize: 18,
    fontWeight: 'normal',
  },
});
