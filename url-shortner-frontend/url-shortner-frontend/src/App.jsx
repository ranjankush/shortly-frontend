// @ts-nocheck
import './App.css'
import {BrowserRouter,Routes, Route } from 'react-router-dom';
import { getApps } from './utils/helper'
function App() {

  const CurrentApp=getApps();
  return (
    <>
     <BrowserRouter>
     <CurrentApp/>
     </BrowserRouter>
    </>
  )
}

export default App
