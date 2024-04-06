import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  ToastAndroid,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  ADD_ITEM_ID_DICH_VU,
  API_URL,
  GET_LIST_DICH_VU,
} from "../../linkapi/diaChi_api";
import Item_Dich_vu from "./Item_Dich_vu";
import TextInputCustom from "../../Custom/Text_Input_custom";
import Button_custom from "../../Custom/Button_custom";
import * as ImagePicker from "expo-image-picker";
import { get_DichVu, post_DichVu, put_DichVu } from "../../linkapi/api_dichvu";
import { RefreshControl } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
const DichVu = () => {
  const navigation = useNavigation();
  const [listDichVu, setlistDichVu] = useState([]);
  const [showModalThem, setshowModalThem] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State để theo dõi trạng thái của hoạt động tải lại
  const [Ten, setTen] = useState("");
  const [Gia, setGia] = useState(0);
  const [TrangThai, setTrangThai] = useState(true);
  const [moTa, setmoTa] = useState("");
  const [anh, setanh] = useState([]);
  /////
  const [errorTen, seterrorTen] = useState("");
  const [errorGia, seterrorGia] = useState("");
  const [errormoTa, seterrormoTa] = useState("");
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true, // Cho phép chọn nhiều ảnh
    });

    if (!result.cancelled) {
      let selectedImages = result.assets.map((asset) => asset.uri);
      // Thêm các ảnh đã chọn vào state anh
      setanh([...anh, ...selectedImages]);
    }
  };
  const handcheckTen = (text) => {
    if (text.trim() === "") {
      seterrorTen("Không được để trống");
    } else {
      seterrorTen("");
    }
    setTen(text);
  };
  const handcheckGia = (text) => {
    if (text.trim() === "") {
      seterrorGia("Không được để trống");
    } else {
      seterrorGia("");
    }
    setGia(parseFloat(text));
  };
  const handcheckmoTa = (text) => {
    if (text.trim() === "") {
      seterrormoTa("Không được để trống");
    } else {
      seterrormoTa("");
    }
    setmoTa(text);
  };
  const capNhat_DS = () => {
    axios
      .get(`${API_URL}${get_DichVu}`)
      .then((response) => {
        setlistDichVu(response.data);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    capNhat_DS();
  }, []);
  const handleRefresh = () => {
    setRefreshing(true); // Bắt đầu hoạt động tải lại
    capNhat_DS(); // Gọi hàm fetchData() để tải lại dữ liệu từ API
  };
  const ThemItem = async () => {
    if (Ten.trim() === "") {
      seterrorTen("Bạn chưa nhập tên");
      return;
    }

    if (isNaN(Gia) || Gia <= 0) {
      seterrorGia("Giá phải là số và giá lớn hơn 0");
      return; // Dừng thực thi nếu giá không hợp lệ
    }
    if (moTa.trim() === "") {
      seterrormoTa("Bạn chưa nhập mô tả ");
      return;
    }
    if (anh.length === 0) {
      ToastAndroid.show("Vui lòng chọn ảnh trước", ToastAndroid.SHORT);
      return;
    }

    const formData = new FormData();
    formData.append("ten", Ten);
    formData.append("gia", Gia);
    formData.append("trangthai", TrangThai);
    formData.append("mota", moTa);
    anh.forEach((image, index) => {
      formData.append("anh", {
        uri: image,
        type: "image/jpeg", // hoặc 'image/png'
        name: `photo_${index}.jpg`,
      });
    });

    try {
      let res = await axios.post(`${API_URL}${post_DichVu}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      let responseJson = res.data;
      console.log(responseJson, "result");
      if (responseJson.status === 200) {
        ToastAndroid.show("Thêm thành công", ToastAndroid.SHORT);
        setshowModalThem(false);
        capNhat_DS();
        setTen("");
        setGia(0);
        setTrangThai(true);
        setmoTa("");
        setanh([]);
      } else {
        ToastAndroid.show("Thêm không thành công", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Lỗi khi thêm mục:", error);
      alert("Lỗi khi tải lên mục. Vui lòng thử lại sau.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View
        style={[
          styles.fle_ngang,
          { top: 10, marginBottom: 20, flexWrap: "wrap" },
        ]}
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
            style={{ height: 45, width: 40, marginStart: 20 }}
          />
        </TouchableOpacity>
        <Text style={[styles.theText, { width: "60%" }]}>Quản lý dịch vụ</Text>
        <TouchableOpacity
          onPress={() => setshowModalThem(!showModalThem)}
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
        overScrollMode="never" // Ngăn chặn hiệu ứng "bóng" khi vuốt tới cuối danh sách
        overScrollColor="transparent" // Đặt màu sắc của hiệu ứng bóng là transparent
        data={listDichVu}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => {
          return <Item_Dich_vu data={item} capNhat_DS={() => capNhat_DS()} />;
        }}
      />
      {/* modal them */}
      <Modal
        transparent={true}
        visible={showModalThem}
        animationType="slide"
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          onPress={() => {
            setshowModalThem(!showModalThem);
            setTen("");
            setGia(0);
            setTrangThai(true);
            setmoTa("");
            seterrorTen("");
            seterrorGia("");
            seterrormoTa("");
            setanh([]);
          }}
          style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        />
        <View
          style={{
            height: "auto",
            justifyContent: "flex-end",
            backgroundColor: "white",
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}
        >
          <View>
            <Text style={[styles.theText]}>Thêm dịch vụ</Text>
            {/* 1 */}
            <View
              style={[
                styles.cuc1,
                { height: 110, justifyContent: "space-between" },
              ]}
            >
              <Text
                style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}
              >
                Tên dịch vụ
              </Text>
              <TextInputCustom
                placeholder="Nhập tên dịch vụ"
                onChangeText={handcheckTen}
                error={errorTen}
                style={styles.inputcustom}
              />
            </View>
            {/* 2 */}
            <View
              style={[
                styles.cuc1,
                { height: 110, justifyContent: "space-between" },
              ]}
            >
              <Text
                style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}
              >
                Giá tiền
              </Text>
              <TextInputCustom
                placeholder="Nhập giá dịch vụ"
                onChangeText={handcheckGia}
                error={errorGia}
                style={styles.inputcustom}
              />
            </View>
            <View
              style={[
                styles.cuc1,
                { height: 110, justifyContent: "space-between" },
              ]}
            >
              <Text
                style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}
              >
                Mô tả
              </Text>
              <TextInputCustom
                placeholder="Nhập mô mô tả dịch vụ"
                onChangeText={handcheckmoTa}
                error={errormoTa}
                numberOfLines={2}
                style={[styles.inputcustom, {}]}
              />
            </View>
            {/* 4 */}
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                padding: 20,
              }}
            >
              <Text
                style={[
                  styles.theText,
                  {
                    fontSize: 18,
                    textAlign: "auto",
                    width: "30%",
                    // flex: 1,
                  },
                ]}
              >
                Trạng thái:
              </Text>
              <TouchableOpacity
                style={[
                  {
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1.5,
                    borderRadius: 50,
                    borderColor: "gray",
                    width: 20,
                    height: 20,
                    marginEnd: 10,
                  },
                ]}
                onPress={() => setTrangThai(!TrangThai)}
              >
                <Text
                  style={{ textAlign: "center", fontSize: 10, color: "gray" }}
                >
                  {TrangThai ? "V" : " "}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 15,
                  color: TrangThai ? "blue" : "red",
                }}
              >
                {TrangThai ? "Đang hoạt động" : "Ngừng hoạt động"}
              </Text>
            </View>
            {/* chon anh 5*/}
            <View style={{ paddingHorizontal: 20 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  borderRadius: 10,
                  width: "40%",
                  marginBottom: 10,
                }}
                onPress={pickImage}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 13,
                  }}
                >
                  Chọn ảnh
                </Text>
              </TouchableOpacity>
              <FlatList
                horizontal
                data={anh}
                overScrollMode="never"
                overScrollColor="transparent"
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={{ marginRight: 0 }}>
                    <Image
                      style={{
                        width: 100,
                        height: 100,
                        resizeMode: "stretch",
                        margin: 5,
                        zIndex: anh.length - index, // Đảm bảo thứ tự hiển thị
                      }}
                      source={{ uri: item }}
                    />
                  </View>
                )}
              />
            </View>

            <Button_custom
              noidung="Thêm"
              style={styles.buttoncustom}
              onPress={() => {
                ThemItem();
                console.log(Gia, Ten, TrangThai, moTa);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DichVu;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingTop: 20 },
  theText: { fontSize: 24, fontWeight: "500", textAlign: "center" },
  fle_ngang: { flexDirection: "row", alignItems: "center" },
  imageIcon: { height: 20, width: 20 },
  inputcustom: { height: 45 },
  cuc1: { paddingHorizontal: 20 },
  buttoncustom: { borderRadius: 10 },
});
