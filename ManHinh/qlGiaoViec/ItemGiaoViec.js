import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { get_NhanVien } from '../../linkapi/api_nhanvien';

const ItemGiaoViec = ({item}) => {
   
  return (
    <View style={styles.container}>
      <Image style={styles.avata} source={item.anh} ></Image>
      <View style={styles.viewText}>
        <Text style={styles.textItem}>{item._id}</Text>
        <Text style={styles.textItem}>{item.hoten}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} >
          <Text>Giao việc</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ItemGiaoViec

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
       backgroundColor: '#F4A460',
      },
})