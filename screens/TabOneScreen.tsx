import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'
 
import { 
  Ionicons
} from '@expo/vector-icons';



export default function TabOneScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modal,setModal] = useState(false);
  const [alat, setAlat] = useState('');
  const [statusAlata, setStatusAlata] = useState('OuK');

    


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setModal(true);
    setAlat(type);
   // alert(`Želiš posuditi ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
     
      <Text>Skenirajte QR-Code</Text>
      <View
      style={{
        flex: 0.8,
      
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Tap to Scan xAgain'} onPress={() => setScanned(false)} />}
    </View>
    
    <SCLAlert
          show={modal}
          onRequestClose={modal}
          theme={statusAlata=="OK"?"success":"danger"}
          title="Info"
          subtitle={alat}
          headerIconComponent={<Ionicons name="ios-thumbs-up" size={32} color="white" />}
        >
          <SCLAlertButton theme="info" onPress={() =>setModal(false)}>Done</SCLAlertButton>
          <SCLAlertButton theme="default" onPress={() =>setModal(false)}>Cancel</SCLAlertButton>
        </SCLAlert>

    </View>
  );
}