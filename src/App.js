import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import ComplGoal from './ComplGoal'
import MyDiary from './MyDiary'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/complgoal' element={<ComplGoal />}></Route>
        <Route path='/mydiary' element={<MyDiary />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App