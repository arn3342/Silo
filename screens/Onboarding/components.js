import React from 'react'
import {TouchableOpacity, Text, View, Image} from 'react-native'
import EmailIcon from '../../assets/images/email-icon.png'
import AppleIcon from '../../assets/images/apple-icon.png'
import GoogleIcon from '../../assets/images/google-icon.png'

const authIcons = {
  Email: EmailIcon,
  Apple: AppleIcon,
  Google: GoogleIcon,
}

/**
 *
 * @param {Object} props
 * @param {'Google' | 'Apple' | 'Email'} props.type
 * @param {() => {}} props.onPress
 * @returns
 */
export const AuthProvider = ({type, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#D0D5DD',
      justifyContent: 'center',
      marginBottom: 12,
    }}>
    <Image
      source={authIcons[type]}
      style={{
        position: 'absolute',
        left: 10,
        height: 18,
      }}
      resizeMode='contain'
    />
    <Text
      style={{
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
        padding: 12,
      }}>
      Continue with {type}
    </Text>
  </TouchableOpacity>
)

export const OrDivider = () => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
    }}>
    <View style={{height: 1, backgroundColor: '#D3D3D3', width: '45%'}} />
    <Text style={{color: '#A6A6A6', fontSize: 15, fontWeight: '600'}}>or</Text>
    <View style={{height: 1, backgroundColor: '#D3D3D3', width: '45%'}} />
  </View>
)
