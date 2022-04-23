import jwt from 'jsonwebtoken';

export function SignUp(){
    let userID="NewUser"
    return userID
}
export function JWT(token_payload){
    const token = jwt.sign(
        token_payload,
        "jwt_secret_password",
        { expiresIn: '2h' }
        );
    return token;
}



export function authenticate() {
    verify = function(req, rest, next) {
        try {
            const token = req.cookies.token;

            if (!token) {
                return rest.status(401).json({
                    loggedIn: false,
                    user: null,
                    errorMesesage: "Unauthorized",
                    token: req.cookies.token
                })
            }

            const verified = jwt.verify(token, process.env.JWT_SECRET)
            req.userID = verified.userId;

            next();
        }
        catch (err) {
            console.error(err);
            return rest.status(401).json({
                errorMessage: "Unauthorized"
            })
        }
    }

    signInToken = function(user) {
        return jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET)
    }

    return this;
}

