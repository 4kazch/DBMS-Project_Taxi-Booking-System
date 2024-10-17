import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MessageCircle, Clock } from 'lucide-react'

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-poppins">
      <nav className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg py-4 px-6 fixed w-full z-10 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="text-black text-3xl font-bold tracking-tighter">
                FASTAXI
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-black font-semibold text-lg hover:text-gray-600 transition-colors duration-300 relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center px-4 pt-20 mt-16">
        <div className="max-w-4xl w-full">
          <h1 className="text-4xl font-bold text-center mb-8">Need Help? We're Here for You!</h1>
          
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-16">
            <div className="p-8">
              <h2 className="text-2xl font-semibold mb-6 text-center">Reach Out to Us</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg transition-transform transform hover:scale-105">
                  <Phone className="w-12 h-12 text-black mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                  <p className="text-gray-600 mb-4">We're just a phone call away</p>
                  <a href="tel:+1234567890" className="text-blue-500 hover:text-blue-700 text-lg font-semibold">
                    +1 (234) 567-890
                  </a>
                </div>
                
                <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg transition-transform transform hover:scale-105">
                  <Mail className="w-12 h-12 text-black mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                  <p className="text-gray-600 mb-4">Send us your queries anytime</p>
                  <a href="mailto:support@fastaxi.com" className="text-blue-500 hover:text-blue-700 text-lg font-semibold">
                    support@fastaxi.com
                  </a>
                </div>
              </div>
              
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-6 text-center">More Ways to Get Help</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-start p-6 bg-gray-100 rounded-lg">
                    <MessageCircle className="w-8 h-8 text-black mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                      <p className="text-gray-600">Chat with our support team in real-time for immediate assistance.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-6 bg-gray-100 rounded-lg">
                    <Clock className="w-8 h-8 text-black mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                      <p className="text-gray-600">Our dedicated team is available round the clock to help you.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <Link 
              to="/faq"
              className="inline-block bg-black text-white text-lg font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              Visit our FAQ
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white py-4 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 FASTAXI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}