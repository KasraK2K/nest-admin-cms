import _ from 'lodash';

export const ALL_PROPERTIES = [
  'id',
  'first_name',
  'surname',
  'contact_number',
  'email',
  'password',
  'role',
  'last_token',
  'is_active',
  'is_verify',
  'is_archive',
  'is_block',
  'last_login_at',
  'created_at',
  'updated_at',
  'archive_at',
];

export const COMMON_PROPERTIES = _.filter(
  ALL_PROPERTIES,
  (item) =>
    !['last_token', 'password', 'last_login_at', 'archive_at'].includes(item),
);

export const EDIT_PROPERTIES = [
  'first_name',
  'surname',
  'contact_number',
  'email',
  'password',
  'is_active',
  'is_verify',
  'is_archive',
  'is_block',
];
