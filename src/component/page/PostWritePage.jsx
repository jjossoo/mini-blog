import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Page.module.css'
import TextInput from '../ui/TextInput'
import Button from '../ui/Button'
import { db } from '../../firebase'

function PostWritePage(props) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const nav = useNavigate();

    return (
        <div className={styles.wrap}>
            <div className={styles.container}>

                <h1>Title</h1>
                <TextInput height={48}
                    value={title}
                    onChange={function (e) { setTitle(e.target.value) }}
                />
                <br />
                <h1>Contents</h1>
                <TextInput height={300}
                    value={content}
                    onChange={function (e) { setContent(e.target.value) }} />
                <br />

                <Button title="Upload-!"
                    onClick={function () {
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
                    }} />


            </div>
        </div>
    )
}

export default PostWritePage