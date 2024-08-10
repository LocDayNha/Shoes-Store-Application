import { View, Text } from 'react-native';
import React from 'react';
import { UIActivityIndicator } from 'react-native-indicators';
import OrderProcessingStatusEnum from '../ultil/OrderProcessingStatusEnum';
import { Ionicons } from '@expo/vector-icons';
const OrderProcessing = (props) => {
  const { status } = props;
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {status === OrderProcessingStatusEnum.PROCESSING && (
        <>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>ĐƠN HÀNG ĐANG ĐƯỢC XỬ LÝ</Text>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>VUI LÒNG ĐỢI...</Text>
          <UIActivityIndicator
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 120,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            size={30}
          />
        </>
      )}
      {status === OrderProcessingStatusEnum.SUCCESSED && (
        <View style={{ alignItems: 'center', marginBottom: 100 }}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>XIN CHÚC MỪNG</Text>
          <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
            BẠN ĐÃ ĐẶT HÀNG THÀNH CÔNG
          </Text>
          <Ionicons name="checkmark-circle-outline" size={36} color="green" />
        </View>
      )}
      {status === OrderProcessingStatusEnum.FAILED && (
        <View style={{ alignItems: 'center', marginBottom: 100 }}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>ĐẶT HÀNG THẤT BẠI</Text>
          <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
            VUI LÒNG THỬ LẠI SAU
          </Text>
          <Ionicons name="close-circle-outline" size={36} color="red" />
        </View>
      )}
    </View>
  );
};

export default OrderProcessing;
