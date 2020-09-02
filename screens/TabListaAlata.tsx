import * as React from "react";
import { StyleSheet, FlatList, TouchableOpacity,TextInput } from "react-native";

import { Text, View } from "../components/Themed";

import * as SecureStore from "expo-secure-store";

import { useEffect, useState } from "react";
import { fetchajSveAlate } from "../utils/Endpoints";

export default function TabListaAlata({navigation}) {
  const [alati, setAlati] = useState([]);

  useEffect(() => {
    (async () => {
      let data = await fetchajSveAlate("");

      setAlati(data.data);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.h2text}>Lista postojećih alata</Text>
      <TextInput
      
      style={{ height: 40,width:333, borderColor: '#fb5b5a',color:"white", borderWidth: 1 }}
      onChangeText={text => {
        console.log(text);
       // const startsWithN = alati.filter((alat:string) => alat.startsWith(text));
      }}
     
    />
      <FlatList
        data={alati}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
          onPress={()=> navigation.navigate("TabListaPosudbi",{ID_ALATA:item.ID_ALATA})}
          style={styles.flatview}>
            <Text style={styles.name}>{}</Text>
            <Text style={styles.name}>{item.opis}</Text>
            <Text
              style={
                item.status == "CLOSED"
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "red" }
              }
            >
              {item.status == "CLOSED" ? "Dostupno" : "Posuđeno"}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.ID_ALATA}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003f5c"
  },
  h2text: {
    marginTop: 10,
    fontFamily: "sans-serif-thin",
    fontSize: 36,
    color: "white"
  },
  flatview: {
    justifyContent: "center",
    paddingTop: 30,
    borderRadius: 2
  },
  name: {
    fontFamily: "sans-serif-thin",
    fontSize: 18,
    color: "white"
  },
  email: {
    color: "red"
  }
});
