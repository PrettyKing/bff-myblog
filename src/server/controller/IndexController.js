import Router from 'koa-router';
import fs from 'fs'
import path from "path";
import { queryDb } from '../db/mysqlHelper'
import Result from "../utils/R"
const router = new Router()

const R = new Result()

router
    .get('/default/getArticleList', async ctx => {
        let sql = "SELECT article.id as id," +
            "article.title as title," +
            "article.introduce as introduce," +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
            "article.view_count as view_count ," +
            "type.typeName as typeName FROM article LEFT JOIN type ON article.type_id = 1";
        const res = await queryDb(sql)
        R.ok(ctx, res, "获取成功")
    })
    .get('/default/getArticleById/:id', async ctx => {
        let id = ctx.params.id
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.article_content as article_content,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ,' +
            'type.id as typeId ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE article.id=' + id
        const res = await queryDb(sql)
        R.ok(ctx, res, "获取成功")
    })
    .get('/default/getListById/:id', async ctx => {
        let id = ctx.params.id
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE type_id=' + id
        const res = await queryDb(sql)
        R.ok(ctx, res, "获取成功")
    })
    .get('/default/getTypeInfo', async ctx => {
        const sql = "SELECT * FROM type";
        const res = await queryDb(sql)
        R.ok(ctx, res, "获取成功")
    })
    .get(["/", "/login", "/admin", "/admin/(.*)"], ctx => {
        const file = fs.readFileSync(path.resolve(__dirname, "../web/index.html"));
        console.log("--->", file)
        ctx.set('Content-Type', 'text/html; charset=utf-8');
        ctx.body = file;
    })

export default {
    init (app) {
        app.use(router.routes()).use(router.allowedMethods());
    }
};
