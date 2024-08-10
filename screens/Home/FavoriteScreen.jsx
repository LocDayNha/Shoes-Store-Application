import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { AppContext } from '../../components/ultil/AppContext';
import MasonryList from 'reanimated-masonry-list';
import { COLORS } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useTheme } from '@react-navigation/native';
import Icons from '@expo/vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { UIActivityIndicator } from 'react-native-indicators';

const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const { inforuser } = useContext(AppContext);
  const paddingPercentage = 2;
  const { width, height } = Dimensions.get('window');
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      fetchFavorites();
    }, [])
  );

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const userId = inforuser._id;
      const response = await AxiosIntance().get(`/favorite/${userId}`);
      setFavorites(response.favorites);
      //   console.log(response.favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar style="auto" />
      <SafeAreaView style={{ paddingVertical: 14, gap: 24 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
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
            SẢN PHẨM YÊU THÍCH
          </Text>
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
            data={favorites}
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
                        id: item?.idProduct?._id,
                      });
                    }}
                  >
                    <Image
                      style={{ flex: 1 }}
                      source={{
                        uri: item?.idProduct?.variances[0].images[0].url,
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
                          {item?.idProduct?.title}
                        </Text>
                      </View>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          backgroundColor: 'black',
                          fontSize: 16,
                          letterSpacing: 0.5,
                          width: 100,
                          borderRadius: 5,
                        }}
                      >
                        đ {item?.idProduct?.price.toLocaleString()}
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

export default FavoriteScreen;
