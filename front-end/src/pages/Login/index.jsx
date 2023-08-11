import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.css'

function Login () {
  const nameRef = useRef('')
  const navigate = useNavigate()
  const handleSubmit = e => {
    // const target = e.target
    const nameVal = nameRef.current.value
    const userInfo = {
      name: nameVal,
      isAdmin: nameVal === 'tom'
    }
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    navigate('/main')
    e.preventDefault()
    return false
  }

  return (
    <div className={styles.login}>
      <div className={styles.modal_frame}>
        <h2 className={styles.modal_title}>Login</h2>
        <form className={styles.form} onSubmit={e => handleSubmit(e)}>
          <div className={styles.form_item}>
            <input name='name' ref={nameRef} className={styles.modal_input} />
          </div>
          <div className={styles.form_item}>
            <button type='submit' className={styles.modal_button}>登录</button>
          </div>
        </form>
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