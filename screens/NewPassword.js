import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SIZES, COLORS } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import CheckBox from "react-native-check-box";
import { Button } from "react-native";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [isSecureEntry1, setIsSecureEntry1] = useState(true);
  const [isSecureEntry2, setIsSecureEntry2] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={{ width: 350, height: 300 }}
          source={require("../assets/images/newpass.jpg")}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: SIZES.xLarge }}>
            Create Your New Password
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            borderRadius: 5,
            borderWidth: 0.5,
            marginTop: 35,
          }}
        >
          <Ionicons
            style={{ padding: 5 }}
            name="lock-closed"
            size={24}
            color="grey"
          />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={isSecureEntry1}
            style={{ width: 250,  }}
            placeholder="Password"
          />
          <Ionicons
            style={{ padding: 5 }}
            name={isSecureEntry1 ? "eye" : "eye-off"}
            size={24}
            color="grey"
            onPress={() => setIsSecureEntry1(!isSecureEntry1)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            borderRadius: 5,
            borderWidth: 0.5,
            marginTop: 15,
          }}
        >
          <Ionicons
            style={{ padding: 5 }}
            name="lock-closed"
            size={24}
            color="grey"
          />
          <TextInput
            value={repassword}
            onChangeText={(text) => setRePassword(text)}
            secureTextEntry={isSecureEntry2}
            style={{ width: 250,  }}
            placeholder="Re-Password"
          />
          <Ionicons
            style={{ padding: 5 }}
            name={isSecureEntry2 ? "eye" : "eye-off"}
            size={24}
            color="grey"
            onPress={() => setIsSecureEntry2(!isSecureEntry2)}
          />
        </View>

        <View style={{ marginTop: 30 }} />

        <TouchableOpacity
          style={{
            width: 300,
            backgroundColor: "#D80032",
            borderRadius: 10,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: COLORS.white,
              fontSize: SIZES.Large,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  checkbox: {
    flexDirection: "row",
    marginLeft: 3,
    marginTop: 15,
  },
  text: {
    flexDirection: "row",
    marginLeft: 10,
    justifyContent: "center",
    top: 10,
  },
  imgView: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  img: {
    width: 50,
    height: 50,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 10,
    resizeMode: "center",
  },
});
