import { StyleSheet, Text, View } from "react-native";
import React from "react";

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

  const [upten, setupten] = useState('');
  const [uptuoi, setuptuoi] = useState('');
  const [uphopdong, setuphopdong] = useState('');


  const laydl = () => {
    fetch('http://localhost:3000/hoadon/getListhoadon')
      .then(rep => rep.json())
      .then(data => {
        setdatas(data);
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
    fetch(`http://localhost:3000/hoadon/deletehoadon/${iditem}`, {
      method: 'DELETE',
    })
      .then(rep => {
        if (rep.ok) {
          fetch('http://localhost:3000/hoadon/getListhoadon')
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
  const suadl = () => {
    const formdata = {
      ten: upten,
      tuoi: uptuoi,
      hopdong: uphopdong,
    };
    if (upten.length > 0 && uptuoi.length > 0 && uphopdong.length > 0) {
      fetch(`http://localhost:3000/hoadon/updatehoadon/${iditem}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formdata),
      })
        .then(rep => {
          if (rep.ok) {
            fetch('http://localhost:3000/hoadon/getListhoadon')
              .then(rep => rep.json())
              .then(data => {
                setdatas(data);
                setupten('');
                setuptuoi('');
                setuphopdong('');
                setmodalsua(false);
              })
              .catch(err => console.log(err));
            setindex(datas.length);
          }
        })
        .catch(err => console.log(err));
    } else {
      alert('ko duco de trong');
    }
  };

  return (
    <View>
      <Text>HoaDon</Text>
    </View>
  );
};

export default HoaDon;

const styles = StyleSheet.create({});
