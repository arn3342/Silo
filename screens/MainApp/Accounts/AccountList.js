import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AccountCard} from './components';
import {Mockdata} from './staticData';

const renderItem = ({item}) => {
  console.log(item);
  return (
    <AccountCard
      amount={item.value}
      percent={item.percent}
      name={item.name}
      account={item.account}
    />
  );
};

const AccountList = () => {
  return (
    <View style={{marginTop: 0}}>
      <Text style={styles.headerTxt}>Accounts</Text>
      {Mockdata && <FlatList data={Mockdata} renderItem={renderItem} />}
    </View>
  );
};

export default AccountList;

const styles = StyleSheet.create({
  headerTxt: {
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 15,
  },
});
