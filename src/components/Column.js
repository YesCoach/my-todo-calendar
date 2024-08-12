import React from "react"
import { View, Text } from "react-native"

export const Column = ({text, color, opacity}) => {
  const columnSize = 35;
  return (
    <View style={{width:columnSize, height: columnSize, justifyContent: "center", alignContent: "center"}}>
      <Text style={{color, opacity}}>{text}</Text>
    </View>
  )
}