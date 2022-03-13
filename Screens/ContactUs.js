import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Header } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

export default class ContactUs extends React.Component {
  sendEmail = () => {
    Linking.openURL(
      "mailto:vinayak.smani@gmail.com?subject=Query/Feedback/Suggestion for Smart Society App"
    );
  };

  sendWhatsappMessage = () => {
    Linking.openURL("http://api.whatsapp.com/send?phone=919820180218");
   
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="white"
          centerComponent={{
            text: "Contact Us",
            style: { fontWeight: "bold" },
          }}
          leftComponent={{
            text: "< Back",
            onPress: () => {
              this.props.navigation.navigate("Settings");
            },
          }}
        ></Header>

        <Text style={styles.contactText}>
          Have any questions? Want to share any feedback or feature requests?
          Contact Us:
        </Text>

        <TouchableOpacity
          style={styles.iconBox}
          onPress={() => {
            this.sendEmail();
          }}
        >
          <Ionicons
            name="mail-outline"
            color="red"
            size={RFValue(30)}
          ></Ionicons>
          <Text>Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBox}
          onPress={() => {
            this.sendWhatsappMessage();
          }}
        >
          <Ionicons
            name="logo-whatsapp"
            color="green"
            size={RFValue(30)}
          ></Ionicons>
          <Text>Whatsapp</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  contactText: {
    textAlign: "center",
    fontSize: 15,
    marginTop: 25,
    margin: 25,
  },
  iconBox: {
    margin: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
