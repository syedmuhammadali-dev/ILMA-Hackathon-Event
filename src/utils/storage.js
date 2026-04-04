const USERS_KEY = "portal_users";
const CURRENT_USER_KEY = "portal_user";
const COURSES_KEY = "portal_courses";

export const storage = {
  // Return all saved users (or empty array)
  getUsers: () => JSON.parse(localStorage.getItem(USERS_KEY) || "[]"),

  // Save a new user (adds an `id` timestamp)
  saveUser: (user) => {
    const users = storage.getUsers();
    users.push({ ...user, id: Date.now() });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  // Find a user by email address
  findUserByEmail: (email) => {
    const users = storage.getUsers();
    return users.find((u) => u.email === email);
  },

  // Reset a user's password; returns true if updated
  resetPassword: (email, newPassword) => {
    const users = storage.getUsers();
    const index = users.findIndex((u) => u.email === email);
    if (index !== -1) {
      users[index].password = newPassword;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      return true;
    }
    return false;
  },

  // Authenticate user and store a dummy token + current user
  authenticateUser: (email, password) => {
    const users = storage.getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (user) {
      localStorage.setItem("token", "dummy-jwt-token");
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return user;
    }
    return null;
  },

  // Get the currently authenticated user
  getCurrentUser: () => JSON.parse(localStorage.getItem(CURRENT_USER_KEY)),

  // Update current user's profile and persist changes
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

  // Log out the current user (remove token and current user)
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Retrieve enrolled courses; seed defaults if none exist
  getEnrolledCourses: () => {
    let courses = JSON.parse(localStorage.getItem(COURSES_KEY));
    if (!courses) {
      courses = [
        {
          id: 1,
          name: "Introduction to React",
          instructor: "Ali Mazhar",
          progress: 80,
        },
        {
          id: 2,
          name: "Advanced Javascript",
          instructor: "S.M. Ali",
          progress: 45,
        },
        {
          id: 3,
          name: "Web Development Bootcamp",
          instructor: "Faizan Ahmed",
          progress: 10,
        },
      ];
      localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
    }
    return courses;
  },
};
