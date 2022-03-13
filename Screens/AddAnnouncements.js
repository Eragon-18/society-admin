import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  FontAwesome5,
  FontAwesome,
  Entypo,
  Ionicons,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import * as Font from "expo-font";
import firebase from "firebase";
import { Avatar, Header } from "react-native-elements";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Modal from "react-native-modal";
import db from "../config";

export default class AddAnnouncements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      cameraPermissions: "",
      modalVisible: false,
      image: "https://dummyimage.com/600x400/000/d4a408&text=++Image++",
      userEmail: firebase.auth().currentUser.email,
      announcementType: "",
    };
  }

  takePhotoFromCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      cameraPermissions: status === "granted",
    });
    if (this.state.cameraPermissions) {
      await ImagePicker.launchCameraAsync({
        compressImageMaxWidth: 290,
        compressImageMaxHeight: 290,
        cropping: true,
        compressImageQuality: 0.9,
      }).then((image) => {
        this.setState({ image: image.uri });
        this.setState({
          modalVisible: false,
        });
      });
    } else {
      return alert("Permissions Not Granted").then(() => {
        this.setState({
          modalVisible: false,
        });
      });
    }
  };

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    this.setState({
      modalVisible: false,
    });
    if (!cancelled) {
      this.setState({ image: uri });
    //  console.log("Worked" + this.state.image);
      this.setState({
        modalVisible: false,
      });
    }
  };

  fetchImage = (uniqueId) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("AnnouncementImages/" + this.state.userEmail + "/" + uniqueId);
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
        db.collection("announcements").add({
          email: this.state.userEmail,
          title: this.state.title,
          description: this.state.description,
          image: url,
          uniqueId: uniqueId,
          announcementType: this.state.announcementType,
        });
       // console.log("Successful");

        this.setState({
          story: "",
          image: "https://dummyimage.com/600x400/000/d4a408&text=++Image++",
          title: "",
          description: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  createUniqueId = () => {
    return Math.random().toString(36).substring(7);
  };

  addDetails = async () => {
   // console.log("Pressed");

    if (
      this.state.title &&
      this.state.description &&
      this.state.image &&
      this.state.announcementType
    ) {
      var uniqueId = this.createUniqueId();
     // console.log(uniqueId);

      var response = await fetch(this.state.image);
      var blob = await response.blob();
      //console.log(blob);

      var ref = firebase
        .storage()
        .ref()
        .child("AnnouncementImages/" + this.state.userEmail + "/" + uniqueId);
      ref.put(blob).then((response) => {
        // console.log('1');
        this.fetchImage(uniqueId);
        // console.log('2');
      });
      Alert.alert("Announcement successfully created!");
    } else {
      alert(
        "All fields are required! Make sure you have chosen an announcement type."
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <Header
          backgroundColor="white"
          centerComponent={{
            text: "Add Announcement",
            style: { fontWeight: "bold" },
          }}
          leftComponent={{
            text: "< Back",
            onPress: () => {
              this.props.navigation.navigate("Home");
            },
          }}
        />
        <View>
          <Modal
            style={styles.modalView}
            isVisible={this.state.modalVisible}
            backdropOpacity={0.4}
            deviceWidth={Dimensions.get("window").width}
            deviceHeight={Dimensions.get("window").height}
            onBackdropPress={() => this.setState({ modalVisible: false })}
          >
            <View style={styles.modalMainView}>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: -13,
                  right: -10,
                  margin: 10,
                  padding: 10,
                }}
                onPress={() => this.setState({ modalVisible: false })}
              >
                <MaterialIcons
                  name="cancel"
                  size={24}
                  color="#D4A608ff"
                  onPress={() => this.setState({ modalVisible: false })}
                />
              </TouchableOpacity>
              <Text style={{ textAlign: "center", margin: 5, padding: 5 }}>
                Choose An Option
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.takePhotoFromCamera();
                  }}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <Feather
                    name="camera"
                    size={24}
                    color="#D4A608ff"
                    onPress={() => this.setState({ modalVisible: false })}
                  />
                  <Text style={{ textAlign: "center" }}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.selectPicture();
                  }}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <FontAwesome
                    name="photo"
                    size={24}
                    color="#D4A608ff"
                    onPress={() => this.setState({ modalVisible: false })}
                  />
                  <Text style={{ textAlign: "center" }}>Photos</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.fieldsContainer}>
          <ScrollView>
            <Avatar
              rounded
              size="large"
              source={{
                uri: this.state.image,
              }}
              onPress={() => {
                this.setState({ modalVisible: true });
              }}
              containerStyle={{
                alignSelf: "center",
                margin: 20,
              }}
            />

            <View style={{ marginHorizontal: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    padding: 5,
                    margin: 10,
                    backgroundColor:
                      this.state.announcementType === "polls"
                        ? "white"
                        : "#0000ffaa",
                    borderRadius: 5,
                  }}
                  onPress={() => this.setState({ announcementType: "polls" })}
                >
                  <Text
                    style={{
                      color:
                        this.state.announcementType === "polls"
                          ? "#0000ffaa"
                          : "white",
                    }}
                  >
                    Polls
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    padding: 5,
                    margin: 10,
                    backgroundColor:
                      this.state.announcementType === "meetings"
                        ? "white"
                        : "#00ff00aa",
                    borderRadius: 5,
                  }}
                  onPress={() =>
                    this.setState({ announcementType: "meetings" })
                  }
                >
                  <Text
                    style={{
                      color:
                        this.state.announcementType === "meetings"
                          ? "#00ff00aa"
                          : "white",
                    }}
                  >
                    Meetings
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    padding: 5,
                    margin: 10,
                    backgroundColor:
                      this.state.announcementType === "celebrations"
                        ? "white"
                        : "#ff0000aa",
                    borderRadius: 5,
                  }}
                  onPress={() =>
                    this.setState({ announcementType: "celebrations" })
                  }
                >
                  <Text
                    style={{
                      color:
                        this.state.announcementType === "celebrations"
                          ? "#ff0000aa"
                          : "white",
                    }}
                  >
                    Celebrations
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    padding: 5,
                    margin: 10,
                    backgroundColor:
                      this.state.announcementType === "others"
                        ? "white"
                        : "#000000aa",
                    borderRadius: 5,
                  }}
                  onPress={() => this.setState({ announcementType: "others" })}
                >
                  <Text
                    style={{
                      color:
                        this.state.announcementType === "others"
                          ? "#000000aa"
                          : "white",
                    }}
                  >
                    Others
                  </Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.inputFont}
                onChangeText={(title) => this.setState({ title })}
                placeholder={"Title"}
                value={this.state.title}
              />
              <TextInput
                style={[styles.inputFont, { height: 90 }]}
                onChangeText={(description) => this.setState({ description })}
                placeholder={"Description"}
                multiline={true}
                numberOfLines={4}
                value={this.state.description}
              />
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                this.addDetails();
              }}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fieldsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputFont: {
    width: "95%",
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    alignSelf: "center",
    padding: 10,
  },
  modalView: {
    alignSelf: "center",
    borderColor: "#bbbb",
    width: "60%",
    height: "60%",
  },
  modalMainView: {
    backgroundColor: "#ffff",
    borderRadius: 10,
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowColor: "#bbbb",
  },
  submitButton: {
    backgroundColor: "#D4A608",
    width: 100,
    height: 50,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  submitText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});
