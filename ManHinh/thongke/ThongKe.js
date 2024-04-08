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
  Dimensions,
} from "react-native";
import { API_URL } from "../../linkapi/diaChi_api";
import {
  getSoLuongDonHangTheoThangNamFalse,
  getSoLuongDonHangTheoThangNamTrue,
  getTongTienVaHoadonTrongNam,
} from "../../linkapi/api.thongke";
import { useNavigation } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import { icon } from "../../Image";
import ThongKeBieuDo from "./ThongKeBieuDo";

const ThongKe = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [thang, setthang] = useState(new Date().getMonth() + 1);
  const [soLuongTKTrue, setsoLuongTKTrue] = useState(0);
  const [soLuongTKFalse, setsoLuongTKFalse] = useState(0);
  const [dataTrueSoLuong, setdataTrueSoLuong] = useState([]);
  const [dataFalseSoLuong, setdataFalseSoLuong] = useState([]);
  useEffect(() => {
    GetSoLuongDonHangTheoThangNamTrue();
    GetSoLuongDonHangTheoThangNamFalse();
  }, []);
  const GetSoLuongDonHangTheoThangNamTrue = async () => {
    try {
      const url = `${API_URL}${getSoLuongDonHangTheoThangNamTrue}?year=${year}&month=${thang}`;
      console.log(year);
      console.log(thang + 1);
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === 200) {
        const tongsodon = data.tongsodon || [];
        console.log(`so luong thanh cong+ ${thang}  "" ${tongsodon}`);
        setsoLuongTKTrue(tongsodon);
        const danhsach = data.danhsach || [];
        setdataTrueSoLuong(danhsach);
      } else if (res.status === 304) {
        console.log("Không có so luong nào trong tháng");
        setsoLuongTKTrue([]); // Đặt mảng hóa đơn trong tháng thành rỗng
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu doanh thu theo tháng:", error);
    }
  };
  const GetSoLuongDonHangTheoThangNamFalse = async () => {
    try {
      const url = `${API_URL}${getSoLuongDonHangTheoThangNamFalse}?year=${year}&month=${thang}`;
      console.log(year);
      console.log(thang + 1);
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === 200) {
        const tongsodon = data.tongsodon || [];
        console.log(`so luong khong thanh cong+ ${thang}  "" ${tongsodon}`);
        setsoLuongTKFalse(tongsodon);
        const danhsach = data.danhsach || [];
        setdataFalseSoLuong(danhsach);
      } else if (res.status === 304) {
        console.log("Không có soluong nào trong tháng");
        setsoLuongTKTrue([]); // Đặt mảng hóa đơn trong tháng thành rỗng
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu doanh thu theo tháng:", error);
    }
  };
  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <FlatList
        ListHeaderComponent={
          <View>
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
            <ThongKeBieuDo />
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("HoaDon_Trong_Thang", {
                    chuyenDuLieu: dataTrueSoLuong,
                    ten: "Danh sách số lượng đơn hàng đã thanh toán",
                  })
                }
              >
                <Text
                  style={[
                    styles.theText,
                    { textAlign: "left", marginStart: 20, fontSize: 16 },
                  ]}
                >
                  Số lượng đơn hàng thành có trạng thái thành công trong tháng
                  {thang}/{year} là: {soLuongTKTrue}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("HoaDon_Trong_Thang", {
                    chuyenDuLieu: dataFalseSoLuong,
                    ten: "Danh sách số lượng đơn hàng chưa thanh toán",
                  })
                }
              >
                <Text
                  style={[
                    styles.theText,
                    { textAlign: "left", marginStart: 20, fontSize: 16 },
                  ]}
                >
                  Số lượng đơn hàng thành có trạng thái không thành công trong
                  tháng
                  {thang}/{year} là: {soLuongTKFalse}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  error: { color: "red" },
  theText: { textAlign: "center", fontSize: 16 },
});

export default ThongKe;
