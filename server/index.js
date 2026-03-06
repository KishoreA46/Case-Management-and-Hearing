const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();
const connectDB = require('./config/database');

// Routes
const authRoutes = require('./routes/authRoutes');
const caseRoutes = require('./routes/caseRoutes');
const hearingRoutes = require('./routes/hearingRoutes');
const clientRoutes = require('./routes/clientRoutes');
const lawyerRoutes = require('./routes/lawyerRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const courtRoutes = require('./routes/courtRoutes');
const caseTypeRoutes = require('./routes/caseTypeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const timelineRoutes = require('./routes/timelineRoutes');
const tagRoutes = require('./routes/tagRoutes');
const documentRoutes = require('./routes/documentRoutes');
const chatRoutes = require('./routes/chatRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Main Route
app.get('/', (req, res) => {
  res.send('Legal Case Management API is running...');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/hearings', hearingRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/lawyers', lawyerRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/courts', courtRoutes);
app.use('/api/case-types', caseTypeRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/docs', documentRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notifications', notificationRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});