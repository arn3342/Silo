import React, {useRef} from 'react'
import {Text, TouchableHighlight, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import RNPIckerSelect from 'react-native-picker-select'
import LinearGradient from 'react-native-linear-gradient'

/**
 *
 * @param {Object} props
 * @param {import('react-native').ViewStyle} props.style
 * @returns
 */
export const Container = ({children, style}) => (
  <View
    style={{height: '100%', width: '100%', backgroundColor: 'white', ...style}}>
    {children}
  </View>
)

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
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: 'white',
            fontWeight: '500',
          }}>
          {label}
        </Text>
      )}
    </TouchableHighlight>
  </LinearGradient>
)
