import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import React, { useCallback, useRef, useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/index';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import ImageSliderPlus from '../../components/home/ImagesSliderPlus';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { SimpleLineIcons } from '@expo/vector-icons';

const SearchProduct = () => {
  const { colors } = useTheme();
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const navigation = useNavigation();

  const handleSearchPress = () => {
    // Gọi điều hướng đến màn hình SearchDetail, truyền query tìm kiếm
    navigation.navigate('SearchDetail');
  };

  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = async () => {
    const response = await AxiosIntance().get('/brand/get-all-brands');

    if (response.result) {
      setBrands(response.brands);
    } else {
      console.log('Lấy data thất bại');
    }
  };

  const getProducts = async () => {
    const response = await AxiosIntance().get('/product/get-all');
    if (response.result) {
      setProducts(response.products);
      // setIsProductLoading(false);
    } else {
      ToastAndroid.show('Lấy data thất bại');
    }
  };

  //xử lý chọn thương hiệu
  const handleBrandSelect = async (brandName) => {
    setSelectedBrand(brandName);
    try {
      let url = `/product/get-by-brand?brandName=${brandName}`;

      const response = await AxiosIntance().get(url);

      if (response.products) {
        navigation.navigate('ProductListScreen', { brandName: brandName });
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm theo thương hiệu:', error);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView style={{ margin: 15, flex: 1, marginBottom: 30 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={styles.cartDetailTitle}>TÌM KIẾM</Text>
          <TouchableOpacity onPress={handleSearchPress}>
            <MaterialIcons style={{ marginRight: 5 }} name="search" size={34} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={{ justifyContent: 'center' }}>
        <View
          style={{
            paddingHorizontal: 15,
            borderBottomWidth: 1,
            borderColor: 'lightgrey',
            paddingVertical: 12,
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Khám phá thương hiệu nổi tiếng
          </Text>
        </View>

        {brands.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleBrandSelect(item.name)}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: COLORS.gray2,
              width: '100%',
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18, textAlign: 'left' }}>{item.name.toUpperCase()}</Text>
              <SimpleLineIcons name="arrow-right" size={14} color="grey" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <ImageSliderPlus />
    </ScrollView>
  );
};

export default SearchProduct;

const styles = StyleSheet.create({
  cartDetailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginBottom: 26,
  },
  placeToShip: {
    fontSize: 18,
    fontWeight: 'normal',
  },
});
