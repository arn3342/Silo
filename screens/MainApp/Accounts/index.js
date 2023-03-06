import React, {createElement, useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {PlaidLink, LinkExit, LinkSuccess} from 'react-native-plaid-link-sdk';
import {useSelector} from 'react-redux';
import {CTAButton, Divider, ScreenContainer} from '../../../global/components';
import CreateLinkToken from '../../../services/API_actions';
import {bankAccount} from '../../../services/FirebaseSerives';
import AccountList from './AccountList';
import ChartSection from './ChartSection';
import NetWorthBox from './components/NetWorthBox';

export default () => {
  const [linkToken, setLinkToken] = useState(
    'link-sandbox-7dfe906c-f390-48fd-a2a9-7dc7830ad3ed',
  );
  const userDetails = useSelector(state => state.userReducer?.userDetails);
  const [accessToken, setAccessToken] = useState(null);

  const createLinkToken = async () => {
    await fetch(`http://127.0.0.1:5001/silo-40612/us-central1/createPayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: userDetails?.name, id: userDetails?._id}),
    })
      .then(response => response.json())
      .then(data => {
        setLinkToken(data?.link_token);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    createLinkToken();
  }, []);

  const getBankDetails = AToken => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = {
      accessToken: AToken,
    };

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(raw),
    };

    fetch(
      'http://127.0.0.1:5001/silo-40612/us-central1/accountsDetails',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

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
              const ac = success.metadata.accounts;

              const bankDetails = {
                id: success.metadata.linkSessionId,
                // bankName: success.metadata.institution[0]?.name,
                bankDetails: success.metadata.accounts,
              };

              bankAccount.doc(userDetails?._id).set(bankDetails),
                console.log('first', JSON.parse(success.metadata.metadataJson));
              //   // console.log(
              //   //   '>> metadataJson >> ',
              //   //   JSON.stringify(success.metadata.metadataJson, null, 4),
              //   // ),
              // );
              await fetch(
                `http://127.0.0.1:5001/silo-40612/us-central1/ExchangePublic_token`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({public_token: success.publicToken}),
                },
              )
                .then(response => response.text())
                .then(result => {
                  console.log('result ? ', result);
                  const res = JSON.parse(result);
                  console.log('acccc >> ', res?.accessToken);
                  setAccessToken(res?.accessToken);
                  getBankDetails(res?.accessToken);
                })
                .catch(err => {
                  console.log(err);
                });

              // navigation.navigate('Success', success);
            }}
            onExit={(response: LinkExit) => {
              console.log('LinkExit', response);
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
