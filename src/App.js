import React, { useEffect } from 'react'
import AppRouter from './components/AppRouter'
import AuthContextProvider from './contexts/AuthContext'
import { Provider } from "react-redux";
import {store,persistor} from  './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import './App.css';
import {BrowserRouter} from 'react-router-dom'

function App() {


 
  return (
    
    <AuthContextProvider>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
       <AppRouter />
       </BrowserRouter>
       </PersistGate>
       </Provider>
  </AuthContextProvider>
 
  );
}

export default App
