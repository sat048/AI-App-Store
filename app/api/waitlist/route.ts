import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Simple file-based storage (in production, use a database)
const waitlistFilePath = path.join(process.cwd(), 'data', 'waitlist.json')

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Initialize waitlist file if it doesn't exist
function initializeWaitlistFile() {
  ensureDataDirectory()
  if (!fs.existsSync(waitlistFilePath)) {
    fs.writeFileSync(waitlistFilePath, JSON.stringify([], null, 2))
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Initialize file if needed
    initializeWaitlistFile()

    // Read existing waitlist
    const existingData = fs.readFileSync(waitlistFilePath, 'utf-8')
    const waitlist = JSON.parse(existingData)

    // Check if email already exists
    if (waitlist.some((entry: any) => entry.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json(
        { error: 'Email already registered', alreadyExists: true },
        { status: 409 }
      )
    }

    // Add new entry
    const newEntry = {
      email: email.toLowerCase(),
      timestamp: new Date().toISOString(),
      source: 'waitlist',
    }

    waitlist.push(newEntry)

    // Write back to file
    fs.writeFileSync(waitlistFilePath, JSON.stringify(waitlist, null, 2))

    // In production, you would send an email notification here
    // Example: await sendEmailNotification(newEntry)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully added to waitlist',
        data: newEntry 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Waitlist signup error:', error)
    return NextResponse.json(
      { error: 'Failed to process signup. Please try again.' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to view waitlist (remove in production or add auth)
export async function GET() {
  try {
    initializeWaitlistFile()
    
    if (!fs.existsSync(waitlistFilePath)) {
      return NextResponse.json({ waitlist: [] })
    }

    const data = fs.readFileSync(waitlistFilePath, 'utf-8')
    const waitlist = JSON.parse(data)

    return NextResponse.json({ waitlist })
  } catch (error) {
    console.error('Error reading waitlist:', error)
    return NextResponse.json(
      { error: 'Failed to read waitlist' },
      { status: 500 }
    )
  }
}

