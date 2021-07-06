#! /usr/bin/env node

const program = require('commander');
const download = require('download-git-repo')
const inquirer = require('inquirer')
const chalk = require('chalk')
const ora = require('ora')
const fs = require('fs')

const spinner = ora(chalk.yellow('Downloading template ...'))

const Version = '1.1.7'

// 修改项目package.json
function setPackage(projectName, answers) {
    const packagePath = `${projectName}/package.json`
    console.log('packagePath',packageJson)
    const packageJson = fs.readFileSync(packagePath, 'utf-8')
    console.log('packageJson',packageJson)
    const packageResult = JSON.stringify(Object.assign({}, JSON.parse(packageJson), answers), null, 4)
    console.log('packageResult',packageResult)
    fs.writeFileSync(packagePath, packageResult)
}

// 修改项目名称配置文件
function setProjectName(projectName, fullName, shortName) {
    const configPath = `${projectName}/src/conf/index.js`;
    const str =
    `// 项目全称
const FullName = '${fullName}'

// 项目简称
const ShortName = '${shortName}'

export {
    FullName,
    ShortName
}
    `
    fs.writeFileSync(configPath, str)
}

// 设置空业务路由
function setEmptyRouterMap(projectName) {
    const routerPath = `${projectName}/src/router/asyncRouterMap.js`
    const str =
    `// 业务路由表
export const asyncRouterMap = []
`
    fs.writeFileSync(routerPath, str)
}

// 名称校验
function validateName(val) {
    if(/^[\u4e00-\u9fa5]+$/.test(val)) {
        return true
    } else {
        return "name must be chinaese"
    }
}

// 问答内容
const promptList = [
    // 项目全称
    {
        type: 'input',
        message: 'please set project fullname',
        name: 'fullName',
        validate: validateName
    },
    // 项目简称
    {
        type: 'input',
        message: 'please set project shortname',
        name: 'shortName',
        validate: validateName
    },
    // 是否需要初始演示路由
    {
        type: 'list',
        message: 'do you need a example router:',
        name: 'router',
        default: 'no',
        choices: [
            "no",
            "yes"
        ]
    }
]

program.version(Version, '-v, --version')
    .command('init <projectName>')
    .action((projectName) => {
        inquirer.prompt(
            promptList
        ).then(answers => {
            console.log('answers',answers);
            spinner.start()
            download('github:tianzhu1992/blocks-admin-vue', projectName, (err) => {
                spinner.succeed()
                const {fullName, shortName, router} = answers

                // 设置package.json的名称与版本号
                // setPackage(projectName, {name: projectName, version: Version})

                // 修改项目名称信息
                setProjectName(projectName, fullName, shortName)

                // 设置静态初始路由
                if(router === 'no') {
                    setEmptyRouterMap(projectName)
                }

                // 下载代码成功/失败提示
                console.log(err ? chalk.red('Something Wrong In Download Template') : chalk.green('Download Template Success'))
            })
        });
    })
program.parse(process.argv);
