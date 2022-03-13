import React, { Component } from "react";
import { StyleSheet } from "react-native";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "../Screens/Home";
import AddAnnouncements from "../Screens/AddAnnouncements";
import Complaints from "../Screens/Complaints";
import Polls from "../Screens/Polls";
import Contacts from "../Screens/Contacts";
import Settings from "../Screens/Settings";
import AddContacts from "../Screens/AddContacts";
import CreatePolls from "../Screens/CreatePolls";
import ContactUs from "../Screens/ContactUs";
import UpdateProfile from "../Screens/UpdateProfile";

const Tab = createMaterialBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
      labeled={false}
      barStyle={styles.bottomTabStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Complaints") {
            iconName = focused ? "alert-circle" : "alert-circle-outline";
          } else if (route.name === "Polls") {
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          } else if (route.name === "Contacts") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={RFValue(25)}
              color={color}
              style={styles.icons}
            />
          );
        },
      })}
      activeColor={"#D4A608"}
      inactiveColor={"gray"}
    >
      <Tab.Screen name="Home" component={AnnouncementsStackNavigator} />
      <Tab.Screen name="Complaints" component={Complaints} />
      <Tab.Screen name="Polls" component={PollsStackNavigator} />
      <Tab.Screen name="Contacts" component={ContactsStackNavigator} />
      <Tab.Screen name="Settings" component={SettingsStackNavigator} />
    </Tab.Navigator>
  );
}

export default TabNavigator;

const AnnouncementsStack = createStackNavigator();
const AnnouncementsStackNavigator = () => {
  return (
    <AnnouncementsStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <AnnouncementsStack.Screen name="Home" component={Home} />
      <AnnouncementsStack.Screen
        name="AddAnnouncements"
        component={AddAnnouncements}
      />
    </AnnouncementsStack.Navigator>
  );
};

const ContactsStack = createStackNavigator();
const ContactsStackNavigator = () => {
  return (
    <ContactsStack.Navigator
      initialRouteName="Contacts"
      screenOptions={{ headerShown: false }}
    >
      <ContactsStack.Screen name="Contacts" component={Contacts} />
      <ContactsStack.Screen name="AddContacts" component={AddContacts} />
    </ContactsStack.Navigator>
  );
};

const PollsStack = createStackNavigator();
const PollsStackNavigator = () => {
  return (
    <PollsStack.Navigator
      initialRouteName="Polls"
      screenOptions={{ headerShown: false }}
    >
      <PollsStack.Screen name="Polls" component={Polls} />
      <PollsStack.Screen name="CreatePolls" component={CreatePolls} />
    </PollsStack.Navigator>
  );
};

const SettingsStack = createStackNavigator();
const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator
      initialRouteName="Settings"
      screenOptions={{ headerShown: false }}
    >
      <SettingsStack.Screen name="Settings" component={Settings} />
      <SettingsStack.Screen name="ContactUs" component={ContactUs} />
      <SettingsStack.Screen name="UpdateProfile" component={UpdateProfile} />
    </SettingsStack.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2C3332",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute",
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30),
  },
});
