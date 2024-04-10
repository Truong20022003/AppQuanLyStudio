import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { icon } from "../../Image";
const HoaDon_Trong_Thang = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const { ten, chuyenDuLieu } = router.params;
  console.log(ten);
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>_id hóa đơn : {item._id}</Text>
      <Text>_id khách hàng: {item.idkhachhang}</Text>
      <Text>
        Trạng thái: {item.trangthai ? "Đã thanh toán " : "Chưa thanh toán"}
      </Text>

      <Text>Ngày đặt hàng: {item.ngaydathang}</Text>
      <Text>Ngày trả hàng: {item.ngaytrahang}</Text>
      {/* Hiển thị các thông tin khác của đơn hàng */}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          height: "auto",
          paddingTop: 20,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <TouchableOpacity
          style={{ height: 35, width: 35 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={icon.back}
            style={{ height: 35, width: 35, marginStart: 8 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            flex: 1,
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          {ten}
        </Text>
      </View>
      <FlatList
        data={chuyenDuLieu}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ flexGrow: 1, padding: 10 }}
        ListEmptyComponent={
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
              }}
            >
              Không có đơn hàng trong tháng này
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default HoaDon_Trong_Thang;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
    paddingHorizontal: 10,
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
});
