import React, {useEffect} from 'react'
import RNBootSplash from 'react-native-bootsplash'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from '@react-navigation/stack'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native'
import {AppRoutes, AuthRoutes} from './data/routes'
import OnboardingScreens from './screens/Onboarding'
import {NavigationContainer} from '@react-navigation/native'

const AuthNav = () => {
  const AuthStack = createStackNavigator()

  return (
    <AuthStack.Navigator screenOptions={headerOptions}>
      <AuthStack.Screen
        name={AuthRoutes.default.name}
        component={OnboardingScreens.Init}
      />
      <AuthStack.Screen
        name={AuthRoutes.AuthFlow.name}
        component={OnboardingScreens.FlowScreen}
      />
      <AuthStack.Screen
        name={AuthRoutes.AuthVerify.name}
        component={OnboardingScreens.VerifyScreen}
        // options={{gestureEnabled: false}}
      />
    </AuthStack.Navigator>
  )
}

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true})
  }, [])

  const ParentStack = createStackNavigator()
  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      <NavigationContainer>
        <ParentStack.Navigator screenOptions={headerOptions}>
          <ParentStack.Screen name={AppRoutes.default} component={AuthNav} />
        </ParentStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}
export default App

const headerOptions = {
  headerShown: false,
}
