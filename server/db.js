import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const db = new Database(path.join(__dirname, 'data', 'leads.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    createdAt TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL
  )
`)

export function saveLead({ name, phone, email, company, message }) {
  const id = crypto.randomUUID()
  const createdAt = new Date().toISOString()
  db.prepare(`
    INSERT INTO leads (id, createdAt, name, phone, email, company, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, createdAt, name, phone, email, company || '', message)
  return { id, createdAt, name, phone, email, company, message }
}

export function getLeads() {
  return db.prepare('SELECT * FROM leads ORDER BY createdAt DESC').all()
}