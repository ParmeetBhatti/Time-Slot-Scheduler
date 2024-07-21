import LoginForm from './Components/LoginForm/LoginForm'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  
  return (
    <div>
      
      <LoginForm />
     
    </div>
  );
}

export default App;
