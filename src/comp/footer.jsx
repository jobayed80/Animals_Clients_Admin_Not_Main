import React from 'react';
import { FaPiggyBank, FaShippingFast, FaHeadphonesAlt, FaWallet } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <div className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-600 p-4 rounded-full">
                  <FaPiggyBank className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Great Savings</h3>
                  <p className="text-sm text-gray-400">Save big on every purchase.</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-indigo-600 p-4 rounded-full">
                  <FaShippingFast className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Free Delivery</h3>
                  <p className="text-sm text-gray-400">Fast and free delivery worldwide.</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-indigo-600 p-4 rounded-full">
                  <FaHeadphonesAlt className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">24/7 Support</h3>
                  <p className="text-sm text-gray-400">We're here to help anytime.</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-indigo-600 p-4 rounded-full">
                  <FaWallet className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Money Back</h3>
                  <p className="text-sm text-gray-400">Guaranteed refund on returns.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
              <img src="https://www.example.com/images/logo.png" alt="Logo" className="w-24 h-auto" />

                <p className="text-gray-400">
                  Experience the best quality products and excellent services with us.
                  Your satisfaction is our priority.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold">Your Account</h3>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>About Us</li>
                    <li>Account</li>
                    <li>Payment</li>
                    <li>Sales</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Products</h3>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>Delivery</li>
                    <li>Track Order</li>
                    <li>New Products</li>
                    <li>Old Products</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Contact Us</h3>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>4005, Silver Business Point, BD</li>
                    <li>+(012) 99999999</li>
                    <li>info@gmail.com</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10 border-t border-gray-700 pt-6">
            <p className="text-sm text-gray-400">&copy; 2025 Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
