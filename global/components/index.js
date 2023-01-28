import React, {useRef} from 'react'
import {Text, TouchableHighlight, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import RNPIckerSelect from 'react-native-picker-select'
import LinearGradient from 'react-native-linear-gradient'
import {useNavigation, useRoute} from '@react-navigation/native'
import {getRoutes} from '../../data/routes'

const defaultFontStyles = {
  fontFamily: 'AirbnbCereal_W_Md',
}

/**
 *
 * @param {Object} props
 * @param {import('react-native').ViewStyle} props.style
 * @param {''} props.title
 * @param {boolean} props.defaultSpacing
 * @returns
 */
export const ScreenContainer = ({
  children,
  style,
  title,
  defaultSpacing = true,
}) => {
  const route = useRoute()
  const getScreenTitle = getRoutes().find(x => x.name === route.name)?.title

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        padding: 15,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white',
        ...style,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          fontWeight: '600',
        }}>
        {title || getScreenTitle}
      </Text>
      {defaultSpacing && <Spacer multiply={5} />}
      {children}
    </View>
  )
}

/**
 *
 * @param {Object} props
 * @param {Number} props.multiply
 * @param {'vertical' | 'horizontal'} props.orientation
 * @returns
 */
export const Spacer = ({multiply = 1, orientation = 'vertical'}) => {
  const getStyles =
    orientation === 'vertical'
      ? {
          height: 5 * multiply,
        }
      : {
          width: 5 * multiply,
        }

  return <View style={getStyles}></View>
}

export const Picker = ({
  options,
  value,
  onValueChange = val => {},
  title,
  style,
}) => {
  const pickerRef = useRef()
  return (
    <TouchableOpacity
      onPress={() => pickerRef.current?.togglePicker()}
      style={{
        justifyContent: 'center',
        ...style,
      }}>
      {title && <Text style={{color: '#A6A6A6', fontSize: 12}}>{title}</Text>}
      <RNPIckerSelect
        ref={pickerRef}
        onValueChange={onValueChange}
        items={options}
        style={{
          inputIOS: {fontSize: 18},
          viewContainer: {
            marginTop: title ? 5 : 0,
            width: '100%',
          },
        }}
        value={value}
        Icon={() => (!title ? <Icon name='chevron-down' size={24} /> : <></>)}
      />
      {title && (
        <Icon
          name='chevron-down'
          size={24}
          style={{
            position: 'absolute',
            right: 15,
          }}
        />
      )}
    </TouchableOpacity>
  )
}

/**
 *
 * @param {Object} props
 * @param {import('react-native').ViewStyle} props.style
 * @param {''} props.label
 * @param {() => {}} props.onPress
 * @returns
 */
export const CTAButton = ({
  children,
  style,
  label = 'Click Me',
  onPress = () => {},
}) => (
  <LinearGradient
    colors={['#A586DD', '#C6ADF3']}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    style={{
      borderRadius: 10,
    }}>
    <TouchableHighlight
      underlayColor='#A586DD'
      style={{
        padding: 15,
        ...style,
      }}
      onPress={onPress}>
      {children ? (
        children
      ) : (
        <AppText.Lg style={{textAlign: 'center', color: '#fff'}}>
          Continue
        </AppText.Lg>
      )}
    </TouchableHighlight>
  </LinearGradient>
)

/**
 * The default Text component to be used in this app
 * @param {Object} props
 * @param {import('react-native').TextStyle} props.style
 * @returns
 */
export const AppText = {
  /**
   * The default Text component to be used in this app
   * @param {Object} props
   * @param {import('react-native').TextStyle} props.style
   * @returns
   */
  Xs: ({style, children, isBold}) => (
    <Text style={[defaultFontStyles, style, {fontSize: 12}]}>{children}</Text>
  ),
  /**
   * The default Text component to be used in this app
   * @param {Object} props
   * @param {import('react-native').TextStyle} props.style
   * @returns
   */
  Sm: ({style, children, isBold}) => (
    <Text style={[defaultFontStyles, style, {fontSize: 14}]}>{children}</Text>
  ),
  /**
   * The default Text component to be used in this app
   * @param {Object} props
   * @param {import('react-native').TextStyle} props.style
   * @returns
   */
  Lg: ({style, children}) => (
    <Text style={[defaultFontStyles, style, {fontSize: 20}]}>{children}</Text>
  ),
  /**
   * The default Text component to be used in this app
   * @param {Object} props
   * @param {import('react-native').TextStyle} props.style
   * @returns
   */
  Md: ({style, children}) => (
    <Text style={[defaultFontStyles, style, {fontSize: 16}]}>{children}</Text>
  ),
}
