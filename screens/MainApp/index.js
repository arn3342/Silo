import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {Text, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {useAuthHook} from '../../data/database/user/auth'
import {AuthRoutes} from '../../data/routes'
import {AppText, CTAButton, ScreenContainer} from '../../global/components'

export default () => {
  const navigation = useNavigation()
  const {signOut} = useAuthHook()
  async function performLogout () {
    const result = await signOut()

    if (result.success) {
      navigation.reset({
        index: 0,
        routes: [AuthRoutes.default],
      })
    }
  }

  return (
    <ScreenContainer>
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
        }}>
        <AppText.Lg>Welcome onboard!</AppText.Lg>
        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: '#dbdbdb',
            padding: 5,
            paddingLeft: 10,
            paddingRight: 10,
          }}
          onPress={performLogout}>
          <AppText.Md>Log Me Out</AppText.Md>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  )
}
