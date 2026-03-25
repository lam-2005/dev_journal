import pool from "../lib/pool.js";

const AuthModel = {
  findUserByEmail: async (email) => {
    const query = `select * from users where email = $1;`;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  },

  create: async (data) => {
    const { name, email, password } = data;

    const query = `
            insert into users (name, email, password) values ($1,$2,$3)
            returning id, email, name, create_at;
        `;
    const values = [name, email, password];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },
};
export default AuthModel;
