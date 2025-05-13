declare module 'firebase/auth' {
    import { FirebaseAuthTypes } from '@react-native-firebase/auth'; // Or any other Firebase types you're using
  
    const auth: FirebaseAuthTypes.Module;
    export { auth };
  }