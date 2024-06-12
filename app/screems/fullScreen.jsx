import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import  * as FileSystem from "expo-file-system"
import {shareAsync} from 'expo-sharing'

// import downloadImage from "../api/downloadImage";

export default function FullScreen({ route }) {
console.log(route);
  const { image } = route.params; // Destructure the image from route.params
  const [ImgUrl, setImgUrl] = useState(image);
  const [loading, setLoading] = useState(true);
  const [Downloading, setDownLoading] = useState(false);
  const [DownladText, setDownladText] = useState('Download')
 
  useEffect(() => {
    setImgUrl(image)
    setLoading(true)
    setDownladText('Downlad')
  }, [image, handleDownload])
  
  
  const handleDownload = async () => {
    setDownLoading(true)
   let filename="IMG-9580552959..jpeg";
    const result= await FileSystem.downloadAsync(
      image,
      FileSystem.documentDirectory+filename
    )

    filetype='image/jpeg'
    save(result.uri, filename,filetype)
  };
  const save = async (uri, filename,mintype)=>{
    if(Platform.OS==='android'){
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()
      if(permissions.granted){
        const base64= await FileSystem.readAsStringAsync(uri,{encoding:FileSystem.EncodingType.Base64})
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri,filename,mintype)
        .then( async(uri)=>{
          await FileSystem.writeAsStringAsync(uri,base64,{encoding:FileSystem.EncodingType.Base64})
        }).catch(e => console.log(e))
        setDownLoading(false)
        setDownladText("Downladed SuccessFully")
      }
      else  shareAsync(uri)
  
      setDownLoading(false)
    }
    else{

      shareAsync(uri)
      setDownLoading(false)
    }
  }


  return (
    <View
      style={{
        borderWidth: 2,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading && (
        <View style={{ position: "absolute" }}>
          <ActivityIndicator
            size="larger"
            color="#0000ff"
            style={styles.loader}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: RFValue(15),
              marginTop: 10,
              color: "green",
            }}
          >
            Created by Deependra Kashyap
          </Text>
        </View>
      )}
      <Image
        source={{ uri: ImgUrl }}
        style={styles.image}
        onLoadEnd={() => setLoading(false)} // Set loading to false when image is loaded
        onError={(error) => {
          setLoading(false);
          console.error("Failed to load image", error);
        }}
      ></Image>
      <View
        style={{
          position: "absolute",
          width: "90%",
          height: RFValue(50),
          bottom: RFValue(70),
          borderRadius: RFValue(10),
          flexDirection: "row",
          justifyContent: "center",
        }}
      >

		{Downloading? <ActivityIndicator
            size="larger"
            color="#0000ff"
            style={styles.loader}
          />:
        <TouchableOpacity style={styles.buttons}
		 onPress={handleDownload}
		>
         <Text style={styles.text}>{DownladText}</Text> 
        </TouchableOpacity>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  buttons: {
    backgroundColor: "green",
    margin: RFValue(5),
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(20),
  },
  text: {
    color: "white",
    fontSize: RFValue(10),
    fontWeight: "bold",
  },
});
