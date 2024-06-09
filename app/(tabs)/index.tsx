import { Image, StyleSheet, Platform, Pressable, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/Lunchbox.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Add, update or delete <ThemedText type="defaultSemiBold">Your Lunch</ThemedText> and any other daily activities
        </ThemedText>
        <Link style={{fontSize:16, color:"#dc4c00"}}  href="./register"> give it a try  --{'>'}</Link>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to see what GA will eat today, or how many chapatis will Cess eat today
        </ThemedText>
        <Link style={{fontSize:16, color:"#dc4c00"}}  href="./explore"> See peoples additions --{'>'} </Link>
      </ThemedView>
      
	  <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get started</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">click the button bellow</ThemedText> to get started
          <ThemedText type="defaultSemiBold">{' '} to save your activity</ThemedText>
        </ThemedText>
      </ThemedView>

	  <ThemedView style={{paddingHorizontal: 48}}>
		<TouchableOpacity onPress={()=>{
		router.push("login")
		}}
		style={{ borderRadius:20, backgroundColor: "#dc4c00", padding:10}}>
		<ThemedText type="defaultSemiBold" style={{textAlign:"center"}}>Get Started</ThemedText>
		</TouchableOpacity>
	  </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    top: 0,
	right: 0,
    position: 'absolute',
  },
});
