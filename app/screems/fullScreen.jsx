import { StyleSheet, Text, View ,Image,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize';

export default function FullScreen({route}) {
	const { image } = route.params; // Destructure the image from route.params
	const [ImgUrl, setImgUrl] = useState(image);
	const [loading, setLoading] = useState(true);
	
  return (
	<View style={{borderWidth:2,height:'100%', justifyContent:'center',alignItems:'center'}}>
		{loading && (
			<View style={{position:'absolute'}} >
				<ActivityIndicator size="larger" color="#0000ff" style={styles.loader} />
				<Text  style={{fontWeight:'bold', fontSize:RFValue(15), marginTop:10, color:'green'}}>Created by Deependra Kashyap</Text>
				</View>
      )}
	<Image
	source={{ uri:ImgUrl }} style={styles.image}
	onLoadEnd={() => setLoading(false)} // Set loading to false when image is loaded
	onError={(error) => {
	  setLoading(false);
	  console.error('Failed to load image', error);
	}}
	></Image>
	</View>
  )
}

const styles = StyleSheet.create({
	image:{
		width:'100%',
		height:'100%',
		resizeMode: 'cover',
	}
})