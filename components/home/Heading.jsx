import { StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

const Heading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitlte}>Khám phá ngay</Text>
        <TouchableOpacity>
          <Ionicons name="ios-grid" size={24} color={COLORS.red} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
    marginHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitlte: {
    fontFamily: "semibold",
    fontSize: SIZES.xLarge,
    color: COLORS.red,
  },
});
