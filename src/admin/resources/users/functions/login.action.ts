import bcrypt from 'bcrypt';
import { User } from '../user.entity';

export const login = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ where: { email, is_verify: true } });
    if (!user)
      return !(await User.count()) ? register(email, password, true) : null;
    if (bcrypt.compareSync(password, user.password)) return user;
    return null;
  } catch (error) {
    console.log(error);
    throw new Error('Error on finding user');
  }
};

export const register = async (
  email: string,
  password: string,
  is_verify: boolean,
): Promise<User> => {
  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(7));
  return await User.create({
    email,
    password: hashPass,
    is_verify,
  });
};
