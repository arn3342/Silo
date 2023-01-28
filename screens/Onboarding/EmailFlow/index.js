import React, {useEffect, useRef, useState} from 'react'
import {Text, TextInput, TouchableOpacity, View} from 'react-native'
import RNPIckerSelect from 'react-native-picker-select'
import PhoneCodes from '../../../assets/phoneCodes.json'
import Icon from 'react-native-vector-icons/Feather'
import {AppText, CTAButton, Picker, Spacer} from '../../../global/components'
import {OrDivider} from '../components'
import {useNavigation} from '@react-navigation/native'
import {AuthRoutes} from '../../../data/routes'
import Animated, { FlipInEasyX, FadeInRight, FadeOutLeft } from 'react-native-reanimated'

export default () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
  })
  const navigation = useNavigation()

  function updateUserData (key, val) {
    setUserData(prev => ({...prev, [key]: val}))
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
        <Spacer/>
        <TextInput
          placeholder='Your Email'
          style={{
            fontSize: 18,
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
          }}
          value={userData.email}
          keyboardType='email-address'
          onChangeText={val => updateUserData('email', val)}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <Spacer multiply={2} />
        <TextInput
          placeholder='Your Name'
          style={{
            fontSize: 18,
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
          }}
          value={userData.name}
          onChangeText={val => updateUserData('name', val)}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <Spacer multiply={2} />
        <TextInput
          placeholder='Create Password'
          style={{
            fontSize: 18,
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
          }}
          value={userData.password}
          onChangeText={val => updateUserData('password', val)}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry
        />
      </View>
      <Spacer multiply={4} />
      <CTAButton label='Continue' />
    </Animated.View>
  )
}
