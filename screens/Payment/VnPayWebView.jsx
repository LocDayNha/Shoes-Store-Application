import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import queryString from 'query-string';
import Spinner from 'react-native-loading-spinner-overlay';
import { Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { UIActivityIndicator } from 'react-native-indicators';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import OrderProcessing from '../../components/order/OrderProcessing';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import OrderProcessingStatusEnum from '../../components/ultil/OrderProcessingStatusEnum';
export default function VnPayWebView(props) {
  const [paymentUrl, setPaymentUrl] = useState('');
  const { address, phoneNumber, inforuser, cartData, totalAmount } = props.route.params;
  const [orderProcessingStatus, setOrderProcessingStatus] = useState(
    OrderProcessingStatusEnum.PROCESSING
  );
  const navigation = useNavigation();
  const INJECTED_JAVASCRIPT = `(function() {
    let selector = document.querySelector("pre");
    let url = selector.innerHTML;
    selector.remove();
    window.ReactNativeWebView.postMessage(url);
  })();`;

  const [isOrderProcessingLoading, setIsOrderProcessingLoading] = useState(true);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  // useEffect(() => {
  //   navigation.addListener('beforeRemove', (e) => {
  //     if (!isLoading) {
  //       navigation.dispatch(e.data.action);
  //       return;
  //     }
  //     e.preventDefault();
  //   });
  // }, [navigation, isLoading]);

  useEffect(() => {
    const getVnPayPaymentUrl = async () => {
      try {
        const result = await AxiosIntance().get(
          `payment/vnpay/create_payment_url?amount=${totalAmount}`
        );
        setPaymentUrl(result.url);
        setIsOrderProcessingLoading(false);
      } catch (error) {
        setOrderProcessingStatus(OrderProcessingStatusEnum.FAILED);
        setTimeout(() => {
          navigation.navigate('CartDetail');
        }, 3000);
      }
    };
    getVnPayPaymentUrl();
    return () => {};
  }, []);

  const handleSubmitOrder = async (paymentResponse) => {
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
        isPaid: true,
        paymentDetail: paymentResponse,
      };
      await AxiosIntance().post('order', data);
      setOrderProcessingStatus(OrderProcessingStatusEnum.SUCCESSED);
    } catch (error) {
      setOrderProcessingStatus(OrderProcessingStatusEnum.FAILED);
    } finally {
      setTimeout(() => {
        navigation.navigate('Trang chủ');
      }, 3000);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, paddingVertical: 24 }}>
      {paymentUrl && isOrderProcessingLoading == false && (
        <View style={{ flex: isOrderProcessingLoading ? 0 : 1 }}>
          <WebView
            source={{ uri: paymentUrl }}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            onLoadStart={(event) => {
              if (event.nativeEvent.url.includes('payment/vnpay/result')) {
                setIsOrderProcessingLoading(true);
              }
            }}
            onMessage={(event) => {
              let responseUrl = event.nativeEvent.url;
              if (responseUrl.includes('payment/vnpay/result')) {
                let responseData = JSON.parse(event.nativeEvent.data);
                if (responseData.responseCode !== '00') {
                  setOrderProcessingStatus(OrderProcessingStatusEnum.FAILED);
                  setTimeout(() => {
                    setPaymentUrl('');
                    navigation.navigate('CartDetail');
                  }, 3000);
                  return;
                }
                setOrderProcessingStatus(OrderProcessingStatusEnum.PROCESSING);
                handleSubmitOrder(responseData);
              }
            }}
          />
        </View>
      )}

      {isOrderProcessingLoading && <OrderProcessing status={orderProcessingStatus} />}
    </SafeAreaView>
  );
}
