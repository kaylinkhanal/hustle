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

const RegistrationForm = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "Phone number must contain only numbers")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone number is required"),
    fullName: Yup.string().required("Full name is required"),
    role: Yup.string().oneOf(["freelancer", "client"], "Invalid role").required("Role is required"),
    title: Yup.string().required("Title is required"),
    hourlyRate: Yup.number()
      .min(0, "Hourly rate must be a positive number")
      .required("Hourly rate is required"),
    bio: Yup.string().required("Bio is required"),
  })



  const handleRegister = (values) => {
    axios.post('http://localhost:8080/register', values)
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phoneNumber: "",
      fullName: "",
      role: "",
      title: "",
      hourlyRate: "",
      bio: "",
      skills: "",
      portfolioLinks: "",
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-green-700">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="1234567890"
                    {...formik.getFieldProps('phoneNumber')}
                    className="border-green-300 focus:border-green-500 focus:ring-green-500" />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <p className="text-red-500 text-sm flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{formik.errors.phoneNumber}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-green-700">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    {...formik.getFieldProps('fullName')}
                    className="border-green-300 focus:border-green-500 focus:ring-green-500" />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <p className="text-red-500 text-sm flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{formik.errors.fullName}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-green-700">Role</Label>
                  <Select
                    name="role"
                    onValueChange={(value) => formik.setFieldValue('role', value)}>
                    <SelectTrigger className="border-green-300 focus:border-green-500 focus:ring-green-500">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="freelancer">Freelancer</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                    </SelectContent>
                  </Select>
                  {formik.touched.role && formik.errors.role && (
                    <p className="text-red-500 text-sm flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{formik.errors.role}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-green-700">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Web Developer"
                    {...formik.getFieldProps('title')}
                    className="border-green-300 focus:border-green-500 focus:ring-green-500" />
                  {formik.touched.title && formik.errors.title && (
                    <p className="text-red-500 text-sm flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{formik.errors.title}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hourlyRate" className="text-green-700">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  placeholder="0"
                  {...formik.getFieldProps('hourlyRate')}
                  className="border-green-300 focus:border-green-500 focus:ring-green-500" />
                {formik.touched.hourlyRate && formik.errors.hourlyRate && (
                  <p className="text-red-500 text-sm flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{formik.errors.hourlyRate}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-green-700">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about yourself..."
                  {...formik.getFieldProps('bio')}
                  className="border-green-300 focus:border-green-500 focus:ring-green-500" />
                {formik.touched.bio && formik.errors.bio && (
                  <p className="text-red-500 text-sm flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{formik.errors.bio}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                Join Hustle
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>)
  );
}

export default RegistrationForm

