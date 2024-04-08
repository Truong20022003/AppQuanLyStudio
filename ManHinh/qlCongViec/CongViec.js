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
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../linkapi/diaChi_api";
import Item_Cong_Viec from "./Item_Cong_Viec";
import { get_CongViec, post_CongViec } from "../../linkapi/api_congviec";
import Button_custom from "../../Custom/Button_custom";
import TextInputCustom from "../../Custom/Text_Input_custom";

import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const CongViec = () => {
  const navigation = useNavigation();
  const [listCongViec, setlistCongViec] = useState([]);

  const [tencongviec, setTencongviec] = useState("");

  const [ngaybatdau, setngaybatdau] = useState("");
  const [ngayketthuc, setngayketthuc] = useState("");
  const [trangthai, settrangthai] = useState("");
  const [mota, setmota] = useState("");
  ////
  const [showModalThem, setshowModalThem] = useState(false);
  const [errortencongviec, seterrorTencongviec] = useState("");

  const [errorngaybatdau, seterrorNgaybatdau] = useState("");
  const [errorngayketthuc, seterrorNgayketthuc] = useState("");
  const [errortrangthai, seterrorTrangthai] = useState("");
  const [errormota, seterrorMota] = useState("");

  const handcheckTencongviec = (text) => {
    if (text.trim() === "") {
      seterrorTencongviec("Không được để trống");
    } else {
      seterrorTencongviec("");
    }
    setTencongviec(text);
  };

  const handcheckNgaybatdau = (text) => {
    if (text.trim() === "") {
      seterrorNgaybatdau("Không được để trống");
    } else {
      seterrorNgaybatdau("");
    }
    setngaybatdau(text);
  };
  const handcheckNgayketthuc = (text) => {
    if (text.trim() === "") {
      seterrorNgayketthuc("Không được để trống");
    } else {
      seterrorNgayketthuc("");
    }
    setngayketthuc(text);
  };
  const handcheckmoTa = (text) => {
    if (text.trim() === "") {
      seterrorMota("Không được để trống");
    } else {
      seterrorMota("");
    }
    setmota(text);
  };

 

  const capNhat_DS = () => {
    axios
      .get(`${API_URL}${get_CongViec}`)
      .then((response) => {
        setlistCongViec(response.data);
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
      // Validation for each field
      if (!tencongviec.trim()) {
        seterrorTencongviec("Không được để trống");
        return;
      } else {
        seterrorTencongviec(""); // Clear error message if not empty
      }

      if (!ngaybatdau.trim()) {
        seterrorNgaybatdau("Không được để trống");
        return;
      } else {
        seterrorNgaybatdau(""); // Clear error message if not empty
      }

      if (!ngayketthuc.trim()) {
        seterrorNgayketthuc("Không được để trống");
        return;
      } else {
        seterrorNgayketthuc(""); // Clear error message if not empty
      }

      if (!mota.trim()) {
        seterrorMota("Không được để trống");
        return;
      } else {
        seterrorMota(""); // Clear error message if not empty
      }
      const response = await axios.post(`${API_URL}${post_CongViec}`, {
        tencongviec: tencongviec,
     
        ngaybatdau: ngaybatdau,
        ngayketthuc: ngayketthuc,
        trangthai: trangthai,
        mota: mota,
      });
      console.log(response.data);
      setshowModalThem(false); // Đóng modal sau khi sửa thành công
      capNhat_DS(); // Cập nhật danh sách sau khi sửa
      setTencongviec("");

      setngaybatdau("");
      setngayketthuc("");
      settrangthai(true);
      setmota("");
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
        <Text style={[styles.theText, { width: "60%" }]}>
          Quản lý Công Việc
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
        data={listCongViec}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => {
          return <Item_Cong_Viec data={item} capNhat_DS={() => capNhat_DS()} />;
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
            setTencongviec("");
  
            setngaybatdau("");
            setngayketthuc("");
            settrangthai(trangthai);
            setmota("");
            seterrorTencongviec("");

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

              <Text style={[styles.theText1]}>Sửa công việc</Text>
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
                Tên Công việc:
              </Text>
              <TextInputCustom
                placeholder="Nhập tên Công việc"
                onChangeText={handcheckTencongviec}
                error={errortencongviec}
                style={styles.inputcustom}
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
                Ngày bắt đầu:
              </Text>
              <TextInputCustom
                placeholder="Nhập Ngày bắt đầu"
                onChangeText={handcheckNgaybatdau}
                error={errorngaybatdau}
                style={styles.inputcustom}
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
                onChangeText={handcheckNgayketthuc}
                error={errorngayketthuc}
                style={styles.inputcustom}
              />
            </View>
            {/* 5 */}
            <View
              style={[
                styles.fle_ngang,
                { paddingHorizontal: 20, justifyContent: "space-between" },
              ]}
            >
              <View style={{ height: "100%" }}>
                {/* trang thai */}
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
                    onPress={() => settrangthai(!trangthai)}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: trangthai ? "blue" : "red",
                      }}
                    >
                      {trangthai ? "Đang hoạt động" : "Ngừng hoạt động"}
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
                placeholder="Nhập mô mô tả Công việc"
                value={mota}
                onChangeText={handcheckmoTa}
                error={errormota}
                numberOfLines={2}
                style={[styles.bottncustom, {}]}
              />
            </View>
            <Button_custom
              noidung="Thêm"
              onPress={() => {
                ThemItem();
                console.log(
                  tencongviec,
             
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
    </View>
  );
};

export default CongViec;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingTop: 20 },
  theText: { fontSize: 24, fontWeight: "500", textAlign: "center" },
  theText1: { fontSize: 24, fontWeight: "500", textAlign: "center", left: 80 },
  fle_ngang: { flexDirection: "row", alignItems: "center" },
  imageIcon: { height: 20, width: 20 },
});
