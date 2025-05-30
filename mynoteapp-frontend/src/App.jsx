import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import CreateNote from './components/CreateNote'
import NavBar from './components/NavBar'
import ViewMynotes from './components/ViewMynotes'
import SearchPage from './components/Search';
import Edit from './components/edit';


function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/create" element={<CreateNote />} />
      <Route path="/navbar" element={<NavBar />} />
      <Route path="/viewmynote" element={<ViewMynotes />} />
      <Route path="/search" element={<SearchPage userId={sessionStorage.getItem("userId")} token={sessionStorage.getItem("token")} />}/>
    <Route path="/edit/:noteId" element={<Edit />} />



      </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App
