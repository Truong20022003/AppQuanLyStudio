import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { imgbackgr } from "../../Image";
import TextInputCustom from "../../Custom/Text_Input_custom";
import Button_custom from "../../Custom/Button_custom";
import { useNavigation } from "@react-navigation/native";
import { API_URL, REGISTER } from "../../linkapi/diaChi_api";


const MH_dang_ky = () => {
  const navigation = useNavigation();
  const [tentaikhoan, settentaikhoan] = useState("");
  const [matkhau, setmatkhau] = useState("");
  const [nhaplaimatkhau, setnhaplaimatkhau] = useState("");
  const [errortentaikhoan, setErrortentaikhoan] = useState("");
  const [errormatkhau, setErrormatkhau] = useState("");
  const [errornhaplaimatkhau, setErrornhaplaimatkhau] = useState("");
  const handchecktenDangNhap = (text) => {
    if (text.trim() === "") {
      setErrortentaikhoan("Bạn chưa nhập tên đăng nhập");
    } else {
      setErrortentaikhoan("");
    }
    settentaikhoan(text);
  };
  const handcheckMatKhau = (text) => {
    if (text.trim() === "") {
      setErrormatkhau("Bạn chưa nhập mật khẩu");
    } else {
      setErrormatkhau("");
    }
    setmatkhau(text);
  };
  const handchecknhaplaiMatKhau = (text) => {
    if (text.trim() === "") {
      setErrornhaplaimatkhau("Bạn chưa nhập lại mật khẩu");
    }else if(text !== matkhau){
      setErrornhaplaimatkhau("Mật khẩu không trùng nhau");
    } else {
      setErrornhaplaimatkhau("");
    }
    setnhaplaimatkhau(text);
  };
  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}${REGISTER}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tentaikhoan: tentaikhoan, matkhau: matkhau }),
      });
      const data = await response.json();
      if (data.status === "add thanh cong") {
        Alert.alert("Thông báo", "Đăng ký thành công");
        navigation.navigate("MH_dang_nhap");
      } else {
        Alert.alert("Thông báo", "Đăng ký không thành công");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  return (
    <ImageBackground
      source={imgbackgr.nendn}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        resizeMode: "cover",
        opacity: 0.8, // Giảm độ mờ của hình ảnh nền
      }}
    >
      <Image
        source={{
          uri: "https://img.veaul.com/product/9c7d423aebc44f363ff1d8f13d02f230/chic-beautiful-champagne-bridal-wedding-dresses-2020-a-line-princess-off-the-shoulder-short-sleeve-backless-glitter-tulle-beading-tassel-royal-train-ruffle-800x800.jpg",
        }}
        style={{
          height: "100%",
          width: "100%",
          resizeMode: "stretch",
          position: "absolute",
          zIndex: -1,
        }}
      />
      <View style={styles.container}>
        <StatusBar translucent barStyle="dark-content" />
        <Image
          source={imgbackgr.logo}
          style={{
            height: 300,
            width: 400,
            alignSelf: "center",
            position: "absolute",
            resizeMode: "stretch",
            zIndex: 1,
          }}
        />
        <View style={{ height: 300, width: 300 }} />
        <View style={styles.content1}>
          <Text style={styles.theText}>Tên đang nhập </Text>
          <TextInputCustom
            placeholder="Nhập tên đang nhập"
            style={styles.input}
            error={errortentaikhoan}
            value={tentaikhoan}
            onChangeText={handchecktenDangNhap}
            styleerror={styles.imageerr}
          />
          <Image
            source={{
              uri: "https://img.icons8.com/?size=80&id=111473&format=png",
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.content1}>
          <Text style={styles.theText}>Mật khẩu</Text>
          <TextInputCustom
            placeholder="Nhập mật khẩu"
            style={styles.input}
            error={errormatkhau}
            value={matkhau}
            onChangeText={handcheckMatKhau}
            styleerror={styles.imageerr}
          />
          <Image
            source={{
              uri: "https://img.icons8.com/?size=50&id=94&format=png",
            }}
            style={[styles.image, { width: 33, height: 33, top: 37, start: 5 }]}
          />
        </View>

        <View style={styles.content1}>
          <Text style={styles.theText}>Nhập lại mật khẩu</Text>
          <TextInputCustom
            placeholder="Nhập lại mật khẩu"
            style={styles.input}
            error={errornhaplaimatkhau}
            value={nhaplaimatkhau}
            onChangeText={handchecknhaplaiMatKhau}
            styleerror={styles.imageerr}
          />
          <Image
            source={{
              uri: "https://img.icons8.com/?size=50&id=94&format=png",
            }}
            style={[styles.image, { width: 33, height: 33, top: 37, start: 5 }]}
          />
        </View>

        <View style={[styles.flex_ngang, { justifyContent: "space-between" }]}>
          <View >
           
         
          </View>
          <Text
            style={[
              styles.theText,
              {
                height: "auto",
                marginEnd: 25,
                fontWeight: "400",
                borderBottomWidth: 0.5,
                fontSize: 16,
                borderColor: "#694127",
              },
            ]}
          >
            Chưa có tài khoản?
          </Text>
        </View>
        {/*  */}
        <Button_custom
          noidung="Đăng ký"
          style={styles.buttomcustom}
          styleText={styles.textbutton}
          onPress={handleRegister}
        />
      </View>
    </ImageBackground>
  );
};

export default MH_dang_ky;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  input: { height: 50, paddingStart: 50 },
  theText: {
    fontWeight: "600",
    fontSize: 18,
    height: 30,
    color: "#694127",
    start: 14,
  },
  content1: {},
  image: {
    height: 40,
    width: 40,
    position: "absolute",
    tintColor: "#694127",
    top: 32,
    start: 5,
  },
  flex_ngang: {
    flexDirection: "row",
    alignItems: "center",
  },
  khungCheck: {
    height: 23,
    width: 23,
    borderRadius: 50,
    borderColor: "#987555",
    alignItems: "center",
    borderWidth: 2,
  },
  buttomcustom: { backgroundColor: "#C0AAAA", borderRadius: 10 },
  textbutton: { color: "black", fontWeight: "400" },
  imageerr: { start: 37, top: 20 },
});

