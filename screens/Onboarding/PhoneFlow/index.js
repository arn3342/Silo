import React, {useEffect, useRef, useState} from 'react'
import {Text, TextInput, TouchableOpacity, View} from 'react-native'
import RNPIckerSelect from 'react-native-picker-select'
import PhoneCodes from '../../../assets/phoneCodes.json'
import Icon from 'react-native-vector-icons/Feather'
import {AppText, CTAButton, Picker, Spacer} from '../../../global/components'
import {OrDivider} from '../components'
import {useNavigation} from '@react-navigation/native'
import {AuthRoutes} from '../../../data/routes'
import Animated, { FadeIn, FadeInRight, FadeOut, FadeOutLeft } from 'react-native-reanimated'

export default () => {
  const [pickerValue, setPickerValue] = useState()
  const [phoneNumber, setPhoneNumber] = useState('')
  const navigation = useNavigation()

  const getPhoneCodes = PhoneCodes.map(x => ({
    label: `${x.name} (${x.dial_code})`,
    value: `${x.name} (${x.dial_code})`,
  }))

  useEffect(() => {
    const defaultCode = PhoneCodes.find(x => x.code === 'US')
    setPickerValue(`${defaultCode.name} (${defaultCode.dial_code})`)
  }, [])

  function gotoVerify () {
    navigation.navigate(AuthRoutes.AuthVerify.name, {
      authMethod: 'phone',
      data: `${pickerValue.match(/\(([^)]+)\)/)[1]}${phoneNumber}`,
    })
  }

  return (
    <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
      <View
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#A6A6A6',
          paddingBottom: 5,
        }}>
        <Picker
          options={getPhoneCodes}
          value={pickerValue}
          onValueChange={val => setPickerValue(val)}
          title='Country/Region'
          style={{
            borderRadius: 10,
            borderColor: '#000000',
            borderWidth: 1,
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
          }}
        />
        <Spacer />
        <TextInput
          placeholder='Phone Number'
          style={{
            fontSize: 18,
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
          }}
          keyboardType='number-pad'
          value={phoneNumber}
          onChangeText={val => /^\d*\.?\d*$/.test(val) && setPhoneNumber(val)}
        />
      </View>
      <Spacer multiply={2} />
      <AppText.Xs>
        We’ll send you a text to confirm your number. Standard message and data
        rates apply.
      </AppText.Xs>
      <Spacer multiply={4} />
      <CTAButton label='Continue' onPress={gotoVerify} />
    </Animated.View>
  )
}
