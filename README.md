# ⚡ LinkZap – Shrink. Share. Track.

**Simplify your links, amplify your reach!** 🚀

LinkZap is a lightning-fast URL shortener with smart analytics, designed to help you quickly manage, share, and track your links with ease.

---

## 🌐 Live Demo

Experience the speed and power of LinkZap right now!

🔗 **[link-zap.onrender.com](https://link-zap.onrender.com)**

---

## ✨ Features

LinkZap offers powerful tools to simplify your sharing and understand your audience.

* **Lightning-Fast Shortening:** Generate a concise short link in milliseconds.
* **Smart Analytics:** Track clicks you got on every link.
* **User-Friendly Interface:** An intuitive, clean design for a seamless user experience.
---

## 🛠️ Technology Stack

LinkZap is built with modern, efficient technologies to ensure speed and reliability.

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/) | Fast, component-based UI development with utility-first styling. |
| **Backend** | [Node.js](https://nodejs.org/), [Express](https://expressjs.com/) | Robust and scalable server-side application development. |
| **Database** | [MongoDB](https://www.mongodb.com/) | Flexible data storage for links and high-volume analytics data. |
| **Deployment** | [Render](https://render.com/) | Continuous deployment and hosting for the live application. |

---

## 🚀 Getting Started

Follow these steps to set up and run LinkZap locally on your machine for development and testing.

### Prerequisites

* [Node.js](https://nodejs.org/) (LTS recommended)
* [npm](https://www.npmjs.com/)
* A running instance of your chosen database.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ujjawalptdr/linkzap.git
    cd Link-Zap
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Configuration

Create a file named **`.env`** in the root directory and add your environment variables.

```env
# Server Configuration
PORT=3000

# Database Configuration (Update with your credentials)
MongoDB_URL="mongodb://localhost:27017/linkzap"

# Security (Generate a strong, random key)
JWT_SECRET="your_very_strong_secret_key_here"

# Base URL for the short links (Update if deploying to a custom domain)
BASE_URL="http://localhost:3000/"
```

2.  **Run the Project**
    ```bash
    npm run build
    ```
    ```bash
    npm run dev
    ```
