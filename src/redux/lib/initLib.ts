

export const getInitStore = () =>{
    let isAuth = false
    let tokenData = ""
    let userIdData = ""
    let userData = null

    let auth = localStorage.getItem("auth")

    if(auth){
        const { token, userId, user} = JSON.parse(auth)

        isAuth = !!token  && !!userId

        if(isAuth){
            tokenData = token 
            userIdData = userId
            userData = user
        }
    }


    return {
        isAuth: isAuth,
        token: tokenData,
        userId: userIdData,
        user: userData
    }
}