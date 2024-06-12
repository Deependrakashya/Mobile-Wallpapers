import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import homeScreenImages from "../api/homeScreen";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";


export default function Home() {
  const [Images, setImages] = useState([]);
  const [Error, setError] = useState(false);
  const [loader, setloader] = useState(false)
  const navigation = useNavigation();
  const page = Math.floor(Math.random() * 100) + 1;
  useEffect(() => {
  
    const fetchImages = async () => {
      setloader(true)
      try {
        const res = await homeScreenImages(page);

        setImages(res.data.photos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, []);



  const clickImage = (url) => {
    // Handle image click here
    navigation.navigate("FullScreen", { image: url });
    
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {Error ? (
        <Text
          style={{
            marginTop: "70%",
            marginHorizontal: "auto",
            fontSize: 26,
            fontWeight: "bold",
            color: "red",
          }}
        >
          connect to internet
        </Text>
      ) : (
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", margin: "auto" }}
        >
          {loader && (
        <View style={{ position: "absolute", top:RFValue(200), zIndex:1 , right:'30%' }}>
          <ActivityIndicator
            size={150}
            color="yellow"
            style={styles.loader}
          />
        
        </View>
      )}
          {Images.map((img) => (
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
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  errorText: {
    fontSize: 18,
    color: "red",
  },
  scrollContainer: {
    backgroundColor: "grey",
    padding: 10,
    marginTop: RFValue(0),
  },

  image: {
    margin: 5,
    width: RFValue(150),
    borderRadius: RFValue(15),
    height: RFValue(300),
    resizeMode: "cover",
  },
});
