'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller {

    async index() {
        this.ctx.body = 'api HI'
    }

    async getArticleList() {

        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.img as img,'+
            'article.tag as tag,'+
            //主要代码----------start
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
            //主要代码----------end
            'article.view_count as view_count ,' +
            '.type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id'

        const result = await this.app.mysql.query(sql)

        this.ctx.body = {
            data: result
        }
    }

    async getArticleById() {
        //先配置路由的动态传值，然后再接收值
        let id = this.ctx.params.id
        // console.log('getArticleById---id', id)
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


        const result = await this.app.mysql.query(sql)

        this.ctx.body = {
            data: result
        }

    }
    

    async getCommentById() {
        let id = this.ctx.params.id
        console.log('-------');
        let sql = 'SELECT comment.id as id,' +
            'comment.nickname as nickname,' +
            'comment.addTime as addTime,' +
            'comment.content as content,' +
            'comment.type_id as type_id,' +
            'comment.avatar as avatar,' +
            'comment.email as email,'+
            'type.typeName as typeName ,' +
            'type.id as typeId ' +
            'FROM comment LEFT JOIN type ON comment.type_id = type.Id ' +
            'WHERE type_id=' + id
        const result = await this.app.mysql.query(sql)
        // console.log(result)
        this.ctx.body = {
            data: result
        }
    }


    async getTypeInfo(){

        const result = await this.app.mysql.select('type')
        this.ctx.body = {data:result}
  
    }

    
    //根据类别ID获得文章列表
    async getListById(){
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE type_id='+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body={data:result}

    }

    // 处理上传的comment 
    async postComment() {
        const imgs = [
            'https://gravatar.loli.net/avatar/1383ac2665435c4f06cd7723149772e3?d=robohash',
            'https://gravatar.loli.net/avatar/5c319af7ca0a7f8396ad0b127b6b8844?d=robohash',
            'https://gravatar.loli.net/avatar/56fbf99e03c8ec3296fec603c67df25a?d=robohash',
            'https://gravatar.loli.net/avatar/f8520c3933faea9b35ba41d4db474ec3?d=robohash',
            'https://gravatar.loli.net/avatar/8479ce3f532d8dedd851dc2259fbb3a8?d=monsterid&v=1.4.14',
            'https://gravatar.loli.net/avatar/6df4ba842437fd9d56f7d7585a6af588?d=monsterid&v=1.4.14',
            'https://gravatar.loli.net/avatar/29514715cae48d72b44cb2909d7a92a0?d=monsterid&v=1.4.14',
            'https://gravatar.loli.net/avatar/56fbf99e03c8ec3296fec603c67df25a?d=monsterid&v=1.4.14',
            'https://gravatar.loli.net/avatar/5c319af7ca0a7f8396ad0b127b6b8844?d=monsterid&v=1.4.14',
            'https://gravatar.loli.net/avatar/4d0df3cbaa8aaad2180d3ea378a42481?d=monsterid&v=1.4.14'
        ]
        // console.log('ctx', this.ctx.request.body)
        const res = this.ctx.request.body

        const idx = res.values.email.indexOf('@')
        const email = res.values.email.slice(0, idx)
        let sql = 'SELECT * '  +
            'FROM comment ' +
            'WHERE email=' + `${email}`
        const data = await this.app.mysql.query(sql)
        console.log('--------------------')
        console.log('data', data)
        
        let avatar = null;
        if (!data[0] || !data[0].avatar) {
            avatar = imgs[parseInt(Math.random() * 10)]
        } else {
            avatar = data[0].avatar
        }
        const tepComment = {
            type_id: res.type_id,
            nickname: res.values.NickName,
            addTime: `${Date.now()}`,
            content: res.values.user.introduction,
            email:  email,
            avatar: avatar
        }
        const result = await this.app.mysql.insert('comment',tepComment)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId

        this.ctx.body={
            isScuccess:insertSuccess,
            insertId:insertId
        }
    }
}

module.exports = HomeController