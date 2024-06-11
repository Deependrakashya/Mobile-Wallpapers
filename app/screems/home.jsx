import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import homeScreenImages from '../api/homeScreen';
import { RFValue } from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native'

export default function Home() {
  const [Images, setImages] = useState([]);
  const navigation = useNavigation();
  const page = Math.floor(Math.random() * 100) + 1;
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await homeScreenImages(page);
        // console.log(res.data.photos);
	setImages(res.data.photos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, []);

  const clickImage = (url) => {
    // Handle image click here
	navigation.navigate('FullScreen', { image: url })
    console.log('Image clicked:', url);
  };

 
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
		
		<View  style={{flexDirection:'row', flexWrap:'wrap', }}> 
      
      {Images.map((img) => (
		  <TouchableOpacity key={img.id} onPress={() => clickImage(img.src.large2x)}>
         
            <Image source={{ uri: img.src.medium }} style={styles.image} />
         
        </TouchableOpacity> 
      ))}
	  </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  scrollContainer: {
    padding: 10,
	marginTop:RFValue(20)
	
  },
 
  image: {
	margin:5,
    width: RFValue(150),
	borderRadius:RFValue(15),
    height:RFValue(300),
    resizeMode: 'cover',
  },
});
