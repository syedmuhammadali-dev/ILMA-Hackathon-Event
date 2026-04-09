# Ilma Hackathon - Student Portal

A modern student portal built with React and Vite. The app provides a complete front-end experience for student authentication, profile management, course enrollment, grades, schedule, and notifications.
   
## Project Overview

This project is a front-end only student dashboard.

- Authentication and session state are handled with localStorage.
- Route protection is done with React Router guards.
- UI is built with MDB React UI Kit + Tailwind CSS utilities.
- Motion and transitions are implemented with Framer Motion.
- Form validation is handled by Zod.

## Key Features

- Signup, Login, Forgot Password, and Reset Password flows.
- Protected dashboard routes with public/private route guards.
- Responsive dashboard layout with:
	- Top header
	- Sidebar navigation (desktop)
	- Mobile navigation menu
- Theme toggle (light/dark mode) persisted in localStorage.
- Student Portal page with enrolled course list and enroll-course modal.
- Profile page with editable user data and avatar upload.
- Grades page with transcript-download simulation.
- Schedule page with export-PDF simulation.
- Notifications page with mark-all-as-read behavior.
- Global loading overlay via context.
- Error boundary in dashboard content area.

## Tech Stack

- React 18
- Vite 8
- React Router DOM 7
- Tailwind CSS 4
- MDB React UI Kit
- Framer Motion
- SweetAlert2
- Zod
- Font Awesome
- ESLint 9

## Routes

### Public Routes

- /login
- /signup
- /forgot-password
- /reset-password

### Protected Routes

- /
- /portal
- /profile
- /grades
- /schedule
- /notifications

## Local Storage Keys

The app currently uses these localStorage keys:

- token: dummy auth token for protected routing.
- portal_users: registered users array.
- portal_user: currently logged-in user.
- portal_courses: enrolled courses list.
- theme: light or dark theme state.

## Project Structure

```text
src/
	components/
		DashboardLayout/
		ErrorBoundary/
		Header/
		ProtectedRoutes/
		PublicRoutes/
		Sidebar/
		UI/
	context/
		EnrollModalContext.jsx
		LoadingContext.jsx
	pages/
		Auth/
		Grades/
		Home/
		Login/
		Notifications/
		Portal/
		Profile/
		Schedule/
		Signup/
	utils/
		colorClasses.js
		routes.jsx
		storage.js
		validation.js
```

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```  

## Demo Flow

1. Open signup page and create a new student account.
2. Login using the same credentials.
3. Explore dashboard pages (Portal, Profile, Grades, Schedule, Notifications).
4. Logout from the top-right header button.

## Validation Rules (Zod)

- Full name: minimum 3 characters.
- Student ID: minimum 4 characters.
- Email: valid email format.
- Password: minimum 6 characters.
- Reset password: confirm password must match.

## Notes

- This is currently a front-end project with mock/local data.
- Backend APIs and real authentication are not integrated yet.
- Some actions are intentionally simulated (for example transcript and PDF export).


___

updating...
