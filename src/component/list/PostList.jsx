import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './List.module.css'
import PostItem from './PostItem'

function PostList(props) {
    // === props ===
    // posts: 글 데이터 [{id, title, comment}...]
    // onClickItem: 클릭시 수행될 함수 -> 취소

    const nav = useNavigate();

    const list = props.posts.map(function (post) {
        return (
            <PostItem 
            key={post.id} 
            title={post.title}
            onClick={function () { 
              // console.log(post.id + '페이지로 이동')
              nav('/post/' + post.id)
            }} />)
    })
    return (
        <div className={styles.PostList_Wrapper}>
            {list}
        </div>
    )
}
export default PostList