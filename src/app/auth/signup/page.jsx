'use client'
import { Card } from '@heroui/react';
import React from 'react';
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { authClient } from "@/app/lib/auth-client";
import { redirect } from 'next/navigation';
import { CiUser } from 'react-icons/ci';


const SignUp = () => {
    //onSubmit Function
    const onSubmit = async(e)=>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())
        //sending Data to DB for SignUp
        const {data,error} = await authClient.signUp.email({
            email:user.email,
            name:user.name,
            password:user.password,
            image:user.image
            
        })
        if (data){
            redirect('/')
        }
        if (error) {
        console.log("Raw Error Object:", error); // Great for debugging!
        // Show message to the user
        alert(error.message || "Failed to sign up"); 
}

    }
    return (
        <div className='mx-auto mt-15 mb-10 max-w-7xl'>
            <Card className='border rounded-none'>
                <div className='text-center font-medium mb-5'>
                    <h1 className='text-4xl'>Create Account</h1>
                <p className='text-sm text-gray-500 mt-1'>Start your adventure with Wanderlust</p>
                </div>
                <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">

                    <TextField
                    isRequired
                    name="name"
                    >
                    <Label>Name</Label>
                    <Input placeholder="Enter your name" />
                    <FieldError />
                </TextField>
                
                <TextField
                    name="image"
                    type='url'
                    >
                    <Label>ImageURL</Label>
                    <Input placeholder="Enter your image url" />
                    <FieldError />
                </TextField>

        <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
            }
            return null;
            }}
        >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
        </TextField>
        <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
            if (value.length < 8) {
                return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
            }
            return null;
            }}
        >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
            <FieldError />
        </TextField>
        <div className="flex gap-2 justify-center ">
            <Button className={'bg-cyan-500 w-full rounded-none text-center'} type="submit">
            Create Account
            </Button>
            
        </div>
                </Form>
            </Card>
        </div>
    );
};

export default SignUp;