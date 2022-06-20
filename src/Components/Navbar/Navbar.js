import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../..";
import { doc, updateDoc } from "firebase/firestore";
const Navbar = (props) => {
    const auth = getAuth()
    const user = auth.currentUser;
    let userName = user.displayName;
    const [modall , setModall] = useState(false);
    let classNames = "logout";


    function logout () {
        signOut(auth).then(props.auth()).then(hideOnline).catch(console.log("error"))
    }

    function hideOnline() {
      const washingtonRef = doc(db, "users", user.uid);
      updateDoc(washingtonRef, {
         online: false
       });
    }
    if(modall) {
         classNames = "logout active"
    }
    return(
        <div className="uk-background-primary uk-light uk-padding-small uk-panel Navbar ">
          <p className="uk-h4">{userName}</p>
          <div className="avatar" onClick={() => setModall(!modall)}>
             <span>{userName[0]}</span>
          </div>
          <div className={classNames} onClick={logout}>
            logout
          </div>
        </div>
    )
}
 export default Navbar