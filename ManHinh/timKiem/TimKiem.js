import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import TIP_tim_kiem from "../../Custom/TIP_tim_kiem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../../linkapi/diaChi_api";
import { searchDichVuByName } from "../../linkapi/api_dichvu";
import { useNavigation } from "@react-navigation/native";
import { icon } from "../../Image";
const TimKiem = (props) => {
  const navigation = useNavigation();
  const [ketQuaTimKiem, setKetQuaTimKiem] = useState([]);
  const [chuoiTimKiem, setChuoiTimKiem] = useState("");
  const [lichSuTimKiem, setLichSuTimKiem] = useState([]);
  const [dangTai, setDangTai] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [thongbao, setthongbao] = useState(true);
  useEffect(() => {
    taiLichSuTimKiem();
  }, []);

  const xuLyTimKiem = (chuoi) => {
    setChuoiTimKiem(chuoi);
    clearTimeout(typingTimeout); // Xóa timeout trước đó nếu có
    // Đặt timeout mới
    const newTimeout = setTimeout(() => {
      if (chuoi.trim() !== "") {
        layKetQuaTimKiem(chuoi);
      } else {
        setKetQuaTimKiem([]);
        setthongbao(true);
      }
    }, 1000); // Chờ 1 giây sau khi ngừng nhập để lưu từ khóa
    setTypingTimeout(newTimeout);
  };

  const layKetQuaTimKiem = async (chuoi) => {
    setDangTai(true);
    try {
      const phanHoi = await axios.get(
        `${API_URL}${searchDichVuByName}?ten=${encodeURIComponent(chuoi)}`
      );
      if (phanHoi.data.status === 200) {
        setKetQuaTimKiem(phanHoi.data.timkiem);
        luuLichSuTimKiem(chuoi);
        setthongbao(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setKetQuaTimKiem([]);
        setthongbao(false);
      } else {
        console.error("Lỗi khi tìm kiếm:", error);
        setKetQuaTimKiem([]);
      }
    } finally {
      setDangTai(false);
    }
  };

  const luuLichSuTimKiem = async (chuoi) => {
    try {
      if (chuoi.trim() !== "") {
        let lichSu = [];
        const duLieu = await AsyncStorage.getItem("lichSuTimKiem");
        if (duLieu) {
          lichSu = JSON.parse(duLieu);
        }
        if (!lichSu.includes(chuoi)) {
          lichSu.unshift(chuoi);
          lichSu = lichSu.slice(0, 10);
          await AsyncStorage.setItem("lichSuTimKiem", JSON.stringify(lichSu));
          setLichSuTimKiem(lichSu);
        }
      }
    } catch (loi) {
      console.error("Lỗi khi lưu lịch sử tìm kiếm:", loi);
    }
  };

  const taiLichSuTimKiem = async () => {
    try {
      const duLieu = await AsyncStorage.getItem("lichSuTimKiem");
      if (duLieu) {
        setLichSuTimKiem(JSON.parse(duLieu));
      }
    } catch (loi) {
      console.error("Lỗi khi tải lịch sử tìm kiếm:", loi);
    }
  };

  const xoaLichSuTimKiem = async () => {
    try {
      await AsyncStorage.removeItem("lichSuTimKiem");
      setLichSuTimKiem([]);
    } catch (loi) {
      console.error("Lỗi khi xóa lịch sử tìm kiếm:", loi);
    }
  };
  const xoaMotMucLichSuTimKiem = async (muc) => {
    try {
      const newLichSu = lichSuTimKiem.filter((item) => item !== muc);
      await AsyncStorage.setItem("lichSuTimKiem", JSON.stringify(newLichSu));
      setLichSuTimKiem(newLichSu);
    } catch (loi) {
      console.error("Lỗi khi xóa mục lịch sử tìm kiếm:", loi);
    }
  };
  const hienThiMucTimKiem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: "auto",
        margin: 5,
      }}
    >
      <TouchableOpacity
        onPress={() => xuLyTimKiem(item)}
        style={{ width: "90%", flexDirection: "row", alignItems: "center" }}
      >
        <Image
          source={{
            uri: "https://img.icons8.com/?size=50&id=H0JqzxqGxPQm&format=png",
          }}
          style={{ height: 17, width: 17, marginEnd: 10 }}
        />
        <Text>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ height: 15 }}
        onPress={() => {
          Alert.alert("Bạn cóa chắc muốn xóa không", "", [
            { text: "Hủy" },
            { text: "OK", onPress: () => xoaMotMucLichSuTimKiem(item) },
          ]);
        }}
      >
        <Image
          source={{
            uri: "https://img.icons8.com/?size=50&id=6483&format=png",
          }}
          style={{ height: 20, width: 20 }}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={{ height: 40, marginBottom: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{ height: 30, width: 40 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={{
                uri: "https://img.icons8.com/?size=50&id=11511&format=png",
              }}
              style={{ height: 30, width: 30 }}
            />
          </TouchableOpacity>
          <TIP_tim_kiem
            placeholder="Nhập dịch vụ bạn muốn tìm"
            style={styles.textInput}
            onChangeText={xuLyTimKiem}
            value={chuoiTimKiem}
          />
        </View>
        <View
          style={{
            width: "60%",
            height: 0.5,
            backgroundColor: "black",
            alignSelf: "center",
            top: -10,
          }}
        />
      </View>
      <View style={{ height: lichSuTimKiem.length > 0 ? "auto" : 0 }}>
        <Text style={styles.theText}>Lịch sử tìm kiếm:</Text>
        {lichSuTimKiem.length > 0 && (
          <View>
            <FlatList data={lichSuTimKiem} renderItem={hienThiMucTimKiem} />
            <TouchableOpacity
              onPress={() => {
                Alert.alert("bạn có chắc muốn xóa không", "", [
                  { text: "Hủy" },
                  {
                    text: "OK",
                    onPress: () => {
                      xoaLichSuTimKiem();
                    },
                  },
                ]);
              }}
            >
              <Text
                style={{ fontSize: 13, width: "100%", textAlign: "center" }}
              >
                Xóa lịch tất cả
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={{ marginTop: 10, flex: 1 }}>
        {ketQuaTimKiem.length === 0 && !dangTai && (
          <Text style={{ width: "100%", fontSize: 20 }}>
            {thongbao ? "Nhập dịch vụ cần tìm" : "Không tìm thấy dịch vụ"}
          </Text>
        )}
        {dangTai ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <View style={{ height: "auto" }}>
            <FlatList
              data={ketQuaTimKiem}
              overScrollMode="never" // Ngăn chặn hiệu ứng "bóng" khi vuốt tới cuối danh sách
              overScrollColor="transparent" // Đặt màu sắc của hiệu ứng bóng là transparent
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Chi_tiet_dich_vu", {
                      chuyenItem: item,
                    });
                  }}
                  style={{
                    height: 60,
                    alignItems: "center",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  <Image
                    source={{ uri: item.anh[0] }}
                    style={{
                      height: 35,
                      width: 35,
                      marginEnd: 10,
                      borderRadius: 20,
                      resizeMode: "stretch",
                    }}
                  />
                  <Text
                    style={[styles.theText, { flex: 1, fontWeight: "500" }]}
                  >
                    {item.ten}
                  </Text>
                  <Image
                    source={{
                      uri: "https://img.icons8.com/?size=50&id=36944&format=png",
                    }}
                    style={{ height: 20, width: 20 }}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item._id.toString()}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default TimKiem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: "white",
  },
  textInput: {
    backgroundColor: "white",
  },
  theText: { fontSize: 20 },
  timkiem: {
    zIndex: -1,
    position: 1,
  },
});
