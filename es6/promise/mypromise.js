// deno-lint-ignore-file no-this-alias no-prototype-builtins
const logger = console.log.bind(console)
class MyPromise {
    constructor(task) {
        this.firing = false
        this.status = 'pending'
        this.v = undefined
        this.children_resolved = []

        if (task) {
            this.children_rejected = []
            task(this.resolve.bind(this), this.reject.bind(this))
        }
    }

    /**
     * 
     * @param {*} v 
     */
    resolve(v) {
        if (this.status !== 'pending') return
        this.status = 'resolved'
        this.v = v

        if (!this.firing && this.isDone) {
            for (const child_p of this.children_resolved) {
                child_p.fire(this.v, this.status)
            }
        }
    }

    /**
     * reject
     * @param {*} v 
     */
    reject(v) {
        if (this.status !== 'pending') return
        this.status = 'rejected'
        this.v = v

        if (!this.firing && this.isFail) {
            for (const child_p of this.children_rejected) {
                child_p.fire(this.v, this.status)
            }
        }
    }

    /**
     */
    fire(v) {
        this.firing = true
        if (this.parent.isDone) {
            this.v = this.fnDone(v)
        } else {
            this.v = this.fnFail(v)
        }
        this.status = 'resolved'

        //var children = this.isDone? this.children_resolved : this.root.children_rejected
        for (const child_p of this.children_resolved) {
            child_p.fire(this.v, this.status)
        }

        this.firing = false
    }

    findCatchRoot() {
        const root = this;
        if (root.hasOwnProperty('fnFail')) {
            return null
        }
        while (root.parent && !root.parent.hasOwnProperty('fnFail')) {
            root = root.parent
        }
        return root
    }

    createChild(status) {
        const child_p = new MyPromise()
        child_p.parent = this
        child_p.status = status
        return child_p
    }

    /**
     * 
     * @param {function} fnDone 
     * @param {function} fnFail 
     */
    then(fnDone, fnFail) {
        let child_p;
        if (typeof (fnDone) === 'function' || typeof (fnFail) === 'function') {

            if (typeof (fnDone) === 'function') {
                child_p = this.createChild()

                child_p.fnDone = fnDone
                this.children_resolved.push(child_p)

            } else {
                const root = this.findCatchRoot()
                if (root) {
                    child_p = this.createChild()
                    child_p.fnFail = fnFail
                    root.children_rejected.push(child_p)

                }

                //this.root['fnFail'] = fnFail
            }
            if (child_p && !child_p.firing
                && (
                    (this.isDone && child_p.fnDone)
                    || (this.isFail && child_p.fnFail)
                )
            ) {
                child_p.fire(this.v, this.status)
            }
        }
        return child_p ? child_p : this
    }
    catch(fnFail) {
        return this.then(null, fnFail)
    }
    get isDone() {
        //return this.status === 'resolved' && !!this.fnDone
        return this.status === 'resolved' && this.children_resolved.length > 0
    }
    get isFail() {
        //return this.status === 'rejected' && !!this.fnFail
        return this.status === 'rejected' && this.children_rejected && this.children_rejected.length > 0
    }
}

/**
 * example 
 */
p = new MyPromise((r, j) => {
    logger('exec inner task');
    console.log('hahah')
    setTimeout(() => {
        r(10);
        j(0);
    }, 100, 10);
})

p.then(v => { console.log(v + 1); return v + 1 });
p.catch(v => { console.log(v + 10); return v + 1 });
p.catch(v => { console.log(v + 11); return v + 1 });
p.catch(v => { console.log(v + 12); return v + 1 });
p.catch(v => { console.log(v + 14); return v + 15 }).then(v => { console.log(v + 1); return v + 1 });
