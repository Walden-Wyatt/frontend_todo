import React, { useEffect, useRef, useState } from "react";

import accessTokenCheck from "../utils/accessToken.js";


const Todo = () => {


    // here let us load access and refresh token
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    // console.log(`${accessToken} \n ${refreshToken}`);

    // let us decode data from the Payload Object
    const decodePayload = JSON.parse(atob(accessToken.split(".")[1]));
    // console.log(decodePayload);



    // here we will have a State variable why because behind the scene the datas which we get will already be updated then we will be getting the data.
    const [apiData, setApiData] = useState(null);

    // state which will hold addtodo data 
    const [addTodo, setAddTodo] = useState({username: "", tododata: ""});
    const [updateTodo, setUpdateTodo] = useState({username: decodePayload.username, tododata: "", todoid: ""});
    const [deleteTodo, setDeleteTodo] = useState({username: "", todoid: ""})
    const [toggleClickAndIndex, setToggleClickAndIndex] = useState({toggleValue: false, updateIndex: -0});
    const [updateIndex, setUpdateIndex] = useState();


    // console.log(updateTodo);
    console.log(apiData);

    const handleAddTodo = (e) =>{
        setAddTodo(e.target.value);
    };

    // const handleUpdateTodo = (e) => {
    //     setUpdateTodo({username: e.target.value})
    // }

    const handleUpdateTodo = (e) => {
        setUpdateTodo({username: decodePayload.username, tododata: e.target.value});
    }


    const handleDeleteTodo = (index) => {
        setDeleteTodo({username: decodePayload.username, todoid: index});
        fetchDeleteTodo(index);
    };




    // let us write functions which will send requests to todo related routes
    const fetchAddTodo = async () => {
        
        // e.preventDefault();
        const responseAddTodo = await fetch("https://backend-todo-sigma.vercel.app/addtodo", {
            method: "POST",
            headers: {
                "content-type": "application/json", 
                authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({username: decodePayload.username, tododata: addTodo})  // here we have to fill [username and tododata] field.
        });

        const addTodoData = await responseAddTodo.json();
        // console.log(addTodoData);  //  Output :-  Object { error: true, message: "Error in Token :-  jwt expired" }
        setApiData(addTodoData);
    };

    // fetchAddTodo();

    // console.log(apiData);


    // ----------------------------------


    const fetchGetTodo = async (accessToken) => {
        // e.preventDefault();
        const responseGetTodo = await fetch("https://backend-todo-sigma.vercel.app/gettodo", {
            method: "POST",
            headers: {
                "content-type": "application/json", // whenever you are sending some data from the frontend make sure you add this line of code, else data will not be sent to the Backend.
                authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({username: decodePayload.username})  // here we have to fill [username and tododata] field.
        })

        const getTodoData = await responseGetTodo.json();
        // console.log(getTodoData);
        setApiData(getTodoData);

    };

    // fetchGetTodo();

    // ------------------------

    console.log(updateTodo);

    const fetchUpdateTodo = async () => {
        // e.preventDefault();
        const responseUpdate = await fetch("https://backend-todo-sigma.vercel.app/updatetodo", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({username: decodePayload.username, tododata: updateTodo.tododata, todoid: toggleClickAndIndex.updateIndex}),  // here we have to fill [username and tododata] field.
        });

        const updateTodoData = await responseUpdate.json();
        console.log(updateTodoData);
        setApiData(updateTodoData);

    };

    // fetchUpdateTodo();


    // ----------------------------------------------


    const fetchDeleteTodo = async (index) => {
        // e.preventDefault();
        const responseDelete = await fetch("https://backend-todo-sigma.vercel.app/deletetodo", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({username: decodePayload.username, todoid: index})  // here we have to fill [username and tododata] field.
        });

        const deleteData = await responseDelete.json();
        console.log(deleteData);
        setApiData(deleteData);
    };


    useEffect(() => {

       // Now let us check weather Token has been Expired or not, Incase Token has been expired we will send request to [/newaccesstoken] route --> fetch the token store it inside the Local storage ---> then we will send request to the appropriate Routes. 
       if(accessTokenCheck(accessToken, refreshToken)){
        const fetchNewAccessToken = async () => {

            try{
                const accessResonse = await fetch("https://backend-todo-sigma.vercel.app/newaccesstoken", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({refreshToken: refreshToken})
                });

                const accessTokenData = await accessResonse.json();
                // console.log(accessTokenData.newAccessToken);
                localStorage.setItem("accessToken", accessTokenData.newAccessToken);

                fetchGetTodo(accessTokenData);
            }
            catch(error){
                return {error: true, message: `Internal Server Error, ${error}`}
            }
        }

        fetchNewAccessToken();
       }
       else{
        console.log("Access Token is not Expired !");
        fetchGetTodo(accessToken);
       }

    }, []);

    
    // console.log(addTodo);
    // console.log(apiData?.tododatas?.todo);
    // console.log(updateTodo);
    // console.log(toggleClickAndIndex);
    // console.log(deleteTodo);
    // console.log(decodePayload.username)

    return (
                <div className="bg-gray-300" >
                    <h2 className="bg-red-400 text-center" > Todo List </h2>
        
                    <div >
                        <p className="bg-green-300 m-4 rounded-lg" > Enter Todo Data </p>
                        <input type="text" name="todoitem" onChange={handleAddTodo} className="border-4 border-black" />
                        <button onClick={fetchAddTodo} className="bg-yellow-400 m-2 rounded-lg w-24" >Add Todo</button>
                        {apiData && (<h2 className="bg-purple-500"> {apiData.message} </h2>)}
                    </div>

                    {/* Let us Iterate and Display all the Todo of that specifiusers  */}

                    <div>
                        {apiData?.tododatas?.todo.map((value, index) => {
                            return(
                                <div key={index} className="bg-blue-200 m-4 w rounded-lg" > 
                                {value} 
                                <button onClick={() => {setToggleClickAndIndex({toggleValue: true, updateIndex: index}) }}  className="bg-red-500 rounded-lg m-4"> Update </button>
                                {/* <button onClick={(e) => { handleDeleteTodo(e); setDeleteTodo({username: decodePayload.username, todoid: index}); fetchDeleteTodo(e) }} > Delete </button> */}
                                <button onClick={ () => { handleDeleteTodo(index) }} className="bg-red-500 rounded-lg m-4"> Delete </button> 
                                </div>
                            )
                        }) }
                    </div>


                    {/* Here let us display input component which update and cancel buttons */}

                    {toggleClickAndIndex.toggleValue && (
                         <div>
                            {/* <input onChange={(e) => { setUpdateTodo({usename: decodePayload.username, tododata: e.target.value, todoid: toggleClickAndIndex.updateIndex})}} /> */}
                            <input onChange={(e) => { setUpdateTodo({tododata: e.target.value})}} className="border-2 border-black m-2" />
                            <button onClick={(e) => { handleUpdateTodo(e); fetchUpdateTodo() }} className="bg-red-500 rounded-lg m-4" > Update </button>
                            <button onClick={() => {setToggleClickAndIndex({toggleValue: false, updateIndex: -0})}} className="bg-red-500 rounded-lg m-4" > Cancel </button>
                        </div>
                    ) }

                </div>
            )
};




// const Todo = () => {

//     const [addTodo, setAddTodo] = useState("");

//     // let us get Access and Refresh Token which has been stored inside the local storage
//     const accessToken = localStorage.getItem("accessToken");
//     // console.log(accessToken);   // Output :-  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImppbSIsImlhdCI6MTcxNjIyNDg2OCwiZXhwIjoxNzE2MjI0OTI4fQ.3FSg3oddgqjOPF4DYWC69HhpDXxYlyno-61gXhsrwxw
//     const refreshToken = localStorage.getItem("refreshToken");
//     // console.log(refreshToken);  // Output :-  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImppbSIsImlhdCI6MTcxNjIyNDg2OCwiZXhwIjoxNzE2MjI0OTI4fQ.3FSg3oddgqjOPF4DYWC69HhpDXxYlyno-61gXhsrwxw

//     // Now let us decode the refresh Token payload
//     const decodeRefreshToken = JSON.parse(atob(refreshToken.split(".")[1]));
//     console.log(decodeRefreshToken);  // Output :-   { username: "jim", iat: 1716224868, exp: 1729184868 }   or null

//     // function to handle add todo
//     const handleAddTodo = (e) => {
//         setAddTodo(e.target.value);
//     }

//     // function to send request to [/addtodo] route
//     const fetchAddTodo = async (e) => {
//         e.preventDefault();
//         const addTodoResponse = await fetch("http://localhost:4000/addtodo", {
//             method: "POST",
//             headers: {
//                 authorization: `Bearer ${accessToken}`
//             },
//             body: JSON.stringify({username: decodeRefreshToken.username, tododata: addTodo})

//         });
//         console.log(addTodoResponse);
//         const addTodoData = await addTodoResponse.json();
//         console.log(addTodoData);
//     }

//     // console.log(addTodo);

//     return (
//         <div>
//             <h2> Todo List </h2>

//             <div>
//                 <p> Enter Todo Data </p>
//                 <input type="text" name="todoitem" onChange={handleAddTodo} />
//                 <button onClick={fetchAddTodo} >Add Todo</button>
//             </div>
//         </div>
//     )
// }

export default Todo;