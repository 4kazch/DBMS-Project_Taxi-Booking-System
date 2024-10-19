import React from 'react'
import { Link } from 'react-router-dom'
import uberimg from "./uberimg.jpeg"
import { Clock, Shield, CreditCard, Smartphone } from 'lucide-react'

export default function LandingPage() {
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
                to="/help" 
                className="text-black font-semibold text-lg hover:text-gray-300 transition-colors duration-300 relative group"
              >
                Help
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-40 pb-10">
        <div className="max-w-4xl w-full pt-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-black mb-4">Welcome to <span className="font-limelight mx-1">FASTAXI</span></h1>
            <p className="text-xl text-gray-600">Your ride, your way. Fast, reliable, and convenient.</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-16">
            <Link 
              to="/rider-login"
              className="w-full sm:w-64 bg-black text-white text-lg font-semibold py-4 px-6 rounded-lg shadow-lg hover:bg-gray-900 transition-colors duration-300 text-center"
            >
              I'm a Rider
            </Link>
            <Link 
              to="/driver-login"
              className="w-full sm:w-64 bg-white text-black text-lg font-semibold py-4 px-6 rounded-lg shadow-lg border-2 border-black hover:bg-gray-100 transition-colors duration-300 text-center"
            >
              I'm a Driver
            </Link>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose FASTAXI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <Clock className="w-8 h-8 mr-4 text-black" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Quick and Reliable</h3>
                  <p className="text-gray-600">Get a ride in minutes. Our drivers are always nearby, ensuring you reach your destination on time.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="w-8 h-8 mr-4 text-black" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Safe and Secure</h3>
                  <p className="text-gray-600">Your safety is our priority. All our drivers are vetted and our rides are tracked in real-time.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CreditCard className="w-8 h-8 mr-4 text-black" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
                  <p className="text-gray-600">Enjoy competitive rates and transparent pricing. No hidden fees, ever.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Smartphone className="w-8 h-8 mr-4 text-black" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                  <p className="text-gray-600">Book a ride with just a few taps on our user-friendly app. It's that simple!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold mr-4">1</div>
                  <p className="text-lg">Open our website and create an account</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold mr-4">2</div>
                  <p className="text-lg">Enter your destination and choose your ride type</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold mr-4">3</div>
                  <p className="text-lg">Get matched with a nearby driver</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold mr-4">4</div>
                  <p className="text-lg">Enjoy your ride and pay seamlessly through the website</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-20">
            <img 
              src={uberimg} 
              alt="FASTAXI in action" 
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </main>

      <footer className="bg-black text-white py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">FASTAXI</h3>
            <p className="text-sm">Your reliable ride, anytime, anywhere.</p>
          </div>
          <div className="flex space-x-4">
            <Link to="/terms" className="hover:text-gray-300 transition-colors duration-300">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-gray-300 transition-colors duration-300">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-gray-300 transition-colors duration-300">Contact Us</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center mt-8">
          <p>&copy; 2024 FASTAXI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}