import * as React from "react";
import { Dimensions, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Switch, StyleSheet } from "react-native";
import * as Location from 'expo-location';

import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { FloatingAction } from 'react-native-floating-action';
import { Entypo, MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

import { View, Text } from "../components/Themed";
import { Calculator } from './utils/CarbonCalculator';

export default function TravelCenterScreen() {

  const [origin, setOrigin] = React.useState((tempCords))
  const [destination, setDestination] = React.useState(tempCords)
  const [mode, setMode] = React.useState(null);
  const [shownActions, setActions] = React.useState(defaultActionsState);
  const [footprintSetting, setFootprintSetting] = React.useState(true);
  const [carbonMessage, setCarbonMessage] = React.useState('On average, a personal vehicle emits about 0.96 lbs of Carbon per mile');
  let mapRef = React.useRef(null);

  // To be set: Initial map region to be users current location if location services are allowed.
  // Add a flashing banner to alert user that the location service is denied if denied
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [userLocation, setUserLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  let _getUserLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    })
  }  

  // Testing done with the initial region in MapView
  // latitude: (userLocation.latitude || userLocation.latitude !== 0) ? userLocation.latitude : 40.7128,
  // longitude: (userLocation.longitude || userLocation.longitude !== 0) ? userLocation.longitude : -74.0060,


  // Function to toggle the carbon footprint switch
  const toggleSwitch = () => {
    setFootprintSetting(previousState => !previousState);
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider="google"
        ref={ref => mapRef = ref}
        initialRegion={{
          latitude: 40.7128,
          longitude: -74.0060,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Marker
          draggable
          title="Origin"
          description="Where are you travelling from?"
          coordinate={origin}
          onDragEnd={(e) => setOrigin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          })}
        />
        <MapView.Marker
          draggable
          title="Destination"
          description="Where are you travelling to?"
          coordinate={destination}
          onDragEnd={(e) => setDestination({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          })}
        />
        {mode === "driving" &&
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeWidth={3}
            strokeColor="hotpink"
            mode="DRIVING"
            onReady={result => {
              if (result.distance !== 0 && result.duration !== 0) {
                mapRef.fitToCoordinates(result.coordinates, {
                  edgePadding: edgePaddingDefault,
                  animated: true,
                });
                let carbonEmmission = Calculator(result.distance, mode);
                setCarbonMessage(`You could reduce your carbon footprint by ${carbonEmmission} lbs if you take transit`);
              } else {
                setErrorMsg('Set the destination and location')
              }
            }}
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
            onReady={result => {
              if (result.distance !== 0 && result.duration !== 0) {
                mapRef.fitToCoordinates(result.coordinates, {
                  edgePadding: edgePaddingDefault,
                  animated: true,
                });
                let carbonEmmission = Calculator(result.distance, mode);
                setCarbonMessage(`Your carbon footprint would be reduced by ${carbonEmmission} lbs`)
              } else {
                setErrorMsg('Set the destination and location')
              }
            }}
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
            onReady={result => {              
              if (result.distance !== 0 && result.duration !== 0) {
                mapRef.fitToCoordinates(result.coordinates, {
                  edgePadding: edgePaddingDefault,
                  animated: true,
                });
                let carbonEmmission = Calculator(result.distance, mode);
                setCarbonMessage(`Your carbon footprint would be reduced by ${carbonEmmission} lbs`)
              } else {
                setErrorMsg('Set the destination and location')
              }
            }}
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
            onReady={result => {
              if (result.distance !== 0 && result.duration !== 0) {
                mapRef.fitToCoordinates(result.coordinates, {
                  edgePadding: edgePaddingDefault,
                  animated: true,
                });
                let carbonEmmission = Calculator(result.distance, mode);
                setCarbonMessage(`Your carbon footprint would be reduced by ${carbonEmmission} lbs`)
              } else {
                setErrorMsg('Set the destination and location')
              }
            }}
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
      {mode && <View style={styles.floatingMode}>
        <Text style={{ color: "white" }}>{mode}</Text>
      </View>}
      {(shownActions.coordinates === true || shownActions.footprintSetting === true || shownActions.travelMode === true) &&
        <TouchableWithoutFeedback
          onPress={() => setActions({
            coordinates: false,
            footprintSetting: false,
            travelMode: false
          })}>
          <View style={styles.removeButton}>
            <FontAwesome name="remove" size={18} color="white" />
          </View>
        </TouchableWithoutFeedback>
      }
      {shownActions.coordinates &&
        <View style={styles.abStyle}>
          <GooglePlacesAutocomplete
            placeholder="Origin"
            minLength={2}
            autoFocus={true}
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
          <Text style={[styles.carbonStyles, {fontWeight: "bold", textDecorationLine: "underline"}]}>Carbon Emission Savings</Text>
          <Text style={styles.carbonStyles}>{carbonMessage}</Text>
          <View style={[styles.togglerStyles, styles.TextAlignSwitch]}>
            <Text style={styles.carbonStyles}>Add to my footprints</Text>
            <Switch
              trackColor={{ false: "#ccc", true: "#2196F3" }}
              thumbColor={footprintSetting ? "#f4f3f4" : "#f4f3f4"}
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
  latitude: 40.7128,
  longitude: -74.0060,
}
// Set the initial state of showing the locations, travel mode & carbon footprint settings
const defaultActionsState = {
  coordinates: false,
  travelMode: false,
  footprintSetting: false,
}
// Default padding values for the edgePadding used in fitToCoordinates
const edgePaddingDefault = {
  right: 30,
  bottom: 30,
  left: 30,
  top: 30,
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

// Dimensions
const window = {
  height: Dimensions.get("window").height,
  width: Dimensions.get("window").width,
};

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
    width: window.width,
    height: window.height * 0.8,
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
    width: window.width / 3,
    height: window.height * 0.04,
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
    bottom: window.height / 3,
    width: window.width / 3,
    height: window.height * 0.05,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  togglerStyles: {
    justifyContent: "center",
    alignItems: "center",
    width: window.width,
    height: window.height * 0.3,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  TextAlignSwitch: {
    flexDirection: "row",
    height: window.height * 0.05,
    backgroundColor: null,
  },
  removeButton: {
    position: 'absolute',
    color: "#000000",
    borderWidth: 1,
    backgroundColor: "#000000",
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width * 0.09,
    height: window.height * 0.05,
    top: 10,
    right: 10,
    borderRadius: 100,
  },
  carbonStyles: {
    fontSize: 17,
    textAlign: "center",
  },
});
