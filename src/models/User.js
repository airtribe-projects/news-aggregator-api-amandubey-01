const users = [];

const findUserByEmail = (email) => users.find(u => u.email === email)

const createUser = (userData) => {
    const newUser = {
        id: Date.now().toString(),
        ...userData
    };

    users.push(newUser);
    return newUser;
}

const findUserById = (id) => users.find(u => u.id === String(id));

module.exports = {
    findUserByEmail,
    createUser,
    findUserById,
    getAllUsers: () => users // only for debugging, remove later if you want.
}