import React, {createElement, useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {PlaidLink, LinkExit, LinkSuccess} from 'react-native-plaid-link-sdk';
import {CTAButton, Divider, ScreenContainer} from '../../../global/components';
import CreateLinkToken from '../../../services/API_actions';
import AccountList from './AccountList';
import ChartSection from './ChartSection';
import NetWorthBox from './components/NetWorthBox';

export default () => {
  const [linkToken, setLinkToken] = useState(
    'link-sandbox-7dfe906c-f390-48fd-a2a9-7dc7830ad3ed',
  );

  const createLinkToken = async () => {
    await fetch(`http://127.0.0.1:5001/silo-40612/us-central1/createPayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({address: address}),
    })
      .then(response => response.json())
      .then(data => {
        console.log('response >>> ', data?.link_token);
        setLinkToken(data?.link_token);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    createLinkToken();
  }, []);
  console.log('linkToken ?? ', linkToken);
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
        {/* <CTAButton
          label="Add New Account"
          onPress={() => createLinkToken()}
          style={styles.btnStyle}
        /> */}
        {linkToken && (
          <PlaidLink
            tokenConfig={{
              token: linkToken,
              noLoadingState: false,
            }}
            onSuccess={async (success: LinkSuccess) => {
              console.log('toek n<<<< >>>> ', success);
              console.log(
                '>>>. ',
                JSON.stringify(success.publicToken, null, 4),
                console.log('metadata ?? ', success.metadata.accounts),
              );
              await fetch(
                `http://127.0.0.1:5001/silo-40612/us-central1/ExchangePublic_token`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({public_token: success.publicToken}),
                },
              ).catch(err => {
                console.log(err);
              });
              navigation.navigate('Success', success);
            }}
            onExit={(response: LinkExit) => {
              console.log(response);
            }}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Add New Account</Text>
            </View>
          </PlaidLink>
        )}
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
  buttonContainer: {
    backgroundColor: '#A586DD',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
});
