import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const GiaoViec = () => {
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

  const [datas,setDatas] = useState([])
  const laydl = () => {
    fetch(`${API_URL}${get_NhanVien}`)
      .then((rep) => rep.json())
      .then((data) => {
        setDatas(data);

        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const tgchay = setTimeout(() => {
      laydl();
    }, 3000);
    return () => {
      clearTimeout(tgchay);
    };
  }, []);
  return (
    <View>
      <Text>GiaoViec</Text>
      <FlatList
        data={dichVuList}
        horizontal
        showsHorizontalScrollIndicator={false}
        overScrollMode="never" // Ngăn chặn hiệu ứng "bóng" khi vuốt tới cuối danh sách
        overScrollColor="transparent" // Đặt màu sắc của hiệu ứng bóng là transparent
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => {
          return <Item_dv_Duoc_Chon_nhieu data={item} />;
        }}
      
      ></FlatList>
    </View>
  )
}

export default GiaoViec

const styles = StyleSheet.create({})