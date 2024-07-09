import * as fs from 'node:fs'
// const fs = require('fs');

// 从 version.json 读取当前版本
// const versionJson = require('./public/version.json');

import versionJson from './public/version.json';
console.log("versionJson：", versionJson)
const webVersion = versionJson.version;
console.log("webVersion:", webVersion)
/** 更新版本函数 */
const incrementVersion = version => {
    const versionArray = version.split('.')
    const [major, minor, patch] = versionArray

    // 检查补丁版本是否为9，然后增量更新此版本号
    if(parseInt(patch) === 9) {
        const newMinor = parseInt(minor) + 1
        return `${major}.${newMinor}.0`
    }

    // 增量更新此版本号
    const newPatch = parseInt(patch) + 1
    return `${major}.${minor}.${newPatch}`
}

// 计算新版本号
const newVersion = incrementVersion(webVersion);

// 基于新版本号创建 version.json
const metaJson = { version: newVersion }
fs.writeFileSync(
    './public/version.json',
    JSON.stringify(metaJson, null, 2),
    'utf-8'
)

console.log('Version has been updated in version.json:', newVersion)
