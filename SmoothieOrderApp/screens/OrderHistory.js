import { StyleSheet, Text, View, FlatList, Button } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useState, useEffect } from "react";

import { useIsFocused } from "@react-navigation/native";

export default OrderHistory = ({ navigation }) => {
  const [orderList, setOrderList] = useState([]);

  const userOnThisScreen = useIsFocused();

  useEffect(() => {
    // whenever user changes screen, update the order History
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={clearHistory} title="Clear History" color="#3fc7c9" />
      ),
    });
    if (userOnThisScreen) {
      console.log(`Viewing History`);
      getOrderList();
    }
  }, [userOnThisScreen, navigation]);

  const getOrderList = async () => {
    try {
      const resultList = await AsyncStorage.getItem("KEY_ORDER_LIST");

      if (resultList === null) {
        // No History list found
        console.log("DEBUG: Order History Screen: NO ORDER LIST EXIST!");
        setOrderList([]);
        return;
      } else {
        // Got existing list so convert it to array object and use that
        const resultAsArray = JSON.parse(resultList);
        console.log(
          `DEBUG: Order History Screen: List found: ${resultAsArray.length} found.`
        );
        console.log(resultAsArray);

        setOrderList(resultAsArray);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clearHistory = async () => {
    // deleting the Order History from the Local Storage
    await AsyncStorage.removeItem("KEY_ORDER_LIST");
    setOrderList([]);

    alert("SUCCESS: History Cleared!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Welcome to Order History</Text>
      {/* Output an error message if no Order(s) are on the list */}
      {orderList.length === 0 && (
        <Text style={[styles.text, { alignSelf: "center" }]}>
          No Orders Placed Yet!
        </Text>
      )}

      {/* Order List found, display them: */}
      {orderList.length > 0 && (
        <FlatList
          data={orderList}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemBar}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                  <Text style={[styles.text, { alignSelf: "center" }]}>
                    # {item.id}
                  </Text>
                </View>
                <View style={styles.itemContent}>
                  <Text>
                    {item.flavour} | {item.shipMethod}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Quantity: {item.quantity}</Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "green",
                        marginTop: -10,
                      }}
                    >
                      $ {item.total}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.listItemBorder}></View>;
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 10,
  },
  text: {
    fontSize: 18,
  },
  itemBar: {
    borderWidth: 1,
    borderColor: "#3fc7c9",
    borderRadius: 20,
    padding: 10,
  },
  itemContent: {
    padding: 5,
  },
  button: {
    borderRadius: 15,
    width: "40%",
    height: 40,
    alignSelf: "center",
    backgroundColor: "#82E6DC",
    marginVertical: 5,
  },
  listItemBorder: {
    marginVertical: 3,
  },
});
