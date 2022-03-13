import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Header } from "react-native-elements";
import firebase from "firebase";
import db from "../config";

export default class CreatePolls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: "",
      op1: "",
      op2: "",
      completed: false,
      email: firebase.auth().currentUser.email,
      op1voted: 0,
      op2voted: 0,
      voted: 0,
      voters: [],
    };
  }

  createPoll = () => {
    if (this.state.question && this.state.op1 && this.state.op2) {
      db.collection("polls").add({
        question: this.state.question,
        op1: this.state.op1,
        op2: this.state.op2,
        completed: this.state.completed,
        email: this.state.email,
        op1voted: this.state.op1voted,
        op2voted: this.state.op2voted,
        voted: this.state.voted,
        voters: [],
      });
      alert("Poll Created Successfully!");
      this.props.navigation.navigate("Polls");
    } else {
      alert("Question and both options are required.");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="white"
          centerComponent={{
            text: "Create Polls",
            style: { fontWeight: "bold" },
          }}
          leftComponent={{
            text: "< Back",
            onPress: () => {
              this.props.navigation.navigate("Polls");
            },
          }}
        />
        <View style={{ alignItems: "center", marginTop: 25 }}>
          <TextInput
            onChangeText={(text) => {
              this.setState({ question: text });
            }}
            style={styles.textInputs}
            placeholder="Question"
          />

          <TextInput
            onChangeText={(text) => {
              this.setState({ op1: text });
            }}
            style={styles.textInputs}
            placeholder="Option 1"
          />

          <TextInput
            onChangeText={(text) => {
              this.setState({ op2: text });
            }}
            style={styles.textInputs}
            placeholder="Option 2"
          />

          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => {
              this.createPoll();
            }}
          >
            <Text style={styles.updateText}>Create Poll</Text>
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
  textInputs: {
    width: 300,
    height: 35,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
    marginLeft: -10,
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
