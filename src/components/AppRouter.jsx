import React from 'react'
import {  Route, Switch,Redirect,useLocation } from 'react-router-dom'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import Homepage from '../pages/Homepage'
import Loginpage from '../pages/Loginpage'
import NotfoundPage from '../pages/NotfoundPage'
import Profilepage from '../pages/Profilepage'
import Registerpage from '../pages/Registerpage'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import { useAuth } from '../contexts/AuthContext'
import BasicStatistics from '../pages/Features'
import Calculator from '../pages/Calculator'
import Com from '../pages/About'
import Contact from '../pages/Contact'
import Patient from '../pages/patienthistory'

import Pdetails2 from '../pages/patientprofile'
import FormUp from '../pages/Classifier/Form'
import Report from '../pages/report'
import { AnimatePresence } from 'framer-motion'


export default function AppRouter(props) {
  const location =useLocation();
  return (
    <>
        <AnimatePresence exitBeforeEnter>
        <Switch key={location.pathname} location={location}>
          <Route exact path='/' component={Homepage} />
          <ProtectedRoute exact path='/table' component={Patient} />
          <Route exact path='/table/:id' component={Pdetails2} />
          <ProtectedRoute  exact path='/uploader' component={FormUp} />
          <ProtectedRoute  exact path='/login' component={Loginpage} />
          <ProtectedRoute  exact path='/register' component={Registerpage} />
          <ProtectedRoute exact path='/profile' component={Profilepage} />
          <ProtectedRoute exact path='/features' component={BasicStatistics}/ >
          <ProtectedRoute   path='/features/calculator' component={Calculator}/>
          <ProtectedRoute  exact path='/forgot-password' component={ForgotPasswordPage} />
          <ProtectedRoute  exact path='/reset-password' component={ResetPasswordPage} />
          <Route exact path='/report' component={Report} />
          <Route exact path='/about' component={Com} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='*' component={NotfoundPage} />
        </Switch>
        </AnimatePresence>
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