import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../../linkapi/diaChi_api";
import { get_DichVu } from "../../linkapi/api_dichvu";

const NhanVien = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const fetchData = () => {
    axios
      .get(`${API_URL}${get_DichVu}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
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
            style={{ height: 50, width: 40, marginStart: 8 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            width: "80%",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Quản lý nhân viên
        </Text>
      </View>
      <Text>NhanVien</Text>
    </View>
  );
};

export default NhanVien;

const styles = StyleSheet.create({ container: { flex: 1 } });
