import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { get_HoaDonChiTiet_ByIdHoaDon } from "../../linkapi/api_hoadonchitiet";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API_URL } from "../../linkapi/diaChi_api";
import { get_Dichvu_ById } from "../../linkapi/api_dichvu";
import { icon } from "../../Image";

const HoaDonChiTiet = () => {
  const route = useRoute();
  const { idHoaDon } = route.params;
  const navigation = useNavigation();
  const [datas, setDatas] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const fetchListHoaDonChiTiet = async () => {
    try {
      const response = await fetch(
        `${API_URL}${get_HoaDonChiTiet_ByIdHoaDon}${idHoaDon}`
      );
      const data = await response.json();
      setDatas(data.result || []);
      setRefreshing(false); // Sử dụng setRefreshing để dừng hiển thị loader
    } catch (error) {
      console.error("Lỗi khi lấy danh sách dịch vụ", error);
    }
  };

  useEffect(() => {
    fetchListHoaDonChiTiet();
  }, [idHoaDon]);
  const handleRefresh = () => {
    setRefreshing(true); // Bắt đầu hoạt động tải lại
    fetchListHoaDonChiTiet(); // Gọi hàm fetchData() để tải lại dữ liệu từ API
  };
  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <View style={styles.flex_ngang}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={icon.back}
            style={{ height: 30, width: 30, resizeMode: "stretch" }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, flex: 1, textAlign: "center" }}>
          Hóa đơn chi tiết
        </Text>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        data={datas}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item._id.toString()}
      />
    </View>
  );
};

const RenderItem = ({ item }) => {
  const [anhDichVu, setAnhDichVu] = useState(null);
  const [tendv, settendv] = useState("");
  useEffect(() => {
    const fetchDichVuById = async () => {
      try {
        const response = await fetch(
          `${API_URL}${get_Dichvu_ById}${item.iddichvu}`
        );
        const data = await response.json();
        const result = data.result || {};
        const anh = result.anh ? result.anh[0] : null; // Kiểm tra xem có hình ảnh hay không
        const ten = result.ten;
        setAnhDichVu(anh);
        settendv(ten);
        console.log(typeof result.anh);
        console.log(typeof result.ten);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin dịch vụ:", error);
      }
    };

    fetchDichVuById();
  }, [item.iddichvu]);

  return (
    <View style={styles.item1}>
      <Image
        source={{ uri: anhDichVu }}
        style={{ width: 120, height: 140, resizeMode: "stretch" }}
      />
      <View style={styles.item2}>
        <Text style={{ color: "red" }}>ID hóa đơn: {item.idhoadon}</Text>
        <Text style={{ color: "red" }}>ID dịch vụ: {item.iddichvu}</Text>
        <Text style={{ color: "red" }}>ten dv: {tendv}</Text>
        <Text style={{ color: "red" }}>Thành tiền: {item.thanhtien}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item1: {
    height: "auto",
    flex: 1,
    margin: 10,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5, // Thêm thuộc tính elevation để tạo hiệu ứng nổi lên
    backgroundColor: "#FFFFFF", // Tùy chỉnh màu nền nếu cần
    borderRadius: 10, // Tùy chỉnh bo tròn nếu cần
    shadowColor: "#000000", // Tùy chỉnh màu shadow
    shadowOffset: { width: 0, height: 2 }, // Tùy chỉnh độ lệch shadow
    shadowOpacity: 0.25, // Tùy chỉnh độ mờ shadow
    shadowRadius: 3.84, // Tùy chỉnh bán kính shadow
  },
  item2: {
    flexDirection: "column",
    marginLeft: 10,
    top: 0,
  },
  flex_ngang: { flexDirection: "row", alignItems: "center" },
});

export default HoaDonChiTiet;
