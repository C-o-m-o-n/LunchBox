import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
const [currentUser, setCurrentUuser] = useState<string | null>()

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

	const getCurrentlyLogedInUser = async () =>{
	const data = await AsyncStorage.getItem("currentUserData")
	setCurrentUuser(data)
	}
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
     {/** <Stack>
	  {currentUser ? (

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
	  ) : (

        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
	  ) }
        <Stack.Screen name="+not-found" />
      </Stack> **/}
	  <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
