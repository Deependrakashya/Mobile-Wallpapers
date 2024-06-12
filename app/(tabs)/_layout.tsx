import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "red",
        tabBarStyle: {
          width: "95%",
          right: RFValue(0),
          left: RFValue(8),
          marginBottom: RFValue(10),
          position: "absolute",
          borderRadius: 15,

          height: RFValue(55),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: (tabInfo) => (
            <AntDesign
              name="heart"
              size={34}
              color={tabInfo.focused ? "red" : "black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "explore",
          tabBarIcon: (tabInfo) => (
            <FontAwesome
              name="wpexplorer"
              size={34}
              color={tabInfo.focused ? "red" : "black"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
