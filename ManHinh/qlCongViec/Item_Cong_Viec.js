import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ToastAndroid,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swipeable } from "react-native-gesture-handler";
import { API_URL } from "../../linkapi/diaChi_api";
import { delete_CongViec, put_CongViec } from "../../linkapi/api_congviec";
import TextInputCustom from "../../Custom/Text_Input_custom";
import Button_custom from "../../Custom/Button_custom";
import { Picker } from "@react-native-picker/picker";
import { get_NhanVien } from "../../linkapi/api_nhanvien";

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

  const [showModalSua, setshowModalSua] = useState(false);

  const [UpidnhanvienList, setUpidnhanvienList] = useState([]);

  const [uptencongviec, setUpTencongviec] = useState("");
  const [upidnhanvien, setUpidnhanvien] = useState("");
  const [upngaybatdau, setUpngaybatdau] = useState("");
  const [upngayketthuc, setUpngayketthuc] = useState("");
  const [uptrangthai, setUptrangthai] = useState("");
  const [updmota, setUpmota] = useState("");
  ////

  const [errortencongviec, seterrorTencongviec] = useState("");
  const [erroridnhanvien, seterrorIdnhanvien] = useState("");
  const [errorngaybatdau, seterrorNgaybatdau] = useState("");
  const [errorngayketthuc, seterrorNgayketthuc] = useState("");
  const [errortrangthai, seterrorTrangthai] = useState("");
  const [errormota, seterrorMota] = useState("");

  const handcheckupTencongviec = (text) => {
    if (text.trim() === "") {
      seterrorTencongviec("Không được để trống");
    } else {
      seterrorTencongviec("");
    }
    setUpTencongviec(text);
  };
  const handcheckupNgaybatdau = (text) => {
    if (text.trim() === "") {
      seterrorNgaybatdau("Không được để trống");
    } else {
      seterrorNgaybatdau("");
    }
    setUpngaybatdau(text);
  };
  const handcheckupNgayketthuc = (text) => {
    if (text.trim() === "") {
      seterrorNgayketthuc("Không được để trống");
    } else {
      seterrorNgayketthuc("");
    }
    setUpngayketthuc(text);
  };
  const handcheckupmoTa = (text) => {
    if (text.trim() === "") {
      seterrorMota("Không được để trống");
    } else {
      seterrorMota("");
    }
    setUpmota(text);
  };

  const fetchIdNhanVienList = () => {
    fetch(`${API_URL}${get_NhanVien}`)
      .then((response) => response.json())
      .then((data) => {
        setUpidnhanvienList(data); // Lưu trữ cả id và tên của nhân viên
      })
      .catch((error) => console.error("Lỗi khi lấy list nhân viên", error));
  };

  useEffect(() => {
    const reload = setTimeout(() => {
      fetchIdNhanVienList();
    }, 1000);

    return () => {
      clearTimeout(reload);
    };
  }, []);

  const XoaItem = async () => {
    try {
      const response = await axios.delete(`${API_URL}${delete_CongViec}${_id}`);
      console.log(response.data);
      capNhat_DS();
    } catch (error) {
      console.error("Error deleting item:", error);
      Alert.alert("Error", "Failed to delete item. Please try again later.");
    }
  };

  const CapNhatItem = async () => {
    try {
      // // Validation for each field
      if (!uptencongviec.trim()) {
        seterrorTencongviec("Không được để trống");
        return;
      } else {
        seterrorTencongviec(""); // Clear error message if not empty
      }
      if (!upngaybatdau.trim()) {
        seterrorNgaybatdau("Không được để trống");
        return;
      } else {
        seterrorNgaybatdau(""); // Clear error message if not empty
      }

      if (!upngayketthuc.trim()) {
        seterrorNgayketthuc("Không được để trống");
        return;
      } else {
        seterrorNgayketthuc(""); // Clear error message if not empty
      }

      if (!updmota.trim()) {
        seterrorMota("Không được để trống");
        return;
      } else {
        seterrorMota(""); // Clear error message if not empty
      }

      const response = await axios.put(`${API_URL}${put_CongViec}${_id}`, {
        tencongviec: uptencongviec,
        idnhanvien: upidnhanvien,
        ngaybatdau: upngaybatdau,
        ngayketthuc: upngayketthuc,
        trangthai: uptrangthai,
        mota: updmota,
      });
      console.log(response.data);
      setshowModalSua(false); // Đóng modal sau khi sửa thành công
      capNhat_DS(); // Cập nhật danh sách sau khi sửa
      setUpTencongviec("");
      setUpidnhanvien("");
      setUpngaybatdau("");
      setUpngayketthuc("");
      setUptrangthai("");
      setUpmota("");
      ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Lỗi khi cập nhật mục:", error);
      Alert.alert("Lỗi", "Không thể cập nhật mục. Vui lòng thử lại sau.");
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
            setshowModalSua(!showModalSua);
            setUpTencongviec(tencongviec);
            setUpidnhanvien(idnhanvien);
            setUpngaybatdau(ngaybatdau);
            setUpngayketthuc(ngayketthuc);
            setUptrangthai(trangthai);
            setUpmota(mota);
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

      {/* modal sua */}
      <Modal
        transparent={true}
        visible={showModalSua}
        animationType="slide"
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          onPress={() => {
            setshowModalSua(!showModalSua);
            setUpTencongviec("");
            setUpidnhanvien("");
            setUpngaybatdau("");
            setUpngayketthuc("");
            setUptrangthai(trangthai);
            setUpmota("");
            seterrorTencongviec("");
            seterrorIdnhanvien("");
            seterrorNgaybatdau("");
            seterrorNgayketthuc("");
            seterrorMota("");
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
                    setshowModalSua(false);
                  }}
                >
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={{
                      uri: "https://cdn0.iconfinder.com/data/icons/octicons/1024/x-512.png",
                    }}
                  />
                </TouchableOpacity>

                <Text style={[styles.theText]}>Sửa Công việc</Text>
              </View>{/* 1 */}
            <View
              style={[
                styles.cuc1,
                { height: 110, justifyContent: "space-between" },
              ]}
            >
              <Text
                style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}
              >
                Tên dịch vụ:
              </Text>
              <TextInputCustom
                placeholder="Nhập tên Công việc"
                value={uptencongviec}
                onChangeText={handcheckupTencongviec}
                error={errortencongviec}
                style={styles.bottncustom}
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
                ID nhân viên:
              </Text>
              <Picker
                  style={{ height: "auto" }}
                  selectedValue={upidnhanvien}
                  onValueChange={(itemValue, itemIndex) =>
                    setUpidnhanvien(itemValue)
                  }
                >
                  {UpidnhanvienList.map((nhanvien) => (
                    <Picker.Item
                      key={nhanvien._id}
                      label={`${nhanvien.hoten}`}
                      value={nhanvien._id}
                    />
                  ))}
                </Picker>
            </View>
            {/* 3 */}
            <View
              style={[
                styles.cuc1,
                { height: 110, justifyContent: "space-between" },
              ]}
            >
              <Text
                style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}
              >
                Ngày bắt đầu:
              </Text>
              <TextInputCustom
                placeholder="Nhập ngày băt đầu"
                value={upngaybatdau}
                onChangeText={handcheckupNgaybatdau}
                error={errorngaybatdau}
                style={styles.bottncustom}
              />
            </View>
            {/* 4 */}
            <View
              style={[
                styles.cuc1,
                { height: 110, justifyContent: "space-between" },
              ]}
            >
              <Text
                style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}
              >
                Ngày kết thúc:
              </Text>
              <TextInputCustom
                placeholder="Nhập Ngày kết thúc"
                value={upngayketthuc}
                onChangeText={handcheckupNgayketthuc}
                error={errorngayketthuc}
                style={styles.bottncustom}
              />
            </View>
            {/* 5 */}
            {/* trang thai */}
            <View style={[styles.flex_ngang]}>
              <View style={{ height: "100%" }}>
                <Text
                  style={[
                    styles.theText,
                    {
                      fontSize: 18,
                      textAlign: "auto",
                      alignItems: "center",
                    },
                  ]}
                >
                  Trạng thái:
                  <TouchableOpacity
                    style={[styles.cuc1, { height: 20, top: 50 }]}
                    onPress={() => setUptrangthai(!uptrangthai)}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: uptrangthai ? "blue" : "red",
                      }}
                    >
                      {uptrangthai ? "Đang hoạt động" : "Ngừng hoạt động"}
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
            {/* 6 */}
            <View
              style={[
                styles.cuc1,
                { height: 110, justifyContent: "space-between" },
              ]}
            >
              <Text
                style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}
              >
                Mô tả:
              </Text>
              <TextInputCustom
                placeholder="Nhập mô mô tả công việc"
                value={updmota}
                onChangeText={handcheckupmoTa}
                error={errormota}
                numberOfLines={2}
                style={[styles.bottncustom, {}]}
              />
            </View>

            <Button_custom
              noidung="Sửa"
              onPress={() => {
                CapNhatItem();
                console.log(
                  tencongviec,
                  idnhanvien,
                  ngaybatdau,
                  ngayketthuc,
                  trangthai,
                  mota
                );
              }}
            />
          </View>
        </View>
      </Modal>
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
    borderRadius: 10,
    borderColor: "red",
    borderWidth: 2,
    padding: 10,
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
  theText: { fontSize: 32, width: "100%", textAlign: "center" },
  cuc1: { paddingHorizontal: 20 },
  actionText: {
    fontSize: 12,
    paddingHorizontal: 10,
    color: "white",
    fontWeight: "600",
  },
  bottncustom: { height: 45 },
  flex_ngang: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
});

export default Item_Cong_Viec;
