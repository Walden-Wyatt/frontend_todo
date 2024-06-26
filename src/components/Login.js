import React, { useEffect, useState } from "react";


const Login = () => {

    // state which will hold the user input details
    const [details, setDetails] = useState({username: "", password: ""});

    // state which will hold the api data
    const [apiData, setApiData] = useState(null);

    // function which will set the user details
    const handleDetails = (e) => {
        setDetails({...details, [e.target.name]: e.target.value});
    };


    // console.log(details);


    // now let us write a function which will fetch the data from [/login] route
    const fetchLogin = async (e) => {
        e.preventDefault();

        const loginResponse = await fetch("https://backend-todo-sigma.vercel.app/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(details)
        });

        const loginData = await loginResponse.json();

        // console.log(loginData);
        setApiData(loginData);
    }
    
    // console.log(apiData);

    // Now let us set the Access and Refresh token inside the localstorage
    // here we used [useEffect()] hook just to check and update the localstorage only when we got [apiData] else we will not be updaing.
    useEffect(() => {
        if(apiData && apiData.accessToken && apiData.refreshToken){
            localStorage.setItem("accessToken", apiData.accessToken);
            localStorage.setItem("refreshToken", apiData.refreshToken);
        }
    })

    return (
        <div className="bg-red-300 text-center" >
            <form>
            <label> 
                <p> Username: </p>
                <input type="text" name="username" onChange={handleDetails} className="border-4 border-black"  />
                </label>
                
                <label> 
                <p> password: </p>
                <input type="text" name="password" onChange={handleDetails} className="border-4 border-black"  />
                </label>
                <br />
                <button onClick={fetchLogin} className="bg-yellow-300 rounded-lg m-3" > Login </button>
            </form>

            {/* Display api message */}
            <h2 className="bg-blue-400" > {apiData?.message} </h2>
        </div>
    )
}

export default Login;