import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SCLAlert, SCLAlertButton } from "react-native-scl-alert";

import { Ionicons } from "@expo/vector-icons";

import { StoreContext } from "../mobx/Store";
import "mobx-react-lite/batchingForReactDom";
import { useLocalStore, useObserver, Observer } from "mobx-react";
import { checkStatusAlata,kreirajIliModificirajPosudbuAlata } from "../utils/Endpoints";




export default function TabQRScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modal, setModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [infoModalStatus, setInfoModalStatus] = useState("");
  const [alat, setAlat] = useState("");
  const [idAlata, setIdAlata] = useState("");
  const [statusAlata, setStatusAlata] = useState("OuK");
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [error, setError] = useState(null);

  const store = React.useContext(StoreContext);
  //  const store = React.useContext(StoreContext);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    
    
    setActivityIndicator(true);
   
    await setIdAlata("alat2")
    var statusAlata = await provjeriStatusAlataSaAPIja(idAlata);
    
    if (statusAlata == null) {
      setError("Greška kod odabira alata");
      setModal(false);
      setActivityIndicator(false);
    } else {
      setModal(true);
      setAlat(data);
      setStatusAlata(statusAlata);
      setActivityIndicator(false);
    }
    
   
    
    setScanned(true);

        // alert(`Želiš posuditi ${type} and data ${data} has been scanned!`);

    console.log(`${type} and data ${data} `);
  };

  const provjeriStatusAlataSaAPIja = async id_alata => {
    try {
      let status = await checkStatusAlata("&id=" + id_alata);
      console.log(status);
      if (status.status == null) return null;
      if (status.status == 200)
        return status.data.status == "CLOSED" ? "CLOSED" : "OPEN";
      if (status.status == 500) return null;
    } catch (error) {
      return null;
    }
  };

  const vratiIliPosudiAlat =async (id,ime)=>{
    let status=await kreirajIliModificirajPosudbuAlata("&id="+id+"&korisnik="+ime);
    console.log(status);
    setModal(false)
    setInfoModal(true)
   // alert(JSON.stringify(status))
   setInfoModalStatus(JSON.stringify(status))
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoWindow}>
        <Observer>
          {() => (
            <Text style={styles.thinText}>
              {" "}
              Dobrodošli {store.imekorisnika}
            </Text>
          )}
        </Observer>

        <Text style={styles.boldText}> Skenirajte QR-Code </Text>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      <View
        style={{
          flex: 0.7
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <TouchableOpacity
            onPress={() => {
              setScanned(false);
              setError(null);
            }}
          >
            <View style={styles.skenirajPonovno}>
              <Text style={{ fontSize: 20, color: "#fff" }}>
                Klikni za ponovno skeniranje
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <SCLAlert
        show={modal}
        onRequestClose={() => setModal(false)}
        theme={statusAlata == "CLOSED" ? "success" : "danger"}
        title=""
        subtitle={alat}
        headerIconComponent={
          <Ionicons name="ios-thumbs-up" size={32} color="white" />
        }
      >
        <ActivityIndicator
          size="large"
          color="#00ff00"
          animating={activityIndicator}
        />

        {statusAlata == "CLOSED" ? (
          <Text> Alat {idAlata} je na raspolaganju i možete ga posuditi</Text>
        ) : (
          <Text> Alat {idAlata} je već posuđen i možete ga vratiti</Text>
        )}

        {statusAlata == "CLOSED" ? (
          <SCLAlertButton theme="info" onPress={() => {setActivityIndicator(true); vratiIliPosudiAlat(idAlata,store.imekorisnika)}}>
            Posudi Alat
          </SCLAlertButton>
        ) : (
          <SCLAlertButton theme="info" onPress={() => {setActivityIndicator(true); vratiIliPosudiAlat(idAlata,store.imekorisnika)}}>
            Vrati Alat
          </SCLAlertButton>
        )}
        <SCLAlertButton theme="default" onPress={() => setModal(false)}>
          Cancel
        </SCLAlertButton>
      </SCLAlert>

      <SCLAlert
        show={infoModal}
        onRequestClose={() => setInfoModal(false)}
        theme={ "info"}
        title=""
        subtitle={"Status posudbe"}
        headerIconComponent={
          <Ionicons name="ios-thumbs-up" size={32} color="white" />
        }
      >
      <Text>
      {infoModalStatus}
        </Text> 
        <SCLAlertButton theme="info" onPress={() => setInfoModal(false)}>
          Ok
        </SCLAlertButton>
      </SCLAlert>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#003f5c",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  infoWindow: {
    alignItems: "center"
  },
  thinText: {
    fontSize: 30,
    color: "#fb5b5a",
    marginBottom: 40,
    fontFamily: "sans-serif-thin"
  },
  boldText: {
    fontSize: 12,
    color: "#fb5b5a",
    marginBottom: 40
  },
  error: {
    fontSize: 22,
    color: "#fb5b5a",
    marginBottom: 40
  },
  skenirajPonovno: {
    alignItems: "center",
    backgroundColor: "#fb5b5a",
    padding: 44
  },
  skenirajPonovnoText: {
    fontSize: 52,
    color: "white"
  }
});
