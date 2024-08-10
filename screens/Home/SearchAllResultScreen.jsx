import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import MasonryList from 'reanimated-masonry-list';
import { COLORS } from '../../constants';
import { UIActivityIndicator } from 'react-native-indicators';
import { StatusBar } from 'expo-status-bar';
import Icons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchAllResultScreen = ({ route }) => {
  const { searchText } = route.params;
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const paddingPercentage = 2;
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');
  const [totalSearchResults, setTotalSearchResults] = useState('');

  useEffect(() => {
    fetchSearchResults();
  }, []);

  const fetchSearchResults = async () => {
    try {
      const response = await AxiosIntance().get(`/product/search-by-name?query=${searchText}`);
      if (response?.products) {
        setSearchResults(response?.products);
        const totalResults = response.totalResults || response.products.length;
        setTotalSearchResults(totalResults.toString());
      } else {
        console.error('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{ paddingVertical: 10, gap: 14 }}>
        <StatusBar style="auto" />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 36,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icons name="arrow-back" size={24} color={COLORS.black} />
          </TouchableOpacity>

          <Text style={{ fontSize: 22, color: 'black', marginRight: 5 }}>Tìm kiếm sản phẩm</Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 16, color: 'black', marginRight: 5 }}>
            {totalSearchResults} kết quả với "{searchText}"
          </Text>
        </View>
        {isLoading ? (
          <View
            style={{
              height: Dimensions.get('window').height * 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UIActivityIndicator size={30} color={COLORS.black} />
          </View>
        ) : (
          <MasonryList
            data={searchResults}
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
                        id: item?._id,
                      });
                    }}
                  >
                    <Image
                      style={{ flex: 1 }}
                      source={{
                        uri: item?.variances[0].images[0].url,
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
                          {item?.title}
                        </Text>
                      </View>
                      <Text
                        style={{
                          textAlign: 'left',
                          color: 'white',
                          backgroundColor: 'black',
                          fontSize: 16,
                          letterSpacing: 0.5,
                          width: 90,
                        }}
                      >
                        đ {item?.price.toLocaleString()}
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
                  height: Dimensions.get('window').height * 0.75,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text>Rất tiếc, không có sản phẩm '{searchText}' nào.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text>Quay về trang tìm kiếm</Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default SearchAllResultScreen;
