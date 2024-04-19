import { UnauthorizedError } from "../../../utils/errors";
import { generateJWT } from "../../../utils/jwt";

export class AuthService {
    public async generateToken(email: string): Promise<{ token: string }> {
        if (email !== process.env.ADMIN_EMAIL) throw new UnauthorizedError("Wrong email");
        return { token: generateJWT(email) };
    }
}