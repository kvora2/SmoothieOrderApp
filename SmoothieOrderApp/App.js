import { StyleSheet, View, Pressable, Text, Button } from "react-native";

// react navigation plugin imports
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//imports for getting icons
import { FontAwesome } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

// used with stack navigators:
import "react-native-gesture-handler";

// App Screens
import OrderHistory from "./screens/OrderHistory";
import HomeScreen from "./screens/HomeScreen";
import ReceiptScreen from "./screens/ReceiptScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Screen Arrangement:
//  Tab Navigation: 'Placing Order | Order History'
//  Stack Navigation: 'Place Order -> Receipt Screen'

// Custom component = Home Screen & Receipt Screen are connected (HS -> RS)
const StackContainerComponent = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#b2e1e9" },
      }}
    >
      <Stack.Screen name="Home Screen" component={HomeScreen} />
      <Stack.Screen name="Receipt Screen" component={ReceiptScreen} />
    </Stack.Navigator>
  );
};

export default App = () => {
  // Clear Order History locally
  const clearHistory = async () => {
    console.log(`DEBUG: Clearing up Order History...`);

    // deleting the Order History from the Local Storage
    await AsyncStorage.removeItem("KEY_ORDER_LIST");

    alert("SUCCESS: History Cleared!");
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#b2e1e9" },
          headerTintColor: "black",
        }}
      >
        <Tab.Screen
          name="Place Order"
          component={StackContainerComponent}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#b2e1e9" },
            tabBarIcon: () => (
              <FontAwesome
                name="shopping-cart"
                size={20}
                color="black"
                style={{ textAlign: "center" }}
              />
            ),
            tabBarActiveTintColor: "black",
            tabBarActiveBackgroundColor: "#b2e1e9",
          }}
        />
        <Tab.Screen
          name="Order History"
          component={OrderHistory}
          options={({ navigation }) => ({
            tabBarIcon: () => (
              <FontAwesome
                name="history"
                size={20}
                color="black"
                style={{ textAlign: "center" }}
              />
            ),
            tabBarActiveTintColor: "black",
            tabBarActiveBackgroundColor: "#b2e1e9",
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: "50%",
    height: 35,
    alignSelf: "center",
    backgroundColor: "#3fc7c9",
    marginHorizontal: 5,
    borderWidth: 1,
  },
});
