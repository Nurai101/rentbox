function registerUser(name, email, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = {
    id: Date.now().toString(),
    name: name,
    email: email,
    password: password
  };

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));

  return true;
}

function loginUser(email, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let foundUser = users.find(u => u.email === email && u.password === password);

  if (foundUser) {
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
  }

  return foundUser;
}

module.exports = { registerUser, loginUser };
