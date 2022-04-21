import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch,Redirect,useLocation } from 'react-router-dom'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import Homepage from '../pages/Homepage'
import Loginpage from '../pages/Loginpage'
import NotfoundPage from '../pages/NotfoundPage'
import Profilepage from '../pages/Profilepage'
import Model from '../pages/ProtectedPage'
import Registerpage from '../pages/Registerpage'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import { useAuth } from '../contexts/AuthContext'
import BasicStatistics from '../pages/Features'
import Calculator from '../pages/Calculator'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Patient from '../pages/patienthistory'
import Pdetails from '../pages/Classifier/details'
import FormUploader from '../pages/Classifier/uploader'
import Pdetails2 from '../pages/patientprofile'
import Result from '../pages/Classifier/result'



export default function AppRouter(props) {

  return (
    <>
      <Router>

        <Switch>
          <Route exact path='/' component={Homepage} />
          <ProtectedRoute exact path='/table' component={Patient} />
          <Route exact path='/table/:id' component={Pdetails2} />
          <ProtectedRoute  exact path='/details' component={Pdetails} />
          <ProtectedRoute  exact path='/uploader' component={FormUploader} />
          <ProtectedRoute  exact path='/confirm' component={Result} />
          <ProtectedRoute  exact path='/login' component={Loginpage} />
          <ProtectedRoute  exact path='/register' component={Registerpage} />
          <ProtectedRoute exact path='/profile' component={Profilepage} />
          <ProtectedRoute exact path='/features' component={BasicStatistics}/ >
          <ProtectedRoute   path='/features/classifier' component={Model}/>
          <ProtectedRoute   path='/features/calculator' component={Calculator}/>
          <ProtectedRoute  exact path='/forgot-password' component={ForgotPasswordPage} />
          <ProtectedRoute  exact path='/reset-password' component={ResetPasswordPage} />
          <Route exact path='/about' component={About} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='*' component={NotfoundPage} />
        </Switch>
      </Router>
    </>
  )
}

function ProtectedRoute(props) {
  const { currentUser } = useAuth()
  const { path } = props
  const location = useLocation()

  if (
    path === '/login' ||
    path === '/register' ||
    path === '/forgot-password' ||
    path === '/reset-password'
  ) {
    return currentUser ? (
      <Redirect to={location.state?.from ?? '/'} />
    ) : (
      <Route {...props} />
    )
  }
  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: path },
      }}
    />
  )
}