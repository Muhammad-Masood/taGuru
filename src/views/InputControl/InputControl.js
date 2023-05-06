import React from 'react';

import styles from './InputControl.module.css';
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
function InputControl({ label, ...props }) {
    return (
        <div className={styles.container}>
            {label && <label>{label}</label>}
            <input type="text" {...props} />
        </div>
    );
}

export default InputControl;
