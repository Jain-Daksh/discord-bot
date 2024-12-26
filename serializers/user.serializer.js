const index = async (users) => {
  const usersList = [];

  users.forEach((u) => {
    const user = {
      user: {
        id: u.id,
        email: u.email,
        username: u.username
      },
    };
    usersList.push(user);
  });
  return usersList;
};
const show = async (user) => {
  const userData = {
    id: u.id,
    email: u.email,
    username: u.username
  };
  return userData;
};

module.exports = {
  index,
  show,
};
