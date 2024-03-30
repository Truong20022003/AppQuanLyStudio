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
import { ScrollView, Swipeable } from "react-native-gesture-handler";
import { API_URL } from "../../linkapi/diaChi_api";
import axios from "axios";
import { delete_KhachHang, put_KhachHang } from "../../linkapi/api_khachhang";
import * as ImagePicker from "expo-image-picker";
import TextInputCustom from "../../Custom/Text_Input_custom";
import Button_custom from "../../Custom/Button_custom";
import { get_DichVu } from "../../linkapi/api_dichvu";
import MultiSelect from "react-native-multiple-select";
import { get_NhanVien } from "../../linkapi/api_nhanvien";
import { Picker } from "@react-native-picker/picker";

const Item_Khach_hang = ({ data, capNhat_DS }) => {
  const { _id, idnhanvien, anh, hoten, sdt, diachi, email, dsdichvu } = data;
  const [showModalSua, setshowModalSua] = useState(false);

  const [upidnhanvien, setUpIdnhanvien] = useState("");
  const [uphoten, setUphoten] = useState("");
  const [upsdt, setUpsdt] = useState("");
  const [updiachi, setUpdiachi] = useState("");
  const [upemail, setUpemail] = useState("");
  const [updsdichvu, setUpdsdichvu] = useState("");
  ////
  const [erroridnhanvien, seterrorIdnhanvien] = useState("");
  const [errorhoten, seterrorHoten] = useState("");
  const [errorsdt, seterrorSdt] = useState("");
  const [errordiachi, seterrorDiachi] = useState("");
  const [erroremail, seterrorEmail] = useState("");
  const [errordsdichvu, seterrorDsdichvu] = useState("");

  const [selectedItems, setSelectedItems] = useState([]);
  const [danhSachDichVu, setDanhSachDichVu] = useState([]);

  const [danhSachDichVuChon, setDanhSachDichVuChon] = useState([]);
  const [nhanvienList, setNhanvienList] = useState([]);

  const [upanh, setupanh] = useState(null);
  const pickImage = async () => {
    let kq = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(kq);
    if (!kq.canceled) {
      setupanh(kq.assets[0].uri);
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
    setUpdsdichvu(selectedItems.join(","));
  };

  const XoaItem = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}${delete_KhachHang}${_id}`
      );
      capNhat_DS();
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting item:", error);
      Alert.alert("Error", "Failed to delete item. Please try again later.");
    }
  };

  const handcheckupHoten = (text) => {
    if (text.trim() === "") {
      seterrorHoten("Không được để trống");
    } else {
      seterrorHoten("");
    }
    setUphoten(text);
  };
  const handcheckupSdt = (text) => {
    if (text.trim() === "") {
      seterrorSdt("Không được để trống");
    } else {
      seterrorSdt("");
    }
    setUpsdt(text);
  };
  const handcheckupDiachi = (text) => {
    if (text.trim() === "") {
      seterrorDiachi("Không được để trống");
    } else {
      seterrorDiachi("");
    }
    setUpdiachi(text);
  };
  const handcheckupEmail = (text) => {
    if (text.trim() === "") {
      seterrorEmail("Không được để trống");
    } else {
      seterrorEmail("");
    }
    setUpemail(text);
  };
  

  const CapNhatItem = async () => {
    try {
      // Validation for each field
      

      if (!uphoten.trim()) {
        seterrorHoten("Không được để trống");
        return; // Stop execution if Tên khách hàng is empty
      } else {
        seterrorHoten(""); // Clear error message if not empty
      }

      if (!upsdt.trim()) {
        seterrorSdt("Không được để trống");
        return; // Stop execution if Số điện thoại is empty
      } else {
        seterrorSdt(""); // Clear error message if not empty
      }

      if (!updiachi.trim()) {
        seterrorDiachi("Không được để trống");
        return; // Stop execution if Địa chỉ is empty
      } else {
        seterrorDiachi(""); // Clear error message if not empty
      }

      if (!upemail.trim()) {
        seterrorEmail("Không được để trống");
        return; // Stop execution if Email is empty
      } else {
        seterrorEmail(""); // Clear error message if not empty
      }

      const response = await axios.put(`${API_URL}${put_KhachHang}${_id}`, {
        idnhanvien: upidnhanvien,
        anh: upanh,
        hoten: uphoten,
        sdt: upsdt,
        diachi: updiachi,
        email: upemail,
        dsdichvu: selectedItems,
      });
      console.log(response.data);
      setshowModalSua(false); // Đóng modal sau khi sửa thành công
      capNhat_DS(); // Cập nhật danh sách sau khi sửa
      setUpIdnhanvien("");
      setUphoten("");
      setUpsdt("");
      setUpdiachi("");
      setUpemail("");
      setUpdsdichvu("");
      setDanhSachDichVuChon(selectedItems);
      ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
      capNhat_DS();
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
            setUpIdnhanvien(idnhanvien);
            setUphoten(hoten);
            setUpsdt(sdt);
            setUpdiachi(diachi);
            setUpemail(email);
            setUpdsdichvu(dsdichvu);
            setupanh(anh);
          }}
        >
          <Text style={styles.actionText}>Sửa</Text>
        </TouchableOpacity>
        <View style={{ height: 0 }}></View>
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
        <Image source={{ uri: anh }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{hoten}</Text>
          <Text>SDT: {sdt}</Text>
          <Text>Địa chỉ: {diachi}</Text>
          <Text>Email: {email}</Text>
          <Text>
            Danh sách ID dịch vụ:{" "}
            {dsdichvu ? dsdichvu.join(", ") : "Danh sách trống"}
          </Text>

          {/* // Sử dụng props.selectedServices để hiển thị danh sách dịch vụ đã
          chọn */}
          {/* <View>
            <Text>Danh sách dịch vụ đã chọn:</Text>
            {selectedItems.map((dsdichvu) => (
              <View key={dsdichvu}>
                <Text>ID dịch vụ: {dsdichvu}</Text>
              </View>
            ))}
          </View> */}
          {/* Hiển thị danh sách các dịch vụ đã chọn  */}
          {/* <View style={styles.selectedItemsContainer}>
            <Text style={styles.selectedItemsTitle}>Dịch vụ đã chọn:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {danhSachDichVu
                .filter((dichvu) => selectedItems.includes(dichvu._id))
                .map((dichvu) => (
                  <Text key={dichvu._id} style={styles.selectedItemText}>
                    Tên: {dichvu.ten}, ID: {dichvu._id}
                  </Text>
                ))}
            </ScrollView>
          </View> */}
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
            setUpIdnhanvien("");
            setUphoten("");
            setUpsdt("");
            setUpdiachi("");
            setUpemail("");
            setUpdsdichvu("");
            seterrorIdnhanvien("");
            seterrorHoten("");
            seterrorSdt("");
            seterrorDiachi("");
            seterrorEmail("");
            seterrorDsdichvu("");
          }}
          style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        />
        <ScrollView>
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
              <View style={{ flexDirection: "row", alignItems: "stretch" }}>
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

                <Text style={[styles.theText]}>Sửa Khách hàng</Text>
              </View>
              {/* 0 */}
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
                    setUpIdnhanvien(itemValue)
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
                  justifyContent: "center",
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
                    width: "40%",
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
                  source={{ uri: upanh }}
                  style={{
                    height: 100,
                    width: 100,
                    backgroundColor: "red",
                    resizeMode: "stretch",
                  }}
                />
              </View>

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
                  Tên khách hàng:
                </Text>
                <TextInputCustom
                  placeholder="Nhập tên khách hàng"
                  value={uphoten}
                  onChangeText={handcheckupHoten}
                  error={errorhoten}
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
                  Số điện thoại:
                </Text>
                <TextInputCustom
                  placeholder="Nhập số điện thoại"
                  value={upsdt}
                  onChangeText={handcheckupSdt}
                  error={errorsdt}
                  style={styles.bottncustom}
                />
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
                  Địa chỉ:
                </Text>
                <TextInputCustom
                  placeholder="Nhập Địa chỉ"
                  value={updiachi}
                  onChangeText={handcheckupDiachi}
                  error={errordiachi}
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
                  Email:
                </Text>
                <TextInputCustom
                  placeholder="Nhập Email"
                  value={upemail}
                  onChangeText={handcheckupEmail}
                  error={erroremail}
                  style={styles.bottncustom}
                />
              </View>
              {/* 5 */}
              <View
                style={[
                  styles.cuc1,
                  { height: 110, justifyContent: "space-between" },
                ]}
              >
                <Text
                  style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}
                >
                  Danh sách dịch vụ:
                </Text>
                <ScrollView
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
                      <Text style={{ marginRight: 10 }}>{dichvu.ten}</Text>
                      {/* Hiển thị tên của dịch vụ bên cạnh nút checkbox */}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                {/* <MultiSelect
                items={danhSachDichVu}
                uniqueKey="id" // Thay 'id' bằng trường duy nhất trong dữ liệu của bạn
                onSelectedItemsChange={(selectedItems) =>
                  setSelectedItems(selectedItems)
                }
                selectedItems={selectedItems}
                selectText="Chọn các dịch vụ"
                searchInputPlaceholderText="Tìm kiếm..."
                onChangeInput={(text) => console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name" // Thay 'name' bằng trường chứa tên dịch vụ trong dữ liệu của bạn
                searchInputStyle={{ color: "#CCC" }}
                submitButtonColor="#CCC"
                submitButtonText="Submit"
              /> */}
              </View>

              <Button_custom
                style={styles.bottncustom1}
                noidung="Sửa"
                onPress={() => {
                  CapNhatItem();
                  console.log(upidnhanvien, uphoten);
                }}
              />
            </View>
          </View>
        </ScrollView>
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
    height: 100,
    width: 100,
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
  actionText: {
    fontSize: 10,
    paddingHorizontal: 10,
    color: "white",
    fontWeight: "600",
  },
  theText: { fontSize: 32, width: "100%", textAlign: "center" },
  cuc1: { paddingHorizontal: 20 },
  bottncustom: { height: 35 },
  bottncustom1: {
    paddingHorizontal: 1,
    paddingVertical: 1,
    marginHorizontal: 103,
  },

  flex_ngang: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },

  selectedItemsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  selectedItemsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  selectedItemText: {
    backgroundColor: "#eee",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default Item_Khach_hang;
