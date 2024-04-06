import { Alert, Image, Modal, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Swipeable } from "react-native-gesture-handler";
import { delete_NhanVien, put_NhanVien } from '../../linkapi/api_nhanvien';
import TextInputCustom from '../../Custom/Text_Input_custom';
import Button_custom from '../../Custom/Button_custom';
import axios from "axios";
import { API_URL } from '../../linkapi/diaChi_api';
import { get_CongViec } from '../../linkapi/api_congviec';
import { add_giaoviec } from '../../linkapi/api_giaoviec';
const ItemNhanVien = ({ data, capNhat_DS }) => {




  const {
    _id,
    hoten,
    sdt,
    diachi,
    email,
    ghichu,
    matkhau,
    tentaikhoan,
    loaitaikhoan,
    anh,
    trangthai
  } = data

  const [hoTenUp, setHoTenUp] = useState('');
  const [sDTUp, setSDTUp] = useState('');
  const [diaChiUp, setDiaChiUp] = useState('');
  const [emailUp, setEmailUp] = useState('');
  const [ghiChuUp, setGhiChuUp] = useState('');
  const [loaiTaiKhoanUp, setLoaiTaiKhoanUp] = useState(0);

  const [trangThaiUp, settrangThaiUp] = useState(0);
  const [modalSua, setModalSua] = useState(false);

  const [errorHoTenUp, setErrorHoTenUp] = useState('');
  const [errorSDTUp, setErrorSDTUp] = useState('');
  const [errorDiaChiUp, setErrorDiaChiUp] = useState('');
  const [errorEmailUp, setErrorEmailUp] = useState('');
  const [errorghiChuUp, seterrorGhiChuUp] = useState('');
  const [errorloaiTaiKhoanUp, seterrorLoaiTaiKhoanUp] = useState('');
  const [errortrangThaiUp, seterrortrangThaiUp] = useState('');

  const [tenCongViec, setTenCongViec] = useState('');
  const [idCongViec, setIdCongViec] = useState('');

  const [modalGiaoViec, setModalGiaoViec] = useState(false);
 

  const [listCongViec, setlistCongViec] = useState([]);

  const getListcongviec = () =>{
    axios
      .get(`${API_URL}${get_CongViec}`)
      .then((response) => {
        setlistCongViec(response.data);
        
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }
  useEffect(() => {
    getListcongviec();
    
  }, []);
  
  const addGiaoViec = async () => {

    try {
      const newData = {
        id_nhanvien: _id,
        id_congviec: idCongViec
      };

      const response = await axios.post(`${API_URL}${add_giaoviec}`, newData);

      if (response.status === 200) {
       
        console.log("Giao việc cho nhân viên thành công!");
      } else {
        console.log("Giao việc cho nhân viên không thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi giao việc cho nhân viên:", error);
    }
  };

  const validUpdate = () => {
    let isValid = true;
    if (hoTenUp.trim() === '') {
      setErrorHoTenUp('Vui lòng nhập tên nhân viên');
      isValid = false;
    } else {
      setErrorHoTenUp('');
    }
    if (sDTUp.trim() === '') {
      setErrorSDTUp('Vui lòng nhập số điện thoại nhân viên');
      isValid = false;
    } else {
      setErrorSDTUp('');
    }
    if (diaChiUp.trim() === '') {
      setErrorDiaChiUp('Vui lòng nhập địa chỉ nhân viên');
      isValid = false;
    } else {
      setErrorDiaChiUp('');
    }
    if (emailUp.trim() === '') {
      setErrorEmailUp('Vui lòng Email tên nhân viên');
      isValid = false;
    } else {
      setErrorEmailUp('');
    }
    if (ghiChuUp.trim() === '') {
      seterrorGhiChuUp('Vui lòng nhập Ghi chú nhân viên');
      isValid = false;
    } else {
      seterrorGhiChuUp('');
    }
    if (isNaN(loaiTaiKhoanUp)) {
      seterrorLoaiTaiKhoanUp('Vui lòng nhập Loại tài khoản nhân viên');
      isValid = false;
    } else {
      seterrorLoaiTaiKhoanUp('');
    }

    // Kiểm tra và set lỗi cho trường trạng thái
    if (isNaN(trangThaiUp)) {
      seterrortrangThaiUp('Vui lòng nhập Trạng thái nhân viên');
      isValid = false;
    } else {
      seterrortrangThaiUp('');
    }
    return isValid;
  }



  const SuaItem = async () => {
    if (validUpdate()) {
      try {
        const newData = {
          // Các trường dữ liệu cần sửa
          hoten: hoTenUp,
          sdt: sDTUp,
          diachi: diaChiUp,
          email: emailUp,
          ghichu: ghiChuUp,
          loaitaikhoan: loaiTaiKhoanUp,
          trangthai: trangThaiUp

          // Các trường dữ liệu khác ...
        };

        // Gửi request để cập nhật dữ liệu với ID của mục cần sửa
        const response = await axios.put(`${API_URL}${put_NhanVien}${_id}`, newData);
        console.log(newData)

        // Kiểm tra kết quả trả về từ server
        if (response.status === 200) {
          // Nếu cập nhật thành công, cập nhật lại danh sách dữ liệu
          capNhat_DS();

          setModalSua(false)
          setHoTenUp("")
          setDiaChiUp("")
          setSDTUp("")
          setEmailUp("")
          setGhiChuUp("")
          setLoaiTaiKhoanUp("")
          settrangThaiUp("")
          console.log("Cập nhật dữ liệu thành công!");
        } else {
          console.log("Cập nhật dữ liệu không thành công!");
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật dữ liệu:", error);
      }
    } else {
      console.log("Dữ liệu không hợp lệ!");
    }

  };




  const XoaItem = async () => {
    try {
      // Gửi request để xóa mục nhân viên với ID của mục đó
      const response = await axios.delete(`${API_URL}${delete_NhanVien}${_id}`);
  
      // Kiểm tra kết quả trả về từ server
      if (response.status === 200) {
        // Nếu xóa thành công, cập nhật lại danh sách dữ liệu
        capNhat_DS();
        console.log("Xóa mục nhân viên thành công!");
      }
      else if(response.status === 403){
        console.log("Không thể xóa vì còn nhân viên trong giao việc");
      } else {
        console.log("Xóa mục nhân viên không thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi xóa mục nhân viên:", error);
    }
  };
  


  const renderRightActions = (progress, dragX) => {
    return (
      <View style={styles.rightActions}>
        <TouchableOpacity
          style={{

            backgroundColor: "blue",
            justifyContent: "center",
            width: 90,
            height: '30%',
            alignItems: 'center'

          }}
          onPress={() => {
            setModalSua(true)
            setHoTenUp(hoten)
            setDiaChiUp(diachi)
            setSDTUp(sdt)
            setEmailUp(email)
            setGhiChuUp(ghichu)
            setLoaiTaiKhoanUp(loaitaikhoan)
            settrangThaiUp(trangthai)
          }}
        >
          <Text>Sửa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{

            backgroundColor: "red",
            width: 90,
            justifyContent: 'center',
            alignItems: 'center',
            height: '30%',
            marginVertical: 5
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
          <Text >Xóa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
           >
          <Text>Giao việc </Text>
        </TouchableOpacity>

      </View>
    );
  };


  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <Image style={styles.avata} source={{ uri: data.anh }}></Image>
        <View style={styles.viewText}>
          <Text style={styles.textItem}>Họ tên:{data.hoten}</Text>
          <Text style={styles.textItem}>Email: {data.email}</Text>
          <Text style={styles.textItem}>Số điện thoại: {data.sdt}</Text>
          <Text style={styles.textItem}>Địa chỉ: {data.diachi}</Text>
          <Text style={styles.textItem}>Ghi chú: {data.ghichu}</Text>
          <Text style={styles.textItem}>Loại tài khoản: {data.loaitaikhoan === 1 ? 'Admin' : 'Nhân viên'}</Text>
          <Text style={styles.textItem}>Trạng thái: {data.trangthai === 1 ? "Đang làm" : "Đã nghỉ việc"}</Text>
        </View>
        {/* Modal Sửa////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <Modal
          transparent={true}
          visible={modalSua}
          animationType="slide"
          style={{ flex: 1 }}
        >
          <TouchableOpacity
            onPress={() => {
              setModalSua(!modalSua);
              setSDTUp("");
              setDiaChiUp("");
              setHoTenUp("");
              setEmailUp("");
              setGhiChuUp("");
              setLoaiTaiKhoanUp(loaitaikhoan);
              settrangThaiUp(trangthai);


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
                    setModalSua(false);
                  }}
                >
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={{
                      uri: "https://cdn0.iconfinder.com/data/icons/octicons/1024/x-512.png",
                    }}
                  />
                </TouchableOpacity>

                <Text style={[styles.theText]}>Sửa Nhân Viên</Text>
              </View>{/* 1 */}
              <View
                style={[
                  styles.cuc1,
                  { height: 65, justifyContent: "space-between" },
                ]}
              >
                <Text
                  style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}
                >
                  Tên nhân viên:
                </Text>
                <TextInputCustom
                  placeholder="Nhập tên Nhân viên"
                  value={hoTenUp}
                  onChangeText={(text) => setHoTenUp(text)}

                  style={styles.inputnhaptext}
                />
              </View>
              {/* 2 */}
              <View style={[styles.cuc1, { height: 65, justifyContent: "space-between" }]}>
                <Text style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}>
                  Số điện thoại:
                </Text>
                <TextInputCustom
                  placeholder="Nhập số điện thoại"
                  value={sDTUp}
                  onChangeText={(text) => setSDTUp(text)}

                  style={styles.inputnhaptext}
                />
              </View>

              <View style={[styles.cuc1, { height: 65, justifyContent: "space-between" }]}>
                <Text style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}>
                  Địa chỉ:
                </Text>
                <TextInputCustom
                  placeholder="Nhập địa chỉ"
                  value={diaChiUp}
                  onChangeText={(text) => setDiaChiUp(text)}

                  style={styles.inputnhaptext}
                />
              </View>

              <View style={[styles.cuc1, { height: 65, justifyContent: "space-between" }]}>
                <Text style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}>
                  Email:
                </Text>
                <TextInputCustom
                  placeholder="Nhập email"
                  value={emailUp}
                  onChangeText={(text) => setEmailUp(text)}

                  style={styles.inputnhaptext}
                />
              </View>

              <View style={[styles.cuc1, { height: 65, justifyContent: "space-between" }]}>
                <Text style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}>
                  Ghi chú:
                </Text>
                <TextInputCustom
                  placeholder="Nhập ghi chú"
                  value={ghiChuUp}
                  onChangeText={(text) => setGhiChuUp(text)}

                  style={styles.inputnhaptext}
                />
              </View>

              <View style={[styles.cuc1, { height: 65, justifyContent: "space-between" }]}>
                <Text style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}>
                  Loại tài khoản:
                </Text>
                <TextInputCustom
                  placeholder="Nhập loại tài khoản"
                  value={String(loaiTaiKhoanUp)}
                  onChangeText={(text) => setLoaiTaiKhoanUp(text)}

                  style={styles.inputnhaptext}
                />
              </View>

              <View style={[styles.cuc1, { height: 65, justifyContent: "space-between" }]}>
                <Text style={[styles.theText, { fontSize: 16, textAlign: "auto" }]}>
                  Trạng thái:
                </Text>
                <TextInputCustom
                  placeholder="Nhập trạng thái"
                  value={String(trangThaiUp)}
                  onChangeText={(text) => settrangThaiUp(text)}

                  style={styles.inputnhaptext}
                />
              </View>
              <Button_custom
                noidung="Sửa"
                onPress={() => {
                  SuaItem();
                  console.log(
                    hoten,
                    sdt,
                    diachi,
                    email,
                    ghichu,
                    loaitaikhoan,
                    trangthai,
                  );
                }}
              />
            </View>
          </View>
        </Modal>

        {/* Modal Sửa////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        {/* ////Modal Giao Việc////////////////////////////////////////////////////////////////////////////////////////// */}
        {/* <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Chọn công việc:</Text>
          <FlatList
            data={listCongViec}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
          <TouchableOpacity onPress={closeModal} style={{ marginTop: 10, alignSelf: 'flex-end' }}>
            <Text style={{ color: 'blue' }}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    {/* </Modal> */}

     {/* ////Modal Giao Việc////////////////////////////////////////////////////////////////////////////////////////// */}
      </View>
    </Swipeable>

  )
}

export default ItemNhanVien

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
    flexDirection: 'row',
    marginHorizontal: 10

  },
  avata: {
    flex: 3,
    height: '100%',


  },
  viewText: {
    flex: 7,
    flexDirection: 'column',
    marginLeft: 10
  },
  textItem: {

  },
  buttonContainer: {

  },
  button: {
    backgroundColor: '#F4A460',
    height: '30%',
    width: 90,
    justifyContent: 'center',
    alignItems: 'center'

  },
  rightActions: {
    height: 'auto',
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  actionText: {
    fontSize: 12,
    paddingHorizontal: 10,
    color: "white",
    fontWeight: "600",
  },
  inputerr: {
    // borderRadius: 10,
    borderWidth: 0.5,
    marginBottom: 30,
    borderColor: "red",
    backgroundColor: "white",
    borderColor: "#ff6666",
    fontSize: 13,
    borderRadius: 10,
    opacity: 0.6,
    backgroundColor: "#ffcccc",
    paddingHorizontal: 17,
  },
  inputnhaptext: {

    borderColor: "rgba(102, 0, 0,0.3)",
    fontSize: 13,
    backgroundColor: "rgba(102, 0, 0,0.3)",
    borderRadius: 10,
    paddingHorizontal: 17,
    height: 40
  },
  inputchuanhaptext: {
    // borderRadius: 10,
    marginBottom: 30,
    borderColor: "#DAD1C5",
    fontSize: 13,
    backgroundColor: "rgba(99, 54, 54,0.3)",
    borderRadius: 10,
    paddingHorizontal: 17,
  },
})