import React, { Component } from 'react';
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Navbar from '../component/Navbar';
import CartBar from '../component/CartBar';

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      token: "",
      userName: "",
      userId: 0
    }

    if(localStorage.getItem('token')){
      this.state.token = localStorage.getItem('token')
      this.state.userName = localStorage.getItem('name')
    }else{
      window.location = '/signin'
    }
    
  }

  headerConfig = () =>{
    let header = {
      headers: {Authorization: `Bearer ${this.state.token}`}
    }
    return header
  }
    render() {
        return (
          <div>
            <Navbar/>
            <div>
            <div className="relative bg-white overflow-hidden ">
            <div className="max-w-7xl mx-5">
              <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                <svg
                  className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                  fill="currentColor"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <polygon points="50,0 100,0 50,100 0,100" />
                </svg>
      
                <Popover>
                  <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                    <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                      <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                        <div className="flex items-center justify-between w-full md:w-auto">
                          <a href="#">
                            <span className="sr-only">Workflow</span>
    
                          </a>
                          <div className="-mr-2 flex items-center md:hidden">
                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime-500">
                              <span className="sr-only">Open main menu</span>
                              <MenuIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                          </div>
                        </div>
                      </div>
                     
                    </nav>
                  </div>
      
                  <Transition
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Popover.Panel
                      focus
                      className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                    >
                      <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="px-5 pt-4 flex items-center justify-between">
                          <div>
                          </div>
                          <div className="-mr-2">
                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime-500">
                              <span className="sr-only">Close main menu</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                          </div>
                        </div>
                       
                        
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
      
                <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                  <div className="sm:text-center lg:text-left">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                      <span className="block xl:inline">Hi {this.state.userName},</span>
                      <span className="block text-blue-500 xl:inline">Welcome to TechCo</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                            Upgrade your IT skills with our platform
                    </p>
                    <div className="mt-4 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                      
                      <div className=" lg:justify-start">
                        
                      <a
                      href="/category"
                      className="no-underline w-full flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-blue-900 bg-blue-100 hover:bg-blue-800 hover:text-blue-100 md:py-4 md:text-lg md:px-10" id="btn"
                    >
                      TechCo's Catalog
                    </a>
                        <br/><br/><br/><br/>
                      </div>
                    </div>
                  </div>
                 
                </main>
              </div>
             
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <img
                className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
            </div>
            
          </div>
          </div>
          <CartBar/>
          </div>
        );
    }
}

export default Home;