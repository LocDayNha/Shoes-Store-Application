import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from '@expo/vector-icons/MaterialIcons';
import { useTheme, useIsFocused } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { useContext } from 'react';
import { AppContext } from '../components/ultil/AppContext';

const CustomBottomTabs = (props) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView edges={['bottom']} style={{ backgroundColor: colors.card }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}
      >
        {props.state.routes.map((route, i) => {
          const isActive = i == props.state.index;
          return (
            <TabItem
              key={i}
              isActive={isActive}
              routeName={route.name}
              navigation={props.navigation}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default CustomBottomTabs;

const TabItem = ({ routeName, isActive, navigation }) => {
  const isFocused = useIsFocused();
  const { cartItemCount, setCartItemCount } = useContext(AppContext); // Truy cập cartItemCount từ AppContext
  const { colors } = useTheme();

  // Sử dụng useEffect để theo dõi thay đổi của cartItemCount từ context
  useEffect(() => {
    // Lấy giá trị cartItemCount từ context hoặc từ nơi bạn lưu trữ giỏ hàng
    setCartItemCount(cartItemCount);
  }, [cartItemCount]); // Chú ý rằng bạn cần pass giá trị cần theo dõi vào mảng dependencies của useEffect

  const onTap = () => {
    navigation.navigate(routeName);
  };

  return (
    <Pressable
      onPress={onTap}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 8,
      }}
    >
      <Animated.View
        style={[
          {
            width: 36,
            height: 36,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 32,
            backgroundColor: isActive ? colors.primary : 'transparent',
          },
        ]}
      >
        <Icons
          name={
            routeName === 'Trang chủ'
              ? 'home'
              : routeName === 'Tìm kiếm'
              ? 'search'
              : routeName === 'Giỏ hàng'
              ? 'shopping-cart'
              : 'person'
          }
          size={24}
          color={isActive ? colors.card : colors.text}
          style={{
            opacity: isActive ? 1 : 0.5,
          }}
        />
        {routeName === 'Giỏ hàng' && cartItemCount > 0 && (
          // Hiển thị số lượng item trong giỏ hàng nếu có ít nhất một item
          <View style={styles.cartItemCountBadge}>
            <Text style={styles.cartItemCountText}>{cartItemCount}</Text>
          </View>
        )}
      </Animated.View>
      {isActive && (
        <Text
          style={{
            marginLeft: 4,
            fontSize: 12,
            fontWeight: '600',
            color: colors.text,
          }}
        >
          {routeName}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cartItemCountBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemCountText: {
    color: 'white',
    fontSize: 13,
  },
});
