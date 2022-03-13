import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
  Platform,
} from "react-native";
import { Header } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";
import db from "../config";

export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactsData: [],
      userEmail: firebase.auth().currentUser.email,
    };
  }

  getData = async () => {
    await db
      .collection("contacts")
      .where("email", "==", this.state.userEmail)
      .onSnapshot((snapshot) => {
        var contacts = [];
        snapshot.docs.map((doc) => {
        //  console.log(doc.data());
          var contact = doc.data();
          contact["docId"] = doc.id;
          contacts.push(contact);
        });
        this.setState({ contactsData: contacts });
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.flatView}>
        <View style={styles.textView}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.designation}>{item.designation}</Text>
        </View>

        <View style={styles.iconView}>
          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => {
              if (Platform.OS === "android") {
                Linking.openURL("tel:$" + item.contact);
              } else {
                Linking.openURL("telprompt:$" + item.contact);
              }
            }}
          >
            <Ionicons
              name="call-outline"
              color="#04829B"
              size={RFValue(27)}
            ></Ionicons>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => {
              Linking.openURL(
                "http://api.whatsapp.com/send?phone=91" + item.contact
              );
            }}
          >
            <Ionicons
              name="logo-whatsapp"
              color="green"
              size={RFValue(25)}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="white"
          centerComponent={{
            text: "Contacts",
            style: { fontWeight: "bold" },
          }}
        />
        {this.state.contactsData.length == 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ textAlign: "center" }}>
              No contacts created yet! Click the + button to start adding.
            </Text>
          </View>
        ) : (
          <FlatList
            data={this.state.contactsData}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            bottomDivider
          />
        )}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            this.props.navigation.navigate("AddContacts");
          }}
        >
          <Ionicons name="add-outline" size={RFValue(50)}></Ionicons>
        </TouchableOpacity>
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
    width: "95%",
    margin: 10,
    padding: 5,
    alignSelf: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 15,
  },
  designation: {
    fontSize: 12,
  },
  textView: {
    width: 180,
  },
  iconView: {
    width: 120,
    flexDirection: "row",
  },
  iconBox: {
    margin: 5,
    marginLeft: 30,
    // marginRight: 35,
    alignItems: "center",
    //   borderWidth: 1
  },
});
