import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { icon } from "../../Image";
const HoaDon_Trong_Thang = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const chuyenIchuyenDuLieutem = router.params?.chuyenDuLieu;
  const ten = router.params?.ten;
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
          height: 70,
          paddingTop: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <TouchableOpacity
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
            width: "80%",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          {ten}
        </Text>
      </View>
      <FlatList
        data={chuyenIchuyenDuLieutem}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ flexGrow: 1, padding: 10 }}
        ListEmptyComponent={<Text>Không có đơn hàng trong tháng này</Text>}
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
