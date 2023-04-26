import React from 'react'
import styles from './Button.module.css'

function Button(props) {
    // === props ===
    // title: 버튼의 제목
    // onClick: 버튼 클릭시 수행될 함수

    return (
        <button className={styles.Button} onClick={props.onClick}>
            {props.title || "Button"}
        </button>
    )
}

export default Button