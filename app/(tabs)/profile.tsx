import React, { useEffect, useState, useCallback } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  Firestore,
  addDoc,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import Checkbox from "expo-checkbox";
import { getAuth } from "firebase/auth";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, Image, Platform, RefreshControl} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
const auth = getAuth();
const user = auth.currentUser;

export default function Profile() {
  const [lunchResponse, setLunchResponse] = useState<DocumentData[]>();
  const [today, setToday] = useState<string>();
  const [isChecked, setIsChecked] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onrefresh = useCallback(()=>{
    setRefreshing(true)
    setTimeout(()=>{
        setRefreshing(false)
    }, 2000)
  }, [])

  useEffect(() => {
    const getDate = () => {
      const date = new Date();
      setToday(date.toLocaleString());
      // console.log("date", date.toLocaleString())
    };
    const getLunch = async () => {
      //get lunch from firebase
      try {
        if (user) {
          const lunchCollectionRef = collection(db, "users", user.uid, "lunch");
          const docSnap = await getDocs(lunchCollectionRef);
          const lunchList: DocumentData[] = [];
          docSnap.forEach((doc) => {
            const d = doc.data();
            // console.log("d", d);
            lunchList.push(d.lunchData);
          });
          setLunchResponse(lunchList);
          //   console.log("lunchList", lunchResponse);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDate();
    getLunch();
  }, [onrefresh]);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <AntDesign size={310} name="user" style={styles.headerImage} />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore your profile</ThemedText>
      </ThemedView>

      <ThemedView
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          paddingVertical: 15,
        }}
      >
        <ThemedText>
          <AntDesign size={30} name="mail" />
        </ThemedText>
        <ThemedText style={{ fontWeight: "bold" }}>{user?.email}</ThemedText>
        <ThemedText style={{ fontWeight: "bold" }}>{today}</ThemedText>
      </ThemedView>

      {lunchResponse &&
        lunchResponse.map((doc) => {
          return (
            <ThemedView
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 5,
                borderColor: "#dc4c00",
                borderWidth: 2,
                borderRadius: 20,
                padding: 20,
              }}
            >

              <ThemedView
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                  alignItems: "center",
                }}
              >
                <ThemedView
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ThemedText>
                    <Ionicons size={24} name="fast-food" />
                  </ThemedText>
                  <ThemedText>{doc?.food}</ThemedText>
                </ThemedView>

                <ThemedView
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ThemedText>
                    <MaterialIcons
                      size={24}
                      name="production-quantity-limits"
                    />
                  </ThemedText>
                  <ThemedText>{doc?.quantity}</ThemedText>
                </ThemedView>

                <ThemedView
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ThemedText>
                    <Ionicons size={24} name="cash-sharp" />
                  </ThemedText>
                  <ThemedText>{doc?.price}</ThemedText>
                </ThemedView>
              </ThemedView>

              <ThemedView>
                <Checkbox
                  style={{ margin: 8 }}
                  value={isChecked}
                  onValueChange={setIsChecked}
                  color={isChecked ? "#dc4c00" : undefined}
                />
              </ThemedView>
            </ThemedView>
          );
        })}

      {Platform.select({
        ios: (
          <ThemedText>
            The{" "}
            <ThemedText type="defaultSemiBold">
              components/ParallaxScrollView.tsx
            </ThemedText>{" "}
            component provides a parallax effect for the header image.
          </ThemedText>
        ),
      })}
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
