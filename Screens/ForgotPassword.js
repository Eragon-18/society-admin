import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import Login from "./Login";
import firebase from "firebase";
import { Header } from "react-native-elements";

export default class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
    };
  }

  forgotPassword = () => {
    try {
      firebase
        .auth()
        .sendPasswordResetEmail(this.state.email)
        .then(() => {
          Alert.alert("Password reset link sent.");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.fpText}>Forgotten your password?</Text>
        <Text style={styles.text2}>
          Enter the email with which you registered, and then click the button
          below to get a password reset link.
        </Text>

        <TextInput
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
          style={styles.textInputs}
          placeholder="Email Address"
          keyboardType="email-address"
        />

        <TouchableOpacity
          style={styles.fpButton}
          onPress={() => {
            this.forgotPassword();
          }}
        >
          <Text style={styles.fpText2}>Send password reset link</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            this.props.navigation.navigate("Login");
          }}
        >
          <Ionicons
            name="arrow-back-outline"
            style={styles.icon}
            size={RFValue(30)}
          />
          <Text style={styles.backText}> Back to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  fpText: {
    fontWeight: "bold",
    marginTop: 60,
    width: 450,
    height: 50,
    fontSize: 20,
    textAlign: "center",
  },
  text2: { margin: 10, marginLeft: 20 },
  fpButton: {
    backgroundColor: "#D4A608",
    borderRadius: 10,
    width: 200,
    height: 50,
    marginTop: 30,
    justifyContent: "center",
    flexDirection: "row",
  },
  fpText2: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 15,
  },
  backButton: {
    width: 150,
    height: 50,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    flexDirection: "row",
  },
  icon: {
    width: 25,
    height: 35,
    marginTop: 10,
    marginLeft: -90,
  },
  backText: {
    marginRight: -80,
  },
  textInputs: {
    width: 300,
    height: 35,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
    marginLeft: 10,
  },
});
