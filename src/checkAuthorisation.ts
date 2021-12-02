import jwt, { JwtPayload } from "jsonwebtoken"

const checkAuthorisation = (token: string): string | JwtPayload => {
    try {
        return jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch(error) {
        console.log(`There was an error ${error}`)
        return "Error"
    }
}

export default checkAuthorisation