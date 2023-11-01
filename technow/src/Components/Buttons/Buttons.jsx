import styles from './Buttons.module.css'
import { RxEnvelopeClosed } from 'react-icons/rx'

export const Button = ({size , subscribed , text }) => {
    const icon = subscribed === true ? <RxEnvelopeClosed className={styles.RxEnvelopeClosed}/> : '' ;
    const class2 = size === "small" ? styles.smallButton : styles.bigButton ;
    return (
        <button className={`${styles.Button} ${class2}`}>
            {icon} {text}
        </button>
    )
}
