import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {CTAButton, Divider, ScreenContainer} from '../../../global/components';
import AccountList from './AccountList';
import ChartSection from './ChartSection';

import NetWorthBox from './components/NetWorthBox';

export default () => {
  return (
    <ScreenContainer>
      <ScrollView
        style={styles.first_section}
        showsVerticalScrollIndicator={false}>
        <NetWorthBox netWorth="216,201.97" />
        <ChartSection />
        <Divider />
        <AccountList />
      </ScrollView>
      <Divider />
      <View style={styles.btn_section}>
        <CTAButton
          label="Add New Account"
          onPress={() => alert('clicked : test purpose')}
          style={styles.btnStyle}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  first_section: {},
  btn_section: {height: 96, justifyContent: 'center'},
  btnStyle: {
    height: 48,
  },
});
