import Footer from './Footer'
import Header from './Header'
import React from 'react'

const Layout = (props) => {

    return (
        <div>
            <Header />
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default Layout