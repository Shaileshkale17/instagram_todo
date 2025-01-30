# Instagram-like Post Management System (MERN Stack)

## Objective

Build a full-stack CRUD application where users can create, view, update, and delete posts. Each post will include an image, a title, and a description.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** MongoDB (using Mongoose ODM)
- **Image Storage:** Cloudinary (with Multer for handling uploads)

### Other Tools

- **State Management:** React Hooks
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **API Testing:** Postman
- **Version Control:** Git & GitHub

---

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js & npm
- MongoDB
- Git

### Clone the Repository

```bash
git clone https://github.com/Shaileshkale17/instagram_todo
cd instagram_todo
```

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure the environment variables:

   ```env
   PORT=8080
   URL=your_mongodb_connection_string
   ORIGIN=*
   CLOUDINARY_NAME=your_Cloudinary_name
   CLOUDINARY_API_KEY=your_Cloudinary_api_key
   CLOUDINARY_API_SECRET=your_Cloudinary_api_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

### Running the Application

Once both the frontend and backend servers are running, open your browser and visit:

```
http://localhost:5173
```

## API Endpoints

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| GET    | /api/todo/getall      | Get all posts     |
| GET    | /api/todo/getByid/:id | Get a single post |
| POST   | /api/todo/create      | Create a new post |
| PUT    | /api/todo/update/:id  | Update a post     |
| DELETE | /api/todo/delete/:id  | Delete a post     |

## Folder Structure

```
instagram_todo/
│── backend/
│   ├── Config/
│   │   ├── cloudinary.js
│   ├── models/
│   │   ├── instagram_todo.model.js
│   ├── routes/
│   │   ├── Todo.routes.js
│   ├── controllers/
│   │   ├── InstagramTodo.Controller.js
│   ├── middleware/
│   │   ├── multer.middleware.js
│   ├── Database/
│   │   ├── index.js
│   ├── index.js
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── vercel.json
│
│── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── InputBox.jsx
│   │   │   ├── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Edit.jsx
│   │   │   ├── EditForm.jsx
│   │   │   ├── Home.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── vercel.json
│   ├── README.md
│   ├── vite.config.js
│
│
│── README.md

```

## Portfolio

Check out my portfolio: [Shailesh Kale - Full Stack Developer](https://protfolio-shailesh-full-stack-developer.vercel.app/)
