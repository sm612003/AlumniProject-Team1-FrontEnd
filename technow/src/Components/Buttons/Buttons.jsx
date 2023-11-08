import styles from './Buttons.module.css'
import { RxEnvelopeClosed } from 'react-icons/rx'

export const Button = ({size , subscribed , text , color , type}) => {
    const icon = subscribed === true ? <RxEnvelopeClosed className={styles.RxEnvelopeClosed}/> : '' ;
    const Size = size === "small" ? styles.smallButton : styles.bigButton ;
    const Color = color === "green" ? styles.green : styles.red ;
    return (
        <button className={`${styles.Button} ${Size} ${Color}`} type={type}>
            {icon} {text}
        </button>
    )
}