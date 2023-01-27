import React, {useEffect, useRef, useState} from 'react'
import {Text, TextInput, TouchableOpacity, View} from 'react-native'
import RNPIckerSelect from 'react-native-picker-select'
import PhoneCodes from '../../../assets/phoneCodes.json'
import Icon from 'react-native-vector-icons/Feather'
import {CTAButton, Picker, Spacer} from '../../../global/components'
import {OrDivider} from '../components'

export default () => {
  const [pickerValue, setPickerValue] = useState()

  const getPhoneCodes = PhoneCodes.map(x => ({
    label: `${x.name} (${x.dial_code})`,
    value: `${x.name} (${x.dial_code})`,
  }))

  useEffect(() => {
    const defaultCode = PhoneCodes.find(x => x.code === 'US')
    setPickerValue(`${defaultCode.name} (${defaultCode.dial_code})`)
  }, [])

  return (
    <View>
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
        />
      </View>
      <Spacer multiply={2} />
      <Text
        style={{
          fontSize: 12,
        }}>
        We’ll send you a text to confirm your number. Standard message and data
        rates apply.
      </Text>
      <Spacer multiply={4} />
      <CTAButton label='Continue' />
    </View>
  )
}
