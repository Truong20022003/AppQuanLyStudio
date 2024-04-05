import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const ItemNhanVien = (navigation) => {


  const [hoTen, setHoTen] = useState('');
  const [sDT, setSDT] = useState('');
  const [diaChi, setDiaChi] = useState('');
  const [email, setEmail] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  const [tenTaiKhoan, setTenTaiKhoan] = useState('');
  const [loaiTaiKhoan, setLoaiTaiKhoan] = useState(0);
  const [anh, setAnh] = useState('');
  const [trangThai, settrangThai] = useState(0);
  const [modalSua, setModalSua] = useState(false)
  const [modalThem, setModalThem] = useState(false)


  const [hoTenUp, setHoTenUp] = useState('');
  const [sDTUp, setSDTUp] = useState('');
  const [diaChiUp, setDiaChiUp] = useState('');
  const [emailUp, setEmailUp] = useState('');
  const [ghiChuUp, setGhiChuUp] = useState('');
  const [tenTaiKhoanUp, setTenTaiKhoanUp] = useState('');
  const [loaiTaiKhoanUp, setLoaiTaiKhoanUp] = useState(0);
  const [anhUp, setAnhUp] = useState('');
  const [trangThaiUp, settrangThaiUp] = useState(0);

  
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
    <View style={styles.container}>
      <Image style={styles.avata}></Image>
      <View style={styles.viewText}>
        <Text style={styles.textItem}></Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} >
          
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ItemNhanVien

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: 'auto',
      flexDirection: 'row'
    },
    avata: {
      flex: 2,
        height:'100%',
        width: 'auto'

    },
    viewText: {
      flex: 6,
      flexDirection: 'column'
    },
    textItem: {

    },
    buttonContainer: {
      flex: 2,
      flexDirection: 'column',
    },
    button: {
     
    },
})