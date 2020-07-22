import * as React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Text as TextInput, Dimensions, SafeAreaView } from "react-native";
import { View } from "../components/Themed";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Colors from "../constants/Colors";
import axios from 'axios';
// import { TextInput } from "react-native-gesture-handler";

export default function TravelCenterScreen() {
  const [value, onChangeText] = React.useState("Useless Placeholder");
  const [origin, setOrigin] = React.useState({
    latitude: 37.79879, longitude: -122.442753
  })
  const [destination, setDestination] = React.useState({
    latitude: 37.790651, longitude: -122.422497
  })
  
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
      <View style={styles.abStyle}>
          <GooglePlacesAutocomplete
            placeholder="Location"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              // console.log(data, details);
              
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
            placeholder="Destination"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              axios.get(`${geocodeurl}?place_id=${data?.place_id}&key=${GOOGLE_API_KEY}`)
                .then(res => 
                  setDestination({
                  latitude: res.data?.results[0]?.geometry.location.lng,
                  longitude: res.data?.results[0]?.geometry.location.lat,
                })
                )
                .catch(err => console.log(err))
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
              components: "country:us",
            }}
          />
        </View>
    </SafeAreaView>
  );
}

const GOOGLE_API_KEY = "AIzaSyAxlA286xOGIT7pU5LAYek5oq1GpwuSXA4";
const geocodeurl = "https://maps.googleapis.com/maps/api/geocode/json"

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
    // alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.25,
    backgroundColor: "white",
    justifyContent: "flex-end",
  },  
});
