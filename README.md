# CMH - Court Management Hub

CMH is a modern, premium legal case management system designed for law firms, independent lawyers, and their clients. It provides a centralized platform for tracking legal proceedings, managing documents, and streamlining communication.

## 🚀 Key Features

### 🏛️ Case Management
- Full CRUD operations for legal cases.
- **Role-Based Access Control**: Different views and permissions for Admins, Lawyers, and Clients.
- **Detailed Tracking**: Monitor case numbers, titles, petitioners, defenders, and status updates.
- **Timeline Tracking**: Automatic logging of case events and status changes.

### 📅 Judicial Infrastructure
- **Courts Management**: Database of 20+ major Indian and Tamil Nadu district courts with full addresses.
- **Case Types**: Customizable classifications for cases (Cyber Crime, Family Law, Civil Dispute, etc.).
- **Hearing Schedules**: Track upcoming hearings, courtroom assignments, and status conferences.

### 💳 Financials & Documentation
- **Invoice Generation**: Automated billing system for legal services.
- **Document Manager**: Secure storage and management of case-related files.
- **Premium UI Dashboards**: Dynamic overview of active cases, pending hearings, and outstanding invoices.

### 👤 User Experience
- **Multi-Account Login**: Switch between multiple logged-in accounts (Admin, Lawyer, Client) without re-authenticating.
- **Premium UI/UX**: Custom-built searchable selects, sleek dark-themed design, and fluid micro-animations.
- **Quick Login**: Dedicated shortcuts for rapid testing during development.

## 🛠️ Technology Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ODM).
- **Authentication**: JSON Web Tokens (JWT) with secure bcrypt hashing.

## 🏁 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB connection string

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CMH
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   # Create a .env file with MONGODB_URI and JWT_SECRET
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

## 📜 Development Notes
- Use `admin@gmail.com` / `admin123` for administrative access.
- Seed data scripts available in the `server` directory for Courts and Case Types.

---
*Built with precision for the modern legal professional.*
