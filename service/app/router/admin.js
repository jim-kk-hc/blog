module.exports = app => {
    const {
        router,
        controller
    } = app
    var adminauth = app.middleware.adminauth()
    // controller.admin.main.index 表示文件夹路径 controller下admin文件夹下main文件index方法
    router.get('/admin/index', controller.admin.main.index)
    router.get('/admin/getTypeInfo', controller.admin.main.getTypeInfo)
    router.post('/admin/checkLogin', controller.admin.main.checkLogin)
    router.post('/admin/addArticle', controller.admin.main.addArticle)
    router.post('/admin/updateArticle', controller.admin.main.updateArticle)
    router.get('/admin/getArticleList', controller.admin.main.getArticleList)
    router.get('/admin/delArticle/:id', controller.admin.main.delArticle)
    router.post('/admin/updateArticle', controller.admin.main.updateArticle)
    router.get('/admin/getArticleById/:id', controller.admin.main.getArticleById)




}