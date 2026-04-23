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
  findBySlug: async (slug, userId = null) => {
    const query = `
    SELECT 
      b.*, 
      (SELECT COUNT(*) FROM likes WHERE post_id = b.id) as like_count,
      CAST(EXISTS (
        SELECT 1 FROM likes WHERE post_id = b.id AND user_id = $2
      ) AS BOOLEAN) as is_liked
    FROM blogs b 
    WHERE b.slug = $1
  `;

    const result = await pool.query(query, [slug, userId]);
    return result.rows[0];
  },
  getAll: async () => {
    const result = await pool.query(
      "SELECT b.*, (SELECT COUNT(*) FROM comments WHERE post_id = b.id) as comment_count FROM blogs b ORDER BY create_at DESC",
    );
    return result.rows;
  },
  getAllByUserId: async (user_id) => {
    const result = await pool.query(
      `SELECT b.*, 
      (SELECT COUNT(*) FROM comments WHERE post_id = b.id) as comment_count,

      (SELECT COUNT(*) FROM likes WHERE post_id = b.id) as like_count,

      EXISTS (SELECT 1 FROM likes WHERE post_id = b.id AND user_id = $1) as "is_liked"
      
     FROM blogs b WHERE b.user_id = $1
     ORDER BY create_at DESC `,
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

  getRecentPosts: async (userId = null) => {
    const result = await pool.query(
      `SELECT b.*, 
      (SELECT COUNT(*) FROM comments WHERE post_id = b.id) as comment_count,

      (SELECT COUNT(*) FROM likes WHERE post_id = b.id) as like_count,

      EXISTS (SELECT 1 FROM likes WHERE post_id = b.id AND user_id = $1) as "is_liked"
      
     FROM blogs b 
     ORDER BY create_at DESC LIMIT 3`,
      [userId],
    );

    return result.rows.map((row) => ({
      ...row,
      comment_count: parseInt(row.comment_count) || 0,
      like_count: parseInt(row.like_count) || 0,
    }));
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
  toggleLike: async (user_id, post_id) => {
    const check = await pool.query(
      "SELECT 1 FROM likes WHERE user_id = $1 AND post_id = $2",
      [user_id, post_id],
    );

    if (check.rows.length > 0) {
      await pool.query(
        "DELETE FROM likes WHERE user_id = $1 AND post_id = $2",
        [user_id, post_id],
      );
      return { liked: false };
    } else {
      await pool.query("INSERT INTO likes (user_id, post_id) VALUES ($1, $2)", [
        user_id,
        post_id,
      ]);
      return { liked: true };
    }
  },

  getLikeCount: async (post_id) => {
    const res = await pool.query(
      "SELECT COUNT(*) FROM likes WHERE post_id = $1",
      [post_id],
    );
    return parseInt(res.rows[0].count) || 0;
  },

  incrementViews: async (slug) => {
    const query = `
      UPDATE blogs 
      SET view = COALESCE(view, 0) + 1 
      WHERE slug = $1 
      RETURNING view;
    `;
    const { rows } = await pool.query(query, [slug]);
    return rows[0];
  },

  getTopTrendingPost: async () => {
    const query = `
    SELECT * FROM blogs 
    ORDER BY view DESC 
    LIMIT 1;
  `;
    const { rows } = await pool.query(query);
    return rows[0];
  },
};

export default PostModel;
