import { forwardRef } from "react";
import styles from "./Input.module.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...rest }, ref) => (
    <div className={styles.inputWrapper}>
      <label>{label}</label>
      <input ref={ref} {...rest} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
);

export default Input;
