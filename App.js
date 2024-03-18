import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Camera from './src/components/Camera'

export default function App() {

  return (
    <View style={styles.container}>

      <Camera />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'space-around'
  },
  text: {
    color: 'red'
  },
  input: {
    width: 150,
    height: 70,
    borderWidth: 4
  }
})
