import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import noImageAvailable from '../../assets/images/no_image_available.jpg';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { COLORS } from '../../constants';
import { PanGestureHandler, Swipeable } from 'react-native-gesture-handler';
import DeleteConfirmationModal from '../../screens/DeleteConfirmationModal';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useTheme } from '@react-navigation/native';

const ItemCart = (props) => {
  const { dulieu, removeItemFromCart } = props;
  const [count, setCount] = useState(dulieu?.quantity || 1);
  const navigation = useNavigation();

  // console.log(count); //so luong san pham trong gio hang

  const fetchProductQuantity = async () => {
    try {
      const response = await AxiosIntance().get(
        `/product/get-quantity?product_id=${dulieu?.idProduct?._id}&size=${dulieu?.size}&color=${dulieu?.color}`
      );
      const apiQuantity = response?.result;
      // console.log(apiQuantity); //so luong san pham trong database
      return apiQuantity?.quantity;
    } catch (error) {
      console.error('Lỗi', error);
    }
  };

  const handleIncrease = async () => {
    let quantityInStock = await fetchProductQuantity();
    if (count < quantityInStock) {
      let updatedQuantity = count + 1;
      handleUpdateQuantity(updatedQuantity);
      setCount(updatedQuantity);
    }
  };

  const handleUpdateQuantity = (updatedQuantity) => {
    let data = {
      id: dulieu?._id,
      quantity: updatedQuantity,
    };
    AxiosIntance().post(`/cart/update-quantity`, data);
  };

  const handleDecrease = () => {
    if (count > 1) {
      let updatedQuantity = count - 1;
      handleUpdateQuantity(updatedQuantity);
      setCount(updatedQuantity);
    }
  };

  const rightSwipe = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.removeButton}
          // onPress={() => removeItemFromCart(dulieu?._id)}
          onPress={handleDeleteItem}
        >
          <Ionicons name="trash-outline" size={44} color={COLORS.red} />
        </TouchableOpacity>
      </View>
    );
  };

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDeleteItem = () => {
    setDeleteModalVisible(true);
  };

  const confirmDeleteItem = () => {
    setDeleteModalVisible(false);
    removeItemFromCart(dulieu?._id);
  };

  const cancelDeleteItem = () => {
    setDeleteModalVisible(false);
  };

  return (
    <Swipeable renderRightActions={rightSwipe}>
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            navigation.navigate('ProductDetail', { id: dulieu?.idProduct?._id });
          }}
          style={styles.imageContainer}
        >
          {dulieu?.idProduct?.variances[0]?.images[0]?.url ? (
            <Image
              style={styles.image}
              source={{
                uri: dulieu?.idProduct?.variances[0].images[0].url,
              }}
              resizeMode="contain"
            />
          ) : (
            <Image resizeMode="contain" source={noImageAvailable} style={styles.noImage} />
          )}
        </Pressable>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{dulieu.idProduct?.title}</Text>
          <View style={styles.colorSizeContainer}>
            {/* <View style={styles.colorCircle}></View> */}
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: dulieu?.color,
                width: 24,
                height: 24,
                borderRadius: 24,
                borderWidth: 1,
              }}
            ></TouchableOpacity>
            {/* <Text>{dulieu?.color}</Text> */}
            <Text>Kích cỡ: {dulieu.size}</Text>
          </View>
          <View style={styles.priceQuantityContainer}>
            <Text style={styles.price}>đ{dulieu?.idProduct?.price.toLocaleString()}</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity onPress={handleDecrease}>
                <Ionicons name="remove-outline" size={24} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.quantity}>{count}</Text>
              <TouchableOpacity onPress={handleIncrease}>
                <Ionicons name="add-outline" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <DeleteConfirmationModal
        isVisible={isDeleteModalVisible}
        onCancel={cancelDeleteItem}
        onConfirm={confirmDeleteItem}
      />
    </Swipeable>
  );
};

export default ItemCart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: COLORS.offwhite,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    elevation: 1,
  },
  imageContainer: {
    width: '25%',
    flex: 1,
  },
  image: {
    width: 120,
    height: 100,
    borderRadius: 10,
    flex: 1,
  },
  noImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
  },
  detailsContainer: {
    width: '55%',
    marginLeft: 10,
    // flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  colorSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    flex: 1,
    gap: 6,
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    marginRight: 5,
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
    // justifyContent: 'space-between',
    gap: 10,
  },
  price: {
    fontSize: 20,
    // fontWeight: 'bold',
    marginRight: 10,
    // backgroundColor: 'white',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: COLORS.primary,
    borderRadius: 20,
    // flex: 1,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  removeButton: {
    justifyContent: 'center',
    flex: 1,
    // backgroundColor: COLORS.red,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.light,
    borderRadius: 10,
    padding: 20,
    width: 300,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 6,
    alignSelf: 'flex-end',
  },
  confirmButton: {
    // backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    // backgroundColor: COLORS.gray2,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
