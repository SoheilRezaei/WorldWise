import styles from './Button.module.css'

type ButtonProps = {
    children: React.ReactNode;
    onClick?: (e) => void;
    type: 'primary' | 'back' | 'position';

}

function Button({children, onClick, type} : ButtonProps ) {
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
            {children}
        </button>
    )
}

export default Button;