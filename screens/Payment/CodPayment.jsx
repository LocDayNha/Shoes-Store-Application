import { View, Text, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import OrderProcessingStatusEnum from '../../components/ultil/OrderProcessingStatusEnum';
import OrderProcessing from '../../components/order/OrderProcessing';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { useNavigation } from '@react-navigation/native';
const CodPayment = (props) => {
  const { address, phoneNumber, inforuser, cartData, totalAmount } = props.route.params;
  const [orderProcessingStatus, setOrderProcessingStatus] = useState(
    OrderProcessingStatusEnum.PROCESSING
  );
  const navigation = useNavigation();
  const handleSubmitOrder = async () => {
    try {
      let products = await cartData.map((cart) => {
        return {
          productId: cart?.idProduct._id,
          unitPrice: cart?.idProduct?.price,
          quantity: cart?.quantity,
          color: cart?.color,
          size: cart?.size,
        };
      });
      let data = {
        userId: inforuser?._id,
        totalAmount: totalAmount,
        address: address,
        phoneNumber: phoneNumber,
        products: products,
        isPaid: false,
        paymentTransactionRef: '',
      };
      await AxiosIntance().post('order', data);
      setOrderProcessingStatus(OrderProcessingStatusEnum.SUCCESSED);

    } catch (error) {
      setOrderProcessingStatus(OrderProcessingStatusEnum.FAILED);
    }
    finally{
      setTimeout(() => {
        navigation.navigate('Trang chủ')
      }, 3000);
    }
  };

  useEffect(() => {
    handleSubmitOrder();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OrderProcessing status={orderProcessingStatus} />
    </SafeAreaView>
  );
};

export default CodPayment;
