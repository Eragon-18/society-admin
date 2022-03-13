import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Header } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      contact: "",
      email: firebase.auth().currentUser.email,
      name: "",
      secretCode: "",
      password: "",
      docid: "",
    };
  }

  getUserDetails() {
    db.collection("societies")
      .where("email", "==", this.state.email)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          this.setState({
            address: doc.data().address,
            contact: doc.data().contact,
            name: doc.data().name,
            secretCode: doc.data().secretCode,
            password: doc.data().password,
          });
        });
      });
  }

  componentDidMount() {
    this.getUserDetails();
  }

  updateUser = () => {
    db.collection("societies")
      .where("email", "==", this.state.email)
      .get()
      .then((qs) => {
        qs.forEach((doc) => {
          this.setState({ docid: doc.id });
        });
      });
    var str = this.state.docid.toString();
    if (str) {
      db.collection("societies").doc(str).update({
        address: this.state.address,
        contact: this.state.contact,
      });
      alert("Profile updated!");
      this.props.navigation.navigate("Settings");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="white"
          centerComponent={{
            text: "Profile",
            style: { fontWeight: "bold" },
          }}
          leftComponent={{
            text: "< Back",
            onPress: () => {
              this.props.navigation.navigate("Settings");
            },
          }}
        ></Header>

        <View>
          <Text style={styles.text}>Address: </Text>
          <TextInput
            onChangeText={(text) => {
              this.setState({ address: text });
            }}
            style={styles.textInputs}
            placeholder="Address"
            value={this.state.address}
          />

          <Text style={styles.text}>Contact: </Text>
          <TextInput
            onChangeText={(text) => {
              this.setState({ contact: text });
            }}
            style={styles.textInputs}
            placeholder="Contact"
            value={this.state.contact}
            keyboardType="numeric"
          />

          <Text style={styles.text}>
            You can only update your address and contact.
          </Text>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => {
                this.updateUser();
              }}
            >
              <Text style={styles.updateText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  textInputs: {
    width: 300,
    height: 35,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
    marginLeft: -10,
  },
  text: {
    fontWeight: "bold",
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: "#D4A608",
    width: 100,
    height: 50,
    borderRadius: 10,
    marginTop: 30,
    justifyContent: "center",
  },
  updateText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});
