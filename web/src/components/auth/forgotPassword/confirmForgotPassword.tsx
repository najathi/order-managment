import React from 'react'

interface ConfirmForgotPasswordProps {

}

const ConfirmForgotPassword: React.FC<ConfirmForgotPasswordProps> = ({ }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Reset Your Password</h2>
      <p className="text-gray-600 text-center">
        If there is an account associated with the email provided, you will receive an email with a link to reset your password shortly.
      </p>
    </div>
  );
}

export default ConfirmForgotPassword;