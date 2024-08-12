import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { runPracticeDayjs } from '../practice-dayjs';
import { getCalendarColumns, getDayColor, getDayText } from '../utils';
import { Column } from '../components/Column';
import { ArrowButton } from '../components/ArrowButton';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import dayjs from 'dayjs';

export default Calendar = () => {
  const now = dayjs();
  const columns = getCalendarColumns(selectedDate);
  const [selectedDate, setSelectedDate] = useState(now);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = (date) => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(dayjs(date));
    hideDatePicker();
  };

  useEffect(() => {
    runPracticeDayjs();

    console.log('columns', columns);
  }, []);

  useEffect(() => { 
    console.log('date:', selectedDate);
  }, [selectedDate]);

  const renderItem = ({ item: date }) => {
    // dayjs로 감싸서, dayjs 라이브러리 기능 사용
    const dateText = dayjs(date).get('date');
    const day = dayjs(date).get('day');
    const color = getDayColor(day);
    const isCurrentMonth = dayjs(date).isSame(selectedDate, 'month');
    const isSelected = dayjs(date).isSame(selectedDate, 'date');
    return (
    <Column
        text={dateText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.4}
        disabled={false}
        onPress={() => {
            setSelectedDate(date)
        }}
        isSelected={isSelected}
    />
    );
  }

  const onPressLeftArrow = () => {
    const newSelectedDate = dayjs(selectedDate).subtract(1, 'month');
    setSelectedDate(newSelectedDate)
  }

  const onPressRightArrow = () => {
    const newSelectedDate = dayjs(selectedDate).add(1, 'month');
    setSelectedDate(newSelectedDate)
  }

  const listHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format("YYYY.MM.DD");
    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: "center", alignContent: "center"}}>
          <ArrowButton iconName={"arrow-left"} onPress={()=>{
            onPressLeftArrow();
          }} />
          <TouchableOpacity
            style={{justifyContent:'center', alignContent:'center'}}
            onPress={() => {
              showDatePicker();
            }}  
          >
            <Text style={{fontSize:20, color: "#404040"}}>{currentDateText}</Text>
          </TouchableOpacity>
          <ArrowButton iconName={"arrow-right"} onPress={()=>{
            onPressRightArrow();
          }} />
        </View>
        <View style={{flexDirection:'row'}}>
        {[0, 1, 2, 3, 4, 5, 6].map(day => {
          return (
            <Column
                key={`day-${day}`} 
                text={getDayText(day)}
                color={getDayColor(day)}
                opacity={1}
                disabled={true}
                onPress={()=>{}}
            />
          )
        })}
        </View>
      </View>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={columns}
        keyExtractor={(_, index) => `column-${index}`}
        numColumns={7}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
