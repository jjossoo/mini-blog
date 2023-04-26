import React from 'react'
import styles from './TextInput.module.css'

function TextInput(props) {
    // === props ===
    // height: 높이
    // value: 기본값
    // onChange: 변경시 실행될 이벤트함수

    return (
        <textarea className={styles.TextInput}
            style={{ '--height': props.height + 'px' }}
            height={props.height}
            value={props.value}
            onChange={props.onChange}>
        </textarea>
    )
}

export default TextInput