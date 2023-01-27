import React from 'react'
import {ScrollView, Text, View} from 'react-native'
import {Container, Spacer} from '../../global/components'
import {AuthProvider, OrDivider} from './components'
import PhoneFlow from './PhoneFlow'

export const OnboardingFlow = () => {
  return (
    <Container
      style={{
        padding: 15,
        paddingLeft: 20,
        paddingRight: 20,
      }}>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            fontWeight: '600',
          }}>
          Let's Start
        </Text>
        <Spacer multiply={5} />
        <PhoneFlow />
      </View>
      <Spacer multiply={5} />
      <OrDivider />
      <Spacer multiply={5} />
      <View>
        <AuthProvider type='Email' />
        <AuthProvider type='Google' />
        <AuthProvider type='Apple' />
      </View>
    </Container>
  )
}
