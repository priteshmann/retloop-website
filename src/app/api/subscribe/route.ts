import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, source, timestamp } = await request.json()
    
    // Store email in Supabase
    const { data, error } = await supabase
      .from('email_signups')
      .insert([
        { 
          email, 
          source: source || 'landing_page_trial',
          created_at: timestamp 
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to store email' }, 
        { status: 500 }
      )
    }

    console.log('Email stored successfully:', data)
    
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