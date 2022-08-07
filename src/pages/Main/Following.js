import { React, useState, useEffect } from 'react';
import PostCard from './PostCard';
import { getFollowingPosts } from '../../redux/PostsSlice';
import { connect } from 'react-redux'
import  AddPost  from '../../components/Modals/AddPost/AddPost'
import  PostModal  from '../../components/Modals/AddPost/AddPostModal'
import { unActivatedEmail } from '../../helper/handleUnsignedUser'
import liked from './images/heartLiked.png'
import like from './images/heart.png'
import { createCards } from './Main'

const Following = ( { posts, loadPosts, isActivated, email, userId, following } ) => {
    const [addPostOpen, setAddPostOpen] = useState(false)
    useEffect(() => {
      loadPosts({followingIds: following});
    }, [following])
    return (
    <div>
      {!isActivated && 
      <div className="pt2 confirmEmailDiv">
        <div className="tc confirmEmail">
          We have sent an activation link to {email}. Please confirm your email
        </div>
      </div>}
        {addPostOpen ? 
        <>
        <PostModal>
          <AddPost addPostOpen={addPostOpen} setAddPostOpen={setAddPostOpen}/>
        </PostModal>
          <div className="addButtonDiv grow"
            onClick={()=>{setAddPostOpen(true)}}>
          </div>
          </>
          :
          <div className="addButtonDiv grow"
            onClick={()=>{
              if (isActivated) {
                setAddPostOpen(true)
              } else {
                unActivatedEmail("create a post")
              }
            }}>
          </div> 
          }
        {createCards(posts, userId)}
    </div>
    );
}

function mapStateToProps (state){
  return {
    posts: state.PostsSlice.posts, 
    authorized: state.UserSlice.authorized,
    isActivated: state.UserSlice.isActivated,
    email: state.UserSlice.email,
    userId: state.UserSlice.userId,
    following: state.UserSlice.following,
  }
}
function mapDispatchToProps(dispatch){
return { 
    loadPosts: (followingIds) => dispatch(getFollowingPosts(followingIds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Following);