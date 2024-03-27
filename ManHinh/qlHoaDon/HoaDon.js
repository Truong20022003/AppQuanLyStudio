import {  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity, } from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../linkapi/diaChi_api";
import { delete_HoaDon, get_HoaDon } from "../../linkapi/api_hoadon";
import { icon } from "../../Image";
import { useNavigation } from "@react-navigation/native";

const HoaDon = () => {

  const [idkhachhang, setidkhachhang] = useState('');
  const [ngaydathang, setngaydathang] = useState('');
  const [tongtien, settongtien] = useState('');
  const [trangthai, settrangthai] = useState('');
  const [ngaytrahang, setngaytrahang] = useState('');
  
  const [modalthem, setmodalthem] = useState(false);
  const [modalsua, setmodalsua] = useState(false);
  
  const [index, setindex] = useState(0);
  const [datas, setdatas] = useState([]);

  const [upidkhachhang, setupidkhachhang] = useState('');
  const [upngaydathang, setupngaydathang] = useState('');
  const [uptongtien, setuptongtien] = useState('');
  const [uptrangthai, setuptrangthai] = useState('');
  const [upngaytrahang, setupngaytrahang] = useState('');


  const laydl = () => {
    fetch(`${API_URL}${get_HoaDon}`)
      .then(rep => rep.json())
      .then(data => {
        setdatas(data);
        console.log(data)
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    const tgchay = setTimeout(() => {
      laydl();
    }, 3000);
    return () => {
      clearTimeout(tgchay);
    };
  }, []);


  const xoadl = () => {
    fetch(`${API_URL}${delete_HoaDon}${iditem}`, {
      method: 'DELETE',
    })
      .then(rep => {
        if (rep.ok) {
          fetch(`${API_URL}${get_HoaDon}`)
            .then(rep => rep.json())
            .then(data => {
              setdatas(data);
            })
            .catch(err => console.log(err));
          setindex(datas.length);
        }
      })
      .catch(err => console.log(err));
  };



  // const suadl = () => {
  //   const formdata = {
  //     idkhachhang: idkhachhang,
  //     ngaydathang: ngaydathang,
  //     tongtien: tongtien,
  //     trangthai: trangthai,
  //     ngaytrahang: ngaytrahang,
  //   };
  //   if (upidkhachhang.length > 0 && uptuoi.length > 0 && uphopdong.length > 0) {
  //     fetch(`http://localhost:3000/hoadon/updatehoadon/${iditem}`, {
  //       method: 'PUT',
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify(formdata),
  //     })
  //       .then(rep => {
  //         if (rep.ok) {
  //           fetch('http://localhost:3000/hoadon/getListhoadon')
  //             .then(rep => rep.json())
  //             .then(data => {
  //               setdatas(data);
  //               setupten('');
  //               setuptuoi('');
  //               setuphopdong('');
  //               setmodalsua(false);
  //             })
  //             .catch(err => console.log(err));
  //           setindex(datas.length);
  //         }
  //       })
  //       .catch(err => console.log(err));
  //   } else {
  //     alert('ko duco de trong');
  //   }
  // };
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text>ID: {item.id}</Text>
        <Text>Khách hàng: {item.idkhachhang}</Text>
        <Text>Ngày đặt hàng: {item.ngaydathang}</Text>
        <Text>Tổng tiền: {item.tongtien}</Text>
        <Text>Trạng thái: {item.trangthai === true ? "Đang hoạt động" : "Ngừng hoạt động"}</Text>
        <Text>Ngày trả hàng: {item.ngaytrahang}</Text>
        <TouchableOpacity onPress={() => xoadl(item.id)}>
          <Text style={styles.deleteButton}>Xóa</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <FlatList
      data={datas}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default HoaDon;

const styles = StyleSheet.create({

  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  deleteButton: {
    color: "red",
    marginTop: 8,
    textAlign: "center",
  },

});
