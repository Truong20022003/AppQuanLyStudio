import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image,
} from "react-native";
import { API_URL } from "../../linkapi/diaChi_api";
import { getTongTienVaHoadonTrongNam } from "../../linkapi/api.thongke";
import { useNavigation } from "@react-navigation/native";

const ThongKe = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [hoadoans, setHoadons] = useState([]);
  const [tongtien, settongtien] = useState(0);
  const [yearInput, setYearInput] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${API_URL}${getTongTienVaHoadonTrongNam}?year=${yearInput}`
      );
      const json = await response.json();
      console.log(json);
      const hoadons = json.hoadons || [];
      const tongtientrongthang = json.tongTienTrongNam || 0;
      setHoadons(hoadons);
      settongtien(tongtientrongthang);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ API: ", error);
      setLoading(false); // Dừng loading khi gặp lỗi
    }
  };

  const handleYearChange = (text) => {
    setYearInput(text);
  };

  const handleFetchData = () => {
    fetchData();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View
        style={{
          flexDirection: "row",
          height: 70,
          paddingTop: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/?size=30&id=59832&format=png",
            }}
            style={{ height: 45, width: 40, marginStart: 8 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 26,
            width: "80%",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Thống kê dữ liệu
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nhập năm"
        value={yearInput}
        onChangeText={handleYearChange}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleFetchData}>
        <Text style={styles.buttonText}>Tính tổng năm</Text>
      </TouchableOpacity>
      <Text>
        Tổng tiền trong năm {yearInput}: {tongtien}
      </Text>
      <FlatList
        data={hoadoans}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>ID: {item._id}</Text>
            <Text>Ngày đặt hàng: {item.ngaydathang}</Text>
            <Text>Tổng tiền: {item.tongtien}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default ThongKe;
