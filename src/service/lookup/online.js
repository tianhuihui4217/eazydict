'use strict'

const debug = require('../../lib/debug')
const chalk = require('chalk')
const unicons = require('unicons')
const plugins = require('../../lib/plugins')
const config = require('../../lib/config')

/**
 * 在线查询
 */

function online (words) {
  if (plugins && !plugins.length) {
    console.log()
    console.log()
    console.log(chalk.red(`  ${unicons.cli('cross')} 没有启用任何插件!`))
    console.log()
    process.exit()
  }

  let pluginList = plugins.map(plugin => {
    debug(`load plugin ${plugin} use config: %O`, config.plugins[plugin])

    // eslint-disable-next-line global-require
    return require(plugin)(words, config.plugins[plugin])
  })

  return Promise.all(pluginList).then(data => {
    let successData = []

    data.forEach(item => {
      if (item.error.code !== 0) {
        debug(`${item.pluginName} error: ${item.error.message}`)
      }

      successData.push(item)
    })

    return Promise.resolve(successData)
  })
}

module.exports = online
