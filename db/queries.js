const pool = require("./pool");


exports.getUserByEmail = async (email) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    return rows[0];
}
exports.getUserById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id])
    return rows[0];
}

exports.postCreateUser = async(user) => {
    const { rows } = await pool.query(`
            INSERT INTO users (firstname, lastname, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id;
        `, [user.firstname, user.lastname, user.email, user.password]);
    return rows[0].id;
}

exports.updateLastLogin = async(id) => {
    await pool.query(`
            UPDATE users SET lastlogin = NOW() WHERE id = $1
        `, [id]);
}