import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import Icon from '@expo/vector-icons/Ionicons';
import { Video, ResizeMode } from 'expo-av';
import Modal from 'react-native-modal';
import Collapsible from 'react-native-collapsible';
import AxiosIntance from '../ultil/AxiosIntance';
import { useContext } from 'react';
import { AppContext } from '../ultil/AppContext';

const ItemRating = (props) => {
  const video = React.useRef(null);
  const { dulieu, navigation } = props;
  const [status, setStatus] = React.useState({});
  const [collapsedProduct, setCollapsedProduct] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);
  const [countHearts, setCountHearts] = useState(dulieu?.countHearts); //chỗ này phải lấy counthearts ban đầu từ dulieu chứ
  const [isClicked, setIsClicked] = useState(dulieu?.isClicked);
  const { inforuser } = useContext(AppContext);

  const moment = require('moment');
  require('moment/locale/vi');
  const timeFormat = moment(dulieu?.date);
  const timeRange = timeFormat.fromNow();
  const handleImagePress = (image) => {
    setPreviousImage(selectedImage); // Lưu hình ảnh cũ
    setSelectedImage(image); // Chọn hình ảnh mới
    setModalVisible(true); // Hiển thị modal
  };

  const handleHeartClick = async () => {
    try {
      // setCountHearts(dulieu?.countHearts);
      const action = isClicked ? 'unclick' : 'click';
      const response = await AxiosIntance().post('/ratingProduct/updateCountHearts', {
        idUser: inforuser._id,
        id: dulieu._id,
        action: action,
      });
      if (response.result) {
        setCountHearts(response?.updatedRating?.countHearts);
        setIsClicked(!isClicked);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePlayPause = () => {
    if (status.isPlaying) {
      video.current.pauseAsync();
    } else {
      video.current.playAsync();
    }
  };

  const toggleCollapseProduct = () => {
    setCollapsedProduct(!collapsedProduct);
  };

  // useEffect(() => {}, [countHearts]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'colunm' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.image}>
              <Image style={styles.img} source={require('../../assets/images/logo.png')} />
            </View>
            <Text style={{ fontSize: 16, margin: 10, fontWeight: 'bold' }}>
              {dulieu.idUser?.name}
            </Text>
          </View>
          <Text style={{ fontSize: 16, margin: 15 }}>{dulieu?.ratingStatus}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginLeft: 60,
            width: 60,
            borderWidth: 0,
            height: 45,
            borderColor: 'black',
            borderRadius: 20,
            paddingVertical: 12,
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
            }}
            source={require('../../assets/images/star.png')}
          ></Image>
          <Text
            style={{
              color: 'black',
              fontWeight: '600',
              fontSize: 14,
              opacity: 0.6,
            }}
          >
            {dulieu?.star}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingHorizontal: 15,
        }}
        onPress={toggleCollapseProduct}
      >
        <Text style={{ fontSize: 15, color: 'grey' }}>Chi tiết</Text>
        <Icon
          name={collapsedProduct ? 'chevron-down-outline' : 'chevron-up-outline'}
          size={20}
          color="grey"
        />
      </TouchableOpacity>
      <Collapsible style={{}} collapsed={collapsedProduct}>
        <View style={{ flexDirection: 'row', gap: 5, paddingHorizontal: 5 }}>
          <View>
            <Modal visible={modalVisible} transparent={true} animationType="fade">
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 500,
                  backgroundColor: 'lightgrey',
                }}
              >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                  <Image style={{ width: '100%', height: '100%' }} source={selectedImage} />
                </TouchableWithoutFeedback>
              </View>
            </Modal>
            <View style={{ marginTop: 20 }}>
              <TouchableWithoutFeedback onPress={() => handleImagePress({ uri: dulieu?.image })}>
                <Image source={{ uri: dulieu?.image }} style={{ width: 130, height: 130 }} />
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <TouchableWithoutFeedback onPress={() => setModalVisible1(true)}>
              <Video
                ref={video}
                style={{ width: 130, height: 130 }}
                source={{ uri: dulieu?.video }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(status)}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Collapsible>
      <Modal visible={modalVisible1} transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Video
            ref={video}
            style={{ width: 350, height: 450, position: 'absolute', top: 0, left: 0, zIndex: 1 }}
            source={{ uri: dulieu?.video }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(status)}
          />
          <TouchableWithoutFeedback onPress={() => setModalVisible1(false)}>
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
          </TouchableWithoutFeedback>
        </View>
      </Modal>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
        {/* <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
          <TouchableOpacity onPress={handleHeartClick}>
            <Icon
              name={isClicked ? 'heart' : 'heart-outline'}
              style={{ color: isClicked ? 'red' : 'black' }}
              size={30}
            ></Icon>
          </TouchableOpacity>
          <Text style={{ margin: 5 }}>{countHearts}</Text>
        </View> */}
        <Text style={{ margin: 5, color: 'grey', marginLeft: 15 }}>{timeRange}</Text>
      </View>
    </View>
  );
};

export default ItemRating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 0.5,
    borderColor: 'grey',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  image: {
    width: 30, // Đặt kích thước của hình ảnh
    height: 30,
    borderRadius: 75, // Đặt borderRadius bằng một nửa chiều rộng (hoặc chiều cao) để tạo hình tròn
    overflow: 'hidden',
    backgroundColor: 'lightgrey',
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
