import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LineChart} from 'react-native-svg-charts';
import {chartDummyData} from './staticData';

const ChartSection = () => {
  const [color, setColor] = useState(0);
  const [data, setData] = useState([]);

  const handleTab = (item, index) => {
    setColor(index);
    setData(item.chartData);
  };

  useEffect(() => {
    setData(chartDummyData[0].chartData);
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.renderItem_container,
          {
            backgroundColor: color === index ? '#F7F5FB' : 'white',
            borderRadius: color === index ? 10 : 0,
          },
        ]}
        key={index}
        onPress={() => handleTab(item, index)}>
        <Text
          style={[
            styles.secondary_txt,
            {color: color === index ? '#A586DD' : '#999999'},
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.secondary_txt}>$ 216,201.97</Text>

      <LineChart
        style={{height: 200}}
        data={data}
        svg={{stroke: '#A586DD'}}
        contentInset={{top: 20, bottom: 20}}></LineChart>

      <Text
        style={[
          styles.secondary_txt,
          {alignSelf: 'flex-start', marginBottom: 20},
        ]}>
        $216,201.97
      </Text>

      <FlatList
        data={chartDummyData}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.flatlist_style}
      />
    </View>
  );
};

export default ChartSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  secondary_txt: {
    alignSelf: 'flex-end',
    fontSize: 14,
    fontWeight: '500',
    color: '#999999',
  },
  renderItem_container: {
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 20,
  },
  flatlist_style: {
    marginBottom: 15,
  },
});
