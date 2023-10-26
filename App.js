import { StyleSheet, Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useState, useEffect } from "react";

const App = () => {
  const [permission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [output, setOutput] = useState("Didn't scanned!");

  const requestPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermission(status === "granted");
    })();
  };

  useEffect(() => {
    requestPermission();
  }, []);

  function handleScanner({ data }) {
    setScanned(true);
    setOutput(data);
  }

  if (permission === null) {
    return (
      <View style={styles.box}>
        <Text>Access not granted</Text>
      </View>
    );
  }

  if (permission === false) {
    return (
      <View style={styles.box}>
        <Text style={styles.mainText}>Access declined!</Text>
        <Button
          title="Grant Access"
          onPress={() => requestPermission()}
        ></Button>
      </View>
    );
  }

  return (
    <View style={styles.box}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleScanner}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.mainText}>{output}</Text>

      {scanned && (
        <Button title={"Scan again?"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "skyblue",
  },
  barcodebox: {
    height: 400,
    width: 400,
    borderRadius: 30,
  },
  mainText: {
    fontSize: 20,
    marginVertical: 20,
  },
});
