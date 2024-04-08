import {
  FlatList,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../linkapi/diaChi_api";
import Item_Khach_hang from "./Item_Khach_hang";
import { get_KhachHang, post_KhachHang } from "../../linkapi/api_khachhang";
import TextInputCustom from "../../Custom/Text_Input_custom";
import Button_custom from "../../Custom/Button_custom";
import { get_DichVu } from "../../linkapi/api_dichvu";
import { get_NhanVien } from "../../linkapi/api_nhanvien";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const KhachHang = () => {
  const navigation = useNavigation();
  const [listKhachHang, setlistKhachHang] = useState([]);
  const [nhanvienList, setNhanvienList] = useState([]);
  const [showModalThem, setshowModalThem] = useState(false);
  const [idnhanvien, setIdnhanvien] = useState("");
  const [anh, setanh] = useState(null);
  const [hoten, sethoten] = useState("");
  const [sdt, setsdt] = useState("");
  const [diachi, setdiachi] = useState("");
  const [email, setemail] = useState("");
  const [dsdichvu, setdsdichvu] = useState("");
  ////
  const [erroridnhanvien, seterrorIdnhanvien] = useState("");
  const [errorhoten, seterrorHoten] = useState("");
  const [errorsdt, seterrorSdt] = useState("");
  const [errordiachi, seterrorDiachi] = useState("");
  const [erroremail, seterrorEmail] = useState("");
  const [errordsdichvu, seterrorDsdichvu] = useState("");

  const [selectedItems, setSelectedItems] = useState([]);
  const [danhSachDichVu, setDanhSachDichVu] = useState([]);

  const pickImage = async () => {
    console.log("aaa");
    let kq = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(kq);
    if (!kq.canceled) {
      setanh(kq.assets[0].uri);
    }
  };

  const DS_dichvu = () => {
    axios
      .get(`${API_URL}${get_DichVu}`)
      .then((response) => {
        setDanhSachDichVu(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const fetchIdNhanVienList = () => {
    fetch(`${API_URL}${get_NhanVien}`)
      .then((response) => response.json())
      .then((data) => {
        setNhanvienList(data); // Lưu trữ cả id và tên của nhân viên
      })
      .catch((error) => console.error("Lỗi khi lấy list nhân viên", error));
  };

  useEffect(() => {
    const reload = setTimeout(() => {
      DS_dichvu();
      fetchIdNhanVienList();
    }, 1000);

    return () => {
      clearTimeout(reload);
    };
  }, []);

  const toggleSelection = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
      console.log(itemId);
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
    // Cập nhật dsdichvu thành chuỗi các ID dịch vụ đã chọn, ngăn cách nhau bằng dấu phẩy
    setdsdichvu(selectedItems.join(","));
  };

  const handcheckIdnhanvien = (text) => {
    if (text.trim() === "") {
      seterrorIdnhanvien("Không được để trống");
    } else {
      seterrorIdnhanvien("");
    }
    setIdnhanvien(text);
  };
  const handcheckHoten = (text) => {
    if (text.trim() === "") {
      seterrorHoten("Không được để trống");
    } else {
      seterrorHoten("");
    }
    sethoten(text);
  };
  const handcheckSdt = (text) => {
    if (text.trim() === "") {
      seterrorSdt("Không được để trống");
    } else {
      seterrorSdt("");
    }
    setsdt(text);
  };
  const handcheckDiachi = (text) => {
    if (text.trim() === "") {
      seterrorDiachi("Không được để trống");
    } else {
      seterrorDiachi("");
    }
    setdiachi(text);
  };
  const handcheckEmail = (text) => {
    if (text.trim() === "") {
      seterrorEmail("Không được để trống");
    } else {
      seterrorEmail("");
    }
    setemail(text);
  };

  const capNhat_DS = () => {
    axios
      .get(`${API_URL}${get_KhachHang}`)
      .then((response) => {
        setlistKhachHang(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    const reload = setTimeout(() => {
      capNhat_DS();
    }, 1000);

    return () => {
      clearTimeout(reload);
    };
  }, []);

  const ThemItem = async () => {
    try {
      console.log("add");
      // Kiểm tra xem có trường nào bị bỏ trống không
      // if (!idnhanvien.trim()) {
      //   seterrorIdnhanvien("Không được để trống");
      //   return; // Stop execution if ID nhân viên is empty
      // } else {
      //   seterrorIdnhanvien(""); // Clear error message if not empty
      // }

      // if (!hoten.trim()) {
      //   seterrorHoten("Không được để trống");
      //   return; // Stop execution if Tên khách hàng is empty
      // } else {
      //   seterrorHoten(""); // Clear error message if not empty
      // }

      // if (!sdt.trim()) {
      //   seterrorSdt("Không được để trống");
      //   return; // Stop execution if Số điện thoại is empty
      // } else {
      //   seterrorSdt(""); // Clear error message if not empty
      // }

      // if (!diachi.trim()) {
      //   seterrorDiachi("Không được để trống");
      //   return; // Stop execution if Địa chỉ is empty
      // } else {
      //   seterrorDiachi(""); // Clear error message if not empty
      // }

      // if (!email.trim()) {
      //   seterrorEmail("Không được để trống");
      //   return; // Stop execution if Email is empty
      // } else {
      //   seterrorEmail(""); // Clear error message if not empty
      // }
      // if (anh === null) {
      //   ToastAndroid.show("Bạn chưa chọn ảnh", ToastAndroid.SHORT);
      //   return;
      // }
      const response = await axios.post(`${API_URL}${post_KhachHang}`, {
        idnhanvien: idnhanvien,
        anh: anh,
        hoten: hoten,
        sdt: sdt,
        diachi: diachi,
        email: email,
        dsdichvu: selectedItems,
      });
      console.log(response.data);
      capNhat_DS(); // Cập nhât danh sách sau khi Thêm
      setshowModalThem(false); // Đóng modal sau khi Thêm thành công

      sethoten("");
      setsdt("");
      setdiachi("");
      setemail("");
      setdsdichvu("");
      setanh(null);
      ToastAndroid.show("Thêm thành công", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Lỗi khi Thêm mục:", error);
      Alert.alert("Lỗi", "Không thể Thêm mục. Vui lòng thử lại sau.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={[styles.fle_ngang, { top: 10, marginBottom: 20 }]}>
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
        <Text style={[styles.theText, { width: "60%" }]}>
          Quản lý khách hàng
        </Text>
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
        showsVerticalScrollIndicator={false}
        overScrollMode="never" // Ngăn chặn hiệu ứng "bóng" khi vuốt tới cuối danh sách
        overScrollColor="transparent" // Đặt màu sắc của hiệu ứng bóng là transparent
        data={listKhachHang}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => {
          return (
            <Item_Khach_hang data={item} capNhat_DS={() => capNhat_DS()} />
          );
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
            setIdnhanvien("");
            setanh(null);
            sethoten("");
            setsdt("");
            setdiachi("");
            setemail("");
            setdsdichvu("");
            seterrorIdnhanvien("");
            seterrorHoten("");
            seterrorSdt("");
            seterrorDiachi("");
            seterrorEmail("");
            seterrorDsdichvu("");
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  setshowModalThem(false);
                }}
              >
                <Image
                  style={{ width: 30, height: 30 }}
                  source={{
                    uri: "https://cdn0.iconfinder.com/data/icons/octicons/1024/x-512.png",
                  }}
                />
              </TouchableOpacity>
              <Text style={[styles.theText, { left: 80 }]}>
                Thêm Khách hàng
              </Text>
            </View>
            {/* 0 */}
            <View
              style={[
                styles.cuc1,
                { height: 80, justifyContent: "space-between" },
              ]}
            >
              <Text
                style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}
              >
                ID nhân viên:
              </Text>
              <Picker
                style={{ height: "auto" }}
                selectedValue={idnhanvien}
                onValueChange={(itemValue, itemIndex) =>
                  setIdnhanvien(itemValue)
                }
              >
                {nhanvienList.map((nhanvien) => (
                  <Picker.Item
                    key={nhanvien._id}
                    label={`${nhanvien.hoten}`}
                    value={nhanvien._id}
                  />
                ))}
              </Picker>
            </View>
            {/* chon anh */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  borderRadius: 10,
                  top: 30,
                  width: "20%",
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

              <Image
                source={{ uri: anh }}
                style={{
                  height: 80,
                  width: 80,
                  backgroundColor: "red",
                  resizeMode: "stretch",
                }}
              />
            </View>
            {/* 1 */}
            <View
              style={[
                styles.cuc1,
                { height: 80, justifyContent: "space-between" },
              ]}
            >
              <Text
                style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}
              >
                Họ tên:
              </Text>
              <TextInputCustom
                placeholder="Nhập họ tên"
                onChangeText={handcheckHoten}
                error={errorhoten}
                style={styles.inputcustom}
              />
            </View>
            {/* 2 */}
            <View
              style={[
                styles.cuc1,
                { height: 80, justifyContent: "space-between" },
              ]}
            >
              <Text
                style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}
              >
                Số điện thoại:
              </Text>
              <TextInputCustom
                placeholder="Nhập số điện thoại"
                onChangeText={handcheckSdt}
                error={errorsdt}
                style={styles.inputcustom}
              />
            </View>
            {/* 3 */}
            <View
              style={[
                styles.cuc1,
                { height: 80, justifyContent: "space-between" },
              ]}
            >
              <Text
                style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}
              >
                Địa chỉ:
              </Text>
              <TextInputCustom
                placeholder="Nhập địa chỉ"
                onChangeText={handcheckDiachi}
                error={errordiachi}
                style={styles.inputcustom}
              />
            </View>
            {/* 4 */}
            <View
              style={[
                styles.cuc1,
                { height: 80, justifyContent: "space-between" },
              ]}
            >
              <Text
                style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}
              >
                Email:
              </Text>
              <TextInputCustom
                placeholder="Nhập email"
                onChangeText={handcheckEmail}
                error={erroremail}
                style={styles.inputcustom}
              />
            </View>
            {/* 5 */}
            <View
              style={[
                styles.cuc1,
                { height: 150, justifyContent: "space-between" },
              ]}
            >
              <Text
                style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}
              >
                Danh sách dịch vụ:
              </Text>
              <ScrollView
                style={{ height: 150 }}
                showsVerticalScrollIndicator={false}
                overScrollMode="never" // Ngăn chặn hiệu ứng "bóng" khi vuốt tới cuối danh sách
                overScrollColor="transparent" // Đặt màu sắc của hiệu ứng bóng là transparent
              >
                {danhSachDichVu.map((dichvu) => (
                  <TouchableOpacity
                    key={dichvu._id}
                    onPress={() => toggleSelection(dichvu._id)}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: selectedItems.includes(dichvu._id)
                          ? "blue"
                          : "#999",
                        marginRight: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {selectedItems.includes(dichvu._id) && (
                        <View
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: "blue",
                          }}
                        />
                      )}
                    </View>
                    <Text style={{ marginRight: 10 }}>
                      Tên: {dichvu.ten}, ID: {dichvu._id}
                    </Text>
                    {/* Hiển thị tên của dịch vụ bên cạnh nút checkbox */}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            {/* <Text style={{width:100, height:105}}></Text> */}
            <Button_custom
              noidung="Thêm"
              onPress={() => {
                // console.log("hello");
                ThemItem();
                // console.log(
                //   idnhanvien,
                //   anh,
                //   hoten,
                //   sdt,
                //   diachi,
                //   email,
                //   dsdichvu
                // );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default KhachHang;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingTop: 20 },
  theText: { fontSize: 24, fontWeight: "500", textAlign: "center" },
  fle_ngang: { flexDirection: "row", alignItems: "center" },
  imageIcon: { height: 20, width: 20 },
  inputcustom: { height: 45 },
  cuc1: { paddingHorizontal: 20 },
});
