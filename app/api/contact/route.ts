import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Simple file-based storage (in production, use a database)
const contactFilePath = path.join(process.cwd(), 'data', 'contacts.json')

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Initialize contacts file if it doesn't exist
function initializeContactFile() {
  ensureDataDirectory()
  if (!fs.existsSync(contactFilePath)) {
    fs.writeFileSync(contactFilePath, JSON.stringify([], null, 2))
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, message, type = 'contact' } = body

    // Validate required fields
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name is required (minimum 2 characters)' },
        { status: 400 }
      )
    }

    if (type === 'demo' && !company) {
      return NextResponse.json(
        { error: 'Company name is required for demo requests' },
        { status: 400 }
      )
    }

    // Initialize file if needed
    initializeContactFile()

    // Read existing contacts
    const existingData = fs.readFileSync(contactFilePath, 'utf-8')
    const contacts = JSON.parse(existingData)

    // Add new contact
    const newContact = {
      name: name.trim(),
      email: email.toLowerCase(),
      company: company?.trim() || null,
      message: message?.trim() || null,
      type, // 'contact' or 'demo'
      timestamp: new Date().toISOString(),
    }

    contacts.push(newContact)

    // Write back to file
    fs.writeFileSync(contactFilePath, JSON.stringify(contacts, null, 2))

    // In production, you would send an email notification here
    // Example: await sendEmailNotification(newContact)

    return NextResponse.json(
      { 
        success: true, 
        message: type === 'demo' 
          ? 'Demo request submitted successfully. We\'ll be in touch soon!' 
          : 'Message sent successfully. We\'ll get back to you soon!',
        data: newContact 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit message. Please try again.' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to view contacts (remove in production or add auth)
export async function GET() {
  try {
    initializeContactFile()
    
    if (!fs.existsSync(contactFilePath)) {
      return NextResponse.json({ contacts: [] })
    }

    const data = fs.readFileSync(contactFilePath, 'utf-8')
    const contacts = JSON.parse(data)

    return NextResponse.json({ contacts })
  } catch (error) {
    console.error('Error reading contacts:', error)
    return NextResponse.json(
      { error: 'Failed to read contacts' },
      { status: 500 }
    )
  }
}

