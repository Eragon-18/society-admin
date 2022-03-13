import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
    };
  }

  loginUser = () => {
    if (this.state.email && this.state.password) {
      try {
       // console.log("e");

        firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then((userCredential) => {
          //  console.log(userCredential);
            var user = userCredential.user;
            Alert.alert("Welcome Back!");

            this.props.navigation.navigate("Home");
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            Alert.alert(error);
            alert(error);
            console.log(error);
          });
      } catch (e) {
        console.log(e);
        alert(e);
      }
    } else {
      alert("Enter both email and password");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <Image
          source={require("../assets/applogo.png")}
          style={styles.logo}
        ></Image>
        <Text style={styles.welcomeText}>Welcome Back!</Text>

        <TextInput
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
          style={styles.textInputs}
          placeholder="Email Address"
          keyboardType="email-address"
          value={this.state.email}
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
            value={this.state.password}
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
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => {
            this.props.navigation.navigate("ForgotPassword");
          }}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            this.loginUser();
          }}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUp}
          onPress={() => {
            this.props.navigation.navigate("SignUp");
          }}
        >
          <Text>
            Not registered your society yet?
            <Text style={styles.signUpText}> Sign Up</Text>
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
    backgroundColor: "white",
    marginTop: 10
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginTop: 20,
  },
  welcomeText: {
    fontWeight: "bold",
    marginTop: 15,
    marginLeft: -220,
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
  forgotPassword: {
    marginLeft: 190,
    marginTop: 10,
    height: 25,
  },
  forgotPasswordText: {
    fontWeight: "bold",
    color: "#D4A608",
  },
  loginButton: {
    backgroundColor: "#D4A608",
    width: 100,
    height: 50,
    borderRadius: 10,
    marginTop: 30,
    justifyContent: "center",
  },
  loginText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  signUp: {
    marginTop: 20,
    height: 30,
  },
  signUpText: {
    fontWeight: "bold",
    color: "#D4A608",
  },
  icon: {
    width: 25,
    height: 35,
    marginTop: 2,
    marginLeft: 5,
   // borderWidth: 1,
    position: "absolute",
  },
  iconBox: {
    width: 40,
    height: 35,
    marginTop: -45,
    marginLeft: 270,
    borderWidth: 2,
  },
});
