import jwt from "jsonwebtoken"
import { Response } from "express"

const checkAuthorisation = (token: string, res: Response) => {
    try {
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch(error) {
        res.status(401)
        res.json(`Invalid Token ${error}`)
        return
    }
}

export default checkAuthorisation

