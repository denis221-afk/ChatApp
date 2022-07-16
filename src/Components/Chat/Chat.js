import { getAuth } from "firebase/auth";
import { addDoc, collection, query,  onSnapshot} from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../..";


const Chat = () => {
    const [masenge , setMasenge] = useState('');
    const [dialogs, setDialogs] = useState([]);
    const auth = getAuth()
    const user = auth.currentUser


    useEffect(() => {
        getMasenges();
      
    },[])

   async function getMasenges() {
        const q =  query(collection(db, "masenge"));
        const unsubscribe =  onSnapshot(q, (querySnapshot) =>  {
        let masenges = [];
        querySnapshot.forEach((doc) => {
            masenges.push(doc.data())
        });
        masenges.sort(function(a, b) {
         return a.data - b.data;
        });
        setDialogs(masenges)
        });
    }


    function getMasenge (event) {
        setMasenge(event.target.value)
    }
  async  function sendMasenge (e) {
        e.preventDefault();
        const data = new Date()
        const docRef = await addDoc(collection(db, "masenge"), {
            name: user.displayName,
            id: user.uid,
            masenge: masenge,
            data: data
          });

        clearInput();

    }

    function clearInput() {
        setMasenge('');
    }

    const masenger = dialogs.map((item, i) => {
        const {id, name , masenge, data} = item
  
        if(id == user.uid) {
            return(
                <div className="masenge_iam" key={i}>
                    <div class="header__masenge">
                        <div className="avatar panel-avatar">
                            <span>{name[0]}</span>
                        </div>
                        {name}
                    </div>
                    <div className="text">
                        <p>{masenge}</p>
                    </div>
                </div>
            )
        } else{
            return(
                <div className="masenge" key={i}>
                    <div class="header__masenge">
                        <div className="avatar panel-avatar">
                            <span>{name[0]}</span>
                        </div>
                        {name}
                    </div>
                    <div className="text">
                        <p>{masenge}</p>
                    </div>
                </div>
            )
        }


    })

    return(
        <>
            <div class="chats-window">
                {masenger}
            </div>
            <form  className="footer" onSubmit={sendMasenge}>
                <textarea onChange={getMasenge} value={masenge}>

                </textarea>
                <button class="uk-button uk-button-danger">Danger</button>
            </form>
        </>
    )
}   
export default Chat