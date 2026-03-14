const { registerUser, loginUser } = require("../js/auth");

global.localStorage = {
store: {},

getItem(key) {
return this.store[key] || null;
},

setItem(key, value) {
this.store[key] = value.toString();
},

clear() {
this.store = {};
}
};

test("User registration works", () => {

localStorage.clear();

registerUser("Test","test@mail.com","1234");

let users = JSON.parse(localStorage.getItem("users"));

expect(users.length).toBe(1);
expect(users[0].email).toBe("test@mail.com");

});

test("Login works", () => {

localStorage.clear();

registerUser("Test","test@mail.com","1234");

let user = loginUser("test@mail.com","1234");

expect(user.email).toBe("test@mail.com");

});

test("Login fails with wrong password", () => {

localStorage.clear();

registerUser("Test","test@mail.com","1234");

let user = loginUser("test@mail.com","0000");

expect(user).toBeUndefined();

});

test("Multiple users can register", () => {

localStorage.clear();

registerUser("User1","user1@mail.com","1111");
registerUser("User2","user2@mail.com","2222");

let users = JSON.parse(localStorage.getItem("users"));

expect(users.length).toBe(2);

});