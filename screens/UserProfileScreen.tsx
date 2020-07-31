import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function UserProfileScreen() {
  const [data, setData] = React.useState([]);

  const getUser = () => {
    fetch(`${baseUrl}/users/string`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json"
      })
    })
      .then(res => res.json())
      .then(json =>  setData(json))
      .catch(err => console.error(err))
  }
  getUser()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {/* <Text>{data?.address}</Text> */}
      {/* <EditScreenInfo path="/screens/UserProfileScreen.tsx" /> */}
    </View>
  );
}

const baseUrl = "https://travelbetter.mybluemix.net/travelbetter";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
