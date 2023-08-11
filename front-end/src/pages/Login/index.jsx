import { useEffect, useState } from 'react'
import styles from './index.module.css'

function Login () {

  return (
    <div className={styles.login}>
      <div className={styles.modal_frame}>
        <h2 className={styles.modal_title}>Login</h2>
        <input className={styles.modal_input} />
        <button className={styles.modal_button}>登录</button>
      </div>
      <div className={styles.writer_info}>
        <p>简清</p>
        <p>+86 18079050420</p>
        <p>jessexinyu@foxmail.com</p>
      </div>
    </div>
  )
}

export default Login