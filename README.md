# TechJS-TPs - Learning Projects Repository

This repository contains multiple lab work projects demonstrating various web development technologies and concepts using JavaScript/TypeScript.

---

## 📁 Project Structure

This repo contains **3 main projects**, each focusing on different aspects of modern web development:

### 1. 📚 **book-reading-tracker**
**Type:** TypeScript/Node.js Backend  
**Purpose:** A full-stack application for tracking and managing book reading progress  
**Key Features:**
- Server-side API built with Express/Node.js
- TypeScript for type safety
- Database connection module for persistent storage
- RESTful routes for book management
- Data models for Book entity management

**Tech Stack:** TypeScript, Node.js, Express (implied), Database integration

---

### 2. 🔐 **books-api-authentication**
**Type:** JavaScript/Express REST API  
**Purpose:** Authentication and authorization system for a books management API  
**Key Features:**
- User authentication middleware
- JWT-based authentication (implied from auth middleware)
- Books and user management controllers
- Protected API routes
- User model with authentication logic

**Tech Stack:** JavaScript, Express.js, Node.js, Authentication middleware

**Structure:**
- `/controllers` - Request handlers for auth and books
- `/middleware` - Authentication middleware
- `/models` - User data model
- `/routes` - API endpoints for authentication and books

---

### 3. 🎮 **rock-paper-scissors**
**Type:** Frontend Game  
**Purpose:** Interactive Rock-Paper-Scissors game built with vanilla JavaScript  
**Key Features:**
- HTML5 game interface
- Vanilla JavaScript game logic
- CSS styling for UI/UX
- Emoji-based visual representation
- Responsive game board

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript

**Structure:**
- Standalone HTML game with embedded JavaScript
- Styled with custom CSS
- Includes emoji images for game elements

---

## 🚀 Quick Start

Each project is independent and can be set up individually:

```bash
# For book-reading-tracker
cd book-reading-tracker
npm install
npm run dev  # or start script

# For books-api-authentication
cd books-api-authentication
npm install
npm start

# For rock-paper-scissors
cd rock-paper-scissors
# Open functions2-r-s-p.html in your browser
```

---

## 📝 Notes

- **book-reading-tracker** & **books-api-authentication** require Node.js and npm
- **rock-paper-scissors** is a frontend-only project that runs directly in the browser
- Each project has its own `package.json` and configuration files
- Refer to individual project READMEs for detailed setup instructions

---

## 📚 Learning Outcomes

- **Backend Development:** Server-side logic, database connections, API design
- **Authentication:** Implementing secure authentication and authorization
- **Frontend Interactivity:** DOM manipulation, event handling, game logic
- **Full-Stack Integration:** Understanding how frontend and backend systems communicate

---

*Last Updated: May 2026*
