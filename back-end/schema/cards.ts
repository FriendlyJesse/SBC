import joi from 'joi'

// 单词
const word = joi.string().alphanum().required()
// id
const id = joi.number().integer().min(1).required()


export const addSchema = {
  body: {
    word
  }
}

export const delSchema = {
  body: {
    id
  }
}

export const updateSchema = {
  body: {
    id,
    word
  }
}