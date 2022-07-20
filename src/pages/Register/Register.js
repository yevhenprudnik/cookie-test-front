import { React, useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import {loadUser} from '../../redux/UserSlice'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { api, baseUrl } from '../../api/api'

const Register = ({loadUser}) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const onSubmitRegister = async () => {
      if (email && password && username) {
        try {
          const obj = { email, password, username };
          const {data} = await api.post(`${baseUrl}/register`, obj)
          loadUser(data)
          setRedirect(true)
        } catch (error) {
          if (error.response !== undefined) {
            const {message} = error.response.data
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: message,
              })
          } else {
            console.log(error)
          }
        }
      // data includes access token, refresh token and user object
      // user object includes username, email, id and isActivated(bool variable that depends on email verification)
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Wrong credentials!',
        })
      }
    }
    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          {redirect && <Navigate replace to='/' />}
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0 center">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                    <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    name="username"
                    id="username"
                    onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                    onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                </fieldset>
                <div className="center">
                    <input
                    onClick={() => onSubmitRegister()}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                        type="submit"
                        value="Register"
                    />
                </div>
                <div className="lh-copy mt3 center">
                <Link  
                //onClick={() => onRouteChange('register')} 
                to="/signIn"
                className="f6 link dim black db pointer">
                    Sign in
                </Link>
                </div>
            </div>
            </main>
        </article>
    )
}

const mapDispatchToProps = (dispatch) => {
  return { 
    loadUser: (data) => dispatch(loadUser(data))
  }
}

export default connect(null, mapDispatchToProps)(Register)