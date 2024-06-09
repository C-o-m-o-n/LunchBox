
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage



export const PersistData = async (data:{}) =>{
	return await AsyncStorage.setItem("currentUserData", JSON.stringify(data))
}
