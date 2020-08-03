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