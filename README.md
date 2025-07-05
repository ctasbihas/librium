# 📚 Minimal Library Management System

![License](https://img.shields.io/badge/License-MIT-green.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-blue.svg)

---

## 📌 Table of Contents

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Integration](#api-integration)
7. [UI/UX Design](#uiux-design)
8. [Bonus Features](#bonus-features)
9. [Contributing](#contributing)
10. [License](#license)
11. [Acknowledgments](#acknowledgments)

---

## 🚀 Project Overview

The **Minimal Library Management System** is a client-side app built with **React**, **Redux Toolkit Query (RTK Query)**, and **TypeScript**.  
No user authentication — just pure focus on core library functionalities like book management & borrowing. 📖✨

---

## ⚙️ Technologies Used

-   **Frontend:** React + TypeScript
-   **State Management:** Redux Toolkit + RTK Query
-   **Styling:** Tailwind CSS, ShadCN
-   **Backend:** Node.js + Express.js + MongoDB

---

## 🗂️ Features

### ✅ Public Routes

-   All pages are accessible **without login** — truly minimal.

### 📚 Book Management

-   View, add, edit, & delete books.
-   Essential book info: **Title, Author, Genre, ISBN, Copies, Availability**.
-   Borrow books with **quantity** & **due date** tracking.

### 📊 Borrow Summary

-   Displays a list of borrowed books with total quantities per book.

### 📱 Responsive Design

-   Clean, minimalist UI that **adapts beautifully** on mobile, tablet, and desktop.

---

## 🔧 Installation

1. **Clone the repo**

    ```bash
    git clone https://github.com/ctasbihas/librium
    cd librium
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the app**

    ```bash
    npm start
    ```

⚡ **Don’t forget:** Make sure your backend server is up & pointing to the correct API endpoints.

---

## 📖 Usage

-   `/books` → View all books, edit, delete, & borrow.
-   `/create-book` → Add a new book.
-   `/borrow-summary` → Check borrowed books & quantities.

---

## 🔌 API Integration

Built with **RTK Query** for type-safe, efficient data fetching:

-   Fetch, create, update, and delete books.
-   Typed endpoints = less bugs, more peace of mind. 🧘

---

## 🎨 UI/UX Design

-   Minimalist, clean layout.
-   Straightforward actions — no clutter.
-   Easy navigation on all devices.

---

## ✨ Bonus Features

-   **Optimistic UI Updates:** Instant UI updates while waiting for the server.
-   **Toast Notifications:** Sweet feedback for success & errors.
-   **Type-Safe Forms:** Forms that know what’s up — TypeScript style.
-   **Fully Responsive:** No device left behind.

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### 📌 How to Contribute

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.
See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

-   Inspired by simple library systems out there.
-   Big love to the open-source community & libraries that made this possible. 💚

---

## 💡 Pro Tip

Keep this README updated as you add new features or make major changes.
A good README is a dev’s best friend.

---

## 🔗 Ready to go!

Peace, love, and happy coding!
