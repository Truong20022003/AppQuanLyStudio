import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../../linkapi/diaChi_api";
import { get_DichVu } from "../../linkapi/api_dichvu";
import ItemNhanVien from "./ItemNhanVien";
import { get_NhanVien, post_NhanVien } from "../../linkapi/api_nhanvien";
import { icon } from "../../Image";
import ModalAddNhanVien from "./ModalAddNhanVien";
const NhanVien = () => {
  const navigation = useNavigation();
  
  const [hoTen, setHoTen] = useState('');
  const [sDT, setSDT] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [email, setEmail] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  const [tenTaiKhoan, setTenTaiKhoan] = useState('');
  const [loaiTaiKhoan, setLoaiTaiKhoan] = useState(0);
  const [anh, setAnh] = useState('');
  const [trangThai, settrangThai] = useState(0);

  const [modalThem, setModalThem] = useState(false)
  const [datas,setDatas] = useState([])



  const capNhat_DS = () => {
    axios
      .get(`${API_URL}${get_NhanVien}`)
      .then((response) => {
        setDatas(response.data);
        console.log(response.data)
       
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    capNhat_DS();
  }, []);




  const addNhanVien = async () => {
    try {
      const newData = {
        hoten: hoTen,
        sdt: sDT,
        diachi: diaChi,
        email: email,
        ghichu: ghiChu,
        tentaikhoan: tenTaiKhoan,
        loaitaikhoan: loaiTaiKhoan,
        anh: anh,
        trangthai: trangThai,
      };
  
      const response = await axios.post(`${API_URL}${post_NhanVien}`, newData);
  
      if (response.status === 200) {
        capNhat_DS();
        setModalThem(false);
        setHoTen("");
        setSDT("");
        setDiaChi("");
        setEmail("");
        setGhiChu("");
        setTenTaiKhoan("");
        setLoaiTaiKhoan(0);
        setAnh("");
        settrangThai(0);
        console.log("Thêm nhân viên thành công!");
      } else {
        console.log("Thêm nhân viên không thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm nhân viên:", error);
    }
  };
  
  return (
    <View style={styles.container}>
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
            navigation.openDrawer();
          }}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/?size=30&id=59832&format=png",
            }}
            style={{ height: 50, width: 40, marginStart: 8 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            width: "80%",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Quản lý nhân viên
        </Text>
      </View>

      <FlatList 
     data={datas}
     keyExtractor={(item) => item._id.toString()}
     renderItem={({ item }) => {
       return <ItemNhanVien data={item} capNhat_DS={() => capNhat_DS()} />;
     }}>

      </FlatList>
      <TouchableOpacity
        onPress={() => {
          setModalThem(true);
        }}
        style={styles.buttonThem}
      >
        <Image style={styles.imgButtonThem} source={icon.iconadd} />
      </TouchableOpacity>
      <ModalAddNhanVien 
        visible={modalThem} 
        closeModal={() => setModalThem(false)} 
        capNhat_DS={capNhat_DS} 
      />
     
    </View>
  );
};

export default NhanVien;

const styles = StyleSheet.create({
   container: { flex: 1 },
   buttonThem: {
    position: "absolute",
    end: 0,
    bottom: 10,
    marginRight: 20,
    marginBottom: 20,
  },
  imgButtonThem: {
    height: 60,
    width: 60,
  }, });
