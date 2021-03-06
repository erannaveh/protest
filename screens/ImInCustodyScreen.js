import React, {Component} from 'react';
import {  StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants';

   
  
export default class ImInCustodyScreen extends Component{
    state = {
        mapRegion: null,
        hasLocationPermissions: false,
        locationResult: null,
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        second: new Date().getSeconds()
      };

    componentDidMount() {
        this.getLocationAsync();
    }
    
    handleMapRegionChange (mapRegion){
        console.log(mapRegion);
        this.setState({ mapRegion });
    }
    
    async getLocationAsync (){
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
            locationResult: 'Permission to access location was denied',
        });
        } else {
            this.setState({ hasLocationPermissions: true });
        }
    
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ locationResult: JSON.stringify(location) });
       
        // Center the map on the location we just fetched.
        this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
    }



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>
                    Pan, zoom, and tap on the map!
                </Text>
            
            {
                this.state.locationResult === null ?
                <Text>Finding your current location...</Text> :
                this.state.hasLocationPermissions === false ?
                    <Text>Location permissions are not granted.</Text> :
                    this.state.mapRegion === null ?
                <Text>Map region doesn't exist.</Text> :
                <Text>
                    Location: {this.state.locationResult} ~{"\n"}
                    Time: {this.state.hour}:{this.state.minute}:{this.state.second}
                </Text>
                /*<MapView
                    style={{ alignSelf: 'stretch', height: 400 }}
                    region={this.state.mapRegion}
                    onRegionChange={this.handleMapRegionChange}
                />*/
            }
            
                
            </View>
            
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        paddingTop: Constants.statusBarHeight,
      },
      paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
      },
    });