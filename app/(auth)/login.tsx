import React, { useEffect, useState } from 'react';
import { Button, Image, Text, TextInput, View, SafeAreaView, TouchableOpacity } from 'react-native';
import {PersistData} from "@/components/PersistData";
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import {ThemedView} from '@/components/ThemedView';
import {ThemedText} from '@/components/ThemedText';
import {Link, router} from 'expo-router';


export default function Login( ) {
const [loading, setLoading] = useState(false);
const [email, setEmail]  =  useState("")
const [password, setPassword]  =  useState("")

const handleSignIn =  () => {
    setLoading(true)
   
console.log("Login clicked")
    signInWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
   
      const user = userCredential.user;
	  PersistData(user)
     	  console.log('loggedInUser',user)
	  
	  router.push("(tabs)")

      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center'}}>
      <ThemedView style={{ margin: 22, borderRadius:20, padding:5 }}>
      <ThemedView style={{ justifyContent: 'center' }}>
	<ThemedText style={{ fontWeight: "bold", textAlign:"center", marginVertical: 20}}>Hello,Welcome Back...Please login here</ThemedText>
</ThemedView>
	  <ThemedView style={{}}>
<ThemedView style={{paddingHorizontal: 20}}>
	<ThemedText style={{ fontWeight: "bold", textAlign:"left", marginVertical: 20}}>Email Address</ThemedText>
        <TextInput style={{ marginBottom:8, borderWidth: 2, borderColor: "#dc4c00", color:"#dc4c00", borderRadius:20, backgroundColor: "", padding:10}}
        placeholder="Enter email"
		onChangeText={(text)=>{
		setEmail(text)
		}}
		value={email}

      />
	<ThemedText style={{ fontWeight: "bold", textAlign:"left", marginVertical: 20}}>Password</ThemedText>
        <TextInput style={{ marginBottom:8, borderWidth: 2, borderColor: "#dc4c00", color:"#dc4c00", borderRadius:20, backgroundColor: "", padding:10}}
        placeholder="Enter password"
		secureTextEntry
		onChangeText={(text)=>{
		setPassword(text)
		}}
		value={password}

      />
</ThemedView>
	  {/**
<Text style={{textAlign:'right',color:COLORS.grey,fontSize:15}} onPress={()=>navigation.navigate('forgot-password')}>Forgot Password?</Text>
      </View>
**/}
<ThemedView style={{paddingHorizontal: 56}}>
		<TouchableOpacity style={{ borderRadius:20, backgroundColor: "#dc4c00", padding:13}} onPress={()=>handleSignIn()}>
	<Text style={{textAlign:"center", color:"white"}}>Login</Text>
		</TouchableOpacity>
	  </ThemedView>

           <View style={{flexDirection:'row', justifyContent:"center" ,marginVertical:16}}>
          <ThemedText style={{fontSize:16,fontWeight:'600'}}>Dont have an account ?</ThemedText>
          <Link style={{fontSize:16, color:"#dc4c00"}}  href="./register"> Create Account </Link>
        </View>
      
	  </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );


}
