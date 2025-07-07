import useAuthStore from '@/store/auth.store';
import * as Sentry from '@sentry/react-native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import './globals.css';

Sentry.init({
  dsn: 'https://53a9bb4f6bcb5d5782a2253c2039bc74@o4509622012018688.ingest.us.sentry.io/4509622013853696',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  
  const {isLoading, fecthAuthenticatedUser} = useAuthStore()

   const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
  });

  useEffect(()=>{
    if(error) throw error
    if(fontsLoaded) SplashScreen.hideAsync()
  },[fontsLoaded,error])

  useEffect(()=>{
    fecthAuthenticatedUser()
  },[])

  if(!fontsLoaded || isLoading) return null;
  
  return <Stack screenOptions={{ headerShown: false}}/>;
});