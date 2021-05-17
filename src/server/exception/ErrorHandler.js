import Result from "../utils/R"
const R = new Result()
const ErrorHander = {
    init (app, logger) {
        // 捕获内部错误
        app.use(async (ctx, next) => {
            try {
                await next();
            } catch (e) {
                logger.error(JSON.stringify(e));
                R.notOk(ctx, "内部错误")
            }
        });
        // 捕获 404 错误
        app.use(async (ctx, next) => {
            await next();
            if (ctx.status === 404 && ctx.url !== '/404.html') {
                ctx.redirect('/404.html');
            }
        });
        // session过期
        app.use(async (ctx, next) => {
            console.log(ctx.request.url)
            await next()
            // if (ctx.session.openId && ctx.request.url !== "/") {
            //     await next()
            // } else {
            //     R.notOk(ctx, "登录信息失效！", 401)
            // }
        })
    }
};

export default ErrorHander;