import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import React, { useCallback, useRef, useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/index';
import { MaterialIcons } from '@expo/vector-icons';
import { SIZES } from '../constants/index';
import { useIsFocused, useNavigation, useTheme } from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Card from '../components/home/Card';
import MasonryList from 'reanimated-masonry-list';
import CustomBackdrop from '../components/home/CustomBackdrop';
import ImageSlider from '../components/home/ImagesSlider';
import { Pressable } from 'react-native';
import FilterView from '../components/home/FilterView';
import AxiosIntance from '../components/ultil/AxiosIntance';
import { UIActivityIndicator } from 'react-native-indicators';
import noImageAvailable from '../assets/images/no_image_available.jpg';
import { AppContext } from '../components/ultil/AppContext';
import { ToastAndroid } from 'react-native';


const FavoriteScreen = () => {
  const { colors } = useTheme();
  const bottomSheetModalRef = useRef(null);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [isProductLoading, setIsProductLoading] = useState(true);
  const { inforuser } = useContext(AppContext);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const getProducts = async () => {
    try {
      const response = await AxiosIntance().get('/favorite/get-by-idUser?idUser=' + inforuser._id);
      if (response.result) {
        console.log("aaaa", response.favorite);
        setProducts(response.favorite);
        setIsProductLoading(false);

      } else {
        ToastAndroid.show('Lấy data thất bại');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      ToastAndroid.show('Lỗi kết nối', ToastAndroid.SHORT);

    } finally {
      setIsProductLoading(false);
    }
  };
  const deleteFavorite=async(product)=>{
    try {

      // console.log("AAAAAAAAAAAA",recipe._id);
      const response = await AxiosIntance().delete(`/favorite/delete-by-id?idProduct=${product}&idUser=${inforuser._id}`);
      console.log(response.recipe)
      if (response.result) {
          ToastAndroid.show("Xoá thành công!", ToastAndroid.SHORT);
      } else {
          console.log("Failed to delete RECIPE");
      }
  } catch (error) {
      console.log("=========>", error);
  }
  }


  useEffect(() => {

    if (isFocused) {

      getProducts();
    }
    return () => {
      setIsProductLoading(true);
    };
  }, [isFocused]);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.viewContent}>
          <View style={styles.rightContent}>
            <Text style={styles.text}>Yêu thích của bạn</Text>
          </View>
        </View>
        {isProductLoading ? (
          <View
            style={{
              height: Dimensions.get('window').height * 0.25,
              // backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UIActivityIndicator size={30} color={colors.text} />
          </View>
        ) : (
          <MasonryList
            data={products}
            numColumns={2}
            contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
            showsVerticalScrollIndicator={false}
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
            renderItem={({ item, i }) => (
              <View style={{ padding: 6 }}>
                <View
                  style={{
                    aspectRatio: i === 0 ? 1 : 1,
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 24,
                    elevation: 2,
                  }}
                >
                  <Pressable
                    style={{ width: '100%', height: '100%' }}
                    onPress={() => {
                      navigation.navigate('ProductDetail', {
                        id: item.idProduct._id,

                      });
                    }}
                  >
                    {item?.idProduct?.variances[0]?.images[0]?.url ? (
                      <Image
                        style={{ flex: 1 }}
                        source={{
                          uri: item?.idProduct?.variances[0].images[0].url,
                        }}
                      // resizeMode="contain"
                      />
                    ) : (
                      <Image resizeMode="contain" source={noImageAvailable} />
                    )}
                  </Pressable>
                  <View
                    style={[
                      StyleSheet.absoluteFill,
                      {
                        padding: 12,
                      },
                    ]}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 8,
                        padding: 4,
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 14,
                          fontWeight: '900',
                          color: COLORS.black,
                          textShadowColor: 'rgba(0,0,0,0.1)',
                          textShadowOffset: {
                            height: 1,
                            width: 0,
                          },
                          textShadowRadius: 15,
                        }}
                      >
                        {item.idProduct?.title}
                      </Text>



                      <TouchableOpacity
                        style={{
                          // backgroundColor: colors.card,
                          borderRadius: 100,
                          height: 32,
                          aspectRatio: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <MaterialIcons name="favorite" size={20} color={'red'} />
                      </TouchableOpacity>


                    </View>
                    <View
                      style={{
                        flex: 1,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: 'rgba(0,0,0,0)',
                        alignItems: 'flex-end',
                        overflow: 'hidden',
                        justifyContent: 'space-between',
                      }}
                      intensity={20}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: COLORS.black,
                          marginLeft: 8,
                          textShadowColor: 'rgba(0,0,0,0)',
                          textShadowOffset: {
                            height: 0,
                            width: 0,
                          },
                          textShadowRadius: 15,
                          marginTop: 25,
                          backgroundColor: COLORS.lightWhite,
                          borderRadius: 5,
                        }}
                        numberOfLines={1}
                      >
                        {item.idProduct?.price.toLocaleString()} đ
                      </Text>
                      {/* <TouchableOpacity
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 100,
                          backgroundColor: 'rgba(0,0,0,0.1)',
                          alignContent: 'flex-end',
                        }}
                      >
                        <MaterialIcons name="add-shopping-cart" size={18} color="#000" />
                      </TouchableOpacity> */}
                    </View>
                  </View>
                </View>
              </View>
            )}
            onEndReachedThreshold={0.1}
            keyExtractor={(item) => item.idProduct._id}
          />
        )}
      </View>
    </ScrollView>

  )


}


export default FavoriteScreen

const styles = StyleSheet.create({
  container:
  {

    marginTop: 26,
    marginEnd: 10,
    marginLeft: 10,
    marginBottom: 30,
    flexDirection: 'column',
  },
  viewContent: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 100,
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
    paddingTop: 20,
  },
  buttonBuy: {
    height: 48,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textBuy: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

})