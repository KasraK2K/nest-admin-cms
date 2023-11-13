import bcrypt from 'bcrypt';
import { User } from '../user.entity';

export const login = async (email: string, password: string) => {
  try {
    const userCount = await User.count();
    if (userCount) {
      const user = await User.findOne({ where: { email } });
      if (!user) return null;
      if (bcrypt.compareSync(password, user.password)) return user;
      return null;
    } else return { email, password };
  } catch (error) {
    throw new Error('Error on finding user');
  }
};
