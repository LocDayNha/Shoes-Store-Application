import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import ItemListHistory from "../components/item/ItemListHistory";

const History = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <View style={styles.viewContent}>
        <View>
          <TouchableOpacity>
            <Ionicons name="arrow-back-outline" size={30} />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.text}>Transaction History</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Ionicons name="search" size={30} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={dataNe}
        renderItem={({ item }) => (
          <ItemListHistory dulieu={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginEnd: 10,
    marginLeft: 10,
    marginBottom: 30,
    flexDirection: "column",
  },
  viewContent: {
    flexDirection: "row",
    marginBottom: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 70,
  },
});

const dataNe = [
  {
    _id: "1",
    title: "Air Jordan 3 Retro",
    price: "$105",
    category: "Orders",
    level: require("../assets/images/icon_up_arrow.png"),
    image:
      "https://i1-vnexpress.vnecdn.net/2023/02/02/328463889-891024988600042-6177-9136-2603-1675295134.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=BCVEDMn0Smx1XLiCRi0rrA",
    date: "Dec 15,2024 | 10:00 AM",
  },
  {
    _id: "2",
    title: "Air Jordan 3 Retro",
    price: "$100",
    category: "Orders",
    level: require("../assets/images/icon_up_arrow.png"),
    image:
      "https://i1-vnexpress.vnecdn.net/2023/01/31/117f5804708184dfdd90-162556098-1999-1999-1675148782.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=Ie6cEqbs1YL8PDAG85QrsA",
    date: "Dec 15,2024 | 10:00 AM",
  },
  {
    _id: "3",
    title: "Air Jordan 3 Retro",
    price: "$105",
    category: "Top Up",
    level: require("../assets/images/icon_down_arrow.png"),
    image:
      "https://i1-vnexpress.vnecdn.net/2023/01/30/4313-1662984910-1675082690-4516-1675083076.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=BnjiAv8Bq8iaZcGQ2jJC3Q",
    date: "Dec 15,2024 | 10:00 AM",
  },
  {
    _id: "4",
    title: "Air Jordan 3 Retro",
    price: "$105",
    category: "Top Up",
    level: require("../assets/images/icon_down_arrow.png"),
    image:
      "https://i1-vnexpress.vnecdn.net/2023/01/31/giao-vien3-7193-1674696213-167-6044-9285-1675150549.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=GJm7EfgbBZ4Pvlut0Bl1rw",
    date: "Dec 15,2024 | 10:00 AM",
  },
  {
    _id: "5",
    title: "Air Jordan 3 Retro",
    price: "$105",
    category: "Top Up",
    level: require("../assets/images/icon_down_arrow.png"),
    image:
      "https://i1-vnexpress.vnecdn.net/2023/01/31/giao-vien3-7193-1674696213-167-6044-9285-1675150549.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=GJm7EfgbBZ4Pvlut0Bl1rw",
    date: "Dec 15,2024 | 10:00 AM",
  },
  {
    _id: "6",
    title: "Air Jordan 3 Retro",
    price: "$105",
    category: "Top Up",
    level: require("../assets/images/icon_down_arrow.png"),
    image:
      "https://i1-vnexpress.vnecdn.net/2023/01/31/giao-vien3-7193-1674696213-167-6044-9285-1675150549.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=GJm7EfgbBZ4Pvlut0Bl1rw",
    date: "Dec 15,2024 | 10:00 AM",
  },
  {
    _id: "7",
    title: "Air Jordan 3 Retro",
    price: "$105",
    category: "Top Up",
    level: require("../assets/images/icon_down_arrow.png"),
    image:
      "https://i1-vnexpress.vnecdn.net/2023/01/31/giao-vien3-7193-1674696213-167-6044-9285-1675150549.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=GJm7EfgbBZ4Pvlut0Bl1rw",
    date: "Dec 15,2024 | 10:00 AM",
  },
  {
    _id: "8",
    title: "Air Jordan 3 Retro",
    price: "$105",
    category: "Top Up",
    level: require("../assets/images/icon_down_arrow.png"),
    image:
      "https://i1-vnexpress.vnecdn.net/2023/01/31/giao-vien3-7193-1674696213-167-6044-9285-1675150549.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=GJm7EfgbBZ4Pvlut0Bl1rw",
    date: "Dec 15,2024 | 10:00 AM",
  },
  {
    _id: "9",
    title: "Air Jordan 3 Retro",
    price: "$120",
    category: "Top Up",
    level: require("../assets/images/icon_down_arrow.png"),
    image:
      "https://i1-vnexpress.vnecdn.net/2023/01/31/giao-vien3-7193-1674696213-167-6044-9285-1675150549.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=GJm7EfgbBZ4Pvlut0Bl1rw",
    date: "Dec 15,2024 | 10:00 AM",
  },
];
