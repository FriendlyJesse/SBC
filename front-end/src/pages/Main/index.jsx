import { useState, useEffect, useRef } from 'react'
import styles from './index.module.css'

function Main () {
  const inputRef = useRef('')
  // get UserInfo
  let userInfo = localStorage.getItem('userInfo')
  if (userInfo !== '' && userInfo !== undefined && userInfo !== null) {
    userInfo = JSON.parse(userInfo)
  }
  // cards
  const [cards, setCards] = useState([
    {
      index: 1,
      value: '',
      active: false,
      editing: false
    },
    {
      index: 2,
      value: '',
      active: false,
      editing: false
    },
    {
      index: 3,
      value: '',
      active: false,
      editing: false
    }
  ])
  const [showIndex, setShowIndex] = useState(0)

  // 重置卡片状态
  const resetCard = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    const newCards = cards.map((item, index) => {
      item.active = false
      item.editing = false
      return item
    })
    setCards(newCards)
  }
  // 根据点击卡片的面，调整方向
  const handleCardClick = (type, cardsItem) => {
    resetCard()
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
  // useEffect(() => {
  //   setShowIndex(1)
  // }, [])
  // 切换卡片
  const handleTriggerClick = (type) => {
    let index = showIndex
    if (type === 'left') {
      showIndex > 0 ? index-- : index = 0
    } else if (type === 'right') {
      showIndex < cards.length - 1 ? index++ : index = cards.length - 1
    }
    setShowIndex(index)
    resetCard()
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
  const handleEdit = () => {
    const currentItem = cards[showIndex]
    let newCards
    newCards = cards.map((item, index) => {
      
      if (index === showIndex) {
        // 如果没有翻到背面，则跳到背面
        if (currentItem.active === false) item.active = true
        // 设置为编辑状态
        if (item.editing) {
          let value = inputRef.current.value
          item.value = value
          item.editing = false
        } else {
          item.editing = true
        }
      }
      
      return item
    })
    setCards(newCards)
  }
  // 输入框
  // const handleInput = (e, cardItem) => {
  //   const value = e.target.value
  //   const newCards = cards.map((item, index) => {
  //     if (cardItem.index === item.index) {
  //       item.value = value
  //     }
  //     return item
  //   })
  //   setCards(newCards)
  //   e.stopPropagation()
  //   return false
  // }
  
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
                <div onClick={() => handleCardClick('back', item)} className={styles.card_back}>
                  {
                    item.editing ? <input ref={inputRef} onClick={e => {
                      e.stopPropagation()
                    }} /> : item.value
                  }
                </div>
              </div>
            )
          })
        }
        <div onClick={() => handleTriggerClick('left')} className={styles.triggerLeft}>previous</div>
        <div onClick={() => handleTriggerClick('right')} className={styles.triggerRight}>next</div>
      </div>
      {
        userInfo.isAdmin && <div className={styles.operation}>
          <button onClick={() => handleDel()} className={styles.del}>删除</button>
          <button onClick={() => handleEdit()} className={styles.edit}>修改</button>
        </div>
      }
    </div>
  )
}

export default Main