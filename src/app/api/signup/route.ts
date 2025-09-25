import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()
    
    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' }, 
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' }, 
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user in database
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password_hash: passwordHash,
          plan: 'trial'
        }
      ])
      .select()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'An account with this email already exists' }, 
          { status: 400 }
        )
      }
      return NextResponse.json(
        { error: 'Failed to create account' }, 
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Account created successfully' 
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create account' }, 
      { status: 500 }
    )
  }
}