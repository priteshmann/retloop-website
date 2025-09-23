import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, source, timestamp } = await request.json()
    
    // Log the email signup for now
    console.log('New email signup:', { email, source, timestamp })
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email captured successfully!' 
    })
  } catch (error) {
    console.error('Error processing email signup:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' }, 
      { status: 500 }
    )
  }
}