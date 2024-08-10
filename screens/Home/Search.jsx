import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    ToastAndroid,
    FlatList,
} from "react-native";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/index";
import { MaterialIcons } from "@expo/vector-icons";
import { SIZES } from "../../constants/index";
import { useNavigation, useTheme } from "@react-navigation/native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Card from "../../components/home/Card";
import { BlurView } from "expo-blur";
import MasonryList from "reanimated-masonry-list";
import CustomBackdrop from "../../components/home/CustomBackdrop";
import ImageSlider from "../../components/home/ImagesSlider";
import { Pressable } from "react-native";
import FilterView from "../../components/home/FilterView";
import AxiosIntance from "../../components/ultil/AxiosIntance";
import { TextInput } from "react-native-gesture-handler";
import SearchTitle from "./SearchTitle";

const Search = () => {
    const { colors } = useTheme();
    const [dataNe, setdataNe] = useState([]);
    const [searchText, setSearchText] = useState("");

    const handleSearch = async () => {
        const response = await AxiosIntance().get(`/product/search?title=${searchText}`);
        if (response.result) {
            setdataNe(response.products)
        } else {
            ToastAndroid.show("Tìm kiếm thất bại")
        }
    };
    return (
        <View >
            <View style={{ flexDirection: "row", width: 460 }}>
                <View style={{
                    flexDirection: "row", flex: 1, borderRadius: 10,
                    borderWidth: 1, borderColor: colors.border, marginHorizontal: 10, marginVertical: 30,
                }}>

                    <TouchableOpacity>
                        <View>
                            <MaterialIcons name="tune" size={24} style={{ top: 12, left: 5 }} />
                        </View>
                    </TouchableOpacity>
                    <TextInput
                        onChangeText={setSearchText}
                        value={searchText}
                        style={{
                            flex: 1,
                            paddingHorizontal: 12,
                            height: 50,
                        }}
                        placeholder="Tìm kiếm sản phẩm"
                    >
                    </TextInput>
                </View>



                <View style={{ right: 60 }}>
                    <TouchableOpacity
                        onPress={() => handleSearch()}
                        style={{
                            width: 52,
                            aspectRatio: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 10,
                            backgroundColor: colors.primary, marginHorizontal: 10, marginVertical: 30,
                        }}
                    >
                        <MaterialIcons name="search" size={24} color={colors.background} />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                {dataNe.length === 0 ? (
                    <View style={{ flex: 1 }}>

                    </View>
                ) : (
                    <FlatList
                        data={dataNe}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                           <SearchTitle item={item} />
                        )}
                        style={{ marginHorizontal: 12 }}
                    />
                )}

            </View>
        </View>



    )
}

export default Search

const styles = StyleSheet.create({})