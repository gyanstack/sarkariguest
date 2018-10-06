// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyBns1t0-Sv5ICpg_EJQRRdZRfpx5MR-OVc",
    authDomain: "sghweb-c53b2.firebaseapp.com",
    databaseURL: "https://sghweb-c53b2.firebaseio.com",
    projectId: "sghweb-c53b2",
    storageBucket: "sghweb-c53b2.appspot.com",
    messagingSenderId: "482125260667"
  }
  // firebase:{
  //   apiKey: "AIzaSyAgb6lWj5RMPJI927uFBxnujDDZXGkTmag",
  //   authDomain: "sghweb-c53b2.firebaseapp.com",
  //   databaseURL: "https://sghweb-c53b2.firebaseio.com",
  //   projectId: "sghweb-c53b2",
  //   storageBucket: "",
  //   messagingSenderId: "482125260667"
  // }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
