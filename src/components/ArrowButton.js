import React from "react"
import { TouchableOpacity } from "react-native"
import { SimpleLineIcons } from '@expo/vector-icons';

export const ArrowButton = ({iconName, onPress}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{paddingHorizontal: 20, paddingVertical: 15, justifyContent:'center', alignContent:'center'}}
      >
        <SimpleLineIcons name={iconName} size={15} color="black"/>
      </TouchableOpacity>
    )
  }