import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

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
  return (
    <View>
      <Text>GiaoViec</Text>
    </View>
  )
}

export default GiaoViec

const styles = StyleSheet.create({})