import React, { useEffect } from 'react'
import AppRouter from './components/AppRouter'
import AuthContextProvider from './contexts/AuthContext'
import { DataProvider } from './pages/Classifier/DataContext';
import { Provider } from "react-redux";
import {store,persistor} from  './store/store'
import { PersistGate } from 'redux-persist/integration/react'


function App() {


 
  return (
    
    <AuthContextProvider>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       <DataProvider>
       <AppRouter />
       </DataProvider>
       </PersistGate>
       </Provider>
  </AuthContextProvider>
 
  );
}

export default App
