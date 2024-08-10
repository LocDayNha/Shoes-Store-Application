import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  PermissionsAndroid,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';
import { AppContext } from '../../components/ultil/AppContext';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { useRef } from 'react';
import Icons from '@expo/vector-icons/MaterialIcons';
import Icon from '@expo/vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { ToastAndroid } from 'react-native';
import Modal from 'react-native-modal';
import { launchCameraAsync, launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { Video as ExpoVideo } from 'expo-av';
const OrderProgressDetail = ({ route }) => {
  const { order } = route.params;
  const navigation = useNavigation();
  const products = order.detail;
  const { inforuser } = useContext(AppContext);
  const [orderStatusIndex, setOrderStatusIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [idRatingProduct, setidRatingProduct] = useState(null);
  const [collapsedDetail, setCollapsedDetail] = useState(false);
  const [collapsedProduct, setCollapsedProduct] = useState(true);
  //danhgia
  const [defaultRating, setdefaultRating] = useState(2);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);
  const [rating_description, setrating_description] = useState('');
  const SheetRef = useRef(null);
  const [statusProduct, setstatusProduct] = useState('');
  const [rating, setRating] = useState([]);
  const [productRating, setproductRating] = useState([]);
  const [isRating, setisRating] = useState(false);
  const [isProductRating, setisProductRating] = useState(false);
  const [isOpen, setISOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [isVisible1, setVisible1] = useState(false);
  const [images, setImage] = useState(null);

  const [videos, setVideo] = useState(null);
  const [imageProduct, setImageProduct] = useState(null);

  const [videoProduct, setVideoPRoduct] = useState(null);

  const sendMessage = () => {
    Linking.canOpenURL('fb-messenger://')
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: fb-messenger://");
        } else {
          Linking.openURL('fb-messenger://user-thread/61554523297880');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };
  const toggleVisibility = () => {
    // console.log(products);
    setVisible(!isVisible);
  };
  const createAlert = () =>
    Alert.alert('Đánh Giá sản phẩm', 'Bạn đã đánh giá sản phẩm!', [
      {
        text: 'Từ chối',
        // onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Xem đánh giá' },
    ]);
  const saveProductId = async (productId) => {
    // console.log('Product ID:', productId);
    setidRatingProduct(productId);
    try {
      const response = await AxiosIntance().get('/ratingProduct/get-by-id?productId=' + productId);
      if (response.result) {
        setproductRating(response.rating);
        console.log(response.rating);
        if (
          response.rating.some(
            (rating) =>
              rating.idOder === order._id &&
              rating.idUser._id === inforuser._id &&
              rating.idProduct === productId &&
              rating.israting == true
          )
        ) {
          setisProductRating(true); // Nếu có, chuyển trạng thái thành đã đánh giá
          setVisible(false);
          // createAlert();
          setISOpen(false);
          setVisible1(true);
        } else {
          setisProductRating(false);
          setVisible(true);
          setISOpen(false);
        }
      }
    } catch (error) {}
    // setidRatingProduct(productId);
    // setVisible(!isVisible);
    // console.log(idRatingProduct);
    // You can also call an API to save the product ID to your database
  };
  const ratingIdOrder = async () => {
    try {
      const response = await AxiosIntance().get('/rating/get-by-id?orderId=' + order._id);
      if (response.result) {
        setRating(response.rating);
        // console.log(response.rating);
        if (
          response.rating.some(
            (rating) => rating.idOder === order._id && rating.idUser._id === inforuser._id
          )
        ) {
          setisRating(true); // Nếu có, chuyển trạng thái thành đã đánh giá
          setISOpen(false);
        }
      }
    } catch (error) {
      console.error('Error ratingProduct:', error);
    }
  };
  const ratingOrder = async () => {
    try {
      const response = await AxiosIntance().post('/rating/add-new-rating', {
        idUser: inforuser._id,
        idOrder: order._id,
        ratingStatus: rating_description,
        star: defaultRating,
        image: images,
        video: videos,
      });

      if (response.result) {
        ToastAndroid.show('Phản hồi thành công', ToastAndroid.SHORT);
        setISOpen(false);
        setisRating(true);
        setImage(null);
        setVideo(null);
      } else {
        ToastAndroid.show('Cập nhật không thành công', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error ratingProduct:', error);
      ToastAndroid.show('Đã xảy ra lỗi không xác định', ToastAndroid.SHORT);
    }
  };
  const ratingidProduct = async () => {
    try {
      const response = await AxiosIntance().post('/ratingProduct/add-new-rating', {
        idUser: inforuser._id,
        idOrder: order._id,
        idProduct: idRatingProduct,
        ratingStatus: statusProduct,
        star: defaultRating,
        image: images,
        video: videos,
        israting: true,
      });

      if (response.result) {
        ToastAndroid.show('Phản hồi thành công', ToastAndroid.SHORT);
        setImage(null);
        setVideo(null);
        setstatusProduct('');
        setdefaultRating(2);
        setVisible(!isVisible);
      } else {
        ToastAndroid.show('Cập nhật không thành công', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error ratingProduct:', error);
      ToastAndroid.show('Đã xảy ra lỗi không xác định', ToastAndroid.SHORT);
    }
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const snapPoints = ['50%', '95%'];
  const handleSnapPress = useCallback(() => {
    if (order.status === 'COMPLETED' && isRating == false) {
      SheetRef.current?.snapToIndex(index);
      setISOpen(true);
    } else {
      setISOpen(false);
    }
  }, []);
  // Chụp ảnh
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        const result = await launchCameraAsync();
        console.log(result.assets[0].uri);
        const formdata = new FormData();
        formdata.append('image', {
          uri: result.assets[0].uri,
          type: 'icon/icon_jpeg',
          name: 'image.jpg',
        });
        const response = await AxiosIntance('multipart/form-data').post(
          '/rating/upload-image',
          formdata
        );
        console.log(response.link);
        if (response.result) {
          setImage(response.link);
          toggleModal();
          ToastAndroid.show('Upload ảnh thành công', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Upload ảnh thất bại', ToastAndroid.SHORT);
        }
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getvideo = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
    // Xử lý kết quả tương tự như khi upload ảnh
    console.log(result.assets[0]?.uri);
    const formdata = new FormData();
    formdata.append('video', {
      uri: result.assets[0]?.uri,
      type: 'video/mp4', // Đổi loại file tùy thuộc vào định dạng video bạn sử dụng
      name: 'video.mp4',
    });
    const response = await AxiosIntance('multipart/form-data').post(
      '/rating/upload-video',
      formdata
    );
    console.log(response.link);
    if (response.result) {
      setVideo(response.link);
    } else {
      ToastAndroid.show('Upload video thất bại', ToastAndroid.SHORT);
    }
  };

  // Chọn ảnh từ thư viện
  const pickImageFromLibrary = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };
    const result = await launchImageLibraryAsync(options);
    console.log(result.assets[0].uri);
    const formdata = new FormData();
    formdata.append('image', {
      uri: result.assets[0]?.uri,
      type: 'icon/icon_jpeg',
      name: 'image.jpg',
    });
    const response = await AxiosIntance('multipart/form-data').post(
      '/rating/upload-image',
      formdata
    );
    console.log(response.link);
    if (response.result) {
      setImage(response.link);
      toggleModal();
      ToastAndroid.show('Upload ảnh thành công', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Upload ảnh thất bại', ToastAndroid.SHORT);
    }
  };

  const CustomRatingStar = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'center',
          margin: 10,
        }}
      >
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setdefaultRating(item);
              }}
              key={item}
            >
              <Image
                style={styles.img}
                source={
                  item <= defaultRating
                    ? require('../../assets/images/star.png')
                    : require('../../assets/images/unstar.png')
                }
              ></Image>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const statusBackgroundColor =
    order.status === 'CANCELED' ||
    order.status === 'DELIVERING' ||
    order.status === 'COMPLETED' ||
    order.status === 'REFUNDED'
      ? 'lightgrey'
      : 'red';
  const statusBackgroundColor2 =
    order.status === 'CANCELED' ||
    order.status === 'DELIVERING' ||
    order.status === 'REFUNDED' ||
    order.status === 'ORDERED' ||
    order.status === 'PURCHASED'
      ? 'lightgrey'
      : 'red';
  const statusColorPayment = order.status === 'COMPLETED' ? 'green' : 'orange';
  const statusPayment = order.status === 'COMPLETED' ? 'Đã hoàn thành' : 'Chưa hoàn thành';
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const toggleCollapseDetail = () => {
    setCollapsedDetail(!collapsedDetail);
  };
  const toggleCollapseProduct = () => {
    setCollapsedProduct(!collapsedProduct);
  };
  useEffect(() => {
    if (order.status === 'PURCHASED') {
      setOrderStatusIndex(0);
    } else if (order.status === 'ORDERED') {
      setOrderStatusIndex(0);
    } else if (order.status === 'COMPLETED') {
      setOrderStatusIndex(2);
    } else if (order.status === 'DELIVERING') {
      setOrderStatusIndex(1);
    }

    if (order.status === 'COMPLETED' && isRating == false) {
      // SheetRef.current?.snapToIndex(index);
      setISOpen(true);
    } else {
      setISOpen(false);
    }

    ratingIdOrder();
  }, [order.status, isRating, isVisible]);
  const cancelOrder = async () => {
    try {
      let newStatus = 'CANCELED';
      if (order.isPaid) {
        newStatus = 'REFUNDED';
      }
      const response = await AxiosIntance().put('/order/update-status', {
        orderId: order._id,
        status: newStatus,
      });
      navigation.goBack();
      ToastAndroid.show('Hủy đươn hàng thành công', ToastAndroid.SHORT);
      console.log('Order status updated successfully', response.data);
    } catch (error) {
      ToastAndroid.show('Hủy đơn hàng thất bại', ToastAndroid.SHORT);
      console.error('Error updating order status:', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
          alignItems: 'center',
          marginBottom: 15,
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
          CHI TIẾT ĐƠN HÀNG
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            // marginVertical: 20,
            gap: 5,
            paddingHorizontal: 10,
            flex: 1,
          }}
        >
          {order.status !== 'CANCELED' && order.status !== 'REFUNDED' ? (
            <View style={{ height: 100 }}>
              <ProgressSteps activeStep={orderStatusIndex}>
                <ProgressStep
                  labelFontSize={28}
                  label="Đặt hàng"
                  previousBtnDisabled
                  nextBtnDisabled
                  nextBtnText=""
                  previousBtnText=""
                ></ProgressStep>

                <ProgressStep
                  label="Giao hàng"
                  previousBtnDisabled
                  nextBtnDisabled
                  nextBtnText=""
                  previousBtnText=""
                ></ProgressStep>

                <ProgressStep
                  label="Đã nhận"
                  previousBtnDisabled
                  nextBtnDisabled
                  nextBtnText=""
                  previousBtnText=""
                ></ProgressStep>
              </ProgressSteps>
            </View>
          ) : (
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 20,
                marginTop: 20,
                color: 'red',
              }}
            >
              Bạn đã hủy đơn hàng này
            </Text>
          )}

          <View
            style={{
              backgroundColor: COLORS.offwhite,
              padding: 15,
              borderRadius: 10,
              elevation: 1,
              borderWidth: 0.7,
              borderColor: 'lightgrey',
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onPress={toggleCollapse}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              >
                Thông Tin Đơn Hàng
              </Text>
              <Icon
                name={collapsed ? 'chevron-down-outline' : 'chevron-up-outline'}
                size={24}
                color="grey"
              />
            </TouchableOpacity>
            <Collapsible style={{ gap: 5 }} collapsed={collapsed}>
              <View
                style={{
                  gap: 5,
                  marginTop: 15,
                  borderBottomWidth: 1,
                  borderColor: 'lightgrey',
                  marginBottom: 15,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 16, color: 'grey' }}>Mã đơn hàng</Text>
                  <Text style={{ fontSize: 16, color: 'grey' }}>#{order.uuid}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 16, color: 'grey' }}>Ngày đặt hàng</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16, color: 'grey' }}>
                      {moment(order?.createdAt).format('HH:mm')},{' '}
                    </Text>
                    <Text style={{ fontSize: 16, color: 'grey' }}>
                      {moment(order?.createdAt).format('DD-MM-YYYY')}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                  }}
                >
                  <Text style={{ fontSize: 16, color: 'grey' }}>Trạng thái</Text>
                  {/* <View> */}
                  <Text style={{ fontSize: 16, color: statusColorPayment }}>{statusPayment}</Text>
                  {/* <Text style={{ fontSize: 16, color: statusColorPayment }}>{statusPaid}</Text> */}
                  {/* </View> */}
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={toggleCollapseDetail}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  Thông tin địa chỉ
                </Text>
                <Icon
                  name={collapsedDetail ? 'chevron-down-outline' : 'chevron-up-outline'}
                  size={24}
                  color="grey"
                />
              </TouchableOpacity>
              <Collapsible style={{}} collapsed={collapsedDetail}>
                <View
                  style={{
                    gap: 5,
                    marginTop: 15,
                    borderBottomWidth: 1,
                    borderColor: 'lightgrey',
                    marginBottom: 15,
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, color: 'grey' }}>Số điện thoại</Text>
                    <Text style={{ fontSize: 16, color: 'grey' }}>{order.phoneNumber}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={{ fontSize: 16, color: 'grey' }}>Địa chỉ</Text>
                    <Text style={{ fontSize: 16, color: 'grey', textAlign: 'right', width: 200 }}>
                      {order.address}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 15,
                    }}
                  >
                    <Text style={{ fontSize: 16, color: 'grey' }}>Tên người nhận</Text>
                    <Text style={{ fontSize: 16, color: 'grey' }}>{inforuser.name}</Text>
                  </View>
                </View>
              </Collapsible>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={toggleCollapseProduct}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  {order.productCount} mặt hàng
                </Text>

                <Icon
                  name={collapsedProduct ? 'chevron-down-outline' : 'chevron-up-outline'}
                  size={24}
                  color="grey"
                />
              </TouchableOpacity>
              <Collapsible style={{}} collapsed={collapsedProduct}>
                <View
                  style={{
                    gap: 5,
                    marginTop: 15,
                    borderColor: 'lightgrey',
                    marginBottom: 15,
                  }}
                >
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {products.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          navigation.navigate('ProductDetail', {
                            id: item?.productId?._id,
                          });
                        }}
                      >
                        <View style={styles.productItem}>
                          <Image
                            style={styles.productImage}
                            source={{ uri: item?.productId?.variances[0].images[0].url }}
                            resizeMode="contain"
                          />
                          <View style={{ flexDirection: 'colunm', gap: 3 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                              {item.productId.title} (
                              {item?.color.charAt(0).toUpperCase() + item?.color.slice(1)},{' '}
                              {item.size})
                            </Text>

                            <Text style={{ fontSize: 16, color: 'grey' }}>{item.quantity}x</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                              {item.unitPrice.toLocaleString()} VND
                            </Text>
                            <TouchableOpacity onPress={() => saveProductId(item.productId._id)}>
                              {/* <Text style={isProductRating  ? styles.textrated : styles.textnotrating}>{isProductRating  ? 'Đã đánh giá' : 'Đánh giá'}</Text> */}
                              <Text style={styles.textrated}>Đánh giá</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </Collapsible>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ fontSize: 16, color: 'grey' }}>Tạm tính</Text>
                <Text style={{ fontSize: 16, color: 'grey' }}>
                  {order.totalAmount.toLocaleString()} VND
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderColor: 'lightgrey',
                }}
              >
                <Text style={{ fontSize: 16, color: 'grey' }}>Vận chuyển</Text>
                <Text style={{ fontSize: 16, color: 'green', marginBottom: 15 }}>FREE</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 15,
                }}
              >
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Tổng cộng</Text>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
                  {order?.totalAmount.toLocaleString()} VND
                </Text>
              </View>
            </Collapsible>
            <TouchableOpacity
              onPress={cancelOrder}
              disabled={
                order?.status === 'CANCELED' ||
                order.status === 'DELIVERING' ||
                order.status === 'COMPLETED' ||
                order.status === 'REFUNDED'
              }
              style={{
                justifyContent: 'center',
                marginTop: 30,
                backgroundColor: statusBackgroundColor,
                height: 30,
                borderRadius: 5,
              }}
            >
              <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>
                Hủy đơn hàng
              </Text>
            </TouchableOpacity>
            <View>
              <View>
                <TouchableOpacity
                  disabled={
                    order?.status === 'CANCELED' ||
                    order.status === 'DELIVERING' ||
                    order.status === 'REFUNDED' ||
                    order.status === 'ORDERED' ||
                    order.status === 'PURCHASED' ||
                    isRating
                  }
                  style={
                    isRating
                      ? {
                          justifyContent: 'center',
                          marginTop: 20,
                          backgroundColor: 'green',
                          height: 30,
                          borderRadius: 5,
                        }
                      : {
                          justifyContent: 'center',
                          marginTop: 20,
                          backgroundColor: statusBackgroundColor2,
                          height: 30,
                          borderRadius: 5,
                        }
                  }
                  onPress={() => handleSnapPress(0)}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 18,
                      color: 'white',
                    }}
                  >
                    {isRating ? 'Đã đánh giá' : 'Đánh giá'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 40, color: 'grey', fontWeight: 'bold', paddingLeft: 10 }}>
                Shop in Styles!
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ height: 60, width: 60 }}
                source={require('../../assets/images/logo.png')}
              />
              <Text style={{ fontSize: 18, color: 'grey' }}>THEFIVEMENSSHOES</Text>
            </View>

            {/* <TouchableOpacity style={styles.floadingButton} onPress={sendMessage}>
              <IconM name="facebook-messenger" size={30} color="white" />
            </TouchableOpacity> */}
          </View>
          {isOpen == false ? (
            <View></View>
          ) : (
            <BottomSheet
              ref={SheetRef}
              snapPoints={snapPoints}
              enablePanDownToClose={true}
              onClose={() => setISOpen(false)}
            >
              <BottomSheetView>
                <View style={{ elevation: 1, marginStart: 10 }}>
                  <Text style={styles.alertTitle}>Đánh giá</Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    onPress={toggleCollapseProduct}
                  >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 10 }}>
                      {order.productCount} mặt hàng
                    </Text>
                    <Icon
                      name={collapsedProduct ? 'chevron-down-outline' : 'chevron-up-outline'}
                      size={24}
                      color="grey"
                    />
                  </TouchableOpacity>
                  <Collapsible style={{}} collapsed={collapsedProduct}>
                    <View
                      style={{ gap: 5, marginTop: 15, borderColor: 'lightgrey', marginBottom: 15 }}
                    >
                      <ScrollView showsVerticalScrollIndicator={false}>
                        {products.map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              navigation.navigate('ProductDetail', {
                                id: item?.productId?._id,
                              });
                            }}
                          >
                            <View style={styles.productItem}>
                              <Image
                                style={styles.productImage}
                                source={{ uri: item?.productId?.variances[0].images[0].url }}
                                resizeMode="contain"
                              />
                              <View style={{ flexDirection: 'colunm', gap: 3 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                  {item.productId.title} (
                                  {item?.color.charAt(0).toUpperCase() + item?.color.slice(1)},{' '}
                                  {item.size})
                                </Text>
                                <Text style={{ fontSize: 16, color: 'grey' }}>
                                  {item.quantity}x
                                </Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                  {item.unitPrice.toLocaleString()} VND
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  </Collapsible>
                  <Text style={styles.alertTitle}>Đơn hàng của bạn thế nào?</Text>
                  <Text
                    style={[
                      styles.alertTitle,
                      { color: 'gray', margin: 5, fontSize: 15, fontWeight: 'normal' },
                    ]}
                  >
                    Vui lòng cho đánh giá sao & cảm nhận của bạn
                  </Text>
                  <CustomRatingStar></CustomRatingStar>
                  <KeyboardAwareScrollView>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.viewArea}>
                        <TextInput
                          value={rating_description}
                          onChangeText={setrating_description}
                          placeholder="Viết đánh giá"
                          numberOfLines={10}
                          style={styles.textArea}
                        />
                      </View>
                      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => toggleModal()}>
                        <Image source={require('../../assets/images/image.png')}></Image>
                      </TouchableOpacity>
                    </View>
                  </KeyboardAwareScrollView>
                  {images != null && (
                    <View
                      style={{
                        justifyContent: 'space-around',
                        marginTop: 10,
                        flexDirection: 'row',
                      }}
                    >
                      <Image source={{ uri: images }} style={{ width: 100, height: 100 }} />
                      <TouchableOpacity onPress={() => getvideo()}>
                        {videos ? (
                          <ExpoVideo
                            source={{ uri: videos }}
                            style={{ width: 100, height: 100 }}
                            useNativeControls
                          />
                        ) : (
                          <Image
                            source={require('../../assets/images/movie.png')}
                            style={{ width: 100, height: 100 }}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        marginTop: 20,
                        borderWidth: 1,
                        width: 120,
                        height: 50,
                        borderRadius: 10,
                        backgroundColor: COLORS.offwhite,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => setISOpen(false)}
                    >
                      <Text
                        style={{
                          textAlign: 'center',
                          padding: 10,
                          color: 'black',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}
                      >
                        HỦY
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        marginTop: 20,
                        borderWidth: 1,
                        width: 120,
                        height: 50,
                        borderRadius: 10,
                        backgroundColor: 'black',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={ratingOrder}
                    >
                      <Text
                        style={{
                          textAlign: 'center',
                          padding: 10,
                          color: 'white',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}
                      >
                        OK
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </BottomSheetView>
            </BottomSheet>
          )}
        </View>
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <TouchableOpacity style={styles.modalBackdrop} onPress={toggleModal} />
        <View style={styles.modalContainer1}>
          {/* Add your camera and gallery buttons here */}
          <TouchableOpacity
            style={{
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 0.6,
              width: '100%',
            }}
            onPress={() => requestCameraPermission()}
          >
            <Text style={[styles.text20, { color: '#4287f5' }]}>Chụp ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={() => pickImageFromLibrary()}
          >
            <Text style={styles.text20}>Chọn ảnh từ thư viện </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={() => pickImageFromLibrary()}
          >
            <Text style={styles.text20}>Video</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <KeyboardAwareScrollView>
        <Modal visible={isVisible} animationType="fade" transparent={true}>
          <View style={styles.alert}>
            {/* <Text style={styles.alertTitle}>Đánh giá</Text> */}
            <Text style={[styles.alertTitle, { fontSize: 20, marginTop: 5 }]}>
              Sản phẩm của bạn thế nào?
            </Text>
            <Text
              style={[
                styles.alertTitle,
                { color: 'gray', margin: 5, fontSize: 14, fontWeight: 'normal' },
              ]}
            >
              Vui lòng cho đánh giá sao & cảm nhận của bạn
            </Text>
            <View>
              <CustomRatingStar></CustomRatingStar>
              {/* <Text>{defaultRating+'/'+maxRating.length}</Text>
              <TouchableOpacity activeOpacity={0.7}
              onPress={()=>alert(defaultRating)}>
                <Text>Get star</Text>
              </TouchableOpacity> */}
            </View>

            {/* <View style={styles.viewArea}> */}

            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.viewArea, { width: 270 }]}>
                <TextInput
                  value={statusProduct}
                  onChangeText={setstatusProduct}
                  placeholder="Viết đánh giá"
                  numberOfLines={10}
                  style={styles.textArea}
                />
              </View>
              <TouchableOpacity style={{ marginTop: 20 }} onPress={() => toggleModal()}>
                <Image source={require('../../assets/images/image.png')}></Image>
              </TouchableOpacity>
            </View>

            {/* </View> */}
            {images != null && (
              <View
                style={{
                  justifyContent: 'space-around',
                  marginTop: 10,
                  flexDirection: 'row',
                }}
              >
                <Image source={{ uri: images }} style={{ width: 100, height: 100 }} />
                <TouchableOpacity onPress={() => getvideo()}>
                  {videos ? (
                    <ExpoVideo
                      source={{ uri: videos }}
                      style={{ width: 100, height: 100 }}
                      useNativeControls
                    />
                  ) : (
                    <Image
                      source={require('../../assets/images/movie.png')}
                      style={{ width: 100, height: 100 }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}
            >
              <TouchableOpacity
                onPress={() => toggleVisibility()}
                style={{
                  marginTop: 20,
                  borderWidth: 1,
                  width: 120,
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: COLORS.offwhite,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    padding: 10,
                    color: 'black',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  HỦY
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  borderWidth: 1,
                  width: 120,
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={ratingidProduct}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    padding: 10,
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAwareScrollView>

      <Modal isVisible={isVisible1}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText1}>Đánh giá</Text>
            <Text style={styles.modalText2}>
              Bạn đã đánh giá! Bạn có muốn xem đánh giá của mọi người không?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setVisible1(false)}>
                <Text style={styles.buttonText}>Đóng</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  navigation.navigate('RatingScreen', {
                    id: idRatingProduct,
                  });
                }}
              >
                <Text style={styles.buttonText}>Đồng ý</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
    backgroundColor: COLORS.lightWhite,
    paddingVertical: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  alert: {
    // height: 320,
    margin: 5,
    elevation: 24,
    backgroundColor: COLORS.offwhite,
    padding: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  alertTitle: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  textArea: {
    top: -25,
    height: 60,
  },
  modalContainer1: {
    backgroundColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    height: 130,
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  img: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    padding: 4,
  },
  viewArea: {
    width: 300,
    alignSelf: 'left',
    margin: 12,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 10,
    color: 'grey',
    height: 50,
  },
  alertButton: {
    marginLeft: 40,
    maxWidth: 300,
  },
  text20: {
    marginTop: 15,
    fontSize: 20,
    color: '#21833C',
    fontWeight: '500',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  textnotrating: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 17,
    /* Thêm các thuộc tính CSS khác tùy ý */
  },
  textrated: {
    fontWeight: 'bold',
    color: 'green',
    fontStyle: 'italic',
    fontSize: 17,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 300,
    alignItems: 'center',
  },
  modalText1: {
    fontSize: 22,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  modalText2: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    gap: 6,
  },
  cancelButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  floadingButton: {
    position: 'absolute',
    width: 40,
    bottom: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    backgroundColor: 'blue',
    borderRadius: 30,
  },
});

export default OrderProgressDetail;
