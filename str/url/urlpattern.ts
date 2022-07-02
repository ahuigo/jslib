let p=new URLPattern({pathname:`/api/v1/*`})

console.log(p.test('http://baidu.com/api/v1/a/b')) //true
console.log(p.exec('http://baidu.com/api/v1/a/b')) //{pathname: { input: "/api/v1/a/b", groups: { "0": "a/b" } },...}
