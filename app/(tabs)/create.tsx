import AntDesign from "@expo/vector-icons/AntDesign";
import {
  StyleSheet,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";

import React, { useEffect, useState } from "react";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import {  db } from '../../firebaseConfig'
import { collection, getDoc, getDocs, doc, setDoc, Firestore, addDoc, DocumentData } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const auth = getAuth()
const user = auth.currentUser

export default function CreateScreen() {
  const [food, setFood] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState("");

  const lunchData:{food:string, quantity:string, price:string} = {food:food, quantity:quantity, price:price}

  //save saveUserLunch to firestore
  const saveUserLunch = async () => {
    // setloading(true)
    try{
if (user){
  // const lunchCollectionRef = doc(db, 'users', user.uid);
   const lunchCollectionRef = collection(db, 'users', user.uid, 'lunch');
  //  const userRef = await addDoc(lunchCollectionRef, {user_uid:user.uid})

      // lunchCollectionRef.doc('user_email').set(lunchData)
      // const docSnap = await lunchCollectionRef.get()
    // await setDoc((userRef), lunchData)
    setDoc(doc(lunchCollectionRef, lunchData.food), {
      lunchData
    })
    console.log("Success saving food")
}    
    } catch(error){
      console.log(error)
    }
    // setloading(false)
  }
  

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <AntDesign size={310} name="plus" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Add Today's lunch</ThemedText>
      </ThemedView>

      <ThemedText>Add the food you will eat today?</ThemedText>

      <ThemedView style={{ paddingHorizontal: 20 }}>
        <ThemedText
          style={{ fontWeight: "bold", textAlign: "left", marginVertical: 20 }}
        >
          Enter Food
        </ThemedText>
        <TextInput
          style={{
            marginBottom: 8,
            borderWidth: 2,
            borderColor: "#dc4c00",
            color: "#dc4c00",
            borderRadius: 20,
            backgroundColor: "",
            padding: 10,
          }}
          onChangeText={(text) => {
            setFood(text);
          }}
          value={food}
        />

        <ThemedText
          style={{ fontWeight: "bold", textAlign: "left", marginVertical: 20 }}
        >
          Enter quantity
        </ThemedText>
        <TextInput
          style={{
            marginBottom: 8,
            borderWidth: 2,
            borderColor: "#dc4c00",
            color: "#dc4c00",
            borderRadius: 20,
            backgroundColor: "",
            padding: 10,
          }}
          onChangeText={(text) => {
            setQuantity(text);
          }}
          value={quantity}
        />

        <ThemedText
          style={{ fontWeight: "bold", textAlign: "left", marginVertical: 20 }}
        >
          Enter estimated price
        </ThemedText>
        <TextInput
          style={{
            marginBottom: 8,
            borderWidth: 2,
            borderColor: "#dc4c00",
            color: "#dc4c00",
            borderRadius: 20,
            backgroundColor: "",
            padding: 10,
          }}
          onChangeText={(text) => {
            setPrice(text);
          }}
          value={price}
        />
        {/* <ThemedText
          style={{ fontWeight: "bold", textAlign: "left", marginVertical: 20 }}
        >
          Enter estimated price
        </ThemedText>
        <TextInput
          style={{
            marginBottom: 8,
            borderWidth: 2,
            borderColor: "#dc4c00",
            color: "#dc4c00",
            borderRadius: 20,
            backgroundColor: "",
            padding: 10,
          }}
          onChangeText={(text) => {
            setQuantity(text);
          }}
          value={quantity}
        /> */}

        <ThemedView style={{ paddingHorizontal: 48, paddingTop:6 }}>
          <TouchableOpacity
            onPress={() => {
              saveUserLunch();
            }}
            style={{
              borderRadius: 20,
              backgroundColor: "#dc4c00",
              padding: 10,
            }}
          >
            <ThemedText type="defaultSemiBold" style={{ textAlign: "center" }}>
              Save
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

// function setloading(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }

