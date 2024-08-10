import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllOrderProgress from './AllOrderProgress';
import { SafeAreaView } from 'react-native-safe-area-context';
import PaidOrder from './PaidOrder';
import UnPaidOrder from './UnPaidOrder';
import { Text, TouchableOpacity, View, Linking, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';
import Icons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import CompleteOrder from './CompleteOrder';
import CanceledOrder from './CanceledOrder';
import DeliveringOrder from './DeliveringOrder';

const Tab = createMaterialTopTabNavigator();

const OrderProgress = () => {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            alignItems: 'center',
            // marginBottom: 10,
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 32,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              borderWidth: 2,
              borderColor: COLORS.black,
            }}
          >
            <Icons name="arrow-back" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: 'bold', borderBottomWidth: 0.5 }}>
            ĐƠN HÀNG CỦA BẠN
          </Text>
        </View>
      </SafeAreaView>
      <Tab.Navigator>
        {/* <Tab.Screen name="Tất cả" component={AllOrderProgress} /> */}
        <Tab.Screen name="Đã đặt hàng" component={PaidOrder} />
        <Tab.Screen name="Đang giao hàng" component={DeliveringOrder} />
        <Tab.Screen name="Đã giao hàng" component={CompleteOrder} />
        <Tab.Screen name="Đã hủy" component={CanceledOrder} />
      </Tab.Navigator>
    </>
  );
};

export default OrderProgress;
