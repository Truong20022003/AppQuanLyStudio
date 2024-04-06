import {
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextInputCustom from "../../Custom/Text_Input_custom";
import Button_custom from "../../Custom/Button_custom";
import { get_NhanVienBy_Id, put_NhanVien } from "../../linkapi/api_nhanvien";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { API_URL } from "../../linkapi/diaChi_api";
import { Use } from "react-native-svg";

const Thong_tin_ca_nhan = () => {
  //const { _id,hoten,sdt,  diachi,email, ghichu, matkhau,tentaikhoan, loaitaikhoan, anh} = data;
  const [dulieulogin, setdulieulogin] = useState({});
  const navigation = useNavigation();
  const [showModalSua, setshowModalSua] = useState(false);
  const [uptentaikhoan, setUpTentaikhoan] = useState("");
  const [uphoten, setUphoten] = useState("");
  const [upsdt, setUpsdt] = useState("");
  const [updiachi, setUpdiachi] = useState("");
  const [upemail, setUpemail] = useState("");
  const [upghichu, setUpGhichu] = useState("");
  const [uppassword, setUpPassword] = useState("");
  const [uptrangthai, setUpTrangthai] = useState("");
  const [uploaitaikhoan, setUpLoaitaikhoan] = useState("");
  const [upanh, setupanh] = useState(null);

  const [errortentaikhoan, seterrorTentaikhoan] = useState("");
  const [errorhoten, seterrorHoten] = useState("");
  const [errorsdt, seterrorSdt] = useState("");
  const [errordiachi, seterrorDiachi] = useState("");
  const [erroremail, seterrorEmail] = useState("");
  const [errorghichu, seterrorGhichu] = useState("");

  const [id, setId] = useState("");
  const [datas, setDatas] = useState([]);

  const pickImage = async () => {
    let kq = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(kq);
    if (!kq.canceled) {
      setupanh(kq.assets[0].uri);
    }
  };
  const handcheckupTentaikhoan = (text) => {
    if (text.trim() === "") {
      seterrorTentaikhoan("Không được để trống");
    } else {
      seterrorTentaikhoan("");
    }
    setUpTentaikhoan(text);
  };
  const handcheckupHoten = (text) => {
    if (text.trim() === "") {
      seterrorHoten("Không được để trống");
    } else {
      seterrorHoten("");
    }
    setUphoten(text);
  };
  const handcheckupSdt = (text) => {
    if (text.trim() === "") {
      seterrorSdt("Không được để trống");
    } else {
      seterrorSdt("");
    }
    setUpsdt(text);
  };
  const handcheckupDiachi = (text) => {
    if (text.trim() === "") {
      seterrorDiachi("Không được để trống");
    } else {
      seterrorDiachi("");
    }
    setUpdiachi(text);
  };
  const handcheckupEmail = (text) => {
    if (text.trim() === "") {
      seterrorEmail("Không được để trống");
    } else {
      seterrorEmail("");
    }
    setUpemail(text);
  };
  const handcheckupGhichu = (text) => {
    if (text.trim() === "") {
      seterrorGhichu("Không được để trống");
    } else {
      seterrorGhichu("");
    }
    setUpGhichu(text);
  };

  // const loadData = async () => {
  //   try {
  //     // Lấy dữ liệu mới từ API hoặc AsyncStorage
  //     const newData = await getDulieukhilogin(); // Thay fetchNewData() bằng hàm lấy dữ liệu mới từ API hoặc AsyncStorage

  //     // Cập nhật state `dulieulogin` với dữ liệu mới
  //     setdulieulogin(newData);
  //   } catch (error) {
  //     console.error("Lỗi khi tải dữ liệu mới:", error);
  //     // Xử lý lỗi khi không thể tải dữ liệu mới
  //   }
  // };

  // const capNhat_DS = () => {
  //   axios
  //     .get(`${API_URL}${get_NhanVienBy_Id}${id}`)
  //     .then((response) => {
  //       setDatas(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };
  // useEffect(() => {
  //   capNhat_DS();
  // }, []);

  const CapNhatItem = async () => {
    try {
      const response = await axios.put(`${API_URL}${put_NhanVien}${id}`, {
        anh: upanh,
        hoten: uphoten,
        sdt: upsdt,
        diachi: updiachi,
        email: upemail,
        ghichu: upghichu,
        tentaikhoan: uptentaikhoan,
      });
      console.log(response.data);
      // Sau khi cập nhật thành công, load lại dữ liệu thông tin cá nhân
      const responses = await axios.get(`${API_URL}${get_NhanVienBy_Id}${id}`);
      const updatedData = responses.data.result;

      // Cập nhật state `dulieulogin` với dữ liệu mới
      setdulieulogin(updatedData);
      setshowModalSua(false); // Đóng modal sau khi sửa thành công
      // loadData();
      //capNhat_DS();
      setUpTentaikhoan("");
      setUphoten("");
      setUpsdt("");
      setUpdiachi("");
      setUpemail("");
      setUpGhichu("");
      ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Lỗi khi cập nhật mục:", error);
      Alert.alert("Lỗi", "Không thể cập nhật mục. Vui lòng thử lại sau.");
    }
  };

  const getDulieukhilogin = async () => {
    try {
      const value = await AsyncStorage.getItem("keylogin");
      if (value !== null) {
        // setdulieulogin(JSON.parse(value));
        const parsedValue = JSON.parse(value);
        if (
          parsedValue &&
          typeof parsedValue === "object" &&
          parsedValue.hasOwnProperty("_id")
        ) {
          setdulieulogin(parsedValue);
          setId(parsedValue._id);
          console.log("Dữ liệu lấy từ màn đăng nhập", parsedValue._id);
        }
        // setId(value._id);
        // console.log("Dữ liệu lấy từ màn đăng nhập", value);
      }
    } catch (error) {
      console.log("Error reading value: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDulieukhilogin();
    });

    return unsubscribe;
  }, [navigation]);

  const Avatar = () => {
    return (
      <View
        style={{ alignItems: "center", paddingHorizontal: 20, marginTop: 10 }}
      >
        {/* <Image
          source={{ uri: dulieulogin.anh }}
          style={{ height: 100, width: 100, borderRadius: 50 }}
        /> */}
        {dulieulogin.anh ? (
          <Image
            source={{ uri: dulieulogin.anh }}
            style={{ height: 100, width: 100, borderRadius: 50 }}
          />
        ) : (

          <Image
            source={require('../../assets/addImage.png')}
            style={{ height: 100, width: 100}}
          />
        
        )}
        <View style={{ marginStart: 20, margin: 20, padding: 10 }}>
            {dulieulogin.tentaikhoan ? (
              <Text style={st.text}>
                Tên tài khoản: {dulieulogin.tentaikhoan}
              </Text>
            ) : (
              <Text style={st.texterror}>
                Vui lòng Nhập thông tin người dùng
              </Text>
            )}
            {dulieulogin.hoten ? (
              <Text style={st.text}>Họ tên: {dulieulogin.hoten}</Text>
            ) : (
              <Text style={st.texterror}>Vui lòng Nhập Họ tên người dùng</Text>
            )}
            {dulieulogin.diachi ? (
              <Text style={st.text}>Địa chỉ: {dulieulogin.diachi}</Text>
            ) : (
              <Text style={st.texterror}>Vui lòng Nhập Địa chỉ người dùng</Text>
            )}
            {dulieulogin.sdt ? (
              <Text style={st.text}>Số điện thoại: {dulieulogin.sdt}</Text>
            ) : (
              <Text style={st.texterror}>
                Vui lòng Nhập Số điện thoại người dùng
              </Text>
            )}
            {dulieulogin.email ? (
              <Text style={st.text}>Email: {dulieulogin.email}</Text>
            ) : (
              <Text style={st.texterror}>Vui lòng Nhập Email người dùng</Text>
            )}
            {dulieulogin.ghichu ? (
              <Text style={st.text}>Ghi chú: {dulieulogin.ghichu}</Text>
            ) : (
              <Text style={st.texterror}>Vui lòng Nhập Ghi chú người dùng</Text>
            )}


          <View style={st.buttonContainer}>
            <TouchableOpacity
              style={st.button}
              onPress={() => {
                setshowModalSua(!showModalSua);
                setUpTentaikhoan(dulieulogin.tentaikhoan);
                setUphoten(dulieulogin.hoten);
                setUpsdt(dulieulogin.sdt);
                setUpdiachi(dulieulogin.diachi);
                setUpemail(dulieulogin.email);
                setupanh(dulieulogin.anh);
                setUpGhichu(dulieulogin.ghichu);
                console.log(dulieulogin);
              }}
            >
              <Text style={st.buttonText}>Sửa Thông Tin</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, margin: 10 }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={st.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={st.backButtonText}>Quay lại</Text>
        </TouchableOpacity>
        <Text style={{ padding: 20, fontWeight: "bold", fontSize: 20 }}>
          Thông tin cá nhân
        </Text>
      </View>
      <View>
        <Avatar />

        {/* modal sua */}
        <Modal
          transparent={true}
          visible={showModalSua}
          animationType="slide"
          style={{ flex: 1 }}
        >
          <TouchableOpacity
            onPress={() => {
              setshowModalSua(!showModalSua);
              setUpTentaikhoan("");
              setUphoten("");
              setUpsdt("");
              setUpdiachi("");
              setUpemail("");
              setUpGhichu("");

              seterrorTentaikhoan("");
              seterrorHoten("");
              seterrorSdt("");
              seterrorDiachi("");
              seterrorEmail("");
              seterrorGhichu("");
            }}
            style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          />
          <ScrollView>
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
                <View style={{ flexDirection: "row", alignItems: "stretch" }}>
                  <TouchableOpacity
                    onPress={() => {
                      setshowModalSua(false);
                    }}
                  >
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={{
                        uri: "https://cdn0.iconfinder.com/data/icons/octicons/1024/x-512.png",
                      }}
                    />
                  </TouchableOpacity>

                  <Text style={[st.theText]}>Sửa Thông Tin</Text>
                </View>
                {/* 0 */}

                {/* chon anh */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "green",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      borderRadius: 10,
                      top: 30,
                      width: "40%",
                    }}
                    onPress={pickImage}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 13,
                      }}
                    >
                      Chọn ảnh
                    </Text>
                  </TouchableOpacity>
                  <Image
                    source={{ uri: upanh }}
                    style={{
                      height: 100,
                      width: 100,
                      backgroundColor: "red",
                      resizeMode: "stretch",
                    }}
                  />
                </View>

                {/* 1 */}
                <View
                  style={[
                    st.cuc1,
                    { height: 110, justifyContent: "space-between" },
                  ]}
                >
                  <Text
                    style={[st.theText, { fontSize: 16, textAlign: "auto" }]}
                  >
                    Tên tài khoản:
                  </Text>
                  <TextInputCustom
                    placeholder="Nhập tên tài khoản"
                    value={uptentaikhoan}
                    onChangeText={handcheckupTentaikhoan}
                    error={errortentaikhoan}
                    style={st.bottncustom}
                  />
                </View>
                {/* 2 */}
                <View
                  style={[
                    st.cuc1,
                    { height: 110, justifyContent: "space-between" },
                  ]}
                >
                  <Text
                    style={[st.theText, { fontSize: 16, textAlign: "auto" }]}
                  >
                    Họ Tên:
                  </Text>
                  <TextInputCustom
                    placeholder="Nhập tên"
                    value={uphoten}
                    onChangeText={handcheckupHoten}
                    error={errorhoten}
                    style={st.bottncustom}
                  />
                </View>
                {/* 2 */}
                <View
                  style={[
                    st.cuc1,
                    { height: 110, justifyContent: "space-between" },
                  ]}
                >
                  <Text
                    style={[st.theText, { fontSize: 16, textAlign: "auto" }]}
                  >
                    Số điện thoại:
                  </Text>
                  <TextInputCustom
                    placeholder="Nhập số điện thoại"
                    value={upsdt}
                    onChangeText={handcheckupSdt}
                    error={errorsdt}
                    style={st.bottncustom}
                  />
                </View>
                {/* 3 */}
                <View
                  style={[
                    st.cuc1,
                    { height: 110, justifyContent: "space-between" },
                  ]}
                >
                  <Text
                    style={[st.theText, { fontSize: 16, textAlign: "auto" }]}
                  >
                    Địa chỉ:
                  </Text>
                  <TextInputCustom
                    placeholder="Nhập Địa chỉ"
                    value={updiachi}
                    onChangeText={handcheckupDiachi}
                    error={errordiachi}
                    style={st.bottncustom}
                  />
                </View>
                {/* 4 */}
                <View
                  style={[
                    st.cuc1,
                    { height: 110, justifyContent: "space-between" },
                  ]}
                >
                  <Text
                    style={[st.theText, { fontSize: 16, textAlign: "auto" }]}
                  >
                    Email:
                  </Text>
                  <TextInputCustom
                    placeholder="Nhập Email"
                    value={upemail}
                    onChangeText={handcheckupEmail}
                    error={erroremail}
                    style={st.bottncustom}
                  />
                </View>
                {/* 5 */}
                <View
                  style={[
                    st.cuc1,
                    { height: 110, justifyContent: "space-between" },
                  ]}
                >
                  <Text
                    style={[st.theText, { fontSize: 16, textAlign: "auto" }]}
                  >
                    Ghi chú:
                  </Text>
                  <TextInputCustom
                    placeholder="Nhập ghi chú"
                    value={upghichu}
                    onChangeText={handcheckupGhichu}
                    error={errorghichu}
                    style={st.bottncustom}
                  />
                </View>

                <Button_custom
                  style={st.bottncustom1}
                  noidung="Sửa"
                  onPress={() => {
                    CapNhatItem();
                    console.log(uptentaikhoan, uphoten);
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
    </View>
  );
};

export default Thong_tin_ca_nhan;

const st = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 15,
    width: 300,
    height: 50,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    margin: 10,
  },
  texterror: {
    fontWeight: "bold",
    fontSize: 15,
    width: 300,
    height: 50,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    margin: 10,
    color: "red",
  },
  textanh:{
    fontWeight: "bold",
    fontSize: 15,
    width: 300,
    height: 50,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    color: "red",
  },
  buttonContainer: { marginTop: 10 },
  button: {
    top: 20,
    fontWeight: "bold",
    fontSize: 15,
    width: 300,
    height: 50,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    margin: 10,
    backgroundColor: "red",
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 15 },
  backButton: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  backButtonText: { color: "white", fontWeight: "bold", fontSize: 15 },
  theText: { fontSize: 32, width: "100%", textAlign: "center" },
  cuc1: { paddingHorizontal: 20 },
  bottncustom: { height: 35 },
  bottncustom1: {
    paddingHorizontal: 1,
    paddingVertical: 1,
    marginHorizontal: 103,
    left:20,
  },
});
