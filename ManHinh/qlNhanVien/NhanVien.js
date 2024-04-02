import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const NhanVien = () => {
  const navigation = useNavigation();


  const [data,setData] = useState([])
  const fetchData = () => {
    axios
      .get(`${API_URL}${get_DichVu}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchData(); 
  }, []);

  return (
    <View>
      <Text>NhanVien</Text>
    </View>
  );
};

export default NhanVien;

const styles = StyleSheet.create({});
