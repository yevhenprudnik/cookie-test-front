import { Link, Outlet } from 'react-router-dom';
import './Navigation.css';
import { signOut } from '../../redux/UserSlice';
import { connect } from 'react-redux';
import { selectUserToFind } from '../../redux/UserSlice';

const Navigation = ( props ) => {
    const { authorized, handleSignOut, username, userId } = props;
    return (
        <>
            <nav className="bb navLinks tc mw7 center nawDiv">
                <div className="homeLink">
                    <Link className="f6 f5-l bg-animate hover-bg-lightest-blue dib pa3 ph4-l navLinks" to="/">Home</Link>
                </div>
                { authorized && 
                <>
                    <div >
                    <Link onMouseEnter={() => selectUserToFind(userId)}
                        className="f6 f5-l bg-animate hover-bg-light-yellow dib pa3 ph4-l navLinks"
                        to={`/userProfile?userToGet=${userId}`}>@{username}
                    </Link>
                    </div>
                </>
                }
                <div className="authDiv">
                    {
                        authorized ?
                        <Link to="/" onClick={() => handleSignOut()} className="f6 f5-l bg-animate hover-bg-light-pink dib pa3 ph4-l navLinks pointer">Sign Out</Link>
                        :
                        <>
                            <Link className="f6 f5-l bg-animate hover-bg-light-green dib pa3 ph4-l navLinks" to="/signIn">Sign In</Link>
                            <Link className="f6 f5-l bg-animate hover-bg-light-pink dib pa3 ph4-l navLinks" to="/register">Register</Link>
                        </>
                    }
                </div>
            </nav>
            <Outlet/>
        </>
    )
}

const mapStateToProps = (state) => {
  return {
    authorized: state.UserSlice.authorized, 
    username: state.UserSlice.username,
    userId: state.UserSlice.userId
  }
}
const mapDispatchToProps = (dispatch) => {
  return { 
    handleSignOut: () => dispatch(signOut()),
    selectUserToFind : (userId) => dispatch(selectUserToFind(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
