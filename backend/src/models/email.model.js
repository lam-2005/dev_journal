import pool from "../lib/pool.js";

const EmailModel = {
  contact: async (data) => {
    const { name, email, subject, message } = data;
    const query = `
      INSERT INTO contacts (name, email, subject, message)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, email, subject, message];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  getById: async (id) => {
    const query = "SELECT * FROM contacts WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },
};
export default EmailModel;
