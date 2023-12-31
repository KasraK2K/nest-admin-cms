import { DataTypes, Model, Optional } from 'sequelize';

import sequelize from '../../../connections/sqlite.connection';
import { IUser } from './user.interface';

type IUserCreation = Optional<
  Pick<IUser, 'email' | 'password' | 'is_verify'>,
  'is_verify'
>;

export class User extends Model<IUser, IUserCreation> {
  declare id: number;
  declare first_name: string;
  declare surname: string;
  declare bio: string;
  declare contact_number: string;
  declare email: string;
  declare password: string;
  declare role: number;
  declare last_token: string;
  declare is_active: boolean;
  declare is_verify: boolean;
  declare is_archive: boolean;
  declare is_block: boolean;
  declare last_login_at?: number;
  declare created_at: Date;
  declare updated_at: Date;
  declare archive_at?: Date;
}

// prettier-ignore
User.init(
  {
    id:             { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    first_name:     { type: DataTypes.STRING, defaultValue: '' },
    surname:        { type: DataTypes.STRING, defaultValue: '' },
    bio:            { type: DataTypes.STRING, defaultValue: '' },
    contact_number: { type: DataTypes.STRING, defaultValue: '' },

    email:          { type: DataTypes.STRING, allowNull: false },
    password:       { type: DataTypes.STRING, allowNull: false },

    role:           { type: DataTypes.INTEGER, defaultValue: 1 },
    last_token:     { type: DataTypes.STRING },

    is_active:      { type: DataTypes.BOOLEAN, defaultValue: true },
    is_verify:      { type: DataTypes.BOOLEAN, defaultValue: false },
    is_archive:     { type: DataTypes.BOOLEAN, defaultValue: false },
    is_block:       { type: DataTypes.BOOLEAN, defaultValue: false },

    last_login_at:  { type: DataTypes.DATE },
    created_at:     { type: DataTypes.DATE },
    updated_at:     { type: DataTypes.DATE },
    archive_at:     { type: DataTypes.DATE },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    tableName: 'users',
    modelName: 'user',
    deletedAt: 'archive_at',
  },
);
