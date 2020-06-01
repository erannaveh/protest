import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class JoinGroupScreen extends React.Component{
    state = {
        groupCode: ''
    }

    handleUsers = (text) => {
        this.setState({groupCode: text})
    }

    search = (groupCode) => {
        alert('Group Code: ' + groupCode)
    }
    render(){
        return (
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.handleUsers(text)}
                    placeHolder='Enter Usernames'
                />
                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => this.search(this.state.groupCode)
                    }>
                    <Text style = {styles.submitButtonText}> Join </Text>
                </TouchableOpacity>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
       paddingTop: 23
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