import bcrypt from 'bcrypt';
import { User } from '../user.entity';

export const login = async (
  email: string,
  password: string,
): Promise<User | null> => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;
    if (bcrypt.compareSync(password, user.password)) return user;
    return null;
  } catch (error) {
    throw new Error('Error on finding user');
  }
};
