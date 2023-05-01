import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Page.module.css'
import style from '../ui/Button.module.css'
// 그냥 겹치지 않게 임포트한거임

import Modal from 'react-modal'

import TextInput from '../ui/TextInput'
import CommentList from '../list/CommentList'
import Button from '../ui/Button'
// import data from '../../data.json'
import { db } from '../../firebase'

import ThemeToggle from '../../ThemeToggle'
import { useTheme } from '../../context/themeProvider'

Modal.setAppElement('#root'); //모달창 렌더

function PostViewPage(props) {

    const nav = useNavigate();
    const postId = useParams().id
    const [ThemeMode, toggleTheme] = useTheme();

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
    }, [postId]) // function 옆에 빈 배열을 넣어야지 계속 돌지 않음 - 현재페이지랑은 상관없는 필기

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 열림 여부 상태 변수

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleDelete = () => {
        db.collection('post').doc(postId).delete().then(() => {
            nav('/');
        });
    };

    const [comment, setComment] = useState('')

    return (
        <div className={styles.wrap}>

            <ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
                DarkMode
            </ThemeToggle>

            <div className={styles.container}>

                {/* <h1>NEW BLOG</h1> */}

                <Button className={style.Button} title="Back" onClick={function (e) {
                    // console.log("메인 페이지로 이동") 
                    nav('/')
                }} />

                <div className={style.deleteContainer}>
                    <Button className={style.deleteButton} title="Delete Post" onClick={openModal}
                    />

                    <Modal className={styles.modalContainer}
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}>

                        <h2 className={styles.modalTitle}>글을 삭제하시겠습니까?<br /></h2>
                        <h3 className={styles.modalsubTitle}>삭제하시면 다시 복구시킬 수 없습니다.<br /></h3>

                        <Button className={style.yesButton} title="확인" onClick={handleDelete} />
                        <Button className={style.cancelButton} title="취소" onClick={closeModal} />
                    </Modal>
                </div>

                <div className={styles.Post_Container}>
                    <p className={styles.Title_Text}>{post.title}</p>

                    <p className={styles.Content_Text}>{post.content}</p>
                </div>

                <p className={styles.Comment_Label}>All comments</p>

                <CommentList
                    comments={post.comments} />

                <TextInput

                    height={30}
                    value={comment}
                    onChange={function (e) { setComment(e.target.value) }} />
                <div className={style.commentContainer}>
                    <Button
                        className={style.Button2}
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
        </div>
    )
}

export default PostViewPage