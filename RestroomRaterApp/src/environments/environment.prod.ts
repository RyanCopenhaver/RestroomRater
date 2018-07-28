import { Keys } from "../app/models/keys";

export const environment = {
  production: true,
  firebase: {
    apiKey: Keys.FIREBASE_API_KEY,
    authDomain: "restroomrater-31170.firebaseapp.com",
    databaseURL: "https://restroomrater-31170.firebaseio.com",
    projectId: "restroomrater-31170",
    storageBucket: "restroomrater-31170.appspot.com",
    messagingSenderId: "718116209290"
  },
  googleMapsKey: Keys.GMAPS_API_KEY
};