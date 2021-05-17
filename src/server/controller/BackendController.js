import Router from 'koa-router';
import fs from 'fs'
import path from "path";
import { queryDb } from '../db/mysqlHelper'
import Result from "../utils/R"
const router = new Router()

const R = new Result()

router
    .post('/api/checkLogin', async ctx => {
        let userName = ctx.request.body.userName
        let password = ctx.request.body.password
        console.log(ctx.request.body)
        if (!userName || !password) {
            ctx.body = {
                code: -1,
                msg: "参数不正确"
            }
        }
        const sql =
            " SELECT userName FROM admin_user WHERE userName = '" +
            userName +
            "' AND password = '" +
            password +
            "'";
        console.log(sql)
        const res = await queryDb(sql)//登录成功,进行session缓存
        if (res.length > 0) {
            let openId = new Date().getTime();
            ctx.session.openId = { openId };
            R.ok(ctx, { openId }, "登录成功")
        } else {
            R.notOk(ctx, "登录失败");
        }
    })
    .get("/api/getTypeInfo", async ctx => {
        const sql = "SELECT * FROM type";
        const res = await queryDb(sql)
        R.ok(ctx, { data: res }, "获取成功")
    })
    .post("/api/addArticle", async ctx => {
        let { type_id, title, article_content, introduce, addTime, view_count } = ctx.request.body
        const sql = `INSERT INTO article (type_id,title,article_content,introduce,addTime,view_count) VALUE (${type_id},"${title}","${article_content}","${introduce}",${addTime},${view_count})`;
        console.log(sql)
        const result = await queryDb(sql);
        const msg = result.affectedRows === 1;
        const insertId = result.insertId;
        R.ok(ctx, { msg, insertId })
    })
    .post("/api/updateArticle", async ctx => {
        let { id, type_id, title, article_content, introduce, addTime, view_count } = ctx.request.body
        const sql = `UPDATE article SET type_id=${type_id},title="${title}",article_content="${article_content}",introduce="${introduce}",addTime=${addTime},view_count=${view_count} WHERE id=${id}`;
        console.log(sql)
        const result = await queryDb(sql);
        const updateSuccess = result.affectedRows === 1;
        R.ok(ctx, { updateSuccess })
    })
    .get("/api/getArticleList", async ctx => {
        let sql = "SELECT article.id as id," +
            "article.title as title," +
            "article.introduce as introduce," +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            "type.typeName as typeName " +
            "FROM article LEFT JOIN type ON article.type_id = type.Id " +
            "ORDER BY article.id DESC ";
        let res = await queryDb(sql)
        R.ok(ctx, { list: res })
    })
    .get("/api/delArticle/:id", async ctx => {
        let id = ctx.params.id
        const sql = `DELETE FROM article WHERE id=${id};`
        console.log(sql)
        const res = await queryDb(sql)
        R.ok(ctx, { isSucess: res })
    })
    .get("/api/getArticleById/:id", async ctx => {
        let id = ctx.params.id
        let sql = "SELECT article.id as id," +
            "article.title as title," +
            "article.introduce as introduce," +
            "article.article_content as article_content," +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            "article.view_count as view_count ," +
            "type.typeName as typeName ," +
            "type.id as typeId " +
            "FROM article LEFT JOIN type ON article.type_id = type.Id " +
            "WHERE article.id=" +
            id;

        const res = await queryDb(sql)
        R.ok(ctx, { data: res })
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
