import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import crypto from 'crypto'
import cookieParser from 'cookie-parser'
import { saveLead, getLeads } from './db.js'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
app.set('trust proxy', 1)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://challenges.cloudflare.com"],
      frameSrc: ["'self'", "https://challenges.cloudflare.com"],
      connectSrc: ["'self'", "https://challenges.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
    },
  },
}))
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))
app.use(express.json({ limit: '20kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function safeCompare(a, b) {
  const bufA = Buffer.from(String(a))
  const bufB = Buffer.from(String(b))
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

// ---- сессии (в памяти сервера) ----
const sessions = new Map() // token -> expiresAt
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 часа

function createSession() {
  const token = crypto.randomBytes(32).toString('hex')
  sessions.set(token, Date.now() + SESSION_DURATION)
  return token
}

function isValidSession(token) {
  if (!token) return false
  const expiresAt = sessions.get(token)
  if (!expiresAt) return false
  if (Date.now() > expiresAt) {
    sessions.delete(token)
    return false
  }
  return true
}

function sessionAuthPage(req, res, next) {
  if (isValidSession(req.cookies.admin_session)) return next()
  return res.redirect('/admin/login')
}

function sessionAuthApi(req, res, next) {
  if (isValidSession(req.cookies.admin_session)) return next()
  return res.status(401).json({ error: 'unauthorized' })
}

const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Слишком много попыток входа. Попробуйте позже.',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
})

const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { error: 'too_many_requests' },
})

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, phone, email, company, message, website, turnstileToken } = req.body

  // honeypot: если это скрытое поле заполнено — это бот
  if (website && website.trim() !== '') {
    console.warn('HONEYPOT TRIGGERED! value =', website, 'ip:', req.ip)
    return res.json({ ok: true })
  }

  if (!turnstileToken) {
    return res.status(400).json({ error: 'captcha_required' })
  }

  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: turnstileToken,
      remoteip: req.ip,
    }),
  })
  const verifyData = await verifyRes.json()
  if (!verifyData.success) {
    return res.status(400).json({ error: 'captcha_failed' })
  }

  if (!name?.trim() || !phone?.trim() || !isValidEmail(email || '') || !message?.trim()) {
    return res.status(400).json({ error: 'invalid_data' })
  }

  saveLead({ name, phone, email, company, message })

  try {
    await transporter.sendMail({
      from: `"HasApp сайт" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: 'Новая заявка с сайта HasApp',
      html: `
      <div style="margin:0;padding:0;background-color:#F4F7FC;font-family:'Segoe UI',Arial,sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F7FC;padding:32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(5,76,134,0.12);">
                <tr>
                  <td style="background:linear-gradient(90deg,#102D65,#1B4BB1);padding:28px 32px;">
                    <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.3px;">HasApp</p>
                    <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">Новая заявка с сайта</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 32px 8px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #EEF2F8;">
                          <p style="margin:0 0 4px;font-size:12px;color:#8A94A6;text-transform:uppercase;letter-spacing:0.4px;">Имя</p>
                          <p style="margin:0;font-size:15px;color:#0B1220;font-weight:600;">${name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #EEF2F8;">
                          <p style="margin:0 0 4px;font-size:12px;color:#8A94A6;text-transform:uppercase;letter-spacing:0.4px;">Телефон</p>
                          <p style="margin:0;font-size:15px;">
                            <a href="tel:${phone}" style="color:#054C86;text-decoration:none;font-weight:600;">${phone}</a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #EEF2F8;">
                          <p style="margin:0 0 4px;font-size:12px;color:#8A94A6;text-transform:uppercase;letter-spacing:0.4px;">Email</p>
                          <p style="margin:0;font-size:15px;">
                            <a href="mailto:${email}" style="color:#054C86;text-decoration:none;font-weight:600;">${email}</a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;">
                          <p style="margin:0 0 6px;font-size:12px;color:#8A94A6;text-transform:uppercase;letter-spacing:0.4px;">Сообщение</p>
                          <p style="margin:0;font-size:14px;color:#333;line-height:1.6;background:#F4F7FC;border-radius:12px;padding:14px 16px;">${message}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 32px 28px;">
                    <a href="mailto:${email}" style="display:inline-block;background:linear-gradient(90deg,#102D65,#1B4BB1);color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:999px;">
                      Ответить клиенту
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:16px 0 0;font-size:12px;color:#9AA5B5;">Письмо отправлено автоматически с сайта HasApp</p>
            </td>
          </tr>
        </table>
      </div>
      `,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('Ошибка отправки письма:', err)
    res.status(500).json({ error: 'send_failed' })
  }
})

// ---- вход в админку ----
app.post('/admin/login', adminLoginLimiter, async (req, res) => {
  const { username, password, 'cf-turnstile-response': turnstileToken } = req.body

  if (!turnstileToken) {
    return res.redirect('/admin/login?error=1')
  }

  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: turnstileToken,
      remoteip: req.ip,
    }),
  })
  const verifyData = await verifyRes.json()
  if (!verifyData.success) {
    return res.redirect('/admin/login?error=1')
  }

  const validUser = safeCompare(username || '', process.env.ADMIN_USER || '')
  const validPass = safeCompare(password || '', process.env.ADMIN_PASS || '')

  if (validUser && validPass) {
    const token = createSession()
    res.cookie('admin_session', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_DURATION,
    })
    return res.redirect('/admin')
  }

  return res.redirect('/admin/login?error=1')
})

app.get('/admin/logout', (req, res) => {
  const token = req.cookies.admin_session
  if (token) sessions.delete(token)
  res.clearCookie('admin_session')
  res.redirect('/admin/login')
})

app.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-login', 'login.html'))
})

app.use('/admin', express.static(path.join(__dirname, 'admin-login'))) // login.js — публичный

app.get('/admin/api/leads', sessionAuthApi, (req, res) => {
  res.json(getLeads())
})

app.use('/admin', sessionAuthPage, express.static(path.join(__dirname, 'admin'))) // дашборд — защищён

app.listen(process.env.PORT, () => {
  console.log(`Contact server running on port ${process.env.PORT}`)
})