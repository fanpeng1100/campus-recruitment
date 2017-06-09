//登录
function login(){
	window.location.href="/login";
}
//国内站点访问
//注册
function register(){
    window.location.href="//reg.jd.com/reg/person?ReturnUrl=http%3A//campus.jd.com/login";
}
////退出
//function logout(){
//   window.location.href="//passport.jd.com/uc/login?ltype=logout&ReturnUrl=http%3A//campus.jd.com/login";
//}


//国外站点访问
//注册
//function register(){
//    window.location.href="//passport.en.jd.com/user/facade?ReturnUrl=http%3A%2F%2Fen.campus.jd.com%2Flogin";
//}
//退出
function logout(){
	window.location.href="/loginOut";
}

//http://passport.en.jd.com/user/facade?ReturnUrl=http%3A%2F%2Fen.jd.com%2F