import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, Image, Platform } from 'react-native';
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
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const auth = getAuth();
const user = auth.currentUser;

export default function Exploree() {
  const [lunchResponse, setLunchResponse] = useState<DocumentData[]>();
  const [today, setToday] = useState<string>();
  
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
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<AntDesign size={310} name="find" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore Peoples' additions</ThemedText>
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

              {/* <ThemedView>
                <Checkbox
                  style={{ margin: 8 }}
                  value={isChecked}
                  onValueChange={setIsChecked}
                  color={isChecked ? "#dc4c00" : undefined}
                />
              </ThemedView> */}
            </ThemedView>
          );
        })}
        
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
