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
      "UPDATE blogs SET title = $1, content = $2, slug = $3, excerpt = $4, image = $5, update_at = NOW() WHERE id = $6 RETURNING *";
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getRecentPosts: async () => {
    const result = await pool.query(
      `SELECT b.*, 
     (SELECT COUNT(*) FROM comments WHERE post_id = b.id) as comment_count
     FROM blogs b 
     ORDER BY create_at DESC LIMIT 3`,
    );
    return result.rows;
  },
  getById: async (id) => {
    const result = await pool.query("select * from blogs where id = $1", [id]);
    return result.rows[0];
  },
  addComment: async (data) => {
    const { user_id, post_id, comment } = data;
    const query = `
      INSERT INTO comments (user_id, post_id, comment) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;
    const values = [user_id, post_id, comment];
    const { rows } = await pool.query(query, values);

    // Sau khi insert, lấy kèm thông tin user để trả về cho tiện hiển thị
    const commentWithUser = await pool.query(
      `
        SELECT c.*, u.name as user_name, u.avatar as user_avatar
        FROM comments c
        JOIN users u ON c.user_id = u.id
        WHERE c.id = $1
    `,
      [rows[0].id],
    );

    return commentWithUser.rows[0];
  },
  getCommentsByPostId: async (post_id) => {
    const query = `
      SELECT c.*, u.name as user_name, u.avatar as user_avatar
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = $1
      ORDER BY c.create_at DESC;
    `;
    const { rows } = await pool.query(query, [post_id]);
    return rows;
  },
};

export default PostModel;
