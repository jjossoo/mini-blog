import React from 'react'
import styles from './List.module.css'

function PostItem(props) {
    // === props ===
    // title: 글 제목
    // onClick: 클릭시 수행될 함수

    return (
        <div className={styles.Post_Wrapper} onClick={props.onClick}>
            {props.title}
        </div>
    )
}

export default PostItem