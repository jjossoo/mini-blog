import React from 'react'
import styles from './List.module.css'
import CommentItem from './CommentItem'

function CommentList(props) {
    // ===props===
    // comments: 글의 코멘트 데이터 [{id, content} ...]

    const list = props.comments.map(function (comment) {
        return (
            <CommentItem key={comment.id}
                content={comment.content} />
        )
    })

    return (
        <div>{list}</div>
    )
}

export default CommentList