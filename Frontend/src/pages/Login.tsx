import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Building, GraduationCap, Users, Search, Eye, EyeOff, ArrowLeft, Shield, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type LocationState = {
  from?: {
    pathname: string;
  };
};

const Login: React.FC = () => {
  const { userType = '' } = useParams<{ userType?: string }>();
  // Map 'government' to 'admin' for backward compatibility
  const normalizedUserType = userType === 'government' ? 'admin' : userType;
  const userTypeStr = normalizedUserType || ''; // Ensure it's a string
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const userTypeConfig = {
    admin: {
      title: 'Admin Login',
      icon: Shield,
      color: 'bg-red-50 text-red-600',
      iconColor: 'bg-red-100',
      description: 'Access admin dashboard and manage system settings'
    },
    institute: {
      title: 'Institute Login',
      icon: Building,
      color: 'bg-green-50 text-green-600',
      iconColor: 'bg-green-100',
      description: 'Manage student records and institutional data'
    },
    student: {
      title: 'Student Login',
      icon: GraduationCap,
      color: 'bg-blue-50 text-blue-600',
      iconColor: 'bg-blue-100',
      description: 'Access your personal academic records'
    },
    teacher: {
      title: 'Teacher Login',
      icon: Users,
      color: 'bg-purple-50 text-purple-600',
      iconColor: 'bg-purple-100',
      description: 'Manage your classes and student progress'
    },
    recruiter: {
      title: 'Recruiter/Verifier Login',
      icon: Search,
      color: 'bg-amber-50 text-amber-600',
      iconColor: 'bg-amber-100',
      description: 'Verify candidate credentials and certificates'
    },
    scholarship: {
      title: 'Scholarship Agency',
      icon: Award,
      color: 'bg-indigo-50 text-indigo-600',
      iconColor: 'bg-indigo-100',
      description: 'Manage scholarship applications and awards'
    }
  };

  const config = userTypeConfig[userTypeStr as keyof typeof userTypeConfig] || userTypeConfig.student;
  const Icon = config.icon;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const { login, logout } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // First check if the email exists in registered users
      const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const user = users.find((u: any) => u.email === formData.email);
      
      if (!user) {
        setError('This email is not registered');
        setIsLoading(false);
        return;
      }
      
      // Check if the user's role matches the login type
      if (user.role !== userType) {
        setError('This email is not registered');
        setIsLoading(false);
        return;
      }

      // Now attempt to login with the credentials
      const loginResult = await login(formData.email, formData.password);
      
      if (loginResult.success) {
        // If login is successful, redirect to dashboard
        const state = location.state as LocationState | undefined;
        const from = state?.from?.pathname || `/dashboard/${userType}`;
        navigate(from, { replace: true });
      } else {
        setError(loginResult.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Back Button - Top Left of Page */}
      <Link
        to="/user-type"
        className="absolute top-4 left-4 inline-flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </Link>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${config.iconColor} mb-4`}>
          <Icon className={`h-8 w-8 ${config.color.replace('text-', '')}`} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {config.title}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {config.description}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter your email address"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Error Message - More Visible */}
            {error && (
              <div className="mb-4">
                <div className="text-red-700 text-sm font-medium p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                  <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading ? 'bg-primary-400' : 'bg-primary-600 hover:bg-primary-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  to={`/register/${userType}`}
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Email:</strong> demo@{userType}.com</p>
              <p><strong>Password:</strong> demo123</p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Your data is protected with enterprise-grade security</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
