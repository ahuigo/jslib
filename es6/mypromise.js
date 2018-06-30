const logger = console.log.bind(console.log)
class MyPromise {
  constructor(task) {
    this.root = this
    this.firing = false
    this.status = 'pending'
    this.v = undefined
    this.sub = []

    if (task) {
      console.log('exec task')
      task(this.resolve.bind(this), this.reject.bind(this))
    }
  }
  resolve(v) {
    if(this.status!=='pending') return
    console.log('resolved: ', v)
    this.status = 'resolved'
    this.v = v

    if (!this.firing && this.fnDone) {
      this.fire()
    }
  }
  reject(v) {
    if(this.status!=='pending') return
    this.status = 'rejected'
    console.log(`${this.status}:`, v)
    this.v = v

    if (!this.firing && this.root.fnFail) {
      this.fire()
    }
  }
  fire() {
    console.log('firing')
    this.firing = true

    if (this.status !== 'pending' && (this.isDone || this.isFail)){
      if (this.isDone) {
        var sub_v = this.fnDone(this.v)
      } else if (this.isFail) {
        var sub_v = this.root.fnFail(this.v)
      }
      for (let sub_p of this.sub) {
        sub_p.status = 'resolved'
        sub_p.v = sub_v
        if (!sub_p.firing && sub_p.isDone) {
          sub_p.fire()
        }
      }
    }

    this.firing = false
  }
  then(fnDone, fnFail) {
    var sub_p;
    if (fnFail) {
      this.root['fnFail'] = fnFail
    }
    if (fnDone && typeof (fnDone) === 'function') {
      this['fnDone'] = fnDone
      sub_p = new MyPromise()
      sub_p.root = this.root
      sub_p.status = this.status
      sub_p.v = this.v
      this.sub.push(sub_p)
    }
    if (!this.firing && this.status != 'pending') {
      if (this.isDone || this.isFail) {
        this.fire()
      }
    }
    return sub_p ? sub_p : this
  }
  get isDone() {
    return this.status === 'resolved' && this.fnDone
  }
  get isFail() {
    return this.status === 'rejected' && this.root.fnFail
  }
  catch(fnFail) {
    return this.then(null, fnFail)
  }
}

p=new MyPromise((r, j) => {
  logger('exec inner task'); 
  setTimeout(v=>{
    r(10);j(1)
  },1000,10);
}).then(v => { console.log(v + 1); return v + 1 });
p
  .then(v => console.log(v + 2))
  .catch(e => console.log([e + 100]))
p
  .then(v => console.log(v + 2))
  .catch(e => console.log([e + 100]))