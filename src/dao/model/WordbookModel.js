'use strict'

/**
 * 生词本
 */

const Sequelize = require('sequelize')
const connection = require('../db/connection')

let fields = {
  // 对应的History ID
  historyId: {
    type: Sequelize.INTEGER
  }
}

let options = {
  tableName: 'wordbook',
  indexes: [
    {
      unique: true,
      fields: ['historyId']
    }
  ]
}

const Wordbook = connection.define('wordbook', fields, options)

module.exports = function () {
  return Wordbook
    .sync({
      logging: false
    })
    .then(() => Wordbook)
}
