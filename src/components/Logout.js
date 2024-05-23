import React, { useEffect, useState } from "react";



const Logout = () => {

    const [checkToken, setCheckToken] = useState(false);

    const logoutFunction = () =>{
        localStorage.clear("accessToken");
        localStorage.clear("refreshToken");
    };

    useEffect(() => { 
    const checkAccessToken = localStorage.getItem("accessToken");
    setCheckToken(checkAccessToken);
});

    return(
        <div className="bg-gray-400" >
            <button onClick={logoutFunction} className="bg-yellow-400 text-center rounded-md" > Logout ! </button>
            {!checkToken ? <h2> You have Logged Out Successfully </h2> : <h2> Failed to Logout ! </h2> } 
        </div>
    )

}

export default Logout;