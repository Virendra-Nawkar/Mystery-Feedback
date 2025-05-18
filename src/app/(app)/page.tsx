'use client';

import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Twitter, Linkedin, Github, MailOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Main content */}
      <main className="flex-grow min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white py-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-24 py-16 md:py-24 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Share Your Thoughts <span className="text-blue-600 dark:text-blue-400">Anonymously</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              Speak your mind freely without revealing your identity. Join our community of honest
              conversations.
            </p>
            {/* Optional CTA buttons */}
            {/* <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full transition-transform hover:scale-105">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-black dark:border-white text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 px-8 py-6 text-lg rounded-full transition-transform hover:scale-105"
              >
                Learn More
              </Button>
            </div> */}
          </div>
        </section>

        {/* Features Carousel */}
        <section className="container mx-auto px-4 md:px-24 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Recent Messages from Our Community
            </h2>
            <Carousel
              plugins={[Autoplay({ delay: 3000 })]}
              className="w-full"
              opts={{ loop: true }}
            >
              <CarouselContent>
                {messages.map((message, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-4">
                    <Card className="bg-gray-100 text-black dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 h-full hover:border-blue-500 transition-colors">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <MessageCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                          <CardTitle className="text-xl">{message.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{message.content}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>{message.received}</span>
                          <Mail className="w-5 h-5" />
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </div>
            </Carousel>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300 p-4 mt-0">
        <div className="container mx-auto px-4 md:px-24">
          <div className="border-t border-gray-300 dark:border-gray-800  text-sm flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div>
              © {new Date().getFullYear()} Mystery Feedback. All rights reserved.
            </div>

            <div>
              <Link
                href="https://www.virpages.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Created with ❤️ by Virendra - virpages.com
              </Link>
            </div>

            <div className="flex space-x-4">
              <a
                href="mailto:virendranawkar1@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <MailOpen className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/virendra-nawkar-7ab464246/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Virendra-Nawkar"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
