import React from 'react';
import styles from './Loading.module.css'
export default function Loading() {
    return (
        <div className={styles.loading}>
            <i className="fa fa-spinner"></i> Loading...

        </div>
    )
}