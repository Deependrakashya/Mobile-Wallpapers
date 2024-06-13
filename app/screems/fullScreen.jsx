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
// console.log("params " ,route.params.image);
   let Orignal=route.params.image.original;
   
  const  image  = route.params.image.large2x; // Destructure the image from route.params
  const [ImgUrl, setImgUrl] = useState(image);
  const [loading, setLoading] = useState(true);
  const [Downloading, setDownLoading] = useState(false);
  const [DownladTextOriginal, setDownladTextOrginal] = useState('Download Original')
  const [DownladTextNormal, setDownladTextNormal] = useState('Download Normal')
 
  useEffect(() => {
    setImgUrl(image)
    setLoading(true)
    setDownladTextNormal('Download Normal')
    setDownladTextOrginal('Download Original')
  
  }, [image, ImgUrl])

  const OriginalDownload =(link)=>{
    handleDownload(link)
    setDownladTextOrginal('Downloaded Successfully')
  }
   const NormalDownload =(link)=>{
    handleDownload(link)
    setDownladTextNormal('Downloaded Successfully')
  }


  
  
  const handleDownload = async (size) => {
    setDownLoading(true)
   let filename="IMG-9580552959..jpeg";
    const result= await FileSystem.downloadAsync(
      size,
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
       
      }
      // if the storage access is denied than save with share options
      else  shareAsync(uri)
     
      setDownLoading(false)
    }
    // other plateform like ios
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
          <View style={{ width:'100%', flexDirection:'row',justifyContent:'space-between'}}>
        <TouchableOpacity style={styles.buttons}
		 onPress={()=>NormalDownload(ImgUrl)}
		>
         <Text style={styles.text}>{DownladTextNormal}</Text>
        </TouchableOpacity><TouchableOpacity style={styles.buttons}
		 onPress={()=>OriginalDownload(Orignal)}
		>
           <Text style={styles.text}>{DownladTextOriginal}</Text>
        </TouchableOpacity></View>}
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
    width: "40%",
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
