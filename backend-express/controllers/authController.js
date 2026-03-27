import { User } from '../models/index.js';
import { generateToken } from '../middleware/auth.js';

class AuthController {
    /**
     * Handle admin login
     * POST /api/login
     */
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // Find user by email
            const user = await User.findOne({ where: { email } });

            // Check if user exists and password matches
            if (!user || !(await user.checkPassword(password))) {
                return res.status(422).json({
                    message: 'The provided credentials are incorrect.',
                    errors: [{ field: 'email', message: 'The provided credentials are incorrect.' }],
                });
            }

            // Check if user is admin
            if (!user.is_admin) {
                return res.status(422).json({
                    message: 'You do not have admin access.',
                    errors: [{ field: 'email', message: 'You do not have admin access.' }],
                });
            }

            // Generate JWT token
            const token = generateToken(user);

            return res.json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    is_admin: user.is_admin,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Handle admin logout
     * POST /api/logout
     */
    async logout(req, res, next) {
        try {
            // In JWT, we don't need to do anything server-side
            // The client should remove the token
            return res.json({
                message: 'Logout successful',
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
