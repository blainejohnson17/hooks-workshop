import React, { useState, useEffect } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

function Feed() {

  const [posts, setPosts] = useState([])
  const [newPosts, setNewPosts] = useState([])
  const [numPosts, setNumPosts] = useState(3)
  const [createdBefore, setCreatedBefore] = useState(Date.now())

  useEffect(() => {
    return subscribeToNewFeedPosts(createdBefore, posts => {
      console.log(new Date(createdBefore))
      console.log(posts.map(post => new Date(post.createdAt)))
      setNewPosts(posts)
    })
  }, [createdBefore])

  useEffect(() => {
    let isCurrent = true
    loadFeedPosts(createdBefore, numPosts).then((posts) => {
      if (isCurrent) setPosts(posts)
    })
    return () => isCurrent = false
  }, [createdBefore, numPosts])

  return (
    <div className="Feed">
      <div className="Feed_button_wrapper">
        <button onClick={() => {
          setCreatedBefore(Date.now())
          setNumPosts(numPosts + newPosts.length)
        }} className="Feed_new_posts_button icon_button">
          View {newPosts.length} New Posts
        </button>
      </div>

      {posts.map(post => (
        <FeedPost key={post.id} post={post} />
      ))}


      <div className="Feed_button_wrapper">
        <button onClick={() => {setNumPosts(numPosts + 3)}} className="Feed_new_posts_button icon_button">View More</button>
      </div>
    </div>
  )
}
