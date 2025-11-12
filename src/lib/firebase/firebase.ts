import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBtpYR-LcFEcby2Ms6DjOOchD3XZZBYDjQ",
  authDomain: "fitnessapp2-307df.firebaseapp.com",
  projectId: "fitnessapp2-307df",
  storageBucket: "fitnessapp2-307df.firebasestorage.app",
  messagingSenderId: "989447535075",
  appId: "1:989447535075:web:e0447bd58e9793548988d6",
  measurementId: "G-2SYZKNMEN7",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { analytics };
