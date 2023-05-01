import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Page.module.css'
import style from '../ui/Button.module.css'

import PostList from '../list/PostList'
import Button from '../ui/Button'
// import data from '../../data.json'
import { db } from '../../firebase'

import ThemeToggle from '../../ThemeToggle'
import { useTheme } from '../../context/themeProvider'

function MainPage(props) {
    const nav = useNavigate();
    const [data, setData] = useState([]) //3
    const [ThemeMode, toggleTheme] = useTheme(); // 테마, 토글

    useEffect(function () {
        let tempData = []
        db.collection('post').get().then(function (qs) {
            qs.forEach(function (doc) {
                console.log(doc.data());
                tempData.push(doc.data())
            })

            setData(tempData); //2
        })
    }, [])

    return (
       
            <>
                <ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
                    DarkMode
                </ThemeToggle>

                <div className={styles.wrap}>
                    <div className={styles.container}>

                        {/* <h1>NEW BLOG</h1> */}

                        <Button className={style.Button} title="글 작성하기" onClick={function () {
                            // console.log("글 작성 페이지로 이동")
                            nav("/write")
                        }} />

                        <PostList posts={data} onClick={function (id) { console.log(id + "글 작성 페이지로 이동") }} />

                    </div>
                </div>
            </>
    )
}

export default MainPage