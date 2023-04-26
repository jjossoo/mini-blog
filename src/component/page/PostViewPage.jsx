import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Page.module.css'

import TextInput from '../ui/TextInput'
import CommentList from '../list/CommentList'
import Button from '../ui/Button'

// import data from '../../data.json'
import { db } from '../../firebase'

function PostViewPage(props) {

    const nav = useNavigate();
    const postId = useParams().id

    // const post = data.find(function (item) {
    //     return item.id == postId
    // })

    const [post, setPost] = useState({
        id: 0,
        title: '',
        content: '',
        comments: [],
    }) // 초기값 넣기

    useEffect(function () {
        db.collection('post').doc(postId).get().then(function (doc) {
            setPost(doc.data()) //읽은 내용으로 state 변경
        })
    }, []) // function 옆에 빈 배열을 넣어야지 계속 돌지 않음

    const [comment, setComment] = useState('')

    return (
        <div className={styles.wrap}>
            <div className={styles.container}>

                <h1>NEW BLOG</h1>

                <Button title="Back" onClick={function (e) {
                    // console.log("메인 페이지로 이동") 
                    nav('/')
                }} />

                <div className={styles.Post_Container}>
                    <p className={styles.Title_Text}>{post.title}</p>
                    <p className={styles.Content_Text}>{post.content}</p>
                </div>

                <p className={styles.Comment_Label}>All comments</p>

                <CommentList
                    comments={post.comments} />

                <TextInput
                    height={40}
                    value={comment}
                    onChange={function (e) { setComment(e.target.value) }} />

                <Button
                    title="Comment-!"
                    onClick={function () {
                        let timestamp = new Date().getTime().toString();
                        let tempComments = post.comments
                        tempComments.push({
                            id: (postId + '_' + timestamp),
                            content: comment
                        })

                        db.collection('post').doc(postId).update({
                            comments: tempComments
                        }).then(function () {
                            setComment('')
                        })
                    }} />
            </div>
        </div>
    )
}

export default PostViewPage