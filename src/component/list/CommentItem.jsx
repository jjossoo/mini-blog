import React from 'react'
import styles from './List.module.css'

function CommentItem(props) {
    // ===props===
    // content: 글 내용 

    return (
        <div className={styles.Comment_Wrapper}>
            {props.content}
        </div>
    )
}

export default CommentItem