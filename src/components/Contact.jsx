import React from "react";

const Contact = () => {
  return (
    <section className="bg-gradient-to-r from-purple-500 to-indigo-600 min-h-screen text-white p-8 flex items-center justify-center">
      <div className="max-w-4xl bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">Contact Us</h1>
        <p className="text-lg text-center mb-6">
          Have questions, feedback, or suggestions? We'd love to hear from you! Reach out to us using the form below or contact us directly.
        </p>
        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-1">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-1">Message</label>
            <textarea
              id="message"
              rows="4"
              placeholder="Your Message"
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-800 font-bold py-3 px-4 rounded hover:bg-yellow-300 transition duration-300"
          >
            Send Message
          </button>
        </form>
        {/* Contact Details */}
        <div className="text-center mt-8">
          <p>Email: <span className="font-bold">support@cryptoapp.com</span></p>
          <p>Phone: <span className="font-bold">+1 234 567 890</span></p>
          <p>Address: <span className="font-bold">123 Crypto Street, Blockchain City</span></p>
        </div>
      </div>
    </section>
  );
};

export default Contact;