const constant = {
    SUCESS_CODE: 200,
    ERROR_CODE: -1
}

class R {
    constructor() {
        this.code = null;
        this.msg = null;
        this.data = null
    }

    ok (ctx, data = this.data, msg = this.msg, code = constant.SUCESS_CODE) {
        return ctx.body = {
            code,
            msg,
            data
        }
    }

    notOk (ctx, msg, code = constant.ERROR_CODE) {
        return ctx.body = {
            code,
            msg
        }
    }
}




module.exports = R