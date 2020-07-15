import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TravelCenterScreen from "../screens/TravelCenterScreen";
import UserHistoryScreen from "../screens/UserHistoryScreen";
import RewardsCenterScreen from "../screens/RewardsCenterScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import {
  BottomTabParamList,
  TravelCenterParamList,
  UserHistoryParamList,
  RewardsCenterParamList,
  UserProfileParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="travelCenter"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Routes"
        component={TravelCenter}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="History"
        component={UserHistoryNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-list" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Rewards"
        component={RewardsCenterNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-star" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={UserProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-settings" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TravelCenterStack = createStackNavigator<TravelCenterParamList>();

function TravelCenter() {
  return (
    <TravelCenterStack.Navigator>
      <TravelCenterStack.Screen
        name="TravelCenterScreen"
        component={TravelCenterScreen}
        options={{ headerTitle: "Select Route" }}
      />
    </TravelCenterStack.Navigator>
  );
}

const UserHistoryStack = createStackNavigator<UserHistoryParamList>();

function UserHistoryNavigator() {
  return (
    <UserHistoryStack.Navigator>
      <UserHistoryStack.Screen
        name="UserHistoryScreen"
        component={UserHistoryScreen}
        options={{ headerTitle: "My Carbon Footprints" }}
      />
    </UserHistoryStack.Navigator>
  );
}

const RewardsCenterStack = createStackNavigator<RewardsCenterParamList>();

function RewardsCenterNavigator() {
  return (
    <RewardsCenterStack.Navigator>
      <RewardsCenterStack.Screen
        name="RewardsCenterScreen"
        component={RewardsCenterScreen}
        options={{ headerTitle: "My Rewards" }}
      />
    </RewardsCenterStack.Navigator>
  );
}

const UserProfileStack = createStackNavigator<UserProfileParamList>();

function UserProfileNavigator() {
  return (
    <UserProfileStack.Navigator>
      <UserProfileStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ headerTitle: "My Profile" }}
      />
    </UserProfileStack.Navigator>
  );
}
