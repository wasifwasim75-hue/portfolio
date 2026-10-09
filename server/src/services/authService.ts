import { User } from '../models/User';
import { IUser, JwtPayload } from '../types';
import { signToken } from '../utils/jwt';

export class AuthService {
  public static async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: { id: string; name: string; email: string; role: string } }> {
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const payload: JwtPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const token = signToken(payload);

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  public static async register(data: { name: string; email: string; password: string; role?: 'admin' | 'user' }): Promise<IUser> {
    const existing = await User.findOne({ email: data.email.toLowerCase().trim() });
    if (existing) {
      throw new Error('An account with this email already exists');
    }

    const user = new User(data);
    await user.save();
    return user;
  }

  public static async getUserById(id: string): Promise<{ id: string; name: string; email: string; role: string } | null> {
    const user = await User.findById(id);
    if (!user) return null;
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
