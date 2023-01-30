import React, {useEffect} from 'react'
import RNBootSplash from 'react-native-bootsplash'
import {createStackNavigator} from '@react-navigation/stack'
import {SafeAreaView} from 'react-native'
import {AppRoutes, AuthRoutes} from './data/routes'
import OnboardingScreens from './screens/Onboarding'
import {NavigationContainer} from '@react-navigation/native'
import MainApp from './screens/MainApp'

const AuthNav = () => {
  const AuthStack = createStackNavigator()

  return (
    <AuthStack.Navigator screenOptions={headerOptions}>
      <AuthStack.Screen
        name={AuthRoutes.init.name}
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

const AppNav = () => {
  const AppStack = createStackNavigator()

  return (
    <AppStack.Navigator screenOptions={headerOptions}>
      <AppStack.Screen name={AppRoutes.Main.name} component={MainApp} />
    </AppStack.Navigator>
  )
}

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true})
  }, [])

  const ParentStack = createStackNavigator()
  return (
    // <Provider store={store}>
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      <NavigationContainer>
        <ParentStack.Navigator screenOptions={headerOptions}>
          <ParentStack.Screen
            name={AuthRoutes.default.name}
            component={AuthNav}
          />
          <ParentStack.Screen
            name={AppRoutes.default.name}
            component={AppNav}
          />
        </ParentStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    // </Provider>
  )
}
export default App

const headerOptions = {
  headerShown: false,
}
