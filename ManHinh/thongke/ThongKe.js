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
  ToastAndroid,
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
import { ScrollView } from "react-native";

const ThongKe = (props) => {
  const navigation = useNavigation();
  const [year, setYear] = useState(new Date().getFullYear());
  const [thang, setthang] = useState(new Date().getMonth());
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
      const url = `${API_URL}${getSoLuongDonHangTheoThangNamTrue}?year=${year}&month=${
        thang + 1
      }`;
      console.log(year);
      console.log(thang + 1);
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === 200) {
        const tongsodon = data.tongsodon || [];
        console.log(`so luong thanh cong+ ${thang}  "" ${tongsodon}`);
        setsoLuongTKTrue(tongsodon);
        const danhsach = data.danhsach;
        console.log(danhsach);
        setdataTrueSoLuong(danhsach);
      } else if (res.status === 304) {
        console.log("Không có so luong nào trong tháng");
        setsoLuongTKTrue([]); // Đặt mảng hóa đơn trong tháng thành rỗng
      }
    } catch (error) {
      console.error(
        "Lỗi khi lấy dữ liệu doanh thu theo tháng trang thai true:",
        error
      );
    }
  };
  const GetSoLuongDonHangTheoThangNamFalse = async () => {
    try {
      const url = `${API_URL}${getSoLuongDonHangTheoThangNamFalse}?year=${year}&month=${
        thang + 1
      }`;
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
      console.error(
        "Lỗi khi lấy dữ liệu doanh thu theo tháng trang thai false:",
        error
      );
    }
  };
  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const handleMonthPress = (monthIndex) => {
    setthang(monthIndex); // Thay vì setthang(monthIndex + 1);
    console.log(`Bạn đã chọn: ${months[monthIndex]}`);
  };
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                padding: 4,
                justifyContent: "center",
                top: -10,
              }}
            >
              <TouchableOpacity onPress={() => setYear(year - 1)}>
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=24&id=100536&format=png",
                  }}
                  style={{ width: 22, height: 22 }}
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 25, marginHorizontal: 10 }}>{year}</Text>
              <TouchableOpacity
                onPress={() => {
                  if (year === new Date().getFullYear()) {
                    ToastAndroid.show(
                      "Năm hiẹn tại là năm 2024",
                      ToastAndroid.SHORT
                    );
                  } else {
                    setYear(year + 1);
                  }
                }}
              >
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=24&id=87733&format=png",
                  }}
                  style={{ width: 22, height: 22 }}
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                paddingHorizontal: 5,
                marginBottom: 5,
              }}
            >
              {months.map((month, monthIndex) => (
                <TouchableOpacity
                  style={[
                    {
                      marginHorizontal: 5,
                      alignItems: "center",
                      justifyContent: "center",
                    },
                    thang === monthIndex && {
                      backgroundColor: "#e0e0eb", // Thay đổi màu khi được chọn
                      opacity: 0.6,
                      borderRadius: 6,
                      borderColor: "black",
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      borderBottomWidth: 1,
                    },
                  ]}
                  key={monthIndex}
                  onPress={() => handleMonthPress(monthIndex)}
                >
                  <Text>{month}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <ThongKeBieuDo thang={thang} year={year} />
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("HoaDon_Trong_Thang", {
                    chuyenDuLieu: dataTrueSoLuong,
                    ten: `Có ${soLuongTKTrue} đơn hàng thanh toán thành công`,
                  })
                }
              >
                <Text
                  style={[
                    styles.theText,
                    { textAlign: "left", marginStart: 20, fontSize: 14 },
                  ]}
                >
                  Số lượng đơn hàng đã thanh toán trong {thang + 1}/{year} là:{" "}
                  {soLuongTKTrue}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("HoaDon_Trong_Thang", {
                    chuyenDuLieu: dataFalseSoLuong,
                    ten: `Có ${soLuongTKFalse} đơn hàng thanh toán không thành công`,
                  })
                }
              >
                <Text
                  style={[
                    styles.theText,
                    { textAlign: "left", marginStart: 20, fontSize: 14 },
                  ]}
                >
                  Số lượng đơn hàng chưa thanh toán trong {thang + 1}/{year} là:{" "}
                  {soLuongTKFalse}
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
