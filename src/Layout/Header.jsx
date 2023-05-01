import styles from './Header.module.css'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className={styles.Header}>
            <div className={styles.container}>
                <Link to="/"><div className={styles.logo}>Blog</div></Link>

                <nav className={styles.navigation}>
                    <ul>
                        <li>
                            <Link to="/write"><div className={styles.posting} /></Link>
                        </li>
                        <li>
                            <div className={styles.viewpost} />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header