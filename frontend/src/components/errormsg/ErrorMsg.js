import React from 'react'
import styles from './ErrorMsg.module.css'
import cx from "classnames";
export default function ErrorMsg({variant, children}) {
    return (
        <div className={cx(styles.alert, styles[variant])}>
            {children}
        </div>
    )
}

//adding change
