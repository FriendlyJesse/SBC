import { useState, useEffect } from 'react'
import styles from './index.module.css'

function Main () {
  // get UserInfo
  let userInfo = localStorage.getItem('userInfo')
  if (userInfo !== '' && userInfo !== undefined && userInfo !== null) {
    userInfo = JSON.parse(userInfo)
  }
  // cards
  const [cards, setCards] = useState([
    {
      index: 1,
      value: '123',
      active: false
    },
    {
      index: 2,
      value: '',
      active: false
    },
    {
      index: 3,
      value: '',
      active: false
    }
  ])
  const [showIndex, setShowIndex] = useState(0)
  // 根据点击卡片的面，调整方向
  const handleCardClick = (type, cardsItem) => {
    let newCards
    if (type === 'front') {
      newCards = cards.map((item) => {
        if (cardsItem.index === item.index) {
          item.active = true
        } else {
          item.active = false
        }
        return item
      })
    } else {
      newCards = cards.map((item) => {
        item.active = false
        return item
      })
    }
    setCards(newCards)
  }
  useEffect(() => {
    setShowIndex(1)
  }, [])
  // 切换卡片
  const handleTriggerClick = (type) => {
    let index = showIndex

    if (type === 'left') {
      showIndex > 0 ? index-- : index = 0
    } else if (type === 'right') {
      showIndex < cards.length - 1 ? index++ : index = cards.length - 1
    }
    setShowIndex(index)
  }
  // operation
  const handleDel = () => {
    if (cards.length - 1 <= 0) {
      alert('已经是最后一项了，还是别删了吧~')
      return
    }
    const newCards = cards.filter((item, index) => index !== showIndex)
    setCards(newCards)
    // 如果删除的那一项是最后一项，则跳到第一个卡片
    if (showIndex > newCards.length - 1) {
      setShowIndex(0)
    }
  }
  
  return (
    <div className={styles.main}>
      <div className={styles.name}>Login: {userInfo.name}</div>
      <div className={styles.wrapper}>
        {
          cards.map((item, index) => {
            return (
              <div
                className={[styles.card, index === showIndex ? styles.show : '', item.active ? styles.active : ''].join(' ')}
                key={index}
              >
                <div onClick={() => handleCardClick('front', item)} className={styles.card_front}>{item.index}</div>
                <div onClick={() => handleCardClick('back', item)} className={styles.card_back}>{item.value}</div>
              </div>
            )
          })
        }
        <div onClick={() => handleTriggerClick('left')} className={styles.triggerLeft}>previous</div>
        <div onClick={() => handleTriggerClick('right')} className={styles.triggerRight}>next</div>
      </div>
      <div className={styles.operation}>
        <button onClick={() => handleDel()} className={styles.del}>删除</button>
        <button className={styles.edit}>修改</button>
      </div>
    </div>
  )
}

export default Main