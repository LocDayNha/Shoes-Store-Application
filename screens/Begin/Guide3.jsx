import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
const windowWIdth = Dimensions.get("window").width;

const Guide1 = () => {
  return (
    <View>
      <Image
        style={styles.image}
        source={require("../../assets/images/guide1.png")}
      />
      <View>
        <Text style={styles.textContent}>
          Let's fulfill your fashion need with Shoes right now!
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.buttonNext}>
          <Text style={styles.textNext}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Guide1;

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 350,
    marginTop: 100,
    marginLeft: 30,
    marginBottom: 40,
  },
  textContent: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
  },
  buttonNext: {
    height: 48,
    backgroundColor: "black",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
    marginLeft: 20,
    width: windowWIdth - 40,
  },
  textNext: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
