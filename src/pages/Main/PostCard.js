import { React, useState } from 'react'
import { connect } from 'react-redux'
import { likePost } from '../../redux/PostsSlice'
import { selectUserToFind } from '../../redux/UserSlice'
import comment from './images/comment.png'
import liked from './images/heartLiked.png'
import like from './images/heart.png'
import handleUnsignedUser from '../../helper/handleUnsignedUser'
import './Main.css'
import AddCommentModal from '../../components/Modals/Comments/AddCommentModal'
import AddComment from '../../components/Modals/Comments/AddComment'
import LoaderModal from '../../components/Modals/Loader/LoaderModal'
import Loader from '../../components/Modals/Loader/Loader'
import { Link } from 'react-router-dom'


const PostCard =( { 
  text, postUsername, date, likedBy, userId, 
  id, handleLike, authorized, comments, 
  selectUserToFind, postUserId, postUserImg } ) => {

  const [ postId, setId ] = useState(null);
  const [ commentModalOpen, setCommentModal ] = useState(false)
  let likeImage; 
  const idUser = likedBy.findIndex(e => e._id === userId)
  idUser !== -1 ? likeImage = liked : likeImage = like
  const [myForceRender, setMyForceRender] = useState(0)
  const [ likeImg, setLikeImg ] = useState(likeImage)
  const [count, setCount] = useState(likedBy.length)
  const [loading, setLoading] = useState(false)
  return (
    <>
    {
      commentModalOpen && 
      <AddCommentModal>
        <AddComment setCommentModal={setCommentModal} comments={comments} id={id}/>
      </AddCommentModal>
    }
    {
    loading &&
    <LoaderModal>
      <Loader />
    </LoaderModal>
    }
      <div className='center' onMouseEnter={() => {
        setId(id)
        localStorage.setItem('userToFind', postUserId)
        selectUserToFind(postUserId)
        }}>
        {/* onClick={() => console.log(username)} */}
        <div className="dib br3 pa3 ma3 grow1 cardComponent">
          <div className="">
            <Link className="username link userNameStyle MyContainer" 
            to={`/userProfile?userToGet=${localStorage.getItem('userToFind')}`}>
              <div className="PostUserImgDiv">
                <img src={postUserImg} className="PostUserImg"/>
              </div>
              @{postUsername}
            </Link>
          </div>
            <div className="contentText">
              {text}
            </div>
            <div className="container1">
              <div className="date">
                {date}
              </div>
              <div className="likeCommentDiv">
                <div className="container1 likeComment">
                  <div className="like container1">
                    <div className="likesDiv">
                      <div className="likes">{count}</div>
                    </div>
                      <div className="imgDiv pr1">
                        <img className="grow likeImg" src={likeImg} alt='like' onClick={() => {
                            if (authorized) {
                              handleLike({postId, userId})
                              setLoading(true)
                              setTimeout(() => {
                                setLoading(false)
                                setLikeImg(likeImg === like ? liked : like)
                                setCount(likeImg === like ? count + 1 : count - 1)
                              },300)
                              setMyForceRender(myForceRender+1)
                            }
                            else {
                              handleUnsignedUser('like a post')
                            }
                          }}/>
                      </div>
                  </div>
                  <div className="comment  pl1" onClick={() => {
                    if (authorized) {
                      setCommentModal(true)
                    }
                    else {
                      handleUnsignedUser('comment a post')
                    }
                    }}>
                    <img className="commentImg grow" alt='comment' src={comment}/>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
);
}

const mapDispatchToProps = (dispatch) => {
  return { 
    handleLike: (user) => dispatch(likePost(user)), 
    selectUserToFind : (userId) => dispatch(selectUserToFind(userId))
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.UserSlice.username, 
    authorized: state.UserSlice.authorized,
    userId: state.UserSlice.userId
  }
}
  export default connect(mapStateToProps, mapDispatchToProps)(PostCard)