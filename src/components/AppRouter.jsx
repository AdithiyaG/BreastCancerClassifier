import React from 'react'
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

export default function AppRouter(props) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <ProtectedRoute  exact path='/login' component={Loginpage} />
          <ProtectedRoute  exact path='/register' component={Registerpage} />
          <ProtectedRoute exact path='/profile' component={Profilepage} />
          <ProtectedRoute exact path='/features' component={BasicStatistics}/ >
          <ProtectedRoute  exact path='/features/classifier' component={Model}/>
          <ProtectedRoute  exact path='/features/calculator' component={Calculator}/>
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
  console.log('path', path)
  const location = useLocation()
  console.log('location state', location.state)

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