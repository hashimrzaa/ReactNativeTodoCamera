import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";

const ViewStyleProps = () => {
  const [type, setType] = useState(CameraType.back);
  const [Todo, setTodo] = useState([]);
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  const cameraRef = useRef();
  async function snapPicture() {
    const photo = await cameraRef.current.takePictureAsync();
    setTodo([...Todo, { id: Todo.length + 1, uri: photo.uri }]);
  }
  console.log(Todo);

  function deleteByID(id) {
    const index = Todo.findIndex((item) => item.id === id);
    if (index !== -1) {
      Todo.splice(index, 1);
      setTodo([...Todo]);
    }
  }

  return (
    <>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.textflip}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={snapPicture}>
            <Image
              style={styles.icon}
              source={{
                uri: "https://static-00.iconduck.com/assets.00/snap-icon-2048x2048-hs6u6g2k.png",
              }}
            />
          </TouchableOpacity>
        </View>
      </Camera>
      <Text style={styles.text}>Todo Images</Text>
      <ScrollView>
        <View style={styles.container}>
          {Todo.map((item) => {
            return (
              <View key={item.id}>
                <Image
                  source={{
                    uri: item?.uri,
                  }}
                  style={styles.top}
                />
                <TouchableOpacity
                  style={styles.buttond}
                  onPress={() => {
                    deleteByID(item?.id);
                  }}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
    gap: 20,
  },
  camera: {
    height: 350,
    borderWidth: 1,
  },
  top: {
    height: 200,
    borderWidth: 5,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    padding: 10,
    margin: 10,
    fontSize: 30,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
  },
  textflip: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  buttond: {
    padding: 10,
    textAlign: "center",
    width: "100%",
  },
});

export default ViewStyleProps;
