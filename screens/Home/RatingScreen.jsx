import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme, useNavigation, useIsFocused } from '@react-navigation/native';
import Icons from '@expo/vector-icons/MaterialIcons';
import { UIActivityIndicator } from 'react-native-indicators';
import { COLORS } from '../../constants';
import { ScrollView } from 'react-native';
import ItemRating from '../../components/item/ItemRating';
import AxiosIntance from '../../components/ultil/AxiosIntance';
const RatingScreen = (props) => {
  const { navigation } = props;
  const { route } = props;
  const { params } = route;
  const isFocused = useIsFocused();

  var dataStart = [
    { _id: '0', text: 'ALL' },
    { _id: '1', text: 1 },
    { _id: '2', text: 2 },
    { _id: '3', text: 3 },
    { _id: '4', text: 4 },
    { _id: '5', text: 5 },
  ];
  const paddingPercentage = 2;
  const { width, height } = Dimensions.get('window');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const { colors } = useTheme();
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [data, setdata] = useState([]);

  const handleBrandSelect = async (brandName) => {
    setSelectedBrand(brandName === selectedBrand ? 'ALL' : brandName);
    // setSelectedBrand(brandName);
    setIsProductLoading(true);
    try {
      const response = await AxiosIntance().get(
        '/ratingProduct/get-by-star?idProduct=' + params.id + '&star=' + brandName
      );
      setdata(response.rating);
      setIsProductLoading(false);

      // console.log(response.totalAmountByMonth, 'aaa');
      // const totalAmountArray = statisticaMonth.map(item => item.totalAmount);
      // console.log(totalAmountArray[0]);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const getALL = async () => {
    setIsProductLoading(true);
    try {
      const response = await AxiosIntance().get('/ratingProduct/get-by-id?productId=' + params.id);
      if (response.result) {
        setdata(response?.rating);
        setIsProductLoading(false);
      } else {
        console.log('Lấy danh sách thất bại');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getALL();
    console.log(data);
  }, []);
  return (
    <View>
      <SafeAreaView style={{ paddingVertical: 14, gap: 24 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar style="auto" />

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingHorizontal: 10,
              alignItems: 'center',
              marginTop: 50,
              gap: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('OrderProgress')}
              style={{
                width: 32,
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 52,
                borderWidth: 2,
                borderColor: COLORS.black,
              }}
            >
              <Icons name="arrow-back" size={24} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: 'bold', borderBottomWidth: 1 }}>
              ĐÁNH GIÁ SẢN PHẨM
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <FlatList
              data={dataStart}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: (width * paddingPercentage) / 100,
                gap: 6,
                // marginTop: 90,
              }}
              renderItem={({ item, index }) => {
                const isSelected =
                  selectedBrand === item?.text || (selectedBrand === 'ALL' && item?.text === 'ALL');
                return (
                  <View>
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleBrandSelect(item.text)}
                      style={{
                        backgroundColor: isSelected ? 'black' : 'white',
                        // paddingHorizontal: 20,
                        paddingVertical: 12,
                        borderRadius: 20,
                        borderWidth: 1.5,
                        borderColor: 'black',
                        width: 80,
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        <Image
                          style={{
                            width: isSelected ? 18 : 15,
                            height: isSelected ? 18 : 15,
                          }}
                          source={
                            isSelected
                              ? require('../../assets/images/star.png')
                              : require('../../assets/images/unstar.png')
                          }
                        ></Image>
                        <Text
                          style={{
                            color: isSelected ? colors.background : colors.text,
                            fontWeight: '600',
                            fontSize: isSelected ? 16 : 14,
                            opacity: isSelected ? 1 : 0.6,
                            textAlign: 'center',
                          }}
                        >
                          {item.text}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={{}}>
        {isProductLoading ? (
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
          <View style={{ height: '100%' }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={data}
              renderItem={({ item }) => <ItemRating dulieu={item} navigation={navigation} />}
              keyExtractor={(item) => item._id}
              ListEmptyComponent={
                <View
                  style={{
                    height: Dimensions.get('window').height * 0.25,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text>Rất tiếc, chưa có đánh giá nào.</Text>
                </View>
              }
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default RatingScreen;

const styles = StyleSheet.create({});
