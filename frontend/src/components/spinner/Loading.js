import React from 'react';
import styles from './Loading.module.scss'
export default function Loading() {
    return (
        <div className={styles.loading}>
            <i className="fa fa-spinner"></i> Loading...

        </div>
    )
}