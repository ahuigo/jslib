let id_token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJYdXg3TnpyUGRQTkRKZGYzVHU4bUVjbWNQMmpzV1B6SmNmQW5mSWlueWNNIn0.eyJleHAiOjE2NTgyNzI0OTQsImlhdCI6MTY1ODIzNjQ5NywiYXV0aF90aW1lIjoxNjU4MjM2NDk0LCJqdGkiOiI5ODk3N2EwMi1kZWJlLTRhNTUtYmEyYi00ZmM1NzQwYThhZmYiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLWV1Lm1vbWVudGEtZGV2LmJvc2NoLWRhdGEtbG9vcC5jb20vYXV0aC9yZWFsbXMvZGF0YWxvb3AtZXUtZGV2IiwiYXVkIjpbImNsYSIsImFjY291bnQiXSwic3ViIjoiZDkxNmViZDUtZjViZS00ZDRmLTgxYzMtZTJjNzQ4Yzc0OGM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicHBsIiwibm9uY2UiOiJkMDI4ZWU2MS0zOGEzLTQyNzctOGY4My1kMGUxZDVkYzhiOTUiLCJzZXNzaW9uX3N0YXRlIjoiM2UyMzAzZjgtMGNkZi00MTAyLThmOTctZDk4NjE2ZTMxOGQ3IiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL3BwbC1ldS5tb21lbnRhLWRldi5ib3NjaC1kYXRhLWxvb3AuY29tIiwiaHR0cHM6Ly90b3MtdWktZXUubW9tZW50YS1kZXYuYm9zY2gtZGF0YS1sb29wLmNvbSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1kYXRhbG9vcC1ldS1kZXYiLCJvZmZsaW5lX2FjY2VzcyIsImFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJjbGEiOnsicm9sZXMiOlsiZHhwX3JvIiwibWRpX3JvIl19LCJwcGwiOnsicm9sZXMiOlsicHBsX3Jvb3QiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZ3JvdXBzIGVtYWlsIiwic2lkIjoiM2UyMzAzZjgtMGNkZi00MTAyLThmOTctZDk4NjE2ZTMxOGQ3IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJncm91cHMiOltdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJoZWZlaXl1bkBtb21lbnRhLmFpIiwiZW1haWwiOiJoZWZlaXl1bkBtb21lbnRhLmFpIn0.KUSYoI9gTm1ili0ktPJ3dzzgx0X9S3FxIgvXrHx415fJFtS9pNH9_nnSYw3pOFHtRBfEF1Ghyn_EUsQ5M_1SY4xYPZxzCDA4h0lG5wAahpE_CuyHPjvfoCnF87s_7owDtT6tAe989QLuMQX6FWJ6sKisFw4P3LsOqOqCe5wi8ysOB_SavPunvDWdvfx2db9-fFr4ZkFt-FDV3AYlS6AZw1oT2V06cNXLNY3D7XI_Mfhiyt79DFhyegeRJxBVee2_X8vh1YbHcrsCcIHSfqeYFiSzuSzw6RF_cuACGfkeoXLzhvXn73gVv11PCx9i0FP1uaWUi8-gFapnub5rBaX7mw'

if(typeof window =='undefined' ){
    global.atob = (b64)=>{
        let r = Buffer.from(b64, 'base64').toString()
        return r
    }
    global.btoa = (s)=>{
        return Buffer.from(s).toString('base64')
    }
}

if(process.argv[2]){
    console.log('new token2')
    id_token = process.argv[2]
}

function parseJWT(token){
    console.log(token)
    return token.split('.').map(v=>{
            var base64 = v.replace(/-/g, '+').replace(/_/g, '/');
            return atob(base64)
    })[1]
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = atob(base64)
    return JSON.parse(jsonPayload);
}

function genToken(data){
    var jsonRaw = JSON.stringify(data);
    let s = btoa(jsonRaw) 
    s = s.replace(/\+/g, '-').replace(/\//g, '_');
    console.log({token:s})
}


jwt= parseJWT(id_token);
//jwt['exps'] = new Date(jwt.exp*1000)
//jwt['exp_iat'] = jwt.exp-jwt.iat
console.log(jwt)


data = {
  at_hash: 'f7jGSiZ6N1xFLb3lsfhrtg',
  aud: [ 'production-management' ],
  auth_time: 1587093312,
  exp: 1588179712,
  iat: 1587093312,
  iss: 'http://dev-hydra.hdmap.momenta.works/',
  jti: '6ca82aa7-aad4-4d64-bb1d-793ccb830715',
  nonce: 'buiaeeomvzggoczqtbjbuzzz',
  rat: 1587093312,
  sid: '510ada28-4d8e-4651-975a-f17b28c862d3',
  sub: 'suchu',
  //exps: 2021-04-18T03:15:12.000Z,
  //exp_iat: 86400
}

/*token = genToken(data)
console.log(token)
*/

//jwt.sub  用户名
/**
 *
 * {
  at_hash: 'WDNq_8TJBsNuqe1cK5g05A',
  aud: [ 'production-management' ],
  auth_time: 1585103480,
  exp: 1585189880,
  iat: 1585103480,
  iss: 'http://hydra.hdmap.momenta.works/', // issuer
  jti: 'd4f71064-4c69-4b00-97bb-fc16a3728ebe',
  nonce: 'rcnhlplavylunyilgoqatyzs',
  rat: 1585103472,
  sid: '91355e3d-7f72-4e29-9cf9-ba6677605bf3',
  sub: 'changyu'
}
 *
 */
