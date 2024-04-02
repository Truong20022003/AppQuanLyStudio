import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { get_HoaDonChiTiet_ByIdHoaDon } from '../../linkapi/api_hoadonchitiet';
import { useRoute } from '@react-navigation/native';
import { API_URL } from "../../linkapi/diaChi_api";
import { get_Dichvu_ById } from '../../linkapi/api_dichvu';

const HoaDonChiTiet = () => {
  const route = useRoute();
  const { idHoaDon } = route.params;
  
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchListHoaDonChiTiet = async () => {
      try {
        const response = await fetch(`${API_URL}${get_HoaDonChiTiet_ByIdHoaDon}${idHoaDon}`);
        const data = await response.json();
        setDatas(data.result || []);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách dịch vụ', error);
      }
    };

    fetchListHoaDonChiTiet();
  }, [idHoaDon]);

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <Text>Thông tin chi tiết hóa đơn:</Text>
      <FlatList
        data={datas}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item._id.toString()}
      />
    </View>
  );
};

const RenderItem = ({ item }) => {
  const [anhDichVu, setAnhDichVu] = useState('');

  useEffect(() => {
    const fetchDichVuById = async () => {
      try {
        const response = await fetch(`${API_URL}${get_Dichvu_ById}${item.iddichvu}`);
        const data = await response.json();
        const result = data.result || {};
        const anh = result.anh[0] || '';
        setAnhDichVu(anh);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin dịch vụ:', error);
      }
    };

    fetchDichVuById();
  }, [item.iddichvu]);

  return (
    <View style={styles.item1}>
      <Image source={{ uri: anhDichVu }} style={{ width: 100, height: 100 }} />
      <View style={styles.item2}>
        <Text style={{ color: 'red' }}>ID hóa đơn: {item.idhoadon}</Text>
        <Text style={{ color: 'red' }}>ID dịch vụ: {item.iddichvu}</Text>
        <Text style={{ color: 'red' }}>Số lượng: {item.soluong}</Text>
        <Text style={{ color: 'red' }}>Đơn giá: {item.dongia}</Text>
        <Text style={{ color: 'red' }}>Thành tiền: {item.thanhtien}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item1: {
    height: 'auto',
    width: '100%',

    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item2: {
    flexDirection: 'column',
    marginLeft: 10,
  },
});

export default HoaDonChiTiet;
