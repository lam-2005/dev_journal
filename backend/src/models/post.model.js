import pool from "../lib/pool.js";

const PostModel = {
  create: async (data) => {
    const { title, content, slug, excerpt, image, user_id } = data;
    const query = `
    INSERT INTO blogs (title, content, slug, excerpt, image,user_id)
    VALUES ($1, $2, $3, $4, $5,$6) 
    RETURNING *;
    `;
    const values = [title, content, slug, excerpt, image, user_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },
  findBySlug: async (slug) => {
    const result = await pool.query("SELECT id FROM blogs WHERE slug = $1", [
      slug,
    ]);
    return result.rows[0];
  },
  getAll: async () => {
    const result = await pool.query("SELECT * FROM blogs");
    return result.rows[0];
  },
  getAllByUserId: async (user_id) => {
    const result = await pool.query("SELECT * FROM blogs WHERE user_id = $1", [
      user_id,
    ]);
    return result.rows[0];
  },
};

export default PostModel;
