import {Image,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ToastAndroid,} from "react-native";
import React from "react";
import axios from "axios";
import { Swipeable } from "react-native-gesture-handler";
import { API_URL, DELETE_ITEM_ID_CONG_VIEC } from "../../linkapi/diaChi_api";

const Item_Cong_Viec = ({ data, capNhat_DS }) => {
  const {
    _id,
    tencongviec,
    idnhanvien,
    ngaybatdau,
    ngayketthuc,
    trangthai,
    mota,
  } = data;
  const XoaItem = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}${DELETE_ITEM_ID_CONG_VIEC}${_id}`
      );
      console.log(response.data);
      capNhat_DS();
    } catch (error) {
      console.error("Error deleting item:", error);
      Alert.alert("Error", "Failed to delete item. Please try again later.");
    }
  };

  const renderRightActions = (progress, dragX) => {
    return (
      <View style={styles.rightActions}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "blue",
            justifyContent: "center",
            paddingVertical: 20,
            marginEnd: 10,
            flex: 1,
          }}
          onPress={() => {
            /* Xử lý sự kiện khi nhấn nút "Sửa" */
          }}
        >
          <Text style={styles.actionText}>Sửa</Text>
        </TouchableOpacity>
        <View style={{ height: 3 }}></View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "red",
            justifyContent: "center",
            paddingVertical: 20,
            marginEnd: 10,
            flex: 1,
          }}
          onPress={() => {
            console.log(_id);
            Alert.alert("Bạn có chắc muốn xóa không", "", [
              { text: "Hủy" },
              {
                text: "Đồng ý",
                onPress: () => {
                  XoaItem();
                  ToastAndroid.show("Xóa Thành công", ToastAndroid.SHORT);
                },
              },
            ]);
          }}
        >
          <Text style={[styles.actionText]}>Xóa</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        {/* <Image source={{ uri: anh }} style={styles.image} /> */}
        <View style={styles.info}>
          <Text style={styles.title}>{tencongviec}</Text>
          <Text>ID nhân viên: {idnhanvien}</Text>
          <Text>Ngày bắt đầu: {ngaybatdau}</Text>
          <Text>Ngày kết thúc: {ngayketthuc}</Text>
          <Text>
            Trang thái: {trangthai ? "Đang hoạt động" : "Ngừng hoạt động"}
          </Text>
          <Text> Mô tả: {mota}</Text>
          
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    backgroundColor: "white",
  },
  image: {
    height: 180,
    width: 150,
    resizeMode: "stretch",
  },
  info: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 17,
  },
  expandText: {
    color: "blue",
    fontSize: 12,
  },
  rightActions: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  actionText: {
    fontSize: 12,
    paddingHorizontal: 10,
    color: "white",
    fontWeight: "600",
  },
});

export default Item_Cong_Viec;