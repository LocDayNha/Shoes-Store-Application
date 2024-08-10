import {View,Text,TouchableOpacity,ScrollView,FlatList,ToastAndroid} from "react-native";
import React, { ReactNode, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import {SafeAreaView,useSafeAreaInsets,} from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import PriceRangeSelector from "./PriceRangeSelector";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import TextTicker from "react-native-text-ticker";
import ItemFilterBrand from "../item/ItemFilterBrand";
import AxiosIntance from "../ultil/AxiosIntance";

const MAX_PRICE = 500;

const COLORS = [
  {
    color: "#D93F3E",
    label: "Red",
  },
  {
    color: "#FFFFFF",
    label: "White",
  },
  {
    color: "#58AB51",
    label: "Green",
  },
  {
    color: "#FB8C1D",
    label: "Orange",
  },
  {
    color: "#D3B38D",
    label: "Tan",
  },
  {
    color: "#FDE737",
    label: "Yellow",
  },
];

const BRANDS = [
  "Nike",
  "Adidas",
  "Converse",
  "New Balance",
  "Vans",
  "FILA",
  "Other",
];

const FilterView = () => {

  const { colors } = useTheme();
  const [brandIndex, setBrandIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [startPrice, setStartPrice] = useState(50);
  const [endPrice, setEndPrice] = useState(250);
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const ClickIdFilter=()=>{
    navigation.navigate("FilterScreen", { id: brandIndex });
    console.log("idBrand da chon",brandIndex);
  }
 

  useEffect(() => {
    const getBrand=async()=>{
      const response=await AxiosIntance().get("/brand/get-all");
      console.log("aaa",response.brands);
      console.log(brandIndex);
      if(response.result==true)
      {
        setData(response.brands);

      }else
      {
        ToastAndroid.show("Lấy dữ liệu thất bại",ToastAndroid.SHORT)
      }
    }
    getBrand();
  }, [])
  
  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView style={{ paddingVertical: 4, gap: 24 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 24,
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: "700",
                color: theme.colors.text,
              }}
            >
              Bộ lọc
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: theme.colors.text,
                  opacity: 0.5,
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>

          {/* Range Selector */}

          <PriceRangeSelector
            minPrice={0}
            maxPrice={MAX_PRICE}
            startPrice={startPrice}
            endPrice={endPrice}
            onStartPriceChange={setStartPrice}
            onEndPriceChange={setEndPrice}
          />

          {/* Sports Category Filter */}
          <View
            style={{ flexDirection: "column", paddingHorizontal: 24, gap: 12 }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
              Thương hiệu
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 24,
            }}
          >
            {data?.map((item) => {
            
              const isSelected = brandIndex === item._id;
              return (
                <TouchableOpacity
                  key={item._id}
                  onPress={()=>(setBrandIndex(item._id)) }
                  style={{
                    backgroundColor: isSelected ? colors.primary : colors.card,
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderRadius: 100,
                    borderWidth: isSelected ? 0 : 0,
                    borderColor: colors.border,
                    width: "33%",
                    marginBottom: 5,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: isSelected ? colors.background : colors.text,
                      // fontWeight: "600",
                      fontSize: 14,
                      opacity: isSelected ? 1 : 0.6,
                      textAlign: "center",
                    }}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
            {/* {
              data.map((item) => <ItemFilterBrand key={item._id} dulieu={item} />)
            } */}
          </View>

          {/* <FlatList
          numColumns={3}
          data={BRANDS}
          vertical
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 12,
          }}
          renderItem={({ item, index }) => {
            const isSelected = brandIndex === index;
            return (
              <TouchableOpacity
                onPress={() => setBrandIndex(index)}
                style={{
                  backgroundColor: isSelected ? colors.primary : colors.card,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 100,
                  borderWidth: isSelected ? 0 : 0,
                  borderColor: colors.border,
                  width: 110,
                  justifyContent: "space-between",
                  margin: 5,
                }}
              >
                <Text
                  style={{
                    color: isSelected ? colors.background : colors.text,
                    fontWeight: "600",
                    fontSize: 14,
                    opacity: isSelected ? 1 : 0.6,
                    textAlign: "center",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        /> */}

          {/* Color Filter */}
          <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
              Màu sắc
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {COLORS.map((item, i) => {
                return (
                  <Chip
                    key={i}
                    label={item.label}
                    left={
                      <View
                        style={{
                          backgroundColor: item.color,
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                        }}
                      />
                    }
                    isSelected={i === 0}
                  />
                );
              })}
            </View>
          </View>
        </SafeAreaView>

        {/* Button */}
      </ScrollView>
      <SafeAreaView>
        <View
          style={{
            padding: 5,
          }}
        >
          <TouchableOpacity
          onPress={ClickIdFilter}
            style={{
              backgroundColor: theme.colors.primary,
              height: 64,
              borderRadius: 64,
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: theme.colors.background,
              }}
            >
              Áp dụng bộ lọc
            </Text>

            <View
              style={{
                backgroundColor: theme.colors.card,
                width: 40,
                aspectRatio: 1,
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: 12,
                right: 12,
                bottom: 12,
              }}
            >
              <Icons name="arrow-forward" size={24} color={theme.colors.text} />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default FilterView;

const Chip = ({ isSelected, label, left }) => {
  const theme = useTheme();

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 100,
        backgroundColor: isSelected
          ? theme.colors.text
          : theme.colors.background,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {left && <View style={{ marginRight: 8 }}>{left}</View>}
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            color: isSelected ? theme.colors.background : theme.colors.text,
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
