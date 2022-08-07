import './App.css'
import  { React, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom' 
import { connect } from 'react-redux'
import Main from '../pages/Main/Main'
import Following from '../pages/Main/Following'
import SignIn from '../pages/SignIn/SignIn'
import Register from '../pages/Register/Register'
import Navigation from '../components/Navigation/Navigation'
import SlideMenu from '../components/slideMenu/slideMenu'
import Profile from '../pages/Profile/Profile'
import Friends from '../components/Friends/Friends'
import { getAuth } from '../redux/UserSlice'

function App({ authorized, checkAuth }) {
  const body = document.body

  if (localStorage.getItem('theme')) {
    body.classList.add(localStorage.getItem('theme'))
  } else {
    localStorage.setItem('theme', 'light')
    body.classList.add('light')
  }

  useEffect(() => {
    localStorage.getItem("accessToken") && checkAuth()
  })
  return (
    <>
    {authorized && <SlideMenu />}
      <Routes>
        <Route path="/" element={<Navigation  />}>
          <Route index element={ <Main /> }/>
          <Route path="/signIn" element={ <SignIn /> }/>
          <Route path="/register" element={ <Register /> }/>
          <Route path="/userProfile" element={ <Profile /> }/>
          <Route path="/friends" element={ <Friends /> }/>
          <Route path="/following" element={ <Following /> }/>
        </Route>
      </Routes>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    authorized: state.UserSlice.authorized
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth : () => dispatch(getAuth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)