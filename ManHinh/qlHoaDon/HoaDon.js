import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
  TextInput,
  Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../linkapi/diaChi_api";
import {
  delete_HoaDon,
  get_HoaDon,
  post_HoaDon,
  put_HoaDon,
} from "../../linkapi/api_hoadon";
import { icon } from "../../Image";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { get_KhachHang } from "../../linkapi/api_khachhang";
import { get_DichVu } from "../../linkapi/api_dichvu";
import CheckBox from "@react-native-community/checkbox";
import { post_HoaDonChiTiet } from "../../linkapi/api_hoadonchitiet";
import moment from "moment";
import { Swipeable } from "react-native-gesture-handler";
const HoaDon = () => {
  const navigation = useNavigation();

  const [idkhachhang, setidkhachhang] = useState("");
  const [tenkhachhang, settenkhachhang] = useState("");
  const [khachHangList, setKhachHangList] = useState([]);

  const [ngaydathang, setngaydathang] = useState(moment().format("YYYY-MM-DD")); // Đặt giá trị ban đầu là ngày tháng năm hiện tại
  // const [dateDatHang, setDateDatHang] = useState(dayjs())

  const [tongtien, settongtien] = useState(0);

  const [trangthai, settrangthai] = useState(false);

  const [ngaytrahang, setngaytrahang] = useState(
    moment()
      .add(Math.floor(Math.random() * 4) + 3, "days")
      .format("YYYY-MM-DD")
  );
  // const [dateTraHang, setDateTraHang] = useState(dayjs())
  // const [modalDate, setModalDate] = useState(false)

  const [idhoadon, setidhoadon] = useState("");

  const [modalthem, setmodalthem] = useState(false);
  const [modalsua, setmodalsua] = useState(false);

  const [index, setindex] = useState(0);
  const [datas, setdatas] = useState([]);

  const [upidkhachhang, setupidkhachhang] = useState("");
  const [upngaydathang, setupngaydathang] = useState("");
  const [uptongtien, setuptongtien] = useState("");
  const [uptrangthai, setuptrangthai] = useState("");
  const [upngaytrahang, setupngaytrahang] = useState("");

  const [dichVuList, setDichVuList] = useState([]);
  const [selectedDichvu, setSelectedDichVu] = useState([]);

  const [idDichVuChon, setIdDichVuChon] = useState("");
  const [gia, setGia] = useState(0);

  const [chosenDate, setChosenDate] = useState(new Date());

  // const handleConfirm = () => {
  //   setChosenDate(dateDatHang);
  //   setModalDate(false);
  // };

  // const handleCancel = () => {
  //   setDateDatHang(chosenDate);
  //   setModalDate(false);
  // };

  const fetchDichVuList = () => {
    fetch(`${API_URL}${get_DichVu}`)
      .then((response) => response.json())
      .then((data) => {
        setDichVuList(data);
      })
      .catch((error) => console.error("Lỗi khi lấy danh sách dịch vụ", error));
  };

  const toggleDichVuSelection = (DichVuId) => {
    if (selectedDichvu.includes(DichVuId)) {
      setSelectedDichVu(selectedDichvu.filter((id) => id !== DichVuId));
    } else {
      setSelectedDichVu([...selectedDichvu, DichVuId]);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedDichvu.forEach((dichVuId) => {
      const dichVu = dichVuList.find((dichVu) => dichVu._id === dichVuId);
      if (dichVu) {
        totalPrice += dichVu.gia;
      }
    });
    return totalPrice;
  };
  useEffect(() => {
    settongtien(calculateTotalPrice());
  }, [selectedDichvu]);

  const fetchKhachHangList = () => {
    fetch(`${API_URL}${get_KhachHang}`)
      .then((response) => response.json())
      .then((data) => {
        setKhachHangList(data); // Lưu trữ cả id và tên của khách hàng
      })
      .catch((error) => console.error("Lỗi khi lấy list khách hàng", error));
  };
  useEffect(() => {
    fetchKhachHangList(); // Gọi hàm lấy danh sách ID của khách hàng khi component được render
    fetchDichVuList();
  }, []);

  const handleItemPress = (idHoaDon) => {
    navigation.navigate("Hoa_Don_Chi_Tiet", { idHoaDon }); // Chuyển hướng và truyền tham số
    console.log(idHoaDon);
  };

  const laydl = () => {
    fetch(`${API_URL}${get_HoaDon}`)
      .then((rep) => rep.json())
      .then((data) => {
        setdatas(data);

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

  const xoadl = (_id) => {
    fetch(`${API_URL}${delete_HoaDon}${_id}`, {
      method: "DELETE",
    })
      .then((rep) => {
        if (rep.ok) {
          fetch(`${API_URL}${get_HoaDon}`)
            .then((rep) => rep.json())
            .then((data) => {
              setdatas(data);
            })
            .catch((err) => console.log(err));
          setindex(datas.length);
        }
      })
      .catch((err) => console.log(err));
  };

  const suadl = (_id) => {
    const tongtienNumber = parseFloat(uptongtien);
    const formdata = {
      idkhachhang: upidkhachhang,
      ngaydathang: upngaydathang,
      tongtien: tongtienNumber,
      trangthai: uptrangthai,
      ngaytrahang: upngaytrahang,
    };

    if (
      upidkhachhang.length > 0 &&
      upngaydathang.length > 0 &&
      upngaytrahang.length > 0
    ) {
      fetch(`${API_URL}${put_HoaDon}${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      })
        .then((rep) => {
          if (rep.ok) {
            fetch(`${API_URL}${get_HoaDon}`)
              .then((rep) => rep.json())
              .then((data) => {
                setdatas(data);
                setupidkhachhang("");
                setupngaydathang("");
                setupngaytrahang("");
                setuptongtien(0);
                setuptrangthai(false);
                setmodalsua(false);
              })
              .catch((err) => console.log(err));
            setindex(datas.length);
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Không được để trống");
    }
  };

  const addHoaDonChiTiet = async (hoaDonId) => {
    await Promise.all(
      selectedDichvu.map(async (serviceId) => {
        const service = dichVuList.find((dichvu) => dichvu._id === serviceId);
        if (service) {
          const hoaDonChiTietData = {
            idhoadon: hoaDonId,
            thanhtien: service.gia,
            iddichvu: serviceId,
          };
          await fetch(`${API_URL}${post_HoaDonChiTiet}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(hoaDonChiTietData),
          });
        }
      })
    );
  };

  const themdl = () => {
    const tongtienNumber = parseFloat(tongtien);

    // setngaydathang(dateDatHang.toString())
    // setngaytrahang(dateTraHang.toString())
    const formdata = {
      idkhachhang: idkhachhang,
      ngaydathang: ngaydathang,
      tongtien: tongtienNumber,
      trangthai: trangthai,
      ngaytrahang: ngaytrahang,
    };

    if (
      idkhachhang.length > 0 &&
      ngaydathang.length > 0 &&
      ngaytrahang.length > 0
    ) {
      fetch(`${API_URL}${post_HoaDon}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      })
        .then((rep) => {
          if (rep.ok) {
            fetch(`${API_URL}${get_HoaDon}`)
              .then((rep) => rep.json())
              .then((data) => {
                setdatas(data);
                setidkhachhang("");
                settongtien(0);
                settrangthai(false);
                setmodalthem(false);
                const hoaDonId = data[data.length - 1]._id;
                // Thêm các chi tiết hóa đơn cho các dịch vụ được chọn
                addHoaDonChiTiet(hoaDonId);
                //   for(let i = 0; i <= datas.length; i++){
                //   // Thêm các chi tiết hóa đơn
                //   addHoaDonChiTiet(datas[i]._id);
                // }
              })
              .catch((err) => console.log(err));
            setindex(datas.length);
          }
        })
        .catch((err) => console.log(err));
    } else {
      Alert.alert("Không được để trống");
    }
  };
  const renderRightActions = (progress, dragX, item) => (
    <View style={[styles.rightActions]}>
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
          _id = item._id;
          Alert.alert("Bạn có muốn xóa không?", "", [
            { text: "Hủy" },
            {
              text: "OK",
              onPress: () => {
                xoadl(_id);
              },
            },
          ]);
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
          _id = item._id;
          setupidkhachhang(item.idkhachhang);
          setupngaydathang(item.ngaydathang);
          setuptongtien(item.tongtien.toString());
          setuptrangthai(item.trangthai);
          setupngaytrahang(item.ngaytrahang);
          setmodalsua(true);
          setidhoadon(_id);
        }}
      >
        <Text style={[styles.actionText]}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => {
    const khachHang = khachHangList.find(
      (khachHang) => khachHang._id === item.idkhachhang
    );
    const tenKhachHang = khachHang ? khachHang.hoten : "Không có";

    const color = item.trangthai === true ? "#00BFFF" : "red";

    return (
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, item)
        }
      >
        <TouchableOpacity
          onPress={() => handleItemPress(item._id)}
          style={{
            backgroundColor: "white",
            paddingHorizontal: 10,
            marginHorizontal: 20,
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
            elevation: 5, // Độ nổi lên của phần tử
            shadowColor: "#000", // Màu của bóng
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25, // Độ trong suốt của bóng
            shadowRadius: 3.84, // Độ rộng của bóng
          }}
        >
          <View style={styles.item}>
            <Text>Khách hàng: {item.idkhachhang}</Text>
            <Text>Tên khách hàng: {tenKhachHang}</Text>
            <Text>Ngày đặt hàng: {item.ngaydathang}</Text>
            <Text>Tổng tiền: {item.tongtien}</Text>
            <Text style={{ color: color }}>
              Trạng thái:{" "}
              {item.trangthai === true ? "Đã thanh toán" : "Chưa thanh toán"}
            </Text>
            <Text>Ngày trả hàng: {item.ngaytrahang}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };
  const renderEditModal = (item) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalsua}
        onRequestClose={() => {
          setmodalsua(!modalsua);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sửa thông tin hóa đơn</Text>

            <Picker
              style={{ height: "auto" }}
              selectedValue={upidkhachhang}
              onValueChange={(itemValue, itemIndex) =>
                setupidkhachhang(itemValue)
              }
            >
              {khachHangList.map((khachHang) => (
                <Picker.Item
                  key={khachHang._id}
                  label={`${khachHang.hoten}`}
                  value={khachHang._id}
                />
              ))}
            </Picker>

            <TextInput
              style={styles.input}
              value={upngaydathang}
              onChangeText={(text) => setupngaydathang(text)}
              placeholder="Ngày đặt hàng"
              editable={false}
            />
            <TextInput
              style={styles.input}
              value={uptongtien.toString()}
              onChangeText={(text) => setuptongtien(text)}
              placeholder="Tổng tiền"
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>{uptrangthai ? "Đã thanh toán" : "Chưa thanh toán"}</Text>
              <Switch
                value={uptrangthai === true}
                onValueChange={(value) => setuptrangthai(value ? true : false)}
              />
            </View>

            <TextInput
              style={styles.input}
              value={upngaytrahang}
              onChangeText={(text) => setupngaytrahang(text)}
              placeholder="Ngày trả hàng"
            />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 10,
                  backgroundColor: "red",
                  marginHorizontal: 20,
                  width: "40%",
                }}
                onPress={() => setmodalsua(false)}
              >
                <Text>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 10,
                  backgroundColor: "#00BFFF",
                  marginHorizontal: 20,
                  width: "40%",
                }}
                onPress={() => suadl(idhoadon)}
              >
                <Text>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}
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
        <Text style={styles.textdanhsach}>Danh sách hóa đơn</Text>
      </View>

      <FlatList
        data={datas}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />
      {renderEditModal()}

      <TouchableOpacity
        onPress={() => {
          setmodalthem(true);
        }}
        style={styles.buttonThem}
      >
        <Image style={styles.imgButtonThem} source={icon.iconadd} />
      </TouchableOpacity>

      <Modal transparent={true} animationType="fade" visible={modalthem}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            setmodalthem(false);
            setidkhachhang("");
            setngaydathang(ngaydathang);
            setngaytrahang(ngaytrahang);
            settongtien(0);
            settrangthai(false);
            settongtien(0);
            setSelectedDichVu([]);
          }}
        />
        <View style={{ height: "auto", backgroundColor: "white", padding: 10 }}>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Thêm hóa đơn
          </Text>
          <Text
            style={{
              width: "100%",

              fontSize: 20,
            }}
          >
            Chọn dịch vụ
          </Text>
          <ScrollView style={{ width: "100%", height: "30%" }}>
            {dichVuList.map((dichVu) => (
              <View key={dichVu._id}>
                <TouchableOpacity
                  onPress={() => toggleDichVuSelection(dichVu._id)}
                >
                  <Text>{dichVu.ten}</Text>
                  <Text>{dichVu.gia}</Text>
                  <Switch
                    value={selectedDichvu.includes(dichVu._id)}
                    onValueChange={() => toggleDichVuSelection(dichVu._id)}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <Text
            style={{
              width: "100%",

              fontSize: 20,
            }}
          >
            Chọn nhân viên
          </Text>
          <View style={{ height: "auto", borderWidth: 1, borderRadius: 10 }}>
            <Picker
              style={{ height: "auto", borderWidth: 2 }}
              selectedValue={idkhachhang}
              onValueChange={(itemValue, itemIndex) =>
                setidkhachhang(itemValue)
              }
            >
              {khachHangList.map((khachHang) => (
                <Picker.Item
                  key={khachHang._id}
                  label={`${khachHang.hoten}`}
                  value={khachHang._id}
                />
              ))}
            </Picker>
          </View>

          {/* <TouchableOpacity onPress={() => setModalDate(true)}>
        <Text>Chọn ngày đặt hàng</Text>
      </TouchableOpacity> */}

          <Text>Ngày đặt hàng</Text>
          <TextInput
            style={styles.input}
            value={ngaydathang}
            onChangeText={(text) => setngaydathang(text)}
            placeholder="Ngày dặt hàng"
            editable={false}
          />
          {/* <Modal
        visible={modalDate}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalDate(false)}
      >
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={{ backgroundColor: "#ffffff" }}>
          <Text>Ngày đặt hàng</Text>
         <DatePicker
                value={dateDatHang}
                onChange={(value) => setDateDatHang(value)}
                format="yyyy-mm-dd"
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity style={{width: '40%',height: 40}}  onPress={handleConfirm} >
                  <Text>Chọn</Text>
          </TouchableOpacity>
              <TouchableOpacity style={{width: '40%',height: 40}} onPress={handleCancel} >
                <Text>Hủy</Text>
              </TouchableOpacity>
          </View>
          
        </View>
      </Modal> */}

          <Text>Tổng tiền: {tongtien.toString()}</Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>{trangthai ? "Đã thanh toán" : "Chưa thanh toán"}</Text>
            <Switch
              value={trangthai === true}
              onValueChange={(value) => settrangthai(value ? true : false)}
            />
          </View>

          <TextInput
            style={styles.input}
            value={ngaytrahang}
            onChangeText={(text) => setngaytrahang(text)}
            placeholder="Ngày trả hàng"
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() => {
                setmodalthem(false);
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 10,
                backgroundColor: "red",
                marginHorizontal: 20,
                width: "40%",
              }}
            >
              <Text>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                themdl();
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 10,
                backgroundColor: "#00BFFF",
                marginHorizontal: 20,
                width: "40%",
              }}
            >
              <Text>Tiếp theo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HoaDon;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
  },
  textdanhsach: {
    margin: 20,
    fontSize: 30,
  },
  item: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flex: 1,
    height: "100%",
  },
  deleteButton: {
    width: 40,
    height: 40,
    marginTop: 8,
  },
  viewButton: {
    flexDirection: "row",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
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
  },
  dateTimePicker: {
    width: 200,
    height: 40,
    marginBottom: 10,
  },
  rightActions: {
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
});
