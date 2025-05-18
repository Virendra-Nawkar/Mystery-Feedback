// 'use client';

// import React, { useState } from 'react';
// import axios, { AxiosError } from 'axios';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { CardHeader, CardContent, Card } from '@/components/ui/card';
// import { useCompletion } from 'ai/react';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from '@/components/ui/use-toast';
// import * as z from 'zod';
// import { ApiResponse } from '@/types/ApiResponse';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { messageSchema } from '@/schemas/messageSchema';

// const specialChar = '||';

// const parseStringMessages = (messageString: string): string[] => {
//   return messageString.split(specialChar);
// };

// const initialMessageString =
//   "What's your favorite movie?||Do you have any pets?||What's your dream job?";

// export default function SendMessage() {
//   const params = useParams<{ username: string }>();
//   const username = params.username;

//   const {
//     complete,
//     completion,
//     isLoading: isSuggestLoading,
//     error,
//   } = useCompletion({
//     api: '/api/suggest-messages',
//     initialCompletion: initialMessageString,
//   });

//   const form = useForm<z.infer<typeof messageSchema>>({
//     resolver: zodResolver(messageSchema),
//   });

//   const messageContent = form.watch('content');

//   const handleMessageClick = (message: string) => {
//     form.setValue('content', message);
//   };

//   const [isLoading, setIsLoading] = useState(false);

//   const onSubmit = async (data: z.infer<typeof messageSchema>) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post<ApiResponse>('/api/send-message', {
//         ...data,
//         username,
//       });

//       toast({
//         title: response.data.message,
//         variant: 'default',
//       });
//       form.reset({ ...form.getValues(), content: '' });
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast({
//         title: 'Error',
//         description:
//           axiosError.response?.data.message ?? 'Failed to sent message',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchSuggestedMessages = async () => {
//     try {
//       complete('');
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//       // Handle error appropriately
//     }
//   };

//   return (
//     <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
//       <h1 className="text-4xl font-bold mb-6 text-center">
//         Public Profile Link
//       </h1>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="content"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Send Anonymous Message to @{username}</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Write your anonymous message here"
//                     className="resize-none"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="flex justify-center">
//             {isLoading ? (
//               <Button disabled>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please wait
//               </Button>
//             ) : (
//               <Button type="submit" disabled={isLoading || !messageContent}>
//                 Send It
//               </Button>
//             )}
//           </div>
//         </form>
//       </Form>

//       <div className="space-y-4 my-8">
//         <div className="space-y-2">
//           <Button
//             onClick={fetchSuggestedMessages}
//             className="my-4"
//             disabled={isSuggestLoading}
//           >
//             Suggest Messages
//           </Button>
//           <p>Click on any message below to select it.</p>
//         </div>
//         <Card>
//           <CardHeader>
//             <h3 className="text-xl font-semibold">Messages</h3>
//           </CardHeader>
//           <CardContent className="flex flex-col space-y-4">
//             {error ? (
//               <p className="text-red-500">{error.message}</p>
//             ) : (
//               parseStringMessages(completion).map((message, index) => (
//                 <Button
//                   key={index}
//                   variant="outline"
//                   className="mb-2"
//                   onClick={() => handleMessageClick(message)}
//                 >
//                   {message}
//                 </Button>
//               ))
//             )}
//           </CardContent>
//         </Card>
//       </div>
//       <Separator className="my-6" />
//       <div className="text-center">
//         <div className="mb-4">Get Your Message Board</div>
//         <Link href={'/sign-up'}>
//           <Button>Create Your Account</Button>
//         </Link>
//       </div>
//     </div>
//   );
// }



// prebuilt message 
// 'use client';

// import React, { useState } from 'react';
// import axios, { AxiosError } from 'axios';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { CardHeader, CardContent, Card } from '@/components/ui/card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from '@/components/ui/use-toast';
// import * as z from 'zod';
// import { ApiResponse } from '@/types/ApiResponse';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { messageSchema } from '@/schemas/messageSchema';

// // ✅ 30 prebuilt messages
// const prebuiltMessages = [
//   "What motivates you every day?",
//   "What's your biggest goal this year?",
//   "What song always lifts your mood?",
//   "What’s your favorite childhood memory?",
//   "If you could live anywhere, where would it be?",
//   "What’s a fun fact about you?",
//   "What's something you're proud of?",
//   "What skill would you like to learn?",
//   "What’s your dream travel destination?",
//   "Who is your role model?",
//   "What makes you happy?",
//   "Do you prefer books or movies?",
//   "What's your favorite food?",
//   "Have you ever had a pet?",
//   "What's your biggest fear?",
//   "What’s a habit you want to build?",
//   "What’s something new you tried recently?",
//   "What's a movie you can watch over and over?",
//   "What is one thing on your bucket list?",
//   "If you had a superpower, what would it be?",
//   "What’s the best compliment you’ve received?",
//   "What’s your dream job?",
//   "What’s a small thing that made you smile today?",
//   "What app do you use the most?",
//   "If you could meet any celebrity, who would it be?",
//   "What’s your favorite season and why?",
//   "What’s your go-to comfort food?",
//   "What’s something you wish people knew about you?",
//   "How do you relax after a long day?",
//   "What’s something you’re excited about?"
// ];

// // ✅ Random shuffle function
// const getRandomMessages = (messages: string[], count: number): string[] => {
//   const shuffled = [...messages].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, count);
// };

// export default function SendMessage() {
//   const params = useParams<{ username: string }>();
//   const username = params.username;

//   const form = useForm<z.infer<typeof messageSchema>>({
//     resolver: zodResolver(messageSchema),
//   });

//   const messageContent = form.watch('content');
//   const [isLoading, setIsLoading] = useState(false);

//   const [typingMessages, setTypingMessages] = useState<string[]>([]);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleMessageClick = (message: string) => {
//     form.setValue('content', message);
//   };

//   const onSubmit = async (data: z.infer<typeof messageSchema>) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post<ApiResponse>('/api/send-message', {
//         ...data,
//         username,
//       });

//       toast({
//         title: response.data.message,
//         variant: 'default',
//       });
//       form.reset({ ...form.getValues(), content: '' });
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast({
//         title: 'Error',
//         description:
//           axiosError.response?.data.message ?? 'Failed to send message',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const typeOutMessages = (messages: string[]) => {
//     setIsTyping(true);
//     setTypingMessages([]);

//     let currentMessageIndex = 0;
//     let currentCharIndex = 0;
//     const typedMessages: string[] = new Array(messages.length).fill('');

//     const interval = setInterval(() => {
//       if (currentMessageIndex >= messages.length) {
//         clearInterval(interval);
//         setIsTyping(false);
//         return;
//       }

//       const currentMessage = messages[currentMessageIndex];
//       typedMessages[currentMessageIndex] += currentMessage[currentCharIndex];
//       setTypingMessages([...typedMessages]);

//       currentCharIndex++;

//       if (currentCharIndex === currentMessage.length) {
//         currentMessageIndex++;
//         currentCharIndex = 0;
//       }
//     }, 10); // Adjust typing speed here
//   };

//   const handleShowPrebuilt = () => {
//     const randomMessages = getRandomMessages(prebuiltMessages, 3);
//     typeOutMessages(randomMessages);
//   };

//   return (
//     <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
//       <h1 className="text-4xl font-bold mb-6 text-center">
//         Public Profile Link
//       </h1>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="content"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Send Anonymous Message to @{username}</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Write your anonymous message here"
//                     className="resize-none"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="flex justify-center">
//             {isLoading ? (
//               <Button disabled>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please wait
//               </Button>
//             ) : (
//               <Button type="submit" disabled={isLoading || !messageContent}>
//                 Send It
//               </Button>
//             )}
//           </div>
//         </form>
//       </Form>

//       <div className="space-y-4 my-8">
//         <div className="space-y-2">
//           <Button onClick={handleShowPrebuilt} className="my-4" disabled={isTyping}>
//             Suggest Messages
//           </Button>
//           <p>Click on any message below to select it.</p>
//         </div>
//         <Card>
//           <CardHeader>
//             <h3 className="text-xl font-semibold">Messages</h3>
//           </CardHeader>
//           <CardContent className="flex flex-col space-y-4">
//             {typingMessages.map((message, index) => (
//               <Button
//                 key={index}
//                 variant="outline"
//                 className="mb-2 text-left"
//                 onClick={() => handleMessageClick(message)}
//                 disabled={isTyping}
//               >
//                 {message || '‎'}
//               </Button>
//             ))}
//           </CardContent>
//         </Card>
//       </div>

//       <Separator className="my-6" />
//       <div className="text-center">
//         <div className="mb-4">Get Your Message Board</div>
//         <Link href={'/sign-up'}>
//           <Button>Create Your Account</Button>
//         </Link>
//       </div>
//     </div>
//   );
// }



// desgin chagnes
'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ArrowRight, Loader2, Send, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';
import Navbar from '@/components/Navbar';

const prebuiltMessages = [
  "What motivates you every day?",
  "What's your biggest goal this year?",
  "What song always lifts your mood?",
  "What’s your favorite childhood memory?",
  "If you could live anywhere, where would it be?",
  "What’s a fun fact about you?",
  "What's something you're proud of?",
  "What skill would you like to learn?",
  "What’s your dream travel destination?",
  "Who is your role model?",
  "What makes you happy?",
  "Do you prefer books or movies?",
  "What's your favorite food?",
  "Have you ever had a pet?",
  "What's your biggest fear?",
  "What’s a habit you want to build?",
  "What’s something new you tried recently?",
  "What's a movie you can watch over and over?",
  "What is one thing on your bucket list?",
  "If you had a superpower, what would it be?",
  "What’s the best compliment you’ve received?",
  "What’s your dream job?",
  "What’s a small thing that made you smile today?",
  "What app do you use the most?",
  "If you could meet any celebrity, who would it be?",
  "What’s your favorite season and why?",
  "What’s your go-to comfort food?",
  "What’s something you wish people knew about you?",
  "How do you relax after a long day?",
  "What’s something you’re excited about?"
];

const getRandomMessages = (messages: string[], count: number): string[] => {
  const shuffled = [...messages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessages, setTypingMessages] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: 'default',
      });
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const typeOutMessages = (messages: string[]) => {
    setIsTyping(true);
    setTypingMessages([]);
    let currentMessageIndex = 0;
    let currentCharIndex = 0;
    const typedMessages: string[] = new Array(messages.length).fill('');

    const interval = setInterval(() => {
      if (currentMessageIndex >= messages.length) {
        clearInterval(interval);
        setIsTyping(false);
        return;
      }

      const currentMessage = messages[currentMessageIndex];
      typedMessages[currentMessageIndex] += currentMessage[currentCharIndex];
      setTypingMessages([...typedMessages]);
      currentCharIndex++;

      if (currentCharIndex === currentMessage.length) {
        currentMessageIndex++;
        currentCharIndex = 0;
      }
    }, 10);
  };

  const handleShowPrebuilt = () => {
    const randomMessages = getRandomMessages(prebuiltMessages, 4);
    typeOutMessages(randomMessages);
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Send Anonymous Message
              <br />
              <span className="text-blue-600">@{username}</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Your identity stays hidden 🤫</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between mb-4">
                        <FormLabel className="text-lg font-medium text-gray-900 dark:text-gray-200">
                          Compose Your Message
                        </FormLabel>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {messageContent?.length || 0}/500
                        </span>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="Write something kind, curious, or inspiring..."
                          className="resize-none min-h-[150px] text-lg p-6 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:hover:border-blue-400 dark:focus:border-blue-400 dark:focus:ring-blue-300 transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 dark:text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <Button
                    type="submit"
                    disabled={!messageContent || isLoading}
                    className="w-full sm:w-auto px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 transition-transform hover:scale-105 shadow-lg text-white"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-5 w-5" />
                    )}
                    Send Message
                  </Button>

                  <div className="flex items-center gap-4">
                    <span className="hidden sm:block text-gray-400 dark:text-gray-500">|</span>
                    <Button
                      type="button"
                      onClick={handleShowPrebuilt}
                      disabled={isTyping}
                      variant="outline"
                      className="w-full sm:w-auto px-6 py-5 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <Wand2 className="mr-2 h-5 w-5 text-purple-600" />
                      Inspire Me
                    </Button>
                  </div>
                </div>
              </form>
            </Form>

            <Separator className="my-8 bg-gray-100 dark:bg-gray-700" />

            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  AI-Powered Suggestions
                  <Sparkles className="ml-2 h-5 w-5 text-yellow-400 inline-block" />
                </h3>
                <Button
                  type="button"
                  onClick={handleShowPrebuilt}
                  disabled={isTyping}
                  variant="outline"
                  className="w-full sm:w-auto px-6 py-5 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Wand2 className="mr-2 h-5 w-5 text-purple-600 m-5" />
                  Inspire Me / Suggest Message
                </Button>
                <p className="text-gray-500 dark:text-gray-400 text-sm p-5">
                  Click any suggestion to try it out
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {typingMessages.map((message, index) => (
                  <button
                    key={index}
                    onClick={() => handleMessageClick(message)}
                    disabled={isTyping}
                    className={`p-4 text-left rounded-lg border transition-all 
                    ${isTyping
                        ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 cursor-not-allowed'
                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md'
                      }
                    ${message === form.getValues('content')
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                        : ''
                      }`}
                  >
                    <span className="text-gray-800 dark:text-gray-100">
                      {message || (
                        <span className="inline-block h-5 w-full bg-gray-100 dark:bg-gray-700 animate-pulse rounded" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 text-center bg-blue-50 dark:bg-blue-950 rounded-xl p-8 shadow-inner">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Want Your Own Message Board?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your personal space for anonymous conversations
            </p>
            <Link href="/sign-up">
              <Button className="px-10 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all hover:scale-105">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
