const Koa = require("koa");
const router = require("koa-router")(); // url get
const koaBody = require("koa-body"); // url post

const app = new Koa();

app.use(router.routes());

// 控制台输出接口类型，地址，返回时间
app.use((ctx, next) => {
    const start = new Date();
    return next().then(() => {
        const ms = new Date() - start;
        console.log(`${ctx.method} -> ${ctx.url} - ${ms}ms`);
    });
});

// /hello/Lurker/22
router.get('/api/:name/:id', ctx => {
    ctx.body = {
        name: ctx.params.name,
        id: ctx.params.id,
        code: 1
    }
});

// POST
router.post('/api', koaBody, ctx => {
    ctx.body = {
        code: 0,
        des: 'ok',
        res: ctx.params.name
    }
});

// 默认数据
app.use(ctx => {
    ctx.body = {
        code: 1,
        des: 'error',
        res: null
    };
});

// 端口监听
app.listen(3000);
