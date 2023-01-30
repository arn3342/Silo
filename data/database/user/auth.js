import {useSelector} from 'react-redux'
import {NativeFirebaseError} from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import {ParseFirebaseError} from '../errors'
// import {StorageHelper} from '../../storage'
import axios from 'axios'
import {useState} from 'react'
import {GoogleSignin} from '@react-native-google-signin/google-signin'

export const useAuthHook = () => {
  const [isBusy, setIsBusy] = useState(false)

  async function validateSignin ({email, phone}) {
    setIsBusy(true)
    try {
      if (email) {
        const authResult = await auth().fetchSignInMethodsForEmail(email)
        setIsBusy(false)
        return {
          success: true,
          data: authResult,
        }
      } else if (phone) {
        const authResult = await auth().verifyPhoneNumber(phone)
        setIsBusy(false)
        return {
          success: true,
          data: authResult,
        }
      }
    } catch (ex) {
      setIsBusy(false)
      const errorCode = ex.toString().match(/\[(.*?)\]/)[1]
      return {
        error: {
          message: ParseFirebaseError[errorCode],
        },
      }
    }
  }

  async function signInWithCreds (credential) {
    setIsBusy(true)
    try {
      const authResult = await auth().signInWithCredential(credential)
      setIsBusy(false)
      return {...authResult, success: true}
    } catch (ex) {
      setIsBusy(false)
      const errorCode = ex.toString().match(/\[(.*?)\]/)[1]
      return {
        error: {
          message: ParseFirebaseError[errorCode],
        },
      }
    }
  }

  async function signInWithPhone (phoneNumber) {
    setIsBusy(true)
    try {
      const authResult = await auth().signInWithPhoneNumber(phoneNumber, true)
      setIsBusy(false)
      return {data: authResult, success: true}
    } catch (ex) {
      setIsBusy(false)
      console.log('COuldnt sing in with phone:', ex)
      const errorCode = ex.toString().match(/\[(.*?)\]/)[1]
      return {
        error: {
          message: ParseFirebaseError[errorCode],
        },
      }
    }
  }
  async function signInWithEmailCreds ({email, password}) {
    setIsBusy(true)
    try {
      const authResult = await auth().signInWithEmailAndPassword(
        email,
        password,
      )
      setIsBusy(false)
      return {...authResult, success: true}
    } catch (ex) {
      setIsBusy(false)
      console.log('COuldnt sing in:', ex)
      const errorCode = ex.toString().match(/\[(.*?)\]/)[1]
      return {
        error: {
          message: ParseFirebaseError[errorCode],
        },
      }
    }
  }

  async function signInWithLocal () {
    setIsBusy(true)
    if (!token) return
    try {
      const authResult = await auth().signInWithCustomToken(token)
      setIsBusy(false)
      return {...authResult, success: true}
    } catch (ex) {
      setIsBusy(false)
      const errorCode = ex.toString().match(/\[(.*?)\]/)[1]
      return {
        error: {
          message: ParseFirebaseError[errorCode],
        },
      }
    }
  }

  async function signUpWithEmailCreds ({email, password}) {
    setIsBusy(true)
    try {
      const authResult = await auth().createUserWithEmailAndPassword(
        email,
        password,
      )
      setIsBusy(false)
      return {...authResult, success: true}
    } catch (ex) {
      setIsBusy(false)
      const errorCode = ex.toString().match(/\[(.*?)\]/)[1]
      return {
        error: {
          message: ParseFirebaseError[errorCode],
        },
      }
    }
  }

  async function signInWithGoogle () {
    try {
      setIsBusy(true)
      GoogleSignin.configure({
        webClientId:
          '105634497241-tj2brn1b770b5av2pjd8g181jla0s9u0.apps.googleusercontent.com',
      })

      const {idToken} = await GoogleSignin.signIn()
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)
      const result = await signInWithCreds(googleCredential)
      setIsBusy(false)

      return {
        ...result,
        success: true,
      }
    } catch (ex) {
      setIsBusy(false)

      return {
        error: {
          message: ex?.toString(),
        },
      }
    }
  }

  async function signOut (fireInstance) {
    try {
      await auth().signOut()
      return {success: true}
    } catch (ex) {
      const errorCode = ex.toString().match(/\[(.*?)\]/)[1]
      return {
        error: {
          message: ParseFirebaseError[errorCode],
        },
      }
    }
  }

  async function getUserIdToken (uid) {
    //   const api = process.env.REACT_APP_API_URL
    //   return axios.post(`${api}/auth/getCustomToken`, {
    //     uid,
    //   })
  }

  return {
    validateSignin,
    signInWithEmailCreds,
    signUpWithEmailCreds,
    signInWithLocal,
    signInWithCreds,
    signInWithGoogle,
    signInWithPhone,
    signOut,
    isBusy,
  }
}
