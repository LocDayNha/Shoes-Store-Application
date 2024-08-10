import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../constants';
import { SliderBox } from 'react-native-image-slider-box';

const ImagesSlider = () => {
  const slides = [
    'https://wallpaperset.com/w/full/d/4/c/505570.jpg',
    'https://wallpaperset.com/w/full/8/5/0/505573.jpg',
    'https://wallpaperset.com/w/full/8/e/3/505576.jpg',
  ];
  return (
    <View style={styles.imageSlider}>
      <SliderBox
        images={slides}
        dotColor={COLORS.primary}
        dotStyle={{
          width: 0,
          height: 0,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
        }}
        inactiveDotColor={COLORS.secondary}
        ImageComponentStyle={{ width: '100%', marginTop: 15 }}
        // autoplay
        // circleLoop
      />
    </View>
  );
};

export default ImagesSlider;

const styles = StyleSheet.create({
  imageSlider: {
    flex: 1,
    alignItems: 'center',
  },
});
