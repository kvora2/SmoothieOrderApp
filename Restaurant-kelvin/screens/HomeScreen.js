import { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from "react-native";

import SegmentedControl from "@react-native-segmented-control/segmented-control";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default HomeScreen = ({ navigation }) => {
  // State vars
  // Product Quantity
  const [quantity, setQuantity] = useState("1");

  // Product flavour and shipping states
  const [flavour, setFlavour] = useState("Berry-Blast");
  const [flavourIndex, setFlavourIndex] = useState(0);
  const [shipping, setShipping] = useState("Pick-up");
  const [shippingIndex, setShippingIndex] = useState(0);

  // state vars for subtotal, total tax and order total
  const [orderTotal, setOrderTotal] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [total, setTotal] = useState(0);

  // Product base price
  const itemPrice = 7.99;

  // Product Name
  const itemName = "Smoothie Shake";

  useEffect(() => {
    getTotal();
  }, [quantity, shipping]);

  // Let's calculate imp costs of order
  const getTotal = async () => {
    // calculate Order subtotal
    let totalAmount = itemPrice * parseInt(quantity);
    setOrderTotal(totalAmount.toFixed(2));
    console.log(`Quantity Ordered -> ${quantity}`);

    // check and add extra charge if we gotta deliver
    if (shipping.includes("Delivery")) totalAmount += 10;

    // getting total tax
    const tax = (totalAmount * 13) / 100;
    setTotalTax(tax.toFixed(2));

    // finally Order total
    totalAmount += tax;

    setTotal(totalAmount.toFixed(2));
  };

  // placing order: generate confirmCode -> set order Details -> Save Order Locally -> Navigate to Order Receipt
  const placeOrder = async () => {
    console.log(`Placing order...`);

    // Random 6 digit Order confirmation code
    const orderCode = Math.floor(Math.random() * 900000) + 100000;

    // Set Order details as a object
    const orderDetails = {
      id: orderCode,
      name: itemName,
      price: itemPrice,
      quantity: parseInt(quantity),
      flavour: flavour,
      shipMethod: shipping,
      subtotal: orderTotal,
      orderTax: totalTax,
      total: total,
    };

    // Let's add order to 'Order History' List as well
    try {
      const resultList = await AsyncStorage.getItem("KEY_ORDER_LIST");

      // Checking if there is existing list
      if (resultList === null) {
        // NO LIST: Creating new List and adding order details
        const orderList = [];
        orderList.push(orderDetails);
        // Add order list as string to local storage
        await AsyncStorage.setItem("KEY_ORDER_LIST", JSON.stringify(orderList));
      } else {
        // LIST FOUND: Updating existing list
        const resultListAsArr = JSON.parse(resultList);
        resultListAsArr.push(orderDetails);

        await AsyncStorage.setItem(
          "KEY_ORDER_LIST",
          JSON.stringify(resultListAsArr)
        );
      }

      alert("ORDER PLACED!");
    } catch (err) {
      console.log(`ERROR: Placing Order failed - ${err}`);
    }

    // Navigating User to receipt Screen with current order placed
    navigation.navigate("Receipt Screen", { newOrder: orderDetails });
  };

  // Clear all fields/Set to initial val
  const clearAll = () => {
    setQuantity("1");
    setFlavourIndex(0);
    setShippingIndex(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.container]}>
          {/* Product Image */}
          <Image
            style={styles.shake}
            source={require("../assets/smothie1.jpeg")}
          />

          {/* Page Content*/}
          <View
            style={{
              paddingHorizontal: 10,
              flex: 3,
            }}
          >
            {/* Product Name and Price */}
            <View
              style={{
                paddingTop: 5,
                flex: 3,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.headingText}>{itemName}</Text>
              <Text
                style={[
                  styles.text,
                  { fontWeight: "bold", color: "green", paddingTop: 5 },
                ]}
              >
                $ {itemPrice}
              </Text>
            </View>

            {/* Form Fields */}
            <View
              style={{
                paddingTop: 10,
                flex: 2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Text style={{ fontSize: 18 }}>Quantity: </Text>
                <TextInput
                  style={styles.inField}
                  value={quantity}
                  onChangeText={setQuantity}
                  keyboardType="numeric"
                />
              </View>

              {/* Select Smoothie Flavour */}
              <View
                style={{
                  paddingVertical: 10,
                }}
              >
                <Text style={{ fontSize: 18 }}>Select Smoothie Flavour: </Text>
                <SegmentedControl
                  values={["Berry-Blast", "Mango-Madness", "Pina-Colada"]}
                  selectedIndex={flavourIndex}
                  onChange={(event) => {
                    setFlavourIndex(event.nativeEvent.selectedSegmentIndex);
                  }}
                  onValueChange={setFlavour}
                  style={[
                    styles.segment,
                    {
                      marginBottom: 15,
                    },
                  ]}
                />

                {/* Select Smoothie shipping Method */}
                <Text style={{ fontSize: 18 }}>Select Delivery Method: </Text>
                <SegmentedControl
                  values={["Pick-up", "Delivery ($10)"]}
                  selectedIndex={shippingIndex}
                  onChange={(event) => {
                    setShippingIndex(event.nativeEvent.selectedSegmentIndex);
                  }}
                  onValueChange={setShipping}
                  style={styles.segment}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              paddingTop: 5,
              flex: 3,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {/* 'Place Order' Btn */}
            <Pressable
              style={styles.button}
              onPress={() => {
                placeOrder();
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "black",
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingVertical: 5,
                }}
              >
                Place Order
              </Text>
            </Pressable>

            {/* 'Clear all fields' Btn */}
            <Pressable style={styles.button} onPress={clearAll}>
              <Text
                style={{
                  textAlign: "center",
                  color: "black",
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingVertical: 5,
                }}
              >
                Clear
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {},
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
  },
  shake: {
    height: 300,
    width: "100%",
  },
  inField: {
    width: "20%",
    textAlign: "center",
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#b2e1e9",
  },
  button: {
    borderRadius: 15,
    width: "40%",
    height: 40,
    alignSelf: "center",
    backgroundColor: "#3fc7c9",
    borderWidth: 1,
  },
  segment: {
    marginTop: 5,
    backgroundColor: "#b2e1e9",
  },
});
