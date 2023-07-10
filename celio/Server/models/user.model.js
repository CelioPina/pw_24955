import { INTEGER, STRING } from 'sequelize';
import { Vinil_DB } from '../config/context/database.js';
const UserModel = Vinil_DB.define("user", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: false,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: true,
  },
});
export { UserModel };
