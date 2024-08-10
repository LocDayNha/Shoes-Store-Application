import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const ItemListHistory = (props) => {
  const { dulieu } = props;
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.image}
            source={require("../../assets/images/fn5.jpg")}
          />
        </View>
        <View style={styles.view1}>
          <Text style={styles.textName}>{dulieu?.title}</Text>
          <Text style={styles.textDate}>{dulieu?.date}</Text>
        </View>
        <View style={styles.view2}>
          <Text style={styles.textPrice}>{dulieu?.price}</Text>
          <View style={styles.view3}>
            <Text style={styles.textCategory}>{dulieu?.category}</Text>
            <Image style={styles.icon} source={dulieu?.level} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemListHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 30,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  icon: {
    width: 25,
    height: 25,
    marginTop: 5,
  },
  view1: {
    flexDirection: "column",
  },
  view2: {
    flexDirection: "column",
  },
  view3: {
    flexDirection: "row",
    marginLeft: 15,
  },
  textName: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  textDate: {
    marginLeft: 20,
    marginTop: 10,
  },
  textCategory: {
    marginTop: 10,
  },
  textPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 35,
  },
});
