// https://blog.csdn.net/qq_25496415/article/details/124169285
// https://zhuanlan.zhihu.com/p/547490382  图解用户登录验证流程
// 第一种
const SM4 = require('gm-crypto').sm4
const sm4Config = {
    // 配置sm4参数
    key: localStorage.getItem('sec'), // 
    mode: 'ecb', // 加密的方式有两种，ecb和cbc两种，也是看后端如何定义的，不过要是cbc的话下面还要加一个iv的参数，ecb不用
    cipherType: 'base64' //
}

// 第二种封装
// 7、请求报文加密
export function sm4_encryption(params) {
    const SM4 = require('gm-crypto').sm4
    const sm4Config = {
        // 配置sm4参数
        key: localStorage.getItem('sec'), // 随机获取的key
        mode: 'ecb', // 加密的方式有两种，ecb和cbc两种，也是看后端如何定义的，不过要是cbc的话下面还要加一个iv的参数，ecb不用
        cipherType: 'base64' //
    }
    const sm4 = new SM4(sm4Config) // 这里new一个函数，将上面的sm4Config作为参数传递进去。然后旧可以开心的加密了
    const Account = sm4.encrypt(JSON.stringify(params)) // 账号加密
    const data = {
        data: Account
    }
    return data
}

/** 
 * 另外在url拼接参数里面有单独参数encrypt可以告知后台我们哪些接口需要单独不加密
 * encrypt=0表示前端不加密后端也不加密
 * encrypt=0表示前端不加密后端加密
 */

/** 下面这一段代码是放在请求头里的 */
// 6、判断是否有sm4加密密钥，有的话进行headers请求头携带
const sm4 = getsm4()
   if (sm4) {
     config.headers.sec = getsm4() // 让每个请求携带自定义sm4
   }


// 随机获取sm4加密秘钥
export function rstr (name) {
    const sm3 = require('sm-crypto').sm3
    const $chars = sm3(Date.parse(new Date()) + name) // 杂凑
    const maxPos = $chars.length
    let str = ''
    for (let i = 0; i < 16; i++) {
      str += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return str
}

/** sm2加密
 * @publicKey 公钥
 * @msg 随机生成的sm4密钥
 */
function encrypt2(publicKey, msg) {
    const sm2 = require('sm-crypto').sm2
    const cipherMode = 1 // 1 - C1C3C2，0 - C1C2C3，默认为1
    return'04' + sm2.doEncrypt(msg, publicKey, cipherMode) // 加密结果
}


if (this.$configApiUrl.VUE_APP_IS_ENCRYPT) {
    // 1、获取公钥用于秘钥加密
    this.$api.getpub.getpub().then(async resp => {
      console.log(resp)
    //   2、生成sm4密钥
      const msg = rstr('this.form.userName')
    //   3、保存rstr生成的sm4密钥
      localStorage.setItem('sec', msg) // sm4的key
    //   4、sm2加密sm4密钥
     const encryptData = await encrypt2(resp, msg)
    //  5、把加密的sm4密钥保存起来，调用接口的时候放在请求头里
      setsm4(encryptData)
      this.unlogin()
    })
} else {
    this.unlogin()
}
