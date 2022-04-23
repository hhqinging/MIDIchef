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