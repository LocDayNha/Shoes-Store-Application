import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const ItemThongBao = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Today</Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          backgroundColor: "#FFFAF0",
        }}
      >
        <TouchableOpacity style={styles.circle}>
          <Image
            style={styles.image}
            source={require("../../assets/images/fn2.jpg")}
          ></Image>
        </TouchableOpacity>
        <View style={{ flexDirection: "column" }}>
          <Text
            style={[
              styles.text,
              { fontSize: 18, marginLeft: 20, marginVertical: 10 },
            ]}
          >
            30% Special Discount!
          </Text>
          <Text
            style={[
              styles.text,
              { fontSize: 13, marginLeft: 20, fontWeight: "normal" },
            ]}
          >
            30% Special Discount!
          </Text>
        </View>
        <Text style={{ fontSize: 10, marginLeft: 40, marginVertical: 45 }}>
          Mon,12:09
        </Text>
      </View>
    </View>
  );
};

export default ItemThongBao;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginStart: 10,
    marginEnd: 10,
    marginTop: 40,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
  circle: {
    width: 65,
    height: 65,
    borderRadius: 50,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
