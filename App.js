/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import RNBootSplash from 'react-native-bootsplash'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'

const App = () => {
  RNBootSplash.hide({fade: true})

  return <View style={{height: '100%', width: '100%'}}></View>
}
export default App
