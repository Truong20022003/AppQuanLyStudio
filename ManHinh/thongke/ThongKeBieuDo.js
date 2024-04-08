import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  StatusBar,
  ToastAndroid,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { icon } from "../../Image"; // Import icon từ Image hoặc nơi bạn lưu trữ icon
import { API_URL } from "../../linkapi/diaChi_api";
import {
  getHoaDonThangVaNam,
  getThongKeTongTien_NamBieuDo,
} from "../../linkapi/api.thongke";

export const Month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const DataFake = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const ThongKeBieuDo = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [doanhThuInMonth, setDoanhThuInMonth] = useState([]);
  const [getMonth, setGetMonth] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [hoaDonTrongThang, sethoaDonTrongThang] = useState([]);
  const [thang, setthang] = useState(new Date().getMonth());
  const [thongbao, setthongbao] = useState(true);
  const [showAllItems, setShowAllItems] = useState(false);
  const getDoanhThuInMonth = async () => {
    setIsLoading(true); // Bắt đầu loading
    try {
      const url = `${API_URL}${getThongKeTongTien_NamBieuDo}?year=${year}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === 200) {
        const doanhThuInYear = data.dulieu;
        const doanhThuMonth = doanhThuInYear.map((monthData) => {
          return monthData.revenue;
        });
        setDoanhThuInMonth(doanhThuMonth);
        console.log(doanhThuInYear);
        const months = doanhThuInYear.map((monthData) => monthData.month);
        setGetMonth(months);
        setthongbao(false);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu doanh thu theo tháng:", error);
    } finally {
      setIsLoading(false); // Dừng loading khi dữ liệu đã được lấy xong
    }
  };

  const GetHoaDonThangVaNam = async () => {
    setIsLoading2(true); // Bắt đầu loading
    try {
      const url = `${API_URL}${getHoaDonThangVaNam}?year=${year}&month=${
        thang + 1
      }`;
      console.log(year);
      console.log(thang + 1);
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === 200) {
        const hoaDonTT = data.orders || [];
        console.log(
          `Hóa đơn trong tháng + thang + ${thang} + "" + ${hoaDonTT}`
        );
        sethoaDonTrongThang(hoaDonTT);
        setthongbao(false);
      } else if (res.status === 304) {
        // Nếu mã trạng thái là 304, hiển thị thông báo hoặc xử lý tương ứng
        console.log("Không có hóa đơn nào trong tháng");
        sethoaDonTrongThang([]); // Đặt mảng hóa đơn trong tháng thành rỗng
        setthongbao(true); // Đặt thông báo hiển thị là true
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu doanh thu theo tháng:", error);
    } finally {
      setIsLoading2(false); // Dừng loading khi dữ liệu đã được lấy xong
    }
  };

  useEffect(() => {
    getDoanhThuInMonth();
    GetHoaDonThangVaNam();
  }, [year, navigation, thang]);

  const renderDotContent = ({ x, y, index }) => {
    if (doanhThuInMonth[index] !== 0) {
      const formattedDoanhThu = (
        doanhThuInMonth[index] / 10000
      ).toLocaleString(); // Format lại giá trị doanh thu
      return (
        <Text
          key={index}
          style={{
            position: "absolute",
            top: y - 15,
            left: x - 30,
            fontSize: 9,
            color: "#ffffff",
          }}
        >
          {formattedDoanhThu} VNĐ
        </Text>
      );
    } else {
      return null;
    }
  };

  const formatDoanhThu = (data) => {
    return data.map((value) => value / 10000);
  };

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
    GetHoaDonThangVaNam();
    console.log(`Bạn đã chọn: ${months[monthIndex]}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View>
            <StatusBar />
            <View
              style={{
                height: "auto",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                Biểu đồ doanh thu theo năm {"\n"}
                <Text style={{ fontSize: 10, fontStyle: "italic" }}>
                  (tỉ giá: 1/1000 VNĐ)
                </Text>
              </Text>
              <View style={{ width: "100%" }}>
                {isLoading ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                ) : (
                  <LineChart
                    data={{
                      labels: getMonth.length !== 0 ? getMonth : Month,
                      datasets: [
                        {
                          data:
                            doanhThuInMonth.length !== 0
                              ? formatDoanhThu(doanhThuInMonth)
                              : DataFake,
                        },
                      ],
                    }}
                    contentInset={{ left: 50 }}
                    width={Dimensions.get("window").width - 30}
                    height={220}
                    chartConfig={{
                      backgroundGradientFrom: "#2b333b",
                      backgroundGradientTo: "#002966",
                      decimalPlaces: 0,
                      color: (opacity = 1) => `rgba(128, 191, 255, ${opacity})`,
                      style: {
                        fontSize: 16,
                        borderRadius: 16,
                        paddingLeft: 20,
                        start: 100,
                      },
                      verticalLabelRotation: 450,
                      barPercentage: 1,
                    }}
                    bezier
                    style={{
                      borderRadius: 6,
                      marginVertical: 20,
                    }}
                    yAxisLabelWidth={40}
                    renderDotContent={renderDotContent}
                  />
                )}
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
                  <Image source={icon.back} style={{ width: 22, height: 22 }} />
                </TouchableOpacity>
                <Text>{year}</Text>
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
                      uri: "https://img.icons8.com/?size=50&id=61&format=png",
                    }}
                    style={{ width: 22, height: 22 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                marginVertical: 20,
                paddingHorizontal: 10,
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
                      padding: 10,
                      borderRadius: 6,
                    },
                  ]}
                  key={monthIndex}
                  onPress={() => handleMonthPress(monthIndex)}
                >
                  <Text>{month}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View
              style={{
                height: hoaDonTrongThang.length === 0 ? 100 : "auto",
                paddingHorizontal: 20,
              }}
            >
              {hoaDonTrongThang.length === 0 ? (
                <Text
                  style={{
                    fontSize: 16,
                    alignItems: "center",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Không có hóa đơn nào trong tháng {thang + 1} này
                </Text>
              ) : null}
              <FlatList
                data={
                  showAllItems ? hoaDonTrongThang : hoaDonTrongThang.slice(0, 3)
                }
                renderItem={({ item }) => {
                  return (
                    <View style={styles.itemContainer}>
                      <Text>_id hóa đơn : {item._id}</Text>
                      <Text>_id khách hàng: {item.idkhachhang}</Text>
                      <Text>Ngày đặt hàng: {item.ngaydathang}</Text>
                      <Text>Ngày trả hàng: {item.ngaytrahang}</Text>
                    </View>
                  );
                }}
                ListFooterComponent={
                  hoaDonTrongThang.length > 3 && (
                    <View style={{ alignSelf: "center" }}>
                      {showAllItems ? (
                        <TouchableOpacity
                          onPress={() => setShowAllItems(false)}
                        >
                          <Text style={styles.viewMore}>Ẩn</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={() => setShowAllItems(true)}>
                          <Text style={styles.viewMore}>Xem thêm</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )
                }
              />
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
    paddingHorizontal: 20,
  },
  monthButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginRight: 10,
  },
  monthText: {
    fontSize: 16,
  },
  itemContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 5, // Độ nổi lên của phần tử
    shadowColor: "#000", // Màu của bóng
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Độ trong suốt của bóng
    shadowRadius: 3.84, // Độ rộng của bóng
  },
  viewMore: { fontSize: 20 },
});

export default ThongKeBieuDo;
