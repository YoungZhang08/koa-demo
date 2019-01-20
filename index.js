const Koa = require('koa'); // koa node框架
const bodyParser = require('koa-bodyparser'); // 表单解析中间件
const session = require('koa-session-minimal'); // 处理数据库的中间件
const mysqlStore = require('koa-mysql-session'); // 处理数据库的中间件
const config = require('./config/default.js'); // 默认文件
const router = require('./routes/index');
const app = new Koa();

// session存储配置
const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
};

// 配置session中间件
app.use(session({
    key: 'USER_ID',
    store: new mysqlStore(sessionMysqlConfig),
}));


// 配置表单中间件:解析提交的表单信息
app.use(bodyParser({}));

app.use(async(ctx,next)=>{
    ctx.set("Access-Control-Allow-Origin", `${ctx.request.header.origin}`);
    // 设置所允许的HTTP请求方法
    ctx.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type, authorization");
    // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。
    // Content-Type表示具体请求中的媒体类型信息`
    ctx.set("Content-Type", "application/json;charset=utf-8");
    // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
    // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
    ctx.set("Access-Control-Allow-Credentials", true);
    // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
    // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
    // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
    ctx.set("Access-Control-Max-Age", 300);

    if(ctx.request.method === "OPTIONS"){
        ctx.body = {
            msg:"preFlighted requested is ok!"
        }
        return ;
    }
    await next();
})

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`);
});
