const USERS_KEY = "portal_users";
const CURRENT_USER_KEY = "portal_user";
const COURSES_KEY = "portal_courses";

export const storage = {
  getUsers: () => JSON.parse(localStorage.getItem(USERS_KEY) || "[]"),

  saveUser: (user) => {
    const users = storage.getUsers();
    users.push({ ...user, id: Date.now() });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  authenticateUser: (email, password) => {
    const users = storage.getUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("token", "dummy-jwt-token");
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return user;
    }
    return null;
  },

  getCurrentUser: () => JSON.parse(localStorage.getItem(CURRENT_USER_KEY)),

  updateProfile: (updatedData) => {
    const currentUser = storage.getCurrentUser();
    const users = storage.getUsers();
    const index = users.findIndex((u) => u.email === currentUser.email);

    if (index !== -1) {
      const newUser = { ...users[index], ...updatedData };
      users[index] = newUser;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      return newUser;
    }
    return null;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getEnrolledCourses: () => {
    let courses = JSON.parse(localStorage.getItem(COURSES_KEY));
    if (!courses) {
      courses = [
        { id: 1, name: "Introduction to React", instructor: "Ali Mazhar", progress: 80 },
        { id: 2, name: "Advanced Javascript", instructor: "S.M. Ali", progress: 45 },
        { id: 3, name: "Web Development Bootcamp", instructor: "Faizan Ahmed", progress: 10 },
      ];
      localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
    }
    return courses;
  },
};
