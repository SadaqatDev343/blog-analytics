# Blog Analytics Dashboard

A full-stack blog management and analytics dashboard built with **React**, **Vite**, **Express**, and **MongoDB**. This project allows users to create, update, delete, and view blog posts with comments, and provides analytics for top authors, most commented posts, and posts per day.

---

## Features

### Blog Management
- Add, edit, and delete blog posts
- View all posts in a paginated list
- View individual post details with comments
- Edit and delete posts only by their authors

### Comment Management
- Add, edit, and delete comments on posts
- Only comment authors can edit or delete their comments
- Comment count displayed on posts

### Analytics Dashboard
- Top authors (table)
- Most commented posts (list)
- Posts per day (bar chart)

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS, React Query, React Router
- **Charts & Icons:** react-chartjs-2, Chart.js, lucide-react
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **API:** RESTful API for posts, comments, and analytics

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- MongoDB running locally or a cloud instance

### Installation

1. Clone the repository:

```bash
git clone https://github.com/SadaqatDev343/blog-analytics
cd blog-analytics
