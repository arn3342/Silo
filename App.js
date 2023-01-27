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
    <AuthStack.Navigator
      screenOptions={headerOptions}
      initialRouteName={AuthRoutes.default}>
      <AuthStack.Screen
        name={AuthRoutes.default}
        component={OnboardingScreens.Init}
      />
      <AuthStack.Screen
        name={AuthRoutes.AuthFlow}
        component={OnboardingScreens.FlowScreen}
      />
    </AuthStack.Navigator>
  )
}

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true})
  }, [])

  SetDefaultFontFamily = () => {
    let components = [Text, TextInput]

    const customProps = {
      style: {
        fontFamily: 'AirbnbCereal_W_Md',
      },
    }

    for (let i = 0; i < components.length; i++) {
      const TextRender = components[i].prototype.render
      const initialDefaultProps =
        components[i].prototype.constructor.defaultProps
      components[i].prototype.constructor.defaultProps = {
        ...initialDefaultProps,
        ...customProps,
      }
      components[i].prototype.render = function render () {
        let oldProps = this.props
        this.props = {
          ...this.props,
          style: [customProps.style, this.props.style],
        }
        try {
          return TextRender.apply(this, arguments)
        } finally {
          this.props = oldProps
        }
      }
    }
  }

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
