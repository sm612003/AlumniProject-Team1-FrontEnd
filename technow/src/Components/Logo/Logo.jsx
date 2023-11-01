import styles from './Logo.module.css'

export const Logo = ({color}) =>{
    const logoColor = color === "green" ? styles.LogoGreen : styles.LogoWhite

    return(
        <div>
            <p className={`${styles.Logo} ${logoColor}`}>TechNow</p>
            <span className={styles.Span}>News</span>
        </div>
    )
}