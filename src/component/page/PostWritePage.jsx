import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Page.module.css'
import style from '../ui/Button.module.css'
import TextInput from '../ui/TextInput'
import Button from '../ui/Button'
import { db } from '../../firebase'

import Modal from 'react-modal'
import ThemeToggle from '../../ThemeToggle'
import { useTheme } from '../../context/themeProvider'

function PostWritePage(props) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const nav = useNavigate();

    const [ThemeMode, toggleTheme] = useTheme();

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 열림 여부 상태 변수


    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };


    const handleUpload = () => {
        let timestamp = new Date().getTime().toString();
        let writedate = new Date().toDateString();
        db.collection('post').doc(timestamp).set({
            id: timestamp,
            title: title,
            content: content,
            date: writedate,
            comments: []
        }).then(function () {
            nav("/")
        })
    };

    return (
        <div className={styles.wrap}>

            <ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
                DarkMode
            </ThemeToggle>

            <div className={styles.container}>
                <Button className={style.Button} title="Back" onClick={function (e) {
                    // console.log("메인 페이지로 이동") 
                    nav('/')
                }} />
                <h1>Title</h1>
                <TextInput
                    height={48}
                    value={title}
                    onChange={function (e) { setTitle(e.target.value) }}
                />
                <br />
                <h1>Contents</h1>
                <TextInput height={300}
                    value={content}
                    onChange={function (e) { setContent(e.target.value) }} />
                <br />

                <div className={style.uploadContainer}>
                    <Button
                        className={style.Button}
                        title="Upload-!"
                        onClick={openModal}
                    />
                    <Modal className={styles.modalContainer}
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}>

                        <h2 className={styles.modalTitle}>글을 업로드하시겠습니까?<br /></h2>
                        <h3 className={styles.modalsubTitle}>업로드 후 지울 수 있습니다.<br /></h3>

                        <Button className={style.yesButton} title="확인" onClick={handleUpload} />
                        <Button className={style.cancelButton} title="취소" onClick={closeModal} />
                    </Modal>
                </div>

            </div>
        </div>
    )
}

export default PostWritePage