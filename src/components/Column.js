import React from "react"
import { View, Text, TouchableOpacity } from "react-native"

export const Column = ({text, color, opacity, disabled, onPress, isSelected}) => {
  const columnSize = 35;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        width: columnSize,
        height: columnSize,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: isSelected ? "#c2c2c2" : "transparent",
        borderRadius: columnSize/2,
      }}>
      <Text style={{color, opacity,textAlign: 'center'}}>{text}</Text>
    </TouchableOpacity>
  )
}