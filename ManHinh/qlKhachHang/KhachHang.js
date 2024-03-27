import {
  FlatList,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, GET_LIST_KHACH_HANG } from "../../linkapi/diaChi_api";
import Item_Khach_hang from "./Item_Khach_hang";

const KhachHang = () => {
  const [listKhachHang, setlistKhachHang] = useState([]);
  const capNhat_DS = () => {
    axios
      .get(`${API_URL}${GET_LIST_KHACH_HANG}`)
      .then((response) => {
        setlistKhachHang(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    const reload = setTimeout(() => {
      capNhat_DS();
    }, 1000);

    return () => {
      clearTimeout(reload);
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={[styles.fle_ngang, { top: 10, marginBottom: 20 }]}>
        <Text style={[styles.theText, { width: "80%" }]}>
          Quản lý khách hàng
        </Text>
        <TouchableOpacity
          style={[
            styles.fle_ngang,
            { borderWidth: 1, paddingVertical: 3, paddingHorizontal: 9 },
          ]}
        >
          <Image
            style={[styles.imageIcon]}
            source={{
              uri: "https://img.icons8.com/?size=50&id=24717&format=png",
            }}
          />
          <Text>Thêm</Text>
        </TouchableOpacity>
      </View>
      {/* /// */}
      <FlatList
        showsVerticalScrollIndicator={false}
        overScrollMode="never" // Ngăn chặn hiệu ứng "bóng" khi vuốt tới cuối danh sách
        overScrollColor="transparent" // Đặt màu sắc của hiệu ứng bóng là transparent
        data={listKhachHang}
        renderItem={({ item }) => {
          return (
            <Item_Khach_hang data={item} capNhat_DS={() => capNhat_DS()} />
          );
        }}
      />
    </View>
  );
};

export default KhachHang;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingTop: 20 },
  theText: { fontSize: 24, fontWeight: "500", textAlign: "center" },
  fle_ngang: { flexDirection: "row", alignItems: "center" },
  imageIcon: { height: 20, width: 20 },
});
