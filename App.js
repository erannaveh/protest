import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import CreateGroupScreen from './screens/CreateGroupScreen';
import ImNextToPoliceScreen from './screens/ImNextToPoliceScreen';
import ImInCustodyScreen from './screens/ImInCustodyScreen';
import JoinGroupScreen from './screens/JoinGroupScreen';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import MyGroupsScreen from './screens/MyGroupsScreen';

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
            <Stack.Screen name="JoinGroup" component={JoinGroupScreen} />
            <Stack.Screen name="ImNextToPolice" component={ImNextToPoliceScreen} />
            <Stack.Screen name="ImInCustody" component={ImInCustodyScreen} />
            <Stack.Screen name="MyGroups" component={MyGroupsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});