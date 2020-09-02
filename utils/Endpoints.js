import PASSWORD from '../secret/Password'
var LOGIN_KORISNIKA="https://webhooks.mongodb-realm.com/api/client/v2.0/app/duing-app-backend-rnsjm/service/api/incoming_webhook/authenticationMobileApp?secret="+PASSWORD;

 export function callAuthenticationBackend(arg) { 
     var URL= LOGIN_KORISNIKA+arg;
     console.log(URL)
    return fetch(URL)
    .then((response) => response.json())
    .then((data) => {

        if(data.status==500) {return null;}

        if(data.status==200) {return data;}
            
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}



var STATUS_ALATA="https://webhooks.mongodb-realm.com/api/client/v2.0/app/duing-app-backend-rnsjm/service/api/incoming_webhook/FetchStatusAlata?secret="+PASSWORD;
 export  function checkStatusAlata(arg) { 
     var URL= STATUS_ALATA+arg;
     // arg= id=123
     console.log(URL)
    return fetch(URL)
    .then((response) =>  response.json())
    .then((data) => {

        if(data.status=="500") {return null;}

        if(data.status=="200") {return data;}
            
    })
    .catch((error) => {
      console.error("ERROR",error);
      return null;
    });
}



var MANAGE_RENTS="https://webhooks.mongodb-realm.com/api/client/v2.0/app/duing-app-backend-rnsjm/service/api/incoming_webhook/manageRents?secret="+PASSWORD;
 export  function kreirajIliModificirajPosudbuAlata(arg) { 
     var URL= MANAGE_RENTS+arg;
     // &arg= id=123 & korisnik=ime
     console.log(URL)
    return fetch(URL)
    .then((response) =>  response.json())
    .then((data) => {
      console.log(data)
        if(data.status=="500") {return null;}

        if(data.status=="200") {return data;}
            
    })
    .catch((error) => {
      console.error("ERROR",error);
      return null;
    });
}

var SVI_ALATI="https://webhooks.mongodb-realm.com/api/client/v2.0/app/duing-app-backend-rnsjm/service/api/incoming_webhook/fetchSveAlate?secret="+PASSWORD;
export  function fetchajSveAlate(arg) { 
  var URL= SVI_ALATI+arg;
  // &arg= id=123 & korisnik=ime
  console.log(URL)
 return fetch(URL)
 .then((response) =>  response.json())
 .then((data) => {
   console.log(data)
     if(data.status=="500") {return null;}

     if(data.status=="200") {return data;}
         
 })
 .catch((error) => {
   console.error("ERROR",error);
   return null;
 });
}

var POSUDBE_PO_ALATU="https://webhooks.mongodb-realm.com/api/client/v2.0/app/duing-app-backend-rnsjm/service/api/incoming_webhook/fetchAllRentsPerAlat?secret="+PASSWORD;
export  function fetchajPosudbePoAlatu(arg) { 
  var URL= POSUDBE_PO_ALATU+arg;
  // &arg= id=123 & korisnik=ime
  console.log(URL)
 return fetch(URL)
 .then((response) =>  response.json())
 .then((data) => {
   console.log(data)
     if(data.status=="500") {return null;}

     if(data.status=="200") {return data;}
         
 })
 .catch((error) => {
   console.error("ERROR",error);
   return null;
 });
}