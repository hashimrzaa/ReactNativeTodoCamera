import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function App() {
    const [image, setImage] = useState()
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
    const cameraRef = useRef()

    useEffect(() => {
        requestMediaPermission()
    }, [])

    if (!permission) {
        // Camera permissions are still loading
        return <Text>No permission</Text>;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    async function snapPicture() {
        const photo = await cameraRef.current.takePictureAsync()
        setImage(photo)

        if (mediaPermission.granted) {
            await MediaLibrary.saveToLibraryAsync(photo.uri)
            alert('saved to gallery!')
        }
    }

    return (
        <View style={styles.container}>
            {image ?
                <View>
                    <Image source={{ uri: image.uri }}
                        style={{ width: '100%', height: '80%' }} />

                    <Button title="Take Picture" onPress={() => setImage(null)} />
                </View> :
                <Camera style={styles.camera} type={type} ref={cameraRef}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                            <Text style={styles.text}>Flip Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={snapPicture}>
                            <Image
                                style={styles.icon}
                                source={{ uri: 'https://static-00.iconduck.com/assets.00/snap-icon-2048x2048-hs6u6g2k.png' }} />
                        </TouchableOpacity>
                    </View>
                </Camera>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    icon: {
        width: 100,
        height: 100
    }
});
