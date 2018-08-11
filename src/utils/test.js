/**
 *
 *  Create By rehellinen
 *  Create On 2018/8/11 23:00
 */
let str = '__STATIC__'
let string = '12412412__STATIC__2412__STATIC__412__STATIC__4'
let reg = new RegExp(str, 'g')

console.log(string.match(reg))
