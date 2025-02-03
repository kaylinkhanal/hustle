'use client'

import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle } from 'lucide-react'
import axios from "axios"
import { userAgent } from "next/server"
import { useSelector } from "react-redux"

const LoginForm = () => {
  const {value} = useSelector(state=>state.counter)
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })



  const handleRegister = async(values) => {
  const {data} = await axios.post('http://localhost:8080/login', values)
  console.log(data)
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
 
    },
    validationSchema,
    onSubmit: (values) => {
        handleRegister(values)
    },
  })

  return (
    (<div
      className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl relative z-10">
        <Card className="backdrop-blur-lg bg-white/90 border-green-500 shadow-xl">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center text-green-800">Join Hustle</CardTitle>
            <CardDescription className="text-center text-green-600 text-lg">Start your freelancing journey today!</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-green-700">Email</Label>
                 {value}
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    {...formik.getFieldProps('email')}
                    className="border-green-300 focus:border-green-500 focus:ring-green-500" />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{formik.errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-green-700">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    {...formik.getFieldProps('password')}
                    className="border-green-300 focus:border-green-500 focus:ring-green-500" />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{formik.errors.password}</p>
                  )}
                </div>
              </div>
           
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>)
  );
}

export default LoginForm