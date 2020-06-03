import React, { Component, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, Platform } from "react-native";
import { MapView } from "expo";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

class ImNextToPoliceScreen extends Component {
    state = {
        hasPermission: null,
        cameraType: Camera.Constants.Type.back,
        beginRecording: false,
    };

    async componentDidMount() {
        this.getPermissionsAysnc();
    }

    getPermissionsAysnc = async () => {
        if (Platform.OS === "ios") {
            const { status } = await Permissions.askAsync(
                Permissions.CAMERA_ROLL
            );
            if (status !== "granted") {
                alert("Need camera roll permissions to open!");
            }
        }
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === "granted" });
    };

    takeVideo = async () => {
        if (this.camera) {
            let video = await this.camera.recordAsync();
        }
    };

    render() {
        const { hasPermission } = this.state;

        if (hasPermission === null || this.state.beginRecording === false) {
            return (
                <View style={styles.container}>
                    <Text style={styles.paragraph}>
                        Your location is being sent to your groups and emergency
                        contacts
                    </Text>

                    <Image
                        style={styles.policeImg}
                        source={require("../assets/images/police.jpg")}
                    />

                    <Button
                        onPress={() => this.setState({ beginRecording: true })}
                        title="Begin Recording?"
                    ></Button>
                </View>
            );
        } else if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        style={{ flex: 1 }}
                        type={this.state.cameraType}
                        ref={(ref) => {
                            this.camera = ref;
                        }}
                    >
                        <View style={styles.cameraContainer}>
                            <TouchableOpacity style={styles.cameraButton}>
                                <Ionicons
                                    name="ios-photos"
                                    style={styles.cameraIcon}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cameraButton}>
                                <Ionicons
                                    name="ios-photos"
                                    style={styles.photosButton}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cameraButton}>
                                <Ionicons
                                    name="ios-photos"
                                    style={styles.cameraIcon}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cameraButton}>
                                <Ionicons
                                    name="ios-photos"
                                    style={styles.cameraIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
        paddingTop: Constants.statusBarHeight,
    },
    paragraph: {
        margin: 0,
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#34495e",
    },
    policeImg: {
        alignContent: "center",
        width: "50%",
        height: "40%",
        marginTop: 30,
    },
    cameraContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 30,
    },
    cameraButton: {
        alignSelf: "flex-end",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    cameraIcon: {
        color: "#fff",
        fontSize: 40,
    },
});

export default ImNextToPoliceScreen;
