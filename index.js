// const path = require('path');
const Koa = require('koa'); // koa node框架
const bodyParser = require('koa-bodyparser'); // 表单解析中间件
const session = require('koa-session-minimal'); // 处理数据库的中间件
const mysqlStore = require('koa-mysql-session'); // 处理数据库的中间件
const config = require('./config/default.js'); // 默认文件
const router = require('koa-router')();
const cors = require('koa-cors');
const app = new Koa();

// session存储配置
const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
};

app.use(cors({
    origin: (ctx) => {
        if(ctx.url === '/view') {
            return "*";
        }
        return "http://localhost:8000";
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// 配置session中间件
app.use(session({
    key: 'USER_SID',
    store: new mysqlStore(sessionMysqlConfig),
}));


// 配置表单中间件:解析提交的表单信息
app.use(bodyParser({}));

// 配置路由
app.use(router.routes());
app.use(router.allowMethods());

app.listen(config.port);

console.log(`listening on port ${config.port}`);