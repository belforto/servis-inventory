import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import * as SecureStore from "expo-secure-store";

import { callAuthenticationBackend } from "../utils/Endpoints";

import { StoreContext } from "../mobx/Store";

const SECURE_STORE_KEY = "korisnickiPodaciYv";

export default function Login({ navigation }) {
  const store = React.useContext(StoreContext);
  const [korisnik, setKorisnik] = useState("KORnull");
  const [password, setPassword] = useState("PASSnull");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    postojiLiKorisnik();
    return () => {
      console.log("unmounting...");
    };
  }, []);

  const loginFunkcija = async () => {

    setLoading(true)
    var credentials = { korisnik, password };
    try {
      var loginData = await callAuthenticationBackend(
        "&username=" + korisnik + "&password=" + password
      );
      console.log("sta je server vratio ", loginData);
      if (loginData.status == "200") {
        //SPREMI U LOKALNI STORAGE
        await SecureStore.setItemAsync(
          SECURE_STORE_KEY,
          JSON.stringify(loginData)
        );

        //sPREMI U MOBX
        await store.addKorisnik((loginData));
        await store.addImekorisnika(loginData.ime)
        setLoading(false)
        navigation.navigate("Root");
      }
    } catch (e) {
      console.log(e);
      setLoading(false)
    }
  };

  const postojiLiKorisnik = async () => {
    var existingCredentials = await SecureStore.getItemAsync(SECURE_STORE_KEY);
    if (existingCredentials === null) {
      throw new Error("Korisnik ne postoji lokalno");
    } else {
     
      //UBACI PODATKE IZ LOKALNOG STORAGE U MOBX
      await store.addKorisnik(JSON.stringify(existingCredentials));
      await store.addImekorisnika(JSON.parse(existingCredentials).ime)
      navigation.navigate("Root");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>DUING</Text>
      <Text style={styles.underlogoText}>aplikacija </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Korisničko ime"
          placeholderTextColor="#fb5b5a"
          onChangeText={text => setKorisnik(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Lozinka"
          placeholderTextColor="#fb5b5a"
          onChangeText={text => setPassword(text)}
        />
      </View>

      {loading
       ? (
        <ActivityIndicator size="large" color="#00ff00" animating={true} />
      ) : (
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={async () => {
            console.log("press log in");
            loginFunkcija();
          }}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    fontWeight: "bold",
    fontSize: 80,
    color: "#fb5b5a",
    marginBottom: 40
  },
  underlogoText: {
    fontSize: 30,
    color: "#fb5b5a",
    marginBottom: 40,
    fontFamily: "sans-serif-thin"
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
    // visibility: false?"visible":"hidden"
  },
  loginText: {
    color: "white"
  }
});
