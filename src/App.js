
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Todo from "./components/Todo";
import Logout from "./components/Logout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoutes />} >  
      <Route path="/todo" element={<Todo />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
