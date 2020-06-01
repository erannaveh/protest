import * as React from 'react';
import { Share, Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';

const onShare = async (groupName, generatedGroupCode) => {
    try {
      const result = await Share.share({
        message:
          'Group Name: ' + groupName + '\nGroup Code: ' + generatedGroupCode,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
}

export default class CreateGroupScreen extends React.Component{
    state = {
        generatedGroupCode: '',
        groupName: ''
    }

    handleGroupName = (name) => {
        this.setState({groupName: name})
    }

    click = () => {
        let code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        this.setState({generatedGroupCode: code });
        onShare(this.state.groupName, code);
    }

    render(){
        return (
            <View>
                 <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.handleGroupName(text)}
                    placeHolder='Enter Usernames'
                />
                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => this.click()
                    }>
                    <Text style = {styles.submitButtonText}> Generate Group </Text>
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