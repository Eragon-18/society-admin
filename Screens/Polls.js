import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { Header } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";
import db from "../config";

export default class Polls extends React.Component {
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
      pollData: [],
      voters: [],
    };
  }

  getPoll = async () => {
    await db
      .collection("polls")
      .where("email", "==", this.state.email)
      .onSnapshot((snapshot) => {
        var polls = [];
        snapshot.docs.map((doc) => {
          //  console.log(doc.data());
          var poll = doc.data();
          poll["docId"] = doc.id;
          polls.push(poll);
        });
        this.setState({ pollData: polls });
      });
  };

  changeStatus = (id, status) => {
    var str = id.toString();
    if (str) {
      if (status === false) {
        status = true;
      } else if (status === true) {
        status = false;
      }

      db.collection("polls").doc(str).update({ completed: status });
      alert("Status Updated!");
    } else {
      alert("An error occured. Please try again later.");
    }
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.flatView}>
        <View style={styles.textView}>
          <Text style={styles.title}>{item.question}</Text>
          <Text>
            {item.op1} : {item.op1voted}
          </Text>
          <Text>
            {item.op2} : {item.op2voted}
          </Text>
          <Text>Voted : {item.op1voted + item.op2voted}</Text>
        </View>
        <View>
          {item.completed === false ? (
            <TouchableOpacity
              style={{
                width: 100,
                alignItems: "center",
              }}
              onPress={() => {
                this.changeStatus(item.docId, item.completed);
              }}
            >
              <Text style={{ textAlign: "right", color: "blue" }}>
                In progress
              </Text>
              <Ionicons
                name="time-outline"
                size={RFValue(30)}
                color="blue"
                style={{ margin: 10 }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 5,
                width: 100,
                alignItems: "center",
              }}
              onPress={() => {
                this.changeStatus(item.docId, item.completed);
              }}
            >
              <Text style={{ textAlign: "right", color: "green" }}>
                Completed
              </Text>
              <Ionicons
                name="checkmark-outline"
                size={RFValue(30)}
                color="green"
                style={{ margin: 10 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  componentDidMount = () => {
    this.getPoll();
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="white"
          centerComponent={{
            text: "Polls",
            style: { fontWeight: "bold" },
          }}
        />
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            this.props.navigation.navigate("CreatePolls");
          }}
        >
          <Ionicons name="add-outline" size={RFValue(50)}></Ionicons>
        </TouchableOpacity>

        {this.state.pollData.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>No polls yet! Click the + button to create!</Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={this.state.pollData}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    top: 470,
    backgroundColor: "#D4A608",
    borderRadius: 30,
    elevation: 8,
  },
  flatView: {
    backgroundColor: "#D4A608",
    flexDirection: "row",
    width: 320,
    margin: 10,
    marginLeft: 20,
    padding: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
  },
  textView: {
    width: 200,
  },
});
