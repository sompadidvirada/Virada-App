import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import './globals.css';

export default function RootLayout() {
  const [fontsLoadded, error] = useFonts({
    "QuickSand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
    "Laos": require('../assets/fonts/NotoSansLao.ttf'),
  });

  useEffect(()=>{
    if(error) throw error
    if(fontsLoadded) SplashScreen.hideAsync()
  },[fontsLoadded,error])
  return <Stack screenOptions={{ headerShown: false}}/>;
}
