import * as React from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CurrentPosition = () => {
    const [error, setError] = useState("");
    const [position, setPosition] = useState({
      latitude: 0,
      longitude: 0
    });
}

const getPosition = () => {
    alert('Hello')
    /* Geolocation.getCurrentPosition(
      pos => {
        setError("");
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      e => setError(e.message)
    ); */
  };

export default class ImInCustodyScreen extends React.Component{
    state = {
        location: null
    };

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={getPosition}>
                    <Text style={styles.welcome}>Find My Coords?</Text>
                    <Text>Location: {this.state.location}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
		justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#F5FCFF',
        paddingTop: 23
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1
    },
    submitButton: { 
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
       height: 40,
    },
    submitButtonText:{
       color: 'white'
    }
})