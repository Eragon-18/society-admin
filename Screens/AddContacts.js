import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Header } from "react-native-elements";
import firebase from "firebase";
import db from "../config";

export default class AddContacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      designation: "",
      contact: "",
    };
  }

  addData = () => {
    if (this.state.name && this.state.designation && this.state.contact) {
      db.collection("contacts")
        .add({
          name: this.state.name,
          designation: this.state.designation,
          contact: this.state.contact,
          email: firebase.auth().currentUser.email,
        })
        .then((response) => {
          Alert.alert("Contact successfully created!");
          this.props.navigation.navigate("Contacts");
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("An error ocurred. Please try again");
        });
    } else {
      Alert.alert("All fields are required.");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="white"
          centerComponent={{
            text: "Add Contact",
            style: { fontWeight: "bold" },
          }}
          leftComponent={{
            text: "< Back",
            onPress: () => {
              this.props.navigation.navigate("Contacts");
            },
          }}
        ></Header>
        <View style={{ alignItems: "center" }}>
          <TextInput
            style={[styles.textInput, styles.extra]}
            onChangeText={(text) => {
              this.setState({ name: text });
            }}
            placeholder="Name"
          ></TextInput>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              this.setState({ designation: text });
            }}
            placeholder="Designation"
          ></TextInput>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              this.setState({ contact: text });
            }}
            placeholder="Mobile Number"
            keyboardType="numeric"
          ></TextInput>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              this.addData();
            }}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    width: 300,
    height: 35,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
  extra: {
    marginTop: 25,
  },
  submitButton: {
    width: 120,
    height: 50,
    backgroundColor: "#D4A608",
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
  },
  submitText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});
