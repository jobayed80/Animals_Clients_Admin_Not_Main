import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_2y4cdsq", "template_jau2uko", form.current, {
        publicKey: "EcMIFMRq8LkKVGmuq",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          alert("Message sent successfully!");
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("Message sending failed. Please try again.");
        }
      );
  };

  return (
    <div className="contact bg-gray-50 py-16 px-6 lg:px-20">
      <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">
          Contact Us
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Have any questions or feedback? We'd love to hear from you!
        </p>
        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          {/* Name Input */}
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Your Name</label>
            <input
              type="text"
              name="from_name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Your Email</label>
            <input
              type="email"
              name="from_email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          {/* Subject Input */}
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Subject</label>
            <input
              type="text"
              name="from_subject"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          {/* Message Textarea */}
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Your Message</label>
            <textarea
              name="message"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 p-3 h-32 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Additional Content */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            Follow Us on Social Media
          </h3>
          <div className="flex justify-center space-x-6 mt-4">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 2h-3a4 4 0 00-4 4v3H7a1 1 0 00-1 1v4a1 1 0 001 1h4v3a1 1 0 001 1h4a1 1 0 001-1v-3h3a1 1 0 001-1v-4a1 1 0 00-1-1h-3V6a2 2 0 012-2h3z"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-blue-400 hover:text-blue-500 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12l4 4m0 0l4-4m-4 4V4"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-pink-500 hover:text-pink-600 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h11M9 21V10m0 0L3 3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
