import { React, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts } from '../../redux/PostsSlice'
import { follow, unfollow } from '../../redux/UserSlice'
import { createCards } from '../Main/Main'
import { api, baseUrl } from '../../api/api'
import Loader from '../../components/Modals/Loader/Loader'
import LoaderModal from '../../components/Modals/Loader/LoaderModal'
import handleUnsignedUser from '../../helper/handleUnsignedUser'

const Profile = ({ posts, loadPosts, userId, following, follow, unfollow, authorized }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ Username, setUsername ] = useState('');
  const [ Email, setEmail ] = useState('');
  const [ ProfileImage, setProfileImage ] = useState('');
  const [loading, setLoading] = useState(false);
  let userToFind = searchParams.get('userToGet');
  async function getUser(){
    const response = await api.get(`${baseUrl}/getUser?id=${userToFind}`)
    if (response.statusText !== 'OK') {
      throw new Error();
    }
    const user = response.data
    setUsername(user.username)
    setEmail(user.email)
    setProfileImage(user.profileImage)
  }

  useEffect(() => {
    if(!userToFind){
      userToFind = localStorage.getItem('userToFind');
    }
    loadPosts(userToFind)
    getUser()
  }, [userToFind])
  return (
    <>
    {
      loading &&
      <LoaderModal>
        <Loader />
      </LoaderModal>
    }
      <article className="mw8 center cardComponent br3 pa3 pa4-ns mv3">
        <div className="tc">
          <div className="">
            <img src={ ProfileImage } className="br-100 h5 w5 dib grow highlight border" alt="Profile Image"/>
          </div>
          <h1 className="f4">{ Username }</h1>
          <h2 className="f6">{ Email }</h2>
          <hr className="mw6 bb navLinks"/>
          { 
            userId !== userToFind ? 
            following.includes(userToFind) ? 
            <a className="f6 link ba br2 ph3 pv1 dib grow white pointer bg-gray"
            onClick={() => {
              unfollow({userToUnfollow : userToFind})
              setLoading(true)
              setTimeout(() =>{
                setLoading(false)
              }, 1000)
            }}
            >followed</a>
            : 
            <a className="f6 link ba br2 ph3 pv1 dib grow white pointer bg-blue"
            onClick={() => {
              if (authorized) {
                follow({userToFollow : userToFind})
                setLoading(true)
                setTimeout(() =>{
                  setLoading(false)
              }, 1000)
              } else {
                handleUnsignedUser(`follow ${Username}`)
              }
            }}
            >follow</a>
            :
            null
          }
        </div>
      </article>
      <div className="tc f2">
        Posts:
      </div>
      <div>
        {createCards(posts, userId)}
      </div>
    </>
  )
}

function mapStateToProps(state){
  return {
    posts: state.PostsSlice.posts, 
    userId: state.UserSlice.userId,
    following: state.UserSlice.following,
    authorized: state.UserSlice.authorized
  }
}
function mapDispatchToProps(dispatch){
  return { 
    loadPosts: (id) => dispatch(getPosts(id)),
    follow: (followData) => dispatch(follow(followData)),
    unfollow: (unfollowData) => dispatch(unfollow(unfollowData)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Profile)