import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import search from "../api/search";
import { useNavigation } from "@react-navigation/native";
export default function Explore() {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [Results, setResults] = useState([]);
  const [loader, setloader] = useState(false)
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await search("love");
     
        setResults(res.data.photos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, []);

  const searchClick = async (text) => {
   setloader(true)
    try {
      const res = await search(text);
     
      setResults(res.data.photos);
     
    } catch (error) {
      console.error(error);
    }
  
  };
  const clickImage = (url) => {
    // Handle image click here
    navigation.navigate("FullScreen", { image: url});
   
  };

  return (
    <View style={styles.container}>
   
      {loader && (
        <View style={{ position: "absolute", top:RFValue(200), zIndex:1 }}>
          <ActivityIndicator
            size="larger"
            color="#0000ff"
            style={styles.loader}
          />
        
        </View>
      )}
   
      <Text style={styles.title}>Explore Images</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="Search Images"
        textAlign="center"
        onChangeText={setText}
        value={text}
      />
      <TouchableOpacity style={styles.button} onPress={() => searchClick(text)}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      <ScrollView style={{ borderRadius: 10 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {Results.map((img) => (
            <TouchableOpacity
              key={img.id}
              onPress={() => clickImage(img.src.large2x)}
            >
              <Image source={{ uri: img.src.medium }} style={styles.image} 
              onLoadEnd={()=>setloader(false)}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: RFValue(30),
    alignItems: "center",
    backgroundColor: "grey",
    height: "100%",
  },
  title: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    marginTop: 10,
  },
  inputBox: {
    borderWidth: 1.5,
    marginTop: RFValue(20),
    width: "80%",
    height: RFValue(40),
    borderRadius: RFValue(20),
    padding: RFValue(10),
    fontSize: RFValue(15),
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "black",
    margin: RFValue(10),
    borderRadius: RFValue(20),
    width: "50%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: RFValue(10),
    color: "white",
    padding: RFValue(10),
    fontWeight: "bold",
  },
  image: {
    width: RFValue(155),
    height: RFValue(200),
    margin: RFValue(5),
    borderRadius: RFValue(10),
  },
});
