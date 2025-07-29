import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import axios from "axios";
import React from "react";
import Form from "./component/Form";
import UserList from "./component/UserList";

import ImageUpload from "./component/ImageUpload";
import LoginForm from "./component/LoginForm";
import Forget from "./component/Forget";
import Newpassword from "./component/Newpassword";
// import { useNavigate } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Form />} />
        {/* <Route path="/img" element={<ImageUpload />} /> */}
        <Route path="/userlist" element={<UserList />} />
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/confirm" element={<Newpassword/>}/>
        <Route path='forget' element={<Forget/>}/>
      </Routes>
    </Router>
  );
}
