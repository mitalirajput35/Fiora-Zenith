const jwt = require("jsonwebtoken")

const adminAuth = async (req, res, next) => {
    const token = req.cookies.token
    if(!token){
        res.redirect("/admin/getlogin")
    }else{
        const admin = await jwt.verify(token, process.env.TOKEN_SECRETKEY);
        if (!admin) {
            return res.redirect("/getlogin")
        }
    }
    next()
}

module.exports = adminAuth;