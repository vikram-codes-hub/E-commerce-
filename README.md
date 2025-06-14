# 🛒 MERN eCommerce Platform

This is a complete **MERN (MongoDB, Express, React, Node.js)** eCommerce application featuring a **User Panel**, **Admin Dashboard**, **JWT Authentication**, **Stripe Payment Gateway**, and fully **responsive design**.

---

## ✅ Features

### 👤 User Panel
- User registration & login (JWT)
- Browse products & categories
- Search & filter functionality
- Add to Cart & Checkout
- Order tracking
- Stripe secure payment

### 🛠️ Admin Panel
- Admin login with protected access
- Create, edit, delete products
- Manage categories & inventory
- View and manage all orders
- Dashboard with key stats

### 💳 Stripe Integration
- Integrated Stripe Checkout
- Payment success and failure handling
- Real-time order confirmation

### 🔒 Authentication
- JWT-based secure login/register
- Role-based access (admin/user)
- Protected API routes

### 📱 Responsive UI
- Mobile-first responsive design
- Clean UI with Tailwind CSS or CSS modules

---

## 🧰 Tech Stack

| Layer        | Technology      |
|--------------|-----------------|
| Frontend     | React, Axios, React Router, Context API |
| Backend      | Node.js, Express |
| Database     | MongoDB (Mongoose) |
| Auth         | JWT, bcrypt     |
| Payments     | Stripe API      |

---

## 📂 Project Structure
/client → React Frontend
/server → Express Backend
.env → Environment Variables


---

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-username/mern-ecommerce.git
cd mern-ecommerce

2. Set Up Backend
cd server
npm install

Create .env in /server
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

3. Set Up Frontend
cd ../client
npm install


Create .env in /client
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key


▶️ Run the Application
Start Backend
cd server
npm run dev

Start Frontend
cd ../client
npm start


🚀 Deployment
Frontend: Vercel 
