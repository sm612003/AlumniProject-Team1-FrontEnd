import { useGlobalToast } from "../../Context/ToastContext";
import styles from "./Toast.module.css";

const Toast = () => {
  const { globalToast } = useGlobalToast();
  return (
    <>
      {globalToast && (
        <div className={styles.Toast}>
          <h2 className={styles.Header}>{globalToast.title}</h2>
          <p className={styles.Body}>{globalToast.text}</p>
        </div>
      )}
    </>
  );
};

export default Toast;
