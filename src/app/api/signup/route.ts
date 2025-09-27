import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()
    
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const { data, error } = await supabase
      .from('retloop_users')
      .insert({
        name,
        email,
        password_hash: passwordHash,
        plan: 'trial',
        trial_start_date: new Date().toISOString(),
        trial_end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
      })
      .select()

    if (error) {
      console.log('Insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.log('User created:', data[0])
    return NextResponse.json({ success: true, user: data[0] })
  } catch (error) {
    console.log('Server error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}