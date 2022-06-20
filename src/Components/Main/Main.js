import React, { useState } from "react";
import { getAuth} from "firebase/auth";
import Navbar from "../Navbar/Navbar";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../..";
import OnlineUsers from "../Oline-users/Oline-users.js";
import { useEffect } from "react";







const Main = (props) => {
    const auth = getAuth();
    const user = auth.currentUser;


    const [client, setClient] = useState([])
    let newArry = "none"
     useEffect(() => {
        if(user !== null) { 
            const washingtonRef = doc(db, "users", user.uid);
             updateDoc(washingtonRef, {
                online: true
              });
        }
        const q =  query(collection(db, "users"));
        const unsubscribe =  onSnapshot(q, (querySnapshot) =>  {
        let cities = [];
        querySnapshot.forEach((doc) => {
            cities.push(doc.data())
        });
        setClient(cities)
        });
    },[user])



    const online = client.map(item => {
        const {name, id, online} = item;
        if(online) {
         return(
            <OnlineUsers name={name} key={id} /> 
         )
        }
  
    })





  





 
    return(
        <div>
            <Navbar  auth={props.auth}/>   
            <div className="panels">
             {online}
            </div>
        </div>
    )
}; 
export default Main;