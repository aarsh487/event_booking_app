import { Github, Linkedin, Mail } from 'lucide-react'
import React from 'react'
import { FaXTwitter } from 'react-icons/fa6'
import { PiNumberSevenThin } from 'react-icons/pi'
import { Separator } from './ui/separator'

export const Footer = () => {
  return (
    <div className='bg-black text-white'>
    <Separator className="" />

      
      <footer className="flex justify-between p-32">
        <div>
          <div className="flex items-center">
            <PiNumberSevenThin className="text-red-600" size={50} />
            <h1 className="text-3xl font-thin">Evento</h1>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <Linkedin />
          <Mail />
          <FaXTwitter />
          <Github />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-bold">Navigate</h1>
          <p className="hover:text-neutral-400 cursor-pointer">Home</p>
          <p className="hover:text-neutral-400 cursor-pointer">Events</p>
          <p className="hover:text-neutral-400 cursor-pointer">About us</p>
          <p className="hover:text-neutral-400 cursor-pointer">Dashboard</p>
        </div>
      </footer>
      </div>
  )
}
