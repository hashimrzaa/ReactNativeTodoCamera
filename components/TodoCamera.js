import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useState, useRef, useEffect } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TodoCamera() {
  const [image, setImage] = useState([]);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const cameraRef = useRef();
  console.log(permission?.granted);
  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function snapPicture() {
    const photo = await cameraRef.current.takePictureAsync();
    console.log(image);
    const images = image;
    images.push(photo);
    setImage([...image]);
  }
  image;

  return (
    <View style={styles.main}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={snapPicture}>
            <View style={styles.toggle}></View>
          </TouchableOpacity>
        </View>
      </Camera>

      <View>
        {image.map((item, index) => {
          return (
            <View key={index} style={styles.list}>
              <Image source={{ uri: item.uri }} style={styles.image} />
              <Button title="Take Picture" />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    // overflow:'scroll'
  },
  camera: {
    // flex: 1,
    height: 400,
    width: "100%",
    // objectFit: "cover",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 10,
    gap: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  toggle: {
    width: 100,
    height: 100,
    backgroundColor: "black",
    // border: "10 solid black",
    borderRadius: 10000,
  },
  image: {
    width: "100%",
    height: 200,
  },
  list: {
    overflow: "scroll",
  },
});
