import React, { useState } from "react";


const Signup = () => {

    // state to get the userdetails from the input field
    const [details, setDetails] = useState({username: "", password: ""});
    
    // state which will be holding api data
    const [apiData, setApiData] = useState(null);

    const handleDetails = (e) => {
        setDetails({...details, [e.target.name]: e.target.value});
    };

    // console.log(details);
    console.log(apiData);

    // Now let us create a function which will fetch the data from the [/signup] route
    const fetchSignup = async (e) => {
        try{ 
        e.preventDefault();

        const signupResponse = await fetch("https://backend-todo-sigma.vercel.app/signup", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(details)
        });

        const signupdata = await signupResponse.json();
        // console.log(signupdata);  // Output :-  Object { error: true, message: "You have failed to provide Username or Password plase do provide all this Details !" }
        setApiData(signupdata);
        // .then((response) =>{
        //     const signupdata = response.json()
        //     .then(value => console.log(value))
        //     .catch(error => console.log(error))
        //     console.log(signupdata);
        // })
        // .catch((error) => {
        //     console.log(error);
        // })
    }
    catch(error){
        console.log(`Error inside signup route try block ! :- ${error}`);
    }};



    return (
        <div className="bg-red-300 text-center" >
            <form >
            <label > 
                <p > Username: </p>
                <input type="text" name="username" onChange={handleDetails} className="border-4 border-black" />
                </label>
                
                <label> 
                <p> password: </p>
                <input type="text" name="password" onChange={handleDetails} className="border-4 border-black" />
                </label>
                <br />
                <button onClick={fetchSignup} className="bg-yellow-300 rounded-lg m-3" > Signup </button>
            </form>

            {/* Now here let us display the api message */}
            <h2 className="bg-blue-400" > {apiData?.message} </h2>

            </div>
    )
}

export default Signup;