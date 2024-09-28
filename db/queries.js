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


//messages
exports.getAllMessages = async () => {
    const { rows } = await pool.query(`
            SELECT messages.id 
                , messages.title
                , messages.text
                , messages.user_id
                    , users.firstname
                    , users.lastname
                    , concat(users.firstname, ' ', users.lastname) as user
                , messages.created
            FROM messages
                INNER JOIN users ON messages.user_id = users.id
        `);
    return rows;
}

exports.getMessageById = async (id) => {
    const { rows } = await pool.query(`
            SELECT messages.id 
                , messages.title
                , messages.text
                , messages.user_id
                    , users.firstname
                    , users.lastname
                    , concat(users.firstname, ' ', users.lastname) as user
                , messages.created
            FROM messages
                INNER JOIN users ON messages.user_id = users.id
            WHERE messages.id = $1;
        `, [id]);
    return rows[0];
}

exports.createMessage = async (message) => {
    const { rows } = await pool.query(`
            INSERT INTO messages (title, text, user_id)
            VALUES ($1, $2, $3)
            RETURNING id;
        `, [message.title, message.text, message.user_id])
    return rows[0].id;

}


exports.deleteMessageById = async (id) => {
    return await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}