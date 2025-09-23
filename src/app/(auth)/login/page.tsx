'use client'

import React from 'react';
import { Container } from '@mantine/core';
import Link from 'next/link';
import { LoginForm } from './login-form';

export default function Page() {
  return (
    <Container
      fluid
      size={'xl'}
      className="flex justify-center items-center h-screen w-screen dark:bg-gradient-to-br from-[#27282A] to-black py-0 px-2 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center shadow-purple-400 shadow-md bg-white h-[650px] w-[1200px] border-white-1 rounded-4xl overflow-hidden p-6 ">
        <div className="flex flex-col justify-center items-center w-full md:w-5/12 h-full rounded-4xl text-center py-8 md:py-0">
          <Link href='/' >
            <h1 className='font-extrabold text-3xl md:text-4xl text-[#6441A5] mb-4 md:mb-10 drop-shadow-md'>
              Lensor
            </h1>
          </Link>
          <LoginForm />
        </div>

        <div className="w-full hidden md:block md:w-7/12 h-full bg-[url('/camera1.jpg')] bg-cover bg-center rounded-4xl p-10">
          <h2 className='uppercase absolute bottom-30 font-bold opacity-20 text-5xl md:text-[58px] select-none text-white tracking-wide'>
            Make your <br />perfect portfolio
          </h2>
        </div>
      </div>
    </Container >
  )
}