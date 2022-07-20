import { React, useState, useEffect } from 'react';
import PostCard from './PostCard';
import addButton from './images/addButton.png'
import { getPosts } from '../../redux/PostsSlice';
import { connect } from 'react-redux'
import  AddPost  from '../../components/Modals/AddPost/AddPost'
import  PostModal  from '../../components/Modals/AddPost/AddPostModal'


const Main = ( props ) => {
    const { posts, authorized, loadPosts } = props
    const [addPostOpen, setAddPostOpen] = useState(false)
    useEffect(() => {
      loadPosts()
    }, [])
    return (
    <div>
        { authorized && addPostOpen ? 
        <>
        <PostModal>
          <AddPost addPostOpen={addPostOpen} setAddPostOpen={setAddPostOpen}/>
        </PostModal>
          <div className="addButtonDiv center">
              <img 
              className='grow addButton' 
              alt='addButton' 
              src={addButton}/>
          </div> 
          </>
          :
          authorized && 
          <div className="addButtonDiv center">
              <img 
              className='grow addButton' 
              alt='addButton' 
              onClick={()=>{setAddPostOpen(true)}} 
              src={addButton}/>
          </div> 
          }
        {createCards(posts)}
    </div>
    );
}

export function createCards (arr) {
    const Cards = arr.map((post, i) => { return (
      <PostCard 
        key = {post._id}
        id = {post._id}
        postUsername = {post.postedBy.username}
        postUserId = {post.postedBy._id}
        text = {post.text}
        date = {post.postedAt}
        likedBy = {post.likedBy}
        comments = {post.comments}
      />
    )})
  return(Cards)
}

function mapStateToProps (state){
  return {
    posts: state.PostsSlice.posts, 
    authorized: state.UserSlice.authorized,
  }
}
function mapDispatchToProps(dispatch){
return { 
    loadPosts: () => dispatch(getPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);













    //[]  for (let i = 0; i < movies.length; i++) {
    //     cardComponent.push(
    //         <Card 
    //         key = {i}
    //         id = {movies[i]._id} 
    //         title = {movies[i].title} 
    //         subtitle = {movies[i].subtitle} 
    //         year = {movies[i].year}
    //         genre = {getStr(movies[i].genre)}
    //         topCast = {getStr(movies[i].topCast)}
    //         synopsis = {movies[i].synopsis}
    //         image = {movies[i].image}
    //         trailer = {movies[i].trailer}
    //         Rating = {movies[i].Rating}
    //         signedIn = {signedIn}
    //         username = {movies[i].username}
    //         email = {movies[i].email}
    //         link = {movies[i].link}
    //         more = {movies[i].more}
    //     />
    //     )
    // }