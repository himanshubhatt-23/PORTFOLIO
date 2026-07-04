/**
 * server.js
 * ------------------------------------------------------------------
 * Backend for the portfolio site: serves profile/projects/skills/
 * qualifications/certifications as REST endpoints, and handles the
 * Contact form.
 * One file, production-sane defaults: validation, rate limiting,
 * security headers, CORS locked to your frontend origin, and email
 * delivery via SMTP (Nodemailer).
 *
 * Run:
 *   npm install express cors helmet dotenv nodemailer express-rate-limit
 *   node server.js
 *
 * .env (create this file next to server.js):
 *   PORT=5000
 *   CLIENT_ORIGIN=http://localhost:5173
 *   SMTP_HOST=smtp.gmail.com
 *   SMTP_PORT=465
 *   SMTP_USER=you@gmail.com
 *   SMTP_PASS=your-app-password
 *   CONTACT_TO_EMAIL=you@example.com
 *
 * Endpoints:
 *   GET  /api/health
 *   GET  /api/profile
 *   GET  /api/qualifications
 *   GET  /api/skills
 *   GET  /api/projects
 *   GET  /api/projects/:id
 *   GET  /api/certifications
 *   GET  /api/portfolio        (everything above, in one response)
 *   POST /api/contact
 * ------------------------------------------------------------------
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const app = express();

/* ------------------------------------------------------------------
   Core middleware
------------------------------------------------------------------ */
app.use(helmet());
app.use(express.json({ limit: '10kb' })); // small payload cap, this is a contact form
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    methods: ['POST', 'GET'],
  })
);

// Basic abuse protection: 5 submissions per 15 minutes per IP.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

/* ------------------------------------------------------------------
   Mail transport
------------------------------------------------------------------ */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* ------------------------------------------------------------------
   Portfolio data
   Swap this out for a database (Postgres/Prisma etc.) later — the
   route handlers below don't need to change, only this section.
------------------------------------------------------------------ */
const profile = {
  name: 'Himanshu',
  role: 'Backend Developer',
  tagline: 'Building systems from the ground up — one architecture doc, one migration, one endpoint at a time.',
  location: 'India',
  status: 'Open to opportunities',
  email: 'you@example.com',
  github: 'https://github.com/your-handle',
  linkedin: 'https://linkedin.com/in/your-handle',
};

const qualifications = [
  {
    degree: 'B.Tech — Add your field',
    institution: 'Add your institution',
    period: '20XX — 20XX',
    detail: 'Add relevant coursework, honors, or focus area.',
  },
];

const skillGroups = [
  { category: 'Backend', skills: ['NestJS', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'Socket.IO'] },
  { category: 'Infra & Integrations', skills: ['Docker', 'AWS S3', 'Firebase Admin SDK', 'Razorpay', 'Twilio'] },
  { category: 'Frontend', skills: ['React', 'HTML', 'CSS', 'JavaScript'] },
  { category: 'Systems & Low-Level', skills: ['C++', 'OpenGL', 'CMake', 'ECS Architecture'] },
];

const projects = [
  {
    id: 'farmcity',
    tag: 'In Progress',
    title: 'FarmCity',
    description:
      'A hyperlocal grocery and delivery platform connecting consumers directly with local farmers and stores — real-time GPS tracking, order management, and payments.',
    stack: ['NestJS', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'Socket.IO', 'Razorpay'],
    link: '#',
  },
  {
    id: 'harvestmart',
    tag: 'Learning Project',
    title: 'HarvestMart',
    description:
      'A beginner e-commerce site built from scratch — plain HTML, CSS, and JavaScript — with authentication, a full storefront flow, and a hand-built parallax hero.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    link: '#',
  },
  {
    id: 'game-engine',
    tag: 'Learning Project',
    title: 'Custom Game Engine',
    description:
      'A from-scratch game engine covering rendering, physics, collision detection, and an ECS — built to understand low-level systems deeply, not to ship a product.',
    stack: ['C++20', 'OpenGL', 'CMake', 'EnTT'],
    link: '#',
  },
];

const certifications = [
  { id: 'CERT-ID-0000', name: 'Add your certification name', issuer: 'Add issuer', date: '20XX' },
];

/* ------------------------------------------------------------------
   Validation helpers
------------------------------------------------------------------ */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactPayload(body) {
  const errors = {};
  const { name, email, message } = body || {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }
  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    errors.email = 'A valid email address is required.';
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }
  if (name && name.length > 100) errors.name = 'Name is too long.';
  if (message && message.length > 2000) errors.message = 'Message is too long.';

  return { valid: Object.keys(errors).length === 0, errors };
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ------------------------------------------------------------------
   Routes
------------------------------------------------------------------ */
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.get('/api/profile', (_req, res) => {
  res.status(200).json(profile);
});

app.get('/api/qualifications', (_req, res) => {
  res.status(200).json(qualifications);
});

app.get('/api/skills', (_req, res) => {
  res.status(200).json(skillGroups);
});

app.get('/api/projects', (_req, res) => {
  res.status(200).json(projects);
});

app.get('/api/projects/:id', (req, res) => {
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: `No project found with id "${req.params.id}"` });
  }
  res.status(200).json(project);
});

app.get('/api/certifications', (_req, res) => {
  res.status(200).json(certifications);
});

// Convenience endpoint: everything the frontend needs in one round trip.
app.get('/api/portfolio', (_req, res) => {
  res.status(200).json({ profile, qualifications, skillGroups, projects, certifications });
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { valid, errors } = validateContactPayload(req.body);

  if (!valid) {
    return res.status(400).json({ error: 'Validation failed', fields: errors });
  }

  const name = req.body.name.trim();
  const email = req.body.email.trim();
  const message = req.body.message.trim();

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      `,
    });

    return res.status(200).json({ message: '200 OK — message received.' });
  } catch (err) {
    console.error('Failed to send contact email:', err.message);
    return res.status(502).json({ error: 'Message could not be delivered. Please try again later.' });
  }
});

// Fallback for unmatched routes
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Central error handler
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Portfolio backend listening on port ${PORT}`);
});