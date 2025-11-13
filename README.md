# Acxiom
# 🎉 Event Management System

## 📘 Overview
The **Event Management System** is a full-stack web application designed to manage events, memberships, vendors, and users efficiently. It provides role-based access for Admin, Vendor, and User — each with specific permissions and modules.  
The system allows managing events, memberships, transactions, and reports through an intuitive interface that follows a predefined workflow chart.

---

## 🚀 Features

### 👨‍💼 Admin
- Full access to **Maintenance**, **Reports**, and **Transactions**
- Add, update, or remove memberships
- Generate and view detailed event reports
- Extend or cancel user memberships
- Manage vendor and user data

### 🏪 Vendor
- Add new event items (like decorations, catering, etc.)
- View, edit, or delete their own items
- Access transaction records
- Logout securely

### 👥 User
- View available vendors and services
- Book or cancel events
- Manage memberships (6 months, 1 year, or 2 years)
- Access reports and transaction details

---

## 🧭 Application Flow
The flow follows the **Event Management System Chart**, with the following navigation structure:

- **Login Pages** (Admin / Vendor / User)
- **Dashboard**
- **Maintenance (Admin only)**
  - Add Membership
  - Update Membership
- **Reports**
- **Transactions**

> 💡 Each page includes a “Chart” button for navigation reference (not required in the working application).

---

## 🧰 Technologies Used
- **Frontend:** HTML, CSS, JavaScript, ReactJS (for SPA version)
- **Backend:** Node.js / Express.js
- **Database:** MySQL / Firebase Firestore
- **Hosting:** Firebase Hosting / GitHub Pages
- **Version Control:** Git & GitHub

---

## ✅ Form and Functional Requirements
- Proper form validations on all input fields  
- Passwords are hidden on login/signup pages  
- Radio buttons allow single selection (e.g., membership duration)  
- Checkboxes indicate yes/no logic  
- Sessions work properly for each user type  
- Default values:
  - **Add Membership:** 6 months selected by default
  - **Update Membership:** 6-month extension selected by default

---

## 🧩 Folder Structure
event-management-system/
│
├── index.html
├── Admin/
│ ├── Maintenance.html
│ ├── Reports.html
│ └── Transactions.html
│
├── Vendor/
│ ├── VendorDashboard.html
│ ├── AddItem.html
│ ├── VendorItems.html
│ └── Transaction.html
│
├── User/
│ ├── UserLogin.html
│ ├── UserSignup.html
│ └── UserDashboard.html
│
├── assets/
│ └── chart.png
│
└── README.md

yaml
Copy code

---

## 🧠 How to Run Locally

### 🪄 Option 1: Using HTML files directly
1. Download or clone the repository:
   ```bash
   git clone https://github.com/<your-username>/event-management-system.git
