'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpschema"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"


const Page = () => {
  const [isSubmitting, setIssubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  //ZOD implementation

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })



  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password
    })
    if (result?.error) {
      toast({
        title: "Login Failed",
        description: "Incorrect Username or password",
        variant: "destructive"
      })
    }
    if (result?.url) {
      router.replace('/dashboard')
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">

      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-blackt-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message
          </h1>
          <p className="mb-4">Sign in to start your anonymous adventure

          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}

              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="email/username" {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}

              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {
                isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                  </>
                ) : ('SignIn')
              }
            </Button>
          </form>
        </Form>
        
      </div>
    </div>
  )
}

export default Page