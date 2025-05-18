'use client';

import { MessageCard } from '@/components/MessageCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Message } from '@/model/User';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Copy, Link2, Loader2, Mail, RefreshCcw } from 'lucide-react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AcceptMessageSchema } from '@/schemas/acceptMessageSchema';

function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { toast } = useToast();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages');
      setValue('acceptMessages', response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ??
          'Failed to fetch message settings',
        variant: 'destructive',
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>('/api/get-messages');
        setMessages(response.data.messages || []);
        if (refresh) {
          toast({
            title: 'Refreshed Messages',
            description: 'Showing latest messages',
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: 'Error',
          description:
            axiosError.response?.data.message ?? 'Failed to fetch messages',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages, toast]
  );

  // Fetch initial state from the server
  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();

    fetchAcceptMessages();
  }, [session, setValue, toast, fetchAcceptMessages, fetchMessages]);

  // Handle switch change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessages,
      });
      setValue('acceptMessages', !acceptMessages);
      toast({
        title: response.data.message,
        variant: 'default',
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ??
          'Failed to update message settings',
        variant: 'destructive',
      });
    }
  };

  if (!session || !session.user) {
    return <div></div>;
  }

  const { username } = session.user as User;

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: 'URL Copied!',
      description: 'Profile URL has been copied to clipboard.',
    });
  };

  //   return (
  //     <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
  //       <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

  //       <div className="mb-4">
  //         <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
  //         <div className="flex items-center">
  //           <input
  //             type="text"
  //             value={profileUrl}
  //             disabled
  //             className="input input-bordered w-full p-2 mr-2"
  //           />
  //           <Button onClick={copyToClipboard}>Copy</Button>
  //         </div>
  //       </div>

  //       <div className="mb-4">
  //         <Switch
  //           {...register('acceptMessages')}
  //           checked={acceptMessages}
  //           onCheckedChange={handleSwitchChange}
  //           disabled={isSwitchLoading}
  //         />
  //         <span className="ml-2">
  //           Accept Messages: {acceptMessages ? 'On' : 'Off'}
  //         </span>
  //       </div>
  //       <Separator />

  //       <Button
  //         className="mt-4"
  //         variant="outline"
  //         onClick={(e) => {
  //           e.preventDefault();
  //           fetchMessages(true);
  //         }}
  //       >
  //         {isLoading ? (
  //           <Loader2 className="h-4 w-4 animate-spin" />
  //         ) : (
  //           <RefreshCcw className="h-4 w-4" />
  //         )}
  //       </Button>
  //       <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
  //         {messages.length > 0 ? (
  //           messages.map((message, index) => (
  //             <MessageCard
  //               key={message._id}
  //               message={message}
  //               onMessageDelete={handleDeleteMessage}
  //             />
  //           ))
  //         ) : (
  //           <p>No messages to display.</p>
  //         )}
  //       </div>
  //     </div>
  //   );
  // }

  // export default UserDashboard;

return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your messages and settings</p>
        </div>

        {/* Profile URL Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Your Profile Link</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={profileUrl}
                disabled
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 pr-16"
              />
              <button
                onClick={copyToClipboard}
                className="absolute right-2 top-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                title="Copy to clipboard"
              >
                <Copy className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Message Settings Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Message Settings</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Control who can send you messages</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isSwitchLoading ? (
                <Loader2 className="h-6 w-6 animate-spin text-gray-400 dark:text-gray-500" />
              ) : (
                <Switch
                  {...register('acceptMessages')}
                  checked={acceptMessages}
                  onChange={handleSwitchChange}
                  className={`${
                    acceptMessages ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                >
                  <span
                    className={`${
                      acceptMessages ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
                  />
                </Switch>
              )}
              <span className={`font-medium ${acceptMessages ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                {acceptMessages ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>

        {/* Messages Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Your Messages</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {messages.length} {messages.length === 1 ? 'message' : 'messages'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                fetchMessages(true);
              }}
              className="gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCcw className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>

          <Separator className="mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {messages.length > 0 ? (
              messages.map((message) => (
                <MessageCard
                  key={String(message._id)}
                  message={message}
                  onMessageDelete={handleDeleteMessage}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 mb-4">No messages found</div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Your messages will appear here when someone sends you feedback
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;