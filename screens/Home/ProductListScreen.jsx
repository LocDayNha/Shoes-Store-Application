import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  FlatList,
} from 'react-native';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import MasonryList from 'reanimated-masonry-list';
import { COLORS } from '../../constants';
import { UIActivityIndicator } from 'react-native-indicators';
import { StatusBar } from 'expo-status-bar';
import Icons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductListScreen = ({ route }) => {
  const { brandName } = route.params;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const paddingPercentage = 2;
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [totalSearchResults, setTotalSearchResults] = useState('');

  useEffect(() => {
    if (searchText.trim() !== '') {
      handleSearch(searchText);
    } else {
      setNoResults(true);
      setSearchResults([]);
    }

    fetchProductsByBrand();
  }, [brandName, searchText]);

  const handleBlur = () => {
    setNoResults(false);
  };

  const handleFocus = () => {
    setSearchText('');
  };

  const handleSearch = async () => {
    try {
      // Gọi hàm tìm kiếm sản phẩm theo brand
      const response = await AxiosIntance().get(
        `/product/search-by-brand?brandName=${brandName}&productName=${searchText}`
      );
      if (response?.products) {
        setSearchResults(response?.products);
        setNoResults(response.products.length === 0);

        const totalResults = response.totalResults || response.products.length;
        setTotalSearchResults(totalResults.toString() + ' kết quả');
      } else {
        setNoResults(true);
        ToastAndroid.show('Lấy dữ liệu thất bại', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setNoResults(true);
      ToastAndroid.show('Lỗi kết nối', ToastAndroid.SHORT);
    }
  };

  //lay sản phẩm theo brand
  const fetchProductsByBrand = async () => {
    try {
      let response;
      if (searchText.trim() !== '') {
        response = await AxiosIntance().get(
          `/product/search-by-brand?brandName=${brandName}&productName=${searchText}`
        );
        if (response?.products) {
          setSearchResults(response?.products);
          setNoResults(response.products.length === 0);

          const totalResults = response.totalResults || response.products.length;
          setTotalSearchResults(totalResults.toString() + ' kết quả');
        } else {
          setNoResults(true);
          ToastAndroid.show('Lấy dữ liệu thất bại', ToastAndroid.SHORT);
        }
      } else {
        response = await AxiosIntance().get(`/product/get-by-brand?brandName=${brandName}`);

        if (response.products) {
          setProducts(response.products);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
      setNoResults(true);
      ToastAndroid.show('Lỗi kết nối', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  //clear thanh tìm kiếm
  const handleClearSearch = () => {
    setSearchText('');
    setNoResults(false);
    setSearchResults([]);
    setTotalSearchResults('');
  };

  const handleSearchSubmit = () => {
    if (searchText.trim() !== '') {
      navigation.navigate('SearchResultScreen', { searchText, brandName });
    } else {
      //validate tìm kiếm rỗng
      alert('Vui lòng nhập từ khóa để tìm kiếm.');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{ paddingVertical: 14, gap: 24 }}>
        <StatusBar style="auto" />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                width: 36,
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: COLORS.black,
              }}
            >
              <Icons name="arrow-back" size={24} color={COLORS.black} />
            </TouchableOpacity>
            <View
              style={{
                borderWidth: 1,
                flexDirection: 'row',
                flex: 1,
                padding: 5,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'grey',
              }}
            >
              <TextInput
                style={{ fontSize: 16, flex: 1, marginLeft: 5 }}
                placeholder={'Tìm sản phẩm...'}
                onChangeText={(text) => setSearchText(text)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                value={searchText}
                onSubmitEditing={handleSearchSubmit}
              />
              <Text style={{ fontSize: 14, color: 'orange', marginRight: 5 }}>
                {totalSearchResults}
              </Text>
              {searchText !== '' && (
                <TouchableOpacity
                  style={{ backgroundColor: 'grey', borderRadius: 15 }}
                  onPress={handleClearSearch}
                >
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {isLoading ? (
          <View
            style={{
              // height: Dimensions.get('window').height * 0.75,
              height: '50%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UIActivityIndicator size={30} color={COLORS.black} />
          </View>
        ) : (
          <MasonryList
            data={products}
            numColumns={2}
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: (width * paddingPercentage) / 100,
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <View style={{ padding: 2, alignContent: 'center' }}>
                <View
                  style={{
                    aspectRatio: i === 0 ? 3.5 / 4 : 3.5 / 4,
                    position: 'relative',
                    overflow: 'hidden',
                    elevation: 0,
                  }}
                >
                  <Pressable
                    style={{
                      width: '100%',
                      height: '100%',
                      borderWidth: 0.7,
                      borderColor: COLORS.gray2,
                      paddingBottom: 45,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      navigation.navigate('ProductDetail', {
                        id: item?._id,
                      });
                    }}
                  >
                    <Image
                      style={{ flex: 1 }}
                      source={{
                        uri: item?.variances[0].images[0].url,
                      }}
                      resizeMode="contain"
                    />

                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        flexDirection: 'column',
                        color: 'white',
                        fontSize: 16,
                        textAlign: 'center',
                        justifyContent: 'center',
                        paddingLeft: 10,
                        gap: 3,
                        paddingBottom: 10,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: 'white',
                          width: 140,
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={{ textAlign: 'left', color: 'black', fontSize: 16 }}>
                          {item?.title}
                        </Text>
                      </View>
                      <Text
                        style={{
                          textAlign: 'left',
                          color: 'white',
                          backgroundColor: 'black',
                          fontSize: 16,
                          letterSpacing: 0.5,
                          width: 90,
                        }}
                      >
                        đ {item?.price.toLocaleString()}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            )}
            onEndReachedThreshold={0.1}
            keyExtractor={(item) => item?._id}
            ListEmptyComponent={
              <View
                style={{
                  height: Dimensions.get('window').height * 0.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text>Rất tiếc, không có sản phẩm nào.</Text>
              </View>
            }
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default ProductListScreen;
