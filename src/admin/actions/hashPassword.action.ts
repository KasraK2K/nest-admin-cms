import bcrypt from 'bcrypt';

type IAdminRequest = Record<string, any> & {
  payload: Record<string, any> & { password: string };
  params: { resourceId: string; recordId: string; action: string };
};

export const hashPasswordBeforeAction = (request: IAdminRequest) => {
  const { payload, params } = request;
  const { resourceId } = params;

  if (resourceId === 'users' && payload.password?.length < 60)
    payload.password = bcrypt.hashSync(payload.password, bcrypt.genSaltSync(7));

  return request;
};
