import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Guide = ({}) => {
  const navigation = useNavigation();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = React.useRef(null);

  const Slide = ({ item }) => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image
          source={item.image}
          style={{ height: '75%', width, resizeMode: 'contain', marginTop: 50 }}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    );
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}
      >
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: 'black',
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{ height: 50 }}>
              <TouchableOpacity onPressIn={() => navigation.navigate('Login')} style={styles.btn}>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>BẮT ĐẦU</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: 'black',
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={skip}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: 'black',
                  }}
                >
                  BỎ QUA
                </Text>
              </TouchableOpacity>
              <View style={{ width: 15 }} />
              <TouchableOpacity activeOpacity={0.8} onPress={goToNextSlide} style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: 'white',
                  }}
                >
                  TIẾP
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };
  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };
  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  return (
    <SafeAreaView>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        data={slides}
        contentContainerStyle={{ height: height * 0.75 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default Guide;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    marginTop: 10,
    maxWidth: '90%',
    textAlign: 'center',
    lineHeight: 23,
  },
  indicator: {
    height: 5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
    marginTop: 30,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const slides = [
  {
    _id: '1',
    image: require('../../assets/images/guide3.png'),
    title: 'Tự do mua sắm',
    subtitle: 'Chúng tôi cung cấp những sản phẩm chất lượng dành cho bạn',
  },
  {
    _id: '2',
    image: require('../../assets/images/guide2.png'),
    title: 'Độ uy tín cao',
    subtitle: 'Sự hài lòng của bạn là ưu tiên số một của chúng tôi',
  },
  {
    _id: '3',
    image: require('../../assets/images/guide1.png'),
    title: 'Bạn đã sẵn sàng?',
    subtitle: 'Hãy đáp ứng nhu cầu thời trang của bạn ngay bây giờ!',
  },
];
