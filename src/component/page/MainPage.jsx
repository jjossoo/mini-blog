import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Page.module.css'
import PostList from '../list/PostList'
import Button from '../ui/Button'
// import data from '../../data.json'
import { db } from '../../firebase'

function MainPage(props) {
    const nav = useNavigate();
    const [data, setData] = useState([]) //3

    useEffect(function () {
        let tempData = []
        db.collection('post').get().then(function (qs) {
            qs.forEach(function (doc) {
                tempData.push(doc.data())
            })
            setData(tempData); //2
        })
    })


    return (
        <div className={styles.wrap}>
            <div className={styles.container}>

                <h1>NEW BLOG</h1>

                <Button title="글 작성하기" onClick={function () {
                    // console.log("글 작성 페이지로 이동")
                    nav("/write")
                }} />

                <PostList posts={data} onClick={function (id) { console.log(id + "글 작성 페이지로 이동") }} />

            </div>
        </div>
    )
}

export default MainPage