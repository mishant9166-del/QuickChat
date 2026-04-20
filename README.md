# 💬 Real-Time Chat App (MERN + Socket.IO)

A full-stack **real-time chat application** built using the MERN stack with **Socket.IO**.
Users can register, log in, update profiles, and exchange **text + image messages instantly** with live online status and unseen message indicators.

---

## 🚀 Features


* Login Page
* Chat UI
* Profile Page
* Real-time Messaging

---

## 🛠️ Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Socket.IO Client
* React Hot Toast

### Backend

* Node.js
* Express
* Socket.IO
* MongoDB + Mongoose
* JWT Authentication
* bcryptjs
* Cloudinary

### Deployment

* Vercel
* MongoDB Atlas
* Cloudinary

---

## ⚡ Features

* 🔐 JWT Authentication
* 💬 Real-time messaging
* 🟢 Online/Offline status
* 📨 Unseen message notifications
* 🖼️ Image sharing
* 👤 Profile update
* 🔍 Search users
* 📱 Responsive UI
* 🔔 Toast notifications

---

## 📂 Project Structure

```
QuickChat/
├── client/
│   ├── src/
│   ├── pages/
│   ├── components/
│   ├── context/
│   └── App.jsx
│
└── server/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── server.js
```

---

## 🔐 Authentication Flow

* Signup → Password hashed using bcrypt
* Login → JWT token generated
* Token stored in localStorage
* Protected routes using middleware

---

## ⚡ Real-Time System

* Socket connection established on login
* `userSocketMap` tracks online users
* Messages are emitted instantly to receiver
* Online users list updates in real time

---

## 🗃️ Database Models

### User

```js
{
  email: String,
  fullName: String,
  password: String,
  profilePic: String,
  bio: String
}
```

### Message

```js
{
  senderId: ObjectId,
  receiverId: ObjectId,
  text: String,
  image: String,
  seen: Boolean
}
```

---

## 📡 API Endpoints

### Auth

* POST `/api/auth/signup`
* POST `/api/auth/login`
* GET `/api/auth/check`
* PUT `/api/auth/update-profile`

### Messages

* GET `/api/messages/users`
* GET `/api/messages/:id`
* POST `/api/messages/send/:id`
* PUT `/api/messages/mark/:id`

---

## ⚙️ Environment Variables

### Server (.env)

```
MONGODB_URL=
JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

PORT=5000
```

### Client (.env)

```
VITE_BACKEND_URL=
```

---

## 🚦 Run Locally

```bash
# Clone repo
git clone https://github.com/your-username/chat-app.git

# Backend
cd server
npm install
npm run server

# Frontend
cd ../client
npm install
npm run dev
```

---

## 💡 Learning Outcomes

* Built real-time apps using Socket.IO
* Implemented JWT authentication
* Managed global state with React Context
* Integrated Cloudinary for image upload
* Designed responsive UI

---

## 🌟 Future Improvements

* Typing indicators
* Group chats
* Message reactions
* Voice/video calling




