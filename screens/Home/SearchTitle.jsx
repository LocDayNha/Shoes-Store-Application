import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants'
import ProductDetail from '../../components/products/ProductDetail'
import { useNavigation } from '@react-navigation/native'

const SearchTitle = ({ item }) => {
    const navigation = useNavigation();
    return (
        <View>
            <TouchableOpacity onPress={() => {
                navigation.navigate("ProductDetail", {
                    id: item._id
                });
            }} style={styles.container}>
                <View style={styles.image}>
                    <Image source={{ uri: item.image }} style={styles.productImg} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.productTitle}>Sản phẩm: {item.title}</Text>
                    <Text style={{ color: COLORS.gray }}>Size: {item.size}</Text>
                    <Text style={{ color: COLORS.gray }}>Màu: {item.color}</Text>
                    <Text style={{ color: COLORS.red }}>Giá: {item.price}$</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default SearchTitle

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SIZES.small,
        flexDirection: "row",
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        backgroundColor: "#fff",
        elevation: 5,

    },
    image: {
        width: 70,
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignContent: "center",
    },
    productImg: {
        width: "100%",
        height: 65,
        borderRadius: SIZES.small,
        resizeMode: "cover",
    },
    textContainer: {
        flex: 1,
        marginHorizontal: SIZES.medium,

    },
    productTitle: {
        fontSize: SIZES.medium,
        fontWeight: "bold",
        color: COLORS.primary,
    },
})