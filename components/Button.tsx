
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "px-6 py-3 font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center";
  
  const variantClasses = {
    primary: 'bg-teal-500 hover:bg-teal-600 text-white focus:ring-teal-500 disabled:bg-gray-600 disabled:cursor-not-allowed',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-100 focus:ring-gray-500 disabled:bg-gray-800 disabled:text-gray-500',
    ghost: 'bg-transparent hover:bg-gray-800 text-gray-300 focus:ring-teal-500',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
