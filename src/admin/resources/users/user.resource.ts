import { hashPasswordBeforeAction } from '../../actions/hashPassword.action';
import { User } from './user.entity';
import {
  ALL_PROPERTIES,
  COMMON_PROPERTIES,
  EDIT_PROPERTIES,
} from './user.constants';

export const UserResource = {
  resource: User,
  options: {
    navigation: { name: null, icon: 'User' },
    actions: {
      new: { before: [hashPasswordBeforeAction] },
      edit: { before: [hashPasswordBeforeAction] },
    },
    properties: {
      bio: {
        type: 'richtext',
        description:
          'For each edit, image will remove so be aware to insert your image each time you will edit this sentence.',
      },
      password: {
        type: 'password',
      },
    },
    editProperties: EDIT_PROPERTIES,
    showProperties: ALL_PROPERTIES,
    listProperties: COMMON_PROPERTIES,
    filterProperties: COMMON_PROPERTIES,
    sort: {
      sortBy: 'updated_at',
      direction: 'desc',
    },
  },
};
