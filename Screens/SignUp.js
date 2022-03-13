import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";
import db from "../config";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      address: "",
      contact: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      secretCode: "",
    };
  }

  signUpUser = () => {
    try {
   //   console.log("e");
      var secretCode = this.createUniqueId();

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
          var user = userCredential.user;

          db.collection("societies").add({
            email: this.state.email,
            name: this.state.name,
            address: this.state.address,
            contact: this.state.contact,
            password: this.state.password,
            secretCode: secretCode,
          });

          alert(
            "Society Registered Successfully! Check your profile in settings to know your society code."
          );

          this.props.navigation.navigate("Home");
        })
        .catch((error) => {
          console.log(error);
          alert(error);
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    } catch (e) {
      console.log(e);
    }
  };

  createUniqueId = () => {
    return Math.random().toString(36).substring(6);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.registerText}>Register your society here.</Text>

        <TextInput
          onChangeText={(text) => {
            this.setState({ name: text });
          }}
          style={styles.textInputs}
          placeholder="Society Name"
        />

        <TextInput
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
          style={styles.textInputs}
          placeholder="Society Email Address"
          keyboardType="email-address"
        />

        <TextInput
          onChangeText={(text) => {
            this.setState({ address: text });
          }}
          style={styles.textInputs}
          placeholder="Society Address"
        />

        <TextInput
          onChangeText={(text) => {
            this.setState({ contact: text });
          }}
          style={styles.textInputs}
          placeholder="Society Contact"
          keyboardType="numeric"
        />

        <View>
          <TextInput
            style={styles.textInputs2}
            secureTextEntry={this.state.showPassword === false ? true : false}
            placeholder="Password"
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => {
              if (this.state.showPassword === false) {
                this.setState({ showPassword: true });
              } else if (this.state.showPassword === true) {
                this.setState({ showPassword: false });
              }
            }}
          >
            <Ionicons
              name={this.state.showPassword === false ? "eye-off" : "eye"}
              style={styles.icon}
              size={RFValue(30)}
            ></Ionicons>
          </TouchableOpacity>
        </View>

        <View>
          <TextInput
            style={{
              width: 270,
              height: 35,
              borderWidth: 1.5,
              fontSize: 20,
              margin: 10,
              paddingLeft: 10,
              marginLeft: -5,
              marginTop: 15,
            }}
            secureTextEntry={
              this.state.showConfirmPassword === false ? true : false
            }
            placeholder="Confirm Password"
            onChangeText={(text) => {
              this.setState({
                confirmPassword: text,
              });
            }}
          />
          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => {
              if (this.state.showConfirmPassword === false) {
                this.setState({ showConfirmPassword: true });
              } else if (this.state.showConfirmPassword === true) {
                this.setState({ showConfirmPassword: false });
              }
            }}
          >
            <Ionicons
              name={
                this.state.showConfirmPassword === false ? "eye-off" : "eye"
              }
              style={styles.icon}
              size={RFValue(30)}
            ></Ionicons>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => {
            if (this.state.password === this.state.confirmPassword) {
              this.signUpUser();
              // Alert.alert('Button Pressed!');
            } else {
              Alert.alert("Password and confirmed password do not match.");
            }
          }}
        >
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.login}
          onPress={() => {
            this.props.navigation.navigate("Login");
          }}
        >
          <Text>
            Already Registered?
            <Text style={styles.loginText}> Login</Text>
          </Text>
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
  registerText: {
    fontWeight: "bold",
    marginTop: 60,
    marginLeft: -70,
    width: 250,
    height: 25,
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
  textInputs2: {
    width: 270,
    height: 35,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
    marginLeft: -5,
  },
  icon: {
    width: 25,
    height: 35,
    marginTop: 2,
    marginLeft: 5,
    //   borderWidth: 1,
    position: "absolute",
  },
  iconBox: {
    width: 40,
    height: 35,
    marginTop: -45,
    marginLeft: 270,
    borderWidth: 2,
  },
  signUpButton: {
    backgroundColor: "#D4A608",
    width: 100,
    height: 50,
    borderRadius: 10,
    marginTop: 40,
    justifyContent: "center",
  },
  signUpText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  login: {
    marginTop: 20,
    height: 25,
  },
  loginText: {
    fontWeight: "bold",
    color: "#D4A608",
  },
});
