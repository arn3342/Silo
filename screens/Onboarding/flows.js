import React, {useState} from 'react'
import {ScrollView, Text, View} from 'react-native'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'
import {ScreenContainer, Spacer} from '../../global/components'
import {AuthProvider, OrDivider} from './components'
import EmailFlow from './EmailFlow'
import PhoneFlow from './PhoneFlow'

export const OnboardingFlow = () => {
  const [authFlow, setAuthFlow] = useState('Phone')

  function changeFlow () {
    setAuthFlow(prev => (prev === 'Phone' ? 'Email' : 'Phone'))
  }
  return (
    <ScreenContainer>
      {authFlow === 'Phone' ? <PhoneFlow /> : <EmailFlow />}

      <Spacer multiply={5} />
      <OrDivider />
      <Spacer multiply={5} />
      <View>
        <AuthProvider
          type={authFlow === 'Phone' ? 'Email' : 'Phone'}
          onPress={changeFlow}
        />
        <AuthProvider type='Google' />
        <AuthProvider type='Apple' />
      </View>
    </ScreenContainer>
  )
}
