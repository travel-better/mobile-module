import * as React from "react";
import { Dimensions, SafeAreaView, TouchableOpacity, Switch, StyleSheet } from "react-native";
import * as Location from 'expo-location';

import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { FloatingAction } from 'react-native-floating-action';
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { View, Text } from "../components/Themed";

export default function TravelCenterScreen() {

  // To be added getting a way to get user location before start using the applcations 
  // and set the state of the origin and destination with those coordinates
  // Also add a flashing banner to alert user that the location service is denied(if denied)
  const [errorMsg, setErrorMsg] = React.useState(null);
  let _getUserLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
    }

    let location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }
  }

  const [origin, setOrigin] = React.useState((tempCords))
  const [destination, setDestination] = React.useState(tempCords)
  const [mode, setMode] = React.useState('Driving');
  const [shownActions, setActions] = React.useState(defaultActionsState);
  const [footprintSetting, setFootprintSetting] = React.useState(true);

  // Function to toggle the carbon footprint switch
  const toggleSwitch = () => {
    setFootprintSetting(previousState => !previousState);
  }

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
        {mode === "driving" &&
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeWidth={3}
            strokeColor="hotpink"
            mode="DRIVING"
          />
        }
        {mode === "walking" &&
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeWidth={3}
            strokeColor="red"
            mode="WALKING"
          />
        }
        {mode === "bicycling" &&
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeWidth={3}
            strokeColor="blue"
            mode="BICYCLING"
          />
        }
        {mode === "transit" &&
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeWidth={3}
            strokeColor="green"
            mode="TRANSIT"
          />
        }
      </MapView>
      <FloatingAction
        actions={actions}
        color="#000000"
        dismissKeyboardOnPress={true}
        onOpen={() => setActions({
          coordinates: false,
          footprintSetting: false,
          travelMode: false
        })}
        onPressItem={(name) => {
          switch (name) {
            case 'coordinates':
              setActions({
                coordinates: true,
                footprintSetting: false,
                travelMode: false
              })
              break
            case 'footprintSetting':
              setActions({
                footprintSetting: true,
                coordinates: false,
                travelMode: false
              })
              break
            case 'travelMode':
              setActions({
                coordinates: false,
                footprintSetting: false,
                travelMode: true
              })
              break
            default:
              break;
          }
        }}
      />
      <View style={styles.floatingMode}>
        <Text style={{ color: "white" }}>{mode}</Text>
      </View>
      {shownActions.coordinates &&
        <View style={styles.abStyle}>
          <GooglePlacesAutocomplete
            placeholder="Location"
            minLength={2}
            autoFocus={false}
            fetchDetails={true}
            onPress={(data, details = null) => {
              setOrigin({
                latitude: details?.geometry.location.lat,
                longitude: details?.geometry.location.lng,
              })
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={200}
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
            minLength={2}
            autoFocus={true}
            fetchDetails={true}
            onPress={(data, details = null) => {
              setDestination({
                latitude: details?.geometry.location.lat,
                longitude: details?.geometry.location.lng,
              })
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
              components: "country:us",
            }}
          />
        </View>
      }
      {shownActions.travelMode &&
        <View style={[styles.mode, styles.abStyle]}>
          <TouchableOpacity style={styles.modeButton}
            onPress={() => setMode('driving')}>
            <Text style={styles.modeBtnText}>Driving</Text>
          </TouchableOpacity>
          <View style={styles.buttonSeparator} />
          <TouchableOpacity style={styles.modeButton}
            onPress={() => setMode('walking')}>
            <Text style={styles.modeBtnText}>Walking</Text>
          </TouchableOpacity>
          <View style={styles.buttonSeparator} />
          <TouchableOpacity style={styles.modeButton}
            onPress={() => setMode('bicycling')}>
            <Text style={styles.modeBtnText}>Bicycling</Text>
          </TouchableOpacity>
          <View style={styles.buttonSeparator} />
          <TouchableOpacity style={styles.modeButton}
            onPress={() => setMode('transit')}>
            <Text style={styles.modeBtnText}>Transit</Text>
          </TouchableOpacity>
        </View>
      }
      {
        shownActions.footprintSetting &&
        <View style={styles.togglerStyles}>
          <Text>Carbon Emission Savings</Text>
          <View style={[styles.togglerStyles, styles.TextAlignSwitch]}>
            <Text>Add to my footprints</Text>
            <Switch
              trackColor={{ false: "#f4f3f4", true: "#000000" }}
              thumbColor={footprintSetting ? "#000000" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={footprintSetting}
            />
          </View>
        </View>
      }
    </SafeAreaView >
  );
}

const GOOGLE_API_KEY = "AIzaSyAxlA286xOGIT7pU5LAYek5oq1GpwuSXA4";
const tempCords = {
  latitude: 37.79879,
  longitude: -122.442753,
}
// Set the initial state of showing the locations, travel mode & carbon footprint settings
const defaultActionsState = {
  coordinates: false,
  travelMode: false,
  footprintSetting: false,
}
// Actions for the floating action button
const actions = [
  {
    text: "Set Locations",
    icon: <Entypo name="location" size={24} color="white" />,
    name: "coordinates",
    position: 1,
    color: 'black'
  },
  {
    text: "Travel mode",
    icon: <MaterialIcons name="directions-transit" size={24} color="white" />,
    name: "travelMode",
    position: 1,
    color: 'black'
  },
  {
    text: "Carbon footprint setting",
    icon: <MaterialCommunityIcons name="foot-print" size={24} color="white" />,
    name: "footprintSetting",
    position: 1,
    color: 'black'
  },
]

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
    flexDirection: "row",
    flexWrap: "nowrap",
    backgroundColor: "#fff",
  },
  mode: {
    alignItems: "center",
  },
  modeButton: {
    flex: 1,
    backgroundColor: "#000000",
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").height * 0.04,
    alignItems: "center",
  },
  modeBtnText: {
    fontSize: 17,
  },
  buttonSeparator: {
    height: -1,
    borderLeftWidth: 3,
  },
  floatingMode: {
    position: "relative",
    bottom: Dimensions.get("window").height / 3,
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").height * 0.05,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  togglerStyles: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  TextAlignSwitch: {
    flexDirection: "row",
    height: Dimensions.get("window").height * 0.05,
    backgroundColor: null,
  }
});
