import React from 'react'
import BooksList from './BooksList';

const HeroSection = () => {
  return (
    <>
      <section className="py-12 md:py-24 lg:py-32 min-h-screen">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Personalized Book Recommendation
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400">
                Discover books tailored to your preferences using our smart recommendation system. 
                Manage your book collection seamlessly with our RESTful API-powered platform.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 w-full max-w-4xl">
              <div className="border border-gray-300 shadow-lg rounded-lg p-6 text-left">
                <h2 className="text-xl font-semibold mb-2"> /books</h2>
                <p className="text-gray-600">Manage book data with full CRUD functionality:</p>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  <li><strong>POST:</strong> Add new books to the database.</li>
                  <li><strong>GET:</strong> Retrieve a list of books.</li>
                  <li><strong>PUT:</strong> Update book details.</li>
                  <li><strong>DELETE:</strong> Remove books from the database.</li>
                </ul>
              </div>
              
              <div className="border border-gray-300 shadow-lg rounded-lg p-6 text-left">
                <h2 className="text-xl font-semibold mb-2">/recommendations</h2>
                <p className="text-gray-600">Provides personalized book recommendations:</p>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  <li>Accepts user preferences (genres, authors, etc.).</li>
                  <li>Uses Basic filtering and algorithms to find matching books.</li>
                  <li>Supports future improvements like collaborative filtering.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BooksList/>
    </>
  )
}

export default HeroSection;