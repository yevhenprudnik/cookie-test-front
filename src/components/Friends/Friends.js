import React from 'react'

export default function Friends() {
  return (
    <div className='pa3'>
      <article className='br3 ba b--black-10 w-100 mw7 shadow-5 center bg-white'>
            <main className='pa2 black-80 w-80'>
            <div className=''>
              <h2>@Friend</h2>
            </div>
              {/* {comments.map((comment, i) =>{ return(
                <div className='commentDiv'key = {i}>
                  <h2>@{comment.by}:</h2>
                  <h3>{comment.text}</h3>
                </div>
              )})} */}
            </main>
          </article>
    </div>
  )
}
