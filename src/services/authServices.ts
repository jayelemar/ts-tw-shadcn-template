
import { ForgotPassword, LoginUser, RegisterUser, ResetPassword } from "@/types/authTypes"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "react-toastify"



const BACKEND_URL: string = "http://localhost:8000"

// Register User
export const useRegisterUser = () => {
  const registerUser = async (data: RegisterUser) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/users/register`, data)
      if(response.data.success) {
        toast.success("User Registered Succussfully...")
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          "An unexpected error occurred during login.";
        console.error("Server response:", message);
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  return useMutation({
    mutationKey: ['users'],
    mutationFn: registerUser,
  })
}

// Login User
export const useLoginUser = () => {
  const loginUser = async (data: LoginUser) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/users/login`, data)
      if(response.data.success) {
        toast.success("Login Successful...")
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          "An unexpected error occurred during login.";
        console.error("Server response:", message);
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  return useMutation({
    mutationKey: ['users'],
    mutationFn: loginUser,
  })
}

// Logout User
export const useLogoutUser = () => {
  const logoutUser = async () => {
    try {
      await axios.get(`${BACKEND_URL}/api/users/logout`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          "An unexpected error occurred during login.";
        console.error("Server response:", message);
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  return useQuery({
    queryKey: ['users'],
    queryFn: logoutUser,
  })
}

// Forgot Password
export const useForgotPassword = () => {
  const forgotPassword = async (data: ForgotPassword) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/users/forgotpassword`, data)
      if(response.data.success) {
        toast.success(response.data.message)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          "An unexpected error occurred during login.";
        console.error("Server response:", message);
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  return useMutation({
    mutationKey: ['users'],
    mutationFn: forgotPassword,
  })
}

// Reset Password
export const useResetPassword = () => {
  const resetPassword = async ({ data, resetToken }:{data: ResetPassword, resetToken: string}) => {
    try {
      const response = await axios.put(`${BACKEND_URL}/api/users/resetpassword/${resetToken}`, data)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          "An unexpected error occurred during login.";
        console.error("Server response:", message);
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  return useMutation({
    mutationKey: ['users'],
    mutationFn: resetPassword,
  })
}


