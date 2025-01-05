'use client';

import { signIn } from 'next-auth/react';
import React from 'react';

function page() {
    const handleSubmit = async(formData: FormData) => {
        const email = formData.get('email')
        const password = formData.get('password')

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password
        })
    }
  return (
    <div>
        <form action={handleSubmit}>
            <input type='text' placeholder='email' name='email' />
            <input type='text' placeholder='password' name='password' />
            <button type='submit'>Sign in</button>
        </form>
    </div>
  )
}

export default page