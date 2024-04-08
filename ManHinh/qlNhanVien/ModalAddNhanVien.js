import React, { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { API_URL } from "../../linkapi/diaChi_api";
import axios from "axios";
import { post_NhanVien } from "../../linkapi/api_nhanvien";

const ModalAddNhanVien = ({ visible, closeModal, capNhat_DS }) => {
  const [hoTen, setHoTen] = useState('');
  const [sDT, setSDT] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [email, setEmail] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  const [tenTaiKhoan, setTenTaiKhoan] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [loaiTaiKhoan, setLoaiTaiKhoan] = useState(0);
  const [anh, setAnh] = useState(null);
  const [trangThai, setTrangThai] = useState(0);
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
      setAnh(kq.assets[0].uri);
      console.log(kq.assets[0].uri)
    }
  };
  const addNhanVien = async () => {
    try {
      if (!hoTen || !sDT || !diaChi || !email || !tenTaiKhoan || !matKhau || loaiTaiKhoan === 0 || !anh) {
        Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
        return;
      }
  
      // Tạo một đối tượng FormData
      const formData = new FormData();
  
      // Thêm thông tin nhân viên vào FormData
      formData.append('hoten', hoTen);
      formData.append('sdt', sDT);
      formData.append('diachi', diaChi);
      formData.append('email', email);
      formData.append('ghichu', ghiChu);
      formData.append('tentaikhoan', tenTaiKhoan);
      formData.append('loaitaikhoan', loaiTaiKhoan);
      formData.append('matkhau', matKhau);
      formData.append('trangthai', trangThai);
        formData.append("anh", {
          uri: anh,
          type: "image/jpeg",
          name: `photo.jpg`,
        });
      console.log('aaaaaaaaaaasdsadd'+JSON.stringify(formData))
      // Gửi request lên server
      const response = await axios.post(`${API_URL}${post_NhanVien}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        capNhat_DS();
        closeModal();
        setHoTen("");
        setSDT("");
        setDiaChi("");
        setEmail("");
        setGhiChu("");
        setTenTaiKhoan("");
        setMatKhau("");
        setLoaiTaiKhoan(0);
        setAnh(null);
        setTrangThai(0);
        console.log("Thêm nhân viên thành công!");
      } else {
        console.log("Thêm nhân viên không thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm nhân viên:", error);
    }
  };
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={pickImage}>
          <Image source={anh ? { uri: anh } : require('../../assets/addImage.png')} style={styles.avatar} />    
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Họ tên"
            value={hoTen}
            onChangeText={setHoTen}
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={sDT}
            onChangeText={setSDT}
          />
          <TextInput
            style={styles.input}
            placeholder="Địa chỉ"
            value={diaChi}
            onChangeText={setDiaChi}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Ghi chú"
            value={ghiChu}
            onChangeText={setGhiChu}
          />
          <TextInput
            style={styles.input}
            placeholder="Tên tài khoản"
            value={tenTaiKhoan}
            onChangeText={setTenTaiKhoan}
          />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            value={matKhau}
            onChangeText={setMatKhau}
          />
          <TextInput
            style={styles.input}
            placeholder="Loại tài khoản"
            value={String(loaiTaiKhoan)}
            onChangeText={setLoaiTaiKhoan}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.addButton} onPress={addNhanVien}>
            <Text style={styles.addButtonText}>Thêm nhân viên</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: 'auto'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,

    marginBottom: 20,
  },
  avatarPlaceholder: {
    color: 'gray',
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  addButton: {
    backgroundColor: '#F4A460',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ModalAddNhanVien;
