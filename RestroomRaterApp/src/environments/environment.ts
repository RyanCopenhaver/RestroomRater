import { Keys } from "../app/models/keys";

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
