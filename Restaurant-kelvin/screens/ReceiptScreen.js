import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Receipt Screen for order confirmation (get the order details via component props)
export default ReceiptScreen = ({ route }) => {
  // Order details
  const myOrder = route.params.newOrder;

  return (
    <View style={styles.container}>
      {/* Here goes the whole Receipt */}
      <View style={{ borderWidth: 2, padding: 10, backgroundColor: "white" }}>
        {/* Receipt confirmation code */}
        <Text
          style={{
            fontSize: 18,
            marginBottom: 10,
            alignSelf: "center",
          }}
        >
          Receipt for Order#{" "}
          <Text style={{ fontWeight: "bold" }}>{myOrder.id}</Text>
        </Text>

        {/* Order Details */}
        <View
          style={{
            alignSelf: "stretch",
            width: 320,
          }}
        >
          <View style={styles.item}>
            <Text style={{ fontSize: 20 }}>
              {myOrder.quantity} X{"        "} {myOrder.name}
            </Text>
            <Text style={{ fontSize: 18, fontStyle: "italic" }}>
              ${myOrder.subtotal}
            </Text>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.item}>
            <Text style={styles.text}>
              {"                 "}Flavour: {myOrder.flavour}
            </Text>
          </View>
          <View style={styles.item}>
            {myOrder.shipMethod.includes("Delivery") ? (
              <>
                <Text style={styles.text}>
                  {"                 "}Shipping: Delivery
                </Text>
                <Text style={styles.text}>$10.00</Text>
              </>
            ) : (
              <>
                <Text style={styles.text}>
                  {"                 "}Shipping: Pick-up
                </Text>
                <Text style={styles.text}>$00.00</Text>
              </>
            )}
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>{"                 "}Tax (HST):</Text>
            <Text style={styles.text}>${myOrder.orderTax}</Text>
          </View>
          <View style={styles.item}>
            <Text style={[styles.text, { fontWeight: "bold" }]}>
              {"                 "}Total:
            </Text>
            <Text style={[styles.text, { fontWeight: "bold" }]}>
              ${myOrder.total}
            </Text>
          </View>
        </View>
        <Text style={styles.endMsg}>Enjoy and Visit again soon!!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 10,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    fontStyle: "italic",
  },
  itemContainer: {
    alignSelf: "stretch",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  endMsg: {
    fontSize: 18,
    marginBottom: 10,
    alignSelf: "center",
    fontStyle: "italic",
    marginTop: 30,
  },
});
