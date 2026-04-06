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
    const result = await pool.query("SELECT * FROM blogs WHERE slug = $1", [
      slug,
    ]);
    return result.rows[0];
  },
  getAll: async () => {
    const result = await pool.query(
      "SELECT * FROM blogs ORDER BY create_at DESC",
    );
    return result.rows;
  },
  getAllByUserId: async (user_id) => {
    const result = await pool.query(
      "SELECT * FROM blogs WHERE user_id = $1 ORDER BY create_at DESC",
      [user_id],
    );
    return result.rows;
  },

  delete: async (id) => {
    const result = await pool.query(
      "DELETE FROM blogs WHERE id = $1 RETURNING *",
      [id],
    );
    return result.rows[0];
  },
  update: async (id, data) => {
    const { title, content, slug, excerpt, image } = data;
    const values = [title, content, slug, excerpt, image, id];
    const query =
      "UPDATE blogs SET title = $1, content = $2, slug = $3, excerpt = $4, image = $5 WHERE id = $6 RETURNING *";
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getRecentPosts: async () => {
    const result = await pool.query(
      "SELECT * FROM blogs ORDER BY create_at DESC LIMIT 3",
    );
    return result.rows;
  },
};

export default PostModel;
