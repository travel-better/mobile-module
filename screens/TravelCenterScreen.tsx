import * as React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Text as TextInput, Dimensions, SafeAreaView } from "react-native";
import { View } from "../components/Themed";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { TextInput } from "react-native-gesture-handler";

export default function TravelCenterScreen() {
  const [value, onChangeText] = React.useState("Useless Placeholder");
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider="google"
        initialRegion={{
          latitude: 37.79879,
          longitude: -122.442753,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <View style={styles.abStyle}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
              components: "country:us",
            }}
            currentLocation={true}
            currentLocationLabel="Current location"
          />
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
            }}
          />
        </View>
        <MapView.Marker coordinate={origin} />
        <MapView.Marker coordinate={destination} />
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_API_KEY}
          strokeWidth={3}
          strokeColor="hotpink"
          mode="DRIVING"
        />
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_API_KEY}
          strokeWidth={3}
          strokeColor="red"
          mode="WALKING"
        />
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_API_KEY}
          strokeWidth={3}
          strokeColor="blue"
          mode="BICYCLING"
        />

        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_API_KEY}
          strokeWidth={3}
          strokeColor="green"
          mode="TRANSIT"
        />
      </MapView>
    </SafeAreaView>
  );
}

const GOOGLE_API_KEY = "AIzaSyAxlA286xOGIT7pU5LAYek5oq1GpwuSXA4";
const origin = { latitude: 37.79879, longitude: -122.442753 };
const destination = { latitude: 37.790651, longitude: -122.422497 };

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
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.8,
  },
  abStyle: {
    paddingTop: 5,
    alignSelf: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.2,
    backgroundColor: "white",
    justifyContent: "flex-end",
  },
});
