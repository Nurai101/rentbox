function registerUser(name, email, password) {

let users = JSON.parse(localStorage.getItem("users")) || [];

let user = {
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

return users.find(u => u.email === email && u.password === password);
}
module.exports = { registerUser, loginUser };