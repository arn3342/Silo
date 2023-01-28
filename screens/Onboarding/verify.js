import React, {useEffect} from 'react'
import {AppText, ScreenContainer, Spacer} from '../../global/components'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {useNavigation, useRoute} from '@react-navigation/native'

export default () => {
  const navigation = useNavigation()
  const route = useRoute()

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      if (e.data.action.type != 'GO_BACK') {
        navigation.dispatch(e.data.action)
      } else {
        e.preventDefault()
      }
    })
  }, [])
  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <AppText.Sm>
          Enter the code sent to {route.params?.data}{' '}
          {route.params?.authMethod === 'phone' && ' via SMS'}
        </AppText.Sm>
        <Spacer multiply={4} />
        <View
          style={{
            maxHeight: 70,
            padding: 15,
            paddingTop: 5,
            paddingBottom: 5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#000',
          }}>
          <OTPInputView
            pinCount={4}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`)
            }}
          />
        </View>
        <Spacer multiply={4} />
        <TouchableOpacity
          style={{flexDirection: 'row', alignContent: 'center'}}>
          <AppText.Sm>Didn't get the code?</AppText.Sm>
          <Spacer orientation='horizontal' />
          <AppText.Sm
            style={{
              fontWeight: '700',
              textDecorationLine: 'underline',
            }}>
            SEND AGAIN
          </AppText.Sm>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#000',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: '#000',
  },

  underlineStyleHighLighted: {
    borderColor: '#000',
  },
})
