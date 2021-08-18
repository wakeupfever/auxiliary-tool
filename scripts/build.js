const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const rollup = require('rollup')
const chalk = require('chalk')
const rimraf = require('rimraf')
const typescript = require('rollup-plugin-typescript2')
const uglify = require('rollup-plugin-uglify').uglify
const execa = require('execa')
const ora = require('ora')
const zlib = require('zlib')

const spinner = ora({ prefixText: `${chalk.green('\n[building tasks]')}`})

// 编译 packages/所有模块
// 从ts文件，编译成js文件 再次编译打包，压缩优化文件

const ALL = 'all'

const buildType = [
  {
    format: 'umd',
    ext: '.js'
  },
  {
    format: 'umd',
    ext: '.min.js'
  },
  {
    format: 'es',
    ext: '.esm.js'
  }
]

/**
 * @description 编译执行器
 * @param {*} builds
 */
function build(builds) {
  let built = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[built], built + 1, () => {
      builds[built - 1] = null
      built++
      if (built < total) {
        next()
      }
    })
  }
  next()
}

/**
 * @description 执行器 内容
 * @param {*} config
 * @param {*} curIndex
 * @param {*} next
 */
function buildEntry(config, curIndex, next) {
  const isProd = /min\.js$/.test(config.output.file)

  spinner.start(`${config.packageName}${config.ext} is buiding now. \n`)

  rollup.rollup(config).then((bundle) => {
    bundle.write(config.output).then(({ output }) => {
      const code = output[0].code

      spinner.succeed(`${config.packageName}${config.ext} building has ended.`)

      function report(extra) {
        console.log(chalk.magenta(path.relative(process.cwd(), config.output.file)) + ' ' + getSize(code) + (extra || ''))
        next()
      }
      if (isProd) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          let words = `(gzipped: ${chalk.magenta(getSize(zipped))})`
          report(words)
        })
      } else {
        report()
      }

      // since we need bundle code for three types
      // just generate .d.ts only once
      if (curIndex % 3 === 0) {
        copyDTSFiles(config.packageName)
      }
    })
  }).catch((e) => {
    spinner.fail('buiding is failed')
    console.log(e)
  })
}

/**
 * @@description 生成注解
 * @param {*} packageName
 */
function copyDTSFiles(packageName) {
  console.log(chalk.cyan('> start copying .d.ts file to dist dir of packages own.'))
  const sourceDir = resolve(`packages/${packageName}/dist/packages/${packageName}/src/`)
  const targetDir = resolve(`packages/${packageName}/dist/types/`)
  execa.commandSync(`mv ${sourceDir} ${targetDir}`, { shell: true })
  console.log(chalk.cyan('> copy job is done.'))
  rimraf.sync(resolve(`packages/${packageName}/dist/packages`))
  rimraf.sync(resolve(`packages/${packageName}/dist/node_modules`))
}

function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

/**
 * @description 描述
 * @param {*} packageName
 * @return {*} 
 */
function generateBanner (packageName) {
  let ret =
    '/*!\n' +
    ' * better-scroll / ' + packageName + '\n' +
    ' * (c) 2016-' + new Date().getFullYear() + ' ustbhuangyi\n' +
    ' * Released under the MIT License.\n' +
    ' */'
  return ret
}

function resolve(p) {
  return path.resolve(__dirname, '../', p)
}

function PascalCase(str) {
  const re = /-(\w)/g;
  const newStr = str.replace(re, function (match, group1) {
    return group1.toUpperCase();
  })
  return newStr.charAt(0).toUpperCase() + newStr.slice(1);
}

/**
 * @description 增加 typescript 配置功能
 * @param {*} isMin
 * @return {*} 
 */
function generateBuildPluginsConfigs(isMin) {
  const tsConfig = {
    verbosity: -1,
    tsconfig: path.resolve(__dirname, '../tsconfig.json'),
  }
  const plugins = []
  if (isMin) {
    plugins.push(uglify())
  }
  plugins.push(typescript(tsConfig))
  return plugins
}

/**
 * @description 生成 rollup 配置文件
 * @param {*} packagesName
 * @return {*} 
 */
function generateBuildConfigs(packagesName) {
  const result = []
  packagesName.forEach(name => {
    buildType.forEach((type) => {
      let config = {
        input: resolve(`packages/${name}/src/index.ts`),
        output: {
          file: resolve(`packages/${name}/dist/${name}${type.ext}`),
          name: PascalCase(name),
          format: type.format,
          banner: generateBanner(name)
        },
        plugins: generateBuildPluginsConfigs(type.ext.indexOf('min') > -1, name)
      }
      // rename
      if (name === 'core' && config.output.format !== 'es') {
        config.output.name = 'Auxiliary-Tool'
        /** Disable warning for default imports */
        config.output.exports = 'named'
        // it seems the umd bundle can not satisfies our demand
        config.output.footer = 'if(typeof window !== "undefined" && window.BScroll) { \n' +
          '  window.BScroll = window.BScroll.default;\n}'
      }
      // rollup will valiate config properties of config own and output a warning.
      // put packageName in prototype to ignore warning.
      Object.defineProperties(config, {
        'packageName': {
          value: name
        },
        'ext': {
          value: type.ext
        }
      })
      result.push(config)
    })
  })
  return result
}

/**
 * @description 清理旧文件
 * @param {*} packagesName
 */
function cleanPackagesOldDist(packagesName) {
  packagesName.forEach(name => {
    const distPath = resolve(`packages/${name}/dist`)
    const typePath = resolve(`packages/${name}/dist/types`)

    if (fs.existsSync(distPath)) {
      rimraf.sync(distPath)
    }

    fs.mkdirSync(distPath)
    fs.mkdirSync(typePath)
  })
}

/**
 * @description 获取所有插件包
 * @return {*} 
 */
function getPackagesName() {
  let result
  let allPackagers = fs.readdirSync(resolve('packages'))
  result = allPackagers
    .filter(name => {
      const isHiddenFile = /^\./g.test(name)
      return !isHiddenFile
    }).filter(name => {
      const isPrivatePackages = require(resolve(`packages/${name}/package.json`)).private
      return !isPrivatePackages
    })

  return result
}

/**
 * @description 获取需要更新的包的资源
 * @param {*} packagesName
 * @return {*} 
 */
const getAnswersFromInquirer = async (packagesName) => {
  const question = {
    type: 'checkbox',
    name: 'packages',
    scroll: false,
    message: 'Select build repo(Support Multiple selection)',
    choices: packagesName.map(name => ({
      value: name,
      name
    }))
  }
  let { packages } = await inquirer.prompt(question)
  if (!packages.length) {
    console.log(chalk.yellow(`
      It seems that you did't make a choice.

      Please try it again.
    `))
    return
  }

  if (packages.includes(ALL)) {
    packages = getPackagesName()
  }

  const { yes } = await inquirer.prompt([{
    name: 'yes',
    message: `Confirm build ${packages.join(' and ')} packages?`,
    type: 'list',
    choices: ['Y', 'N']
  }])

  if (yes === 'N') {
    console.log(chalk.yellow('[release] cancelled.'))
    return
  }

  return packages
}

const init = async () => {
  // 获取所有模块名字
  const packagesName = getPackagesName()

  // 注入全部属性
  packagesName.unshift(ALL)

  // 过滤选中对象
  const answers = await getAnswersFromInquirer(packagesName)

  if (!answers) return

  // 清空之前打包的文件
  cleanPackagesOldDist(answers)

  const buildConfigs = generateBuildConfigs(answers)

  console.log(buildConfigs)

  build(buildConfigs)
}

init().catch(err => {
  console.error(err)
  process.exit(1)
})