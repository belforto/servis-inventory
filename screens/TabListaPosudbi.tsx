import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from "react";
import { fetchajPosudbePoAlatu } from "../utils/Endpoints";
import moment from "moment"

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import * as SecureStore  from 'expo-secure-store';


import Timeline from "react-native-timeline-feed";
          
var data=[
  {
    time: '09:00',
    title: 'Archery Training',
    description:
      'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
    lineColor: '#009688',
  },
  {
    time: '10:45',
    title: 'Play Badminton',
    description:
      'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
  },
  { time: '12:00', title: 'Lunch' },
  {
    time: '14:00',
    title: 'Watch Soccer',
    description:
      'Team sport played between two teams of eleven players with a spherical ball. ',
    lineColor: '#009688',
  },
  {
    time: '16:30',
    title: 'Go to Fitness center',
    description: 'Posudio Taj i taj 12.2.1991 Vratio taj i taj 12.4.1992',
    circleColor:"red"
  },
];

export default  function TabListaPosudbi({route}) {
  
  //const [idAlata, setIdAlata] = useState("");
  //setIdAlata(route.params.ID_ALATA)
 //console.log(idAlata)
  const [posudbe, setPosudbe] = useState([]);

  useEffect(() => {
    (async () => {
      let data = await fetchajPosudbePoAlatu("&id="+route.params.ID_ALATA);

    const usersByLikes= data.data.map(x => {
        const container = {};
        container["time"] = moment.unix((x.datum_posudbe.$date.$numberLong /1000)).format('MM/DD/YYYY HH:mm');
        container["title"] = x.status;
        container["description"] = "POSUDIO : "+x.posudio+ " \n VRATIO : "+x.vratio;
        container["circleColor"] =  (x.status=="CLOSED" ? "red":"green");
        return container;
       }  
      )

      console.log("ovo su posudbe po userima++++++++",usersByLikes);
      console.log(data);

      setPosudbe(usersByLikes);


    })();
  }, []);

  return (
    <View style={styles.container}>

      <Timeline data={posudbe}  innerCircleType='icon' />

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
 
});
