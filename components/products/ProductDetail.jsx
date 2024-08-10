import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ToastAndroid,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Icons from '@expo/vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../../constants';
import BottomSheet from '@gorhom/bottom-sheet';
import { SliderBox } from 'react-native-image-slider-box';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { useContext } from 'react';
import { AppContext } from '../ultil/AppContext';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Skeleton } from 'moti/skeleton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated from 'react-native-reanimated';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { Layout } from 'react-native-reanimated';

const ProductDetail = (props) => {
  const { navigation } = props;
  const { route } = props;
  const { params } = route;
  const { cartItemCount, setCartItemCount } = useContext(AppContext);
  const paddingPercentage = 2;
  const { width, height } = Dimensions.get('window');

  const { colors } = useTheme();
  const [count, setCount] = useState(1);
  const [imageHeight, setImageHeight] = useState();
  const [isImageFlex, setIsImageFlex] = useState();

  const [sliderImages, setSliderImages] = useState([]);
  const { inforuser } = useContext(AppContext);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [sizesForSelectedColor, setSizesForSelectedColor] = useState([]);
  const [remainingQuantity, setRemainingQuantity] = useState(null);
  const [showSizes, setShowSizes] = useState(false);
  const [product, setProduct] = useState('');
  const [isColorSelected, setIsColorSelected] = useState(false);
  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [hasSelectedColor, setHasSelectedColor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showImageView, setShowImageView] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState([]);
  const [star, setstar] = useState(0);

  const openImageViewer = (index) => {
    setSelectedImageIndex(index);
    setShowImageView(true);
  };

  const closeImageViewer = () => {
    setSelectedImageIndex(null);
    setShowImageView(false);
  };

  //xem danh gia
  const ratingProductOrder = async () => {
    try {
      const response = await AxiosIntance().get('/ratingProduct/get-by-id?productId=' + params.id);
      if (response.result) {
        setRating(response.rating);
        const totalStars = response.rating.reduce((acc, rating) => acc + rating.star, 0);
        const averageStars = totalStars / response.rating.length;
        setstar(averageStars);
        console.log('Số sao trung bình:', averageStars);
      }
    } catch (error) {
      console.error('Error ratingProduct:', error);
    }
  };
  //thêm vào ds yêu thích
  const addToFavorites = async () => {
    try {
      const response = await AxiosIntance().post('/favorite/add-to-favorites', {
        idUser: inforuser._id,
        idProduct: product._id,
      });

      if (response.result) {
        ToastAndroid.show('Đã thêm vào danh sách yêu thích', ToastAndroid.SHORT);
        setIsFavorite(true);
      } else {
        ToastAndroid.show('Thêm vào danh sách yêu thích thất bại', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      ToastAndroid.show('Lỗi kết nối', ToastAndroid.SHORT);
    }
  };

  //xóa khỏi ds yêu thích
  const removeFromFavorites = async () => {
    try {
      if (isFavorite) {
        const response = await AxiosIntance().delete(
          `/favorite/remove-from-favorites/${inforuser._id}/${params.id}`
        );

        if (response.result) {
          ToastAndroid.show('Đã xóa khỏi danh sách yêu thích', ToastAndroid.SHORT);
          setIsFavorite(false);
        } else {
          ToastAndroid.show('Xóa khỏi danh sách yêu thích thất bại', ToastAndroid.SHORT);
        }
      } else {
        // Nếu sản phẩm chưa có trong danh sách yêu thích, gọi API để thêm sản phẩm vào
        const response = await AxiosIntance().post('/favorite/add-to-favorites', {
          idUser: inforuser._id,
          idProduct: product._id,
        });

        if (response.result) {
          setIsFavorite(true);
        } else {
          ToastAndroid.show('Thêm vào danh sách yêu thích thất bại', ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites();
      } else {
        await addToFavorites();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const Spacer = ({ height = 26 }) => <View style={{ height }} />;

  const SkeletonLoading = () => {
    return (
      <SafeAreaView
        style={{
          justifyContent: 'center',
        }}
      >
        <StatusBar style="auto" />
        <Skeleton.Group>
          <Skeleton colorMode="light" height={400} width={'100%'} />
          <Spacer />
          <Skeleton colorMode="light" width={250} />
          <Spacer />
          <Skeleton colorMode="light" height={200} width={'100%'} />
        </Skeleton.Group>
      </SafeAreaView>
    );
  };

  const handleSizeSelect = (selectedSize) => {
    setSelectedSize(selectedSize);
    setCount(1);

    setIsSizeSelected(true);

    // Tìm kích thước tương ứng và lấy số lượng sản phẩm còn lại
    const index = sizesForSelectedColor.findIndex((size) => size.size === selectedSize.size);
    if (index !== -1) {
      setRemainingQuantity(sizesForSelectedColor[index].quantity);
    }
  };

  const handleColorSelect = (color) => {
    // Đặt biến isColorSelected thành true khi chọn màu mới
    setIsColorSelected(true);

    setIsSizeSelected(false);

    const sizesForSelectedColor = getSizesForColor(product?.variances, color);

    setSelectedSize(null); // Đặt kích thước đã chọn về null trước khi chọn màu mới
    setSelectedColor(color);
    setCount(1);
    setSizesForSelectedColor(sizesForSelectedColor);
    setShowSizes(true); // Hiển thị danh sách kích thước
    setHasSelectedColor(true);

    setRemainingQuantity(null);
  };

  function getSizesForColor(variances, color) {
    let sizesForColor = [];

    variances?.forEach((variance) => {
      if (variance?.color === color) {
        sizesForColor = variance?.varianceDetail;
      }
    });
    return sizesForColor;
  }
  // http://localhost:3000/api/cart/new-to-cart
  const addNewCart = async () => {
    const response = await AxiosIntance().post('/cart/new-to-cart', {
      idUser: inforuser._id,
      idProduct: product._id,
      color: selectedColor,
      size: parseInt(selectedSize.size),
      quantity: parseInt(count), //so luong san pham khi chon
    });

    if (response.result) {
      ToastAndroid.show('Thêm vào giỏ hành thành công', ToastAndroid.SHORT);
      setCartItemCount(cartItemCount + 1);
    } else {
      ToastAndroid.show('Thêm thất bại! Hãy kiểm tra lại?', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await AxiosIntance().get('/product/get-by-id?id=' + params.id);
        if (response.result === true) {
          const productData = response.product;
          setProduct(productData);
          const imageUrls = [];

          productData?.variances?.forEach((variance) => {
            variance?.images?.forEach((image) => {
              imageUrls.push(image?.url);
            });
          });

          setSliderImages(imageUrls);
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
    checkIfFavorite();
    getDetails();
    ratingProductOrder();

    return () => {};
  }, []);

  const checkIfFavorite = async () => {
    try {
      const response = await AxiosIntance().get(
        `/favorite/check-favorite/${inforuser?._id}/${params.id}`
      );
      if (response.isFavorite === true) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {showImageView && selectedImageIndex !== null && (
        <>
          <ImageViewer
            style={{
              justifyContent: 'center',
            }}
            enableSwipeDown={true}
            onSwipeDown={() => closeImageViewer()}
            backgroundColor="white"
            imageUrls={sliderImages.map((url) => ({ url }))}
            index={selectedImageIndex}
            onCancel={() => closeImageViewer()}
            renderIndicator={() => null}
            renderFooter={() => (
              <View
                style={{
                  position: 'relative',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    paddingHorizontal: (width * paddingPercentage) / 10,
                    paddingBottom: 25,
                  }}
                >
                  Kéo xuống để thoát chế độ xem
                </Text>
              </View>
            )}
          />
        </>
      )}
      {!showImageView && isLoading && (
        <View style={{ padding: 16 }}>
          <SkeletonLoading />
        </View>
      )}
      {!showImageView && !isLoading && (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Animated.View layout={Layout} entering={FadeIn.duration(1500)}>
              <SliderBox
                onCurrentImagePressed={(index) => openImageViewer(index)}
                sliderBoxHeight={400}
                images={sliderImages}
                dotColor={COLORS.primary}
                dotStyle={{
                  width: 15,
                  height: 3,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  padding: 0,
                  margin: 0,
                }}
                inactiveDotColor={COLORS.gray2}
                ImageComponentStyle={{ width: '100%' }}
              />
            </Animated.View>
            <SafeAreaView
              edges={['top']}
              style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
            >
              <StatusBar style="light" />
              <Animated.View
                layout={Layout}
                entering={FadeIn.duration(1000)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 20,
                  gap: 8,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    width: 52,
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
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                  onPress={handleFavoriteToggle}
                  onLongPress={() => {
                    navigation.navigate('Favorite');
                  }}
                  style={{
                    width: 52,
                    aspectRatio: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 52,
                    borderWidth: 2,
                    borderColor: isFavorite ? COLORS.red : COLORS.gray2,
                  }}
                >
                  <Icons name="favorite" size={24} color={isFavorite ? COLORS.red : COLORS.gray2} />
                </TouchableOpacity>
              </Animated.View>
            </SafeAreaView>
            <BottomSheet
              // detached
              snapPoints={[64, 470]}
              index={1}
              // style={{ marginHorizontal: 20 }}
              // bottomInset={insets.bottom + 20}
              backgroundStyle={{
                borderRadius: 24,
                backgroundColor: colors.background,
              }}
              handleIndicatorStyle={{
                backgroundColor: colors.primary,
              }}
              onChange={() => {
                setImageHeight(imageHeight === '100%' ? '50%' : '100%');
                setIsImageFlex(isImageFlex === 1 ? undefined : 1);
              }}
            >
              <Animated.View
                layout={Layout}
                entering={FadeIn}
                style={{ padding: 16, gap: 16, flex: 1 }}
              >
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                >
                  <Text style={{ fontSize: 24, color: COLORS.black }}>{product?.title}</Text>

                  <Text style={{ fontSize: 14, color: COLORS.red }}>
                    {hasSelectedColor && selectedSize
                      ? `Chỉ còn ${remainingQuantity} sản phẩm`
                      : hasSelectedColor
                        ? 'Vui lòng chọn size'
                        : 'Vui lòng chọn màu'}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 6,
                      backgroundColor: COLORS.black,
                      padding: 6,
                      borderRadius: 100,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setCount((count) => Math.max(1, count - 1))}
                      style={{
                        backgroundColor: COLORS.lightWhite,
                        width: 24,
                        aspectRatio: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 24,
                      }}
                    >
                      <Icons name="remove" size={20} color={COLORS.black} />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: COLORS.white,
                      }}
                    >
                      {count}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setCount((count) => Math.min(remainingQuantity, count + 1))}
                      style={{
                        backgroundColor: COLORS.lightWhite,
                        width: 24,
                        aspectRatio: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 24,
                      }}
                    >
                      <Icons name="add" size={20} color={COLORS.black} />
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: 'column', gap: 18 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 6,
                        marginTop: 6,
                        justifyContent: 'flex-end',
                      }}
                    >
                      {product?.variances?.map((variance, i) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() => handleColorSelect(variance?.color)}
                          style={{
                            width: selectedColor === variance?.color ? 34 : 28,
                            height: selectedColor === variance?.color ? 34 : 28,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: variance?.color,
                            borderWidth: selectedColor === variance?.color ? 3 : 1,

                            borderRadius: 44,
                          }}
                        ></TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>

                {showSizes && (
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent: 'center',
                      }}
                    >
                      {/* <Text style={{ color: colors.text, opacity: 0.5, fontSize: 10 }}>Kích cỡ</Text> */}
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 6,
                        marginTop: 5,
                        // alignSelf: 'center',
                      }}
                    >
                      {sizesForSelectedColor?.map((varianceDetail, i) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() =>
                            varianceDetail?.quantity > 0 && handleSizeSelect(varianceDetail)
                          }
                          style={{
                            width: selectedSize === varianceDetail ? 34 : 34,
                            height: selectedSize === varianceDetail ? 34 : 34,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor:
                              selectedSize === varianceDetail ? COLORS.black : 'transparent',
                            borderRadius: 44,
                            opacity: varianceDetail?.quantity > 0 ? 1 : 0.3,
                            borderColor: varianceDetail?.quantity === 0 ? 'transparent' : 'black',
                            borderWidth: selectedSize === varianceDetail ? 2 : 0,
                          }}
                        >
                          <Text
                            style={{
                              color:
                                selectedSize === varianceDetail ? COLORS.white : COLORS.primary,
                              fontWeight: selectedSize === varianceDetail ? '600' : '100',
                              fontSize: selectedSize === varianceDetail ? 24 : 18,
                            }}
                          >
                            {varianceDetail?.size}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                      marginBottom: 6,
                      marginTop: 16,
                      color: COLORS.black,
                    }}
                  >
                    Mô tả
                  </Text>

                  <Text
                    style={{ color: COLORS.black, opacity: 0.75, letterSpacing: 0.5 }}
                    numberOfLines={12}
                  >
                    {product?.description}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // marginBottom: 40,
                    // marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('RatingScreen', {
                        id: params.id,
                      });
                    }}
                  >
                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'green' }}>
                      Xem đánh giá
                    </Text>
                  </TouchableOpacity>
                  <View style={{ flexDirection: 'row' }}>
                    {!isNaN(star) ? (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                        <Text style={{ fontSize: 15 }}>{star}</Text>
                        <Icons name="star" size={20} color={COLORS.black} />
                      </View>
                    ) : (
                      <Text></Text>
                    )}
                  </View>
                </View>
                <View style={{ flex: 1 }} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                    justifyContent: 'space-between',
                    alignContent: 'flex-end',
                    // flex: 1,
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 22,
                      fontWeight: '600',
                      letterSpacing: 1,
                    }}
                  >
                    đ{product?.price?.toLocaleString()}
                  </Text>

                  <TouchableOpacity
                    onPress={addNewCart}
                    style={{
                      backgroundColor: colors.primary,
                      height: 64,
                      borderRadius: 64,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      flexDirection: 'row',
                      padding: 12,
                    }}
                    disabled={!isColorSelected || !isSizeSelected}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '600',
                        color: colors.background,
                        paddingHorizontal: 10,
                      }}
                    >
                      Thêm vào giỏ hàng
                    </Text>

                    <View
                      style={{
                        backgroundColor: colors.card,
                        width: 40,
                        aspectRatio: 1,
                        borderRadius: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icons name="arrow-forward" size={24} color={colors.text} />
                    </View>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </BottomSheet>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProductDetail;
