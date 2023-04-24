import {ButtonHTMLAttributes, ReactNode} from 'react'

import styles from "./NavButton.module.sass"

interface INavButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export const NavButton = ({className, children, ...props}: INavButtonProps) => {
  return (
    <button {...props} className={`${styles.navButton} ${className ? styles[className] : ""}`}>{children}</button>
  )
}
