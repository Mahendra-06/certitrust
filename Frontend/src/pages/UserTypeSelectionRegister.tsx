import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, GraduationCap, Users, Search, ArrowRight, Shield, CheckCircle, Clock, Award, Award as Scholarship, ArrowUp } from 'lucide-react';

const UserTypeSelectionRegister: React.FC = () => {
  const navigate = useNavigate();

  const userTypes = [
    {
      id: 'government',
      title: 'Admin',
      description: 'Register to manage and verify official certificates',
      icon: Building,
      color: 'bg-blue-50 text-blue-600',
      iconColor: 'bg-blue-100',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:border-blue-300',
      features: [
        'Centralized certificate management',
        'Real-time fraud detection',
        'Compliance monitoring',
        'Public trust enhancement'
      ]
    },
    {
      id: 'institute',
      title: 'Institute',
      description: 'Register to issue and manage student certificates',
      icon: GraduationCap,
      color: 'bg-green-50 text-green-600',
      iconColor: 'bg-green-100',
      borderColor: 'border-green-200',
      hoverColor: 'hover:border-green-300',
      features: [
        'Digital certificate issuance',
        'Student record management',
        'Verification analytics',
        'Brand reputation protection'
      ]
    },
    {
      id: 'student',
      title: 'Student',
      description: 'Register to view and share your certificates',
      icon: Users,
      color: 'bg-purple-50 text-purple-600',
      iconColor: 'bg-purple-100',
      borderColor: 'border-purple-200',
      hoverColor: 'hover:border-purple-300',
      features: [
        'Digital wallet for certificates',
        'Easy sharing with employers',
        'Lifetime access to records',
        'Portfolio management'
      ]
    },
    {
      id: 'recruiter',
      title: 'Recruiter/Verifier',
      description: 'Register to verify candidate certificates',
      icon: Search,
      color: 'bg-orange-50 text-orange-600',
      iconColor: 'bg-orange-100',
      borderColor: 'border-orange-200',
      hoverColor: 'hover:border-orange-300',
      features: [
        'Instant candidate verification',
        'Fraud detection alerts',
        'Bulk verification tools',
        'Detailed verification reports'
      ]
    },
    {
      id: 'scholarship',
      title: 'Scholarship Agency',
      description: 'Register to manage scholarship programs',
      icon: Scholarship,
      color: 'bg-teal-50 text-teal-600',
      iconColor: 'bg-teal-100',
      borderColor: 'border-teal-200',
      hoverColor: 'hover:border-teal-300',
      features: [
        'Scholarship program management',
        'Applicant verification',
        'Document validation',
        'Award tracking'
      ]
    }
  ];

  const handleUserTypeSelect = (userType: string) => {
    // Map the user type to the corresponding registration route
    const routes: { [key: string]: string } = {
      student: '/register/student',
      institute: '/register/institute',
      recruiter: '/register/verifier',
      scholarship: '/register/scholarship',
      government: '/register/admin',
      admin: '/register/admin'
    };
    
    navigate(routes[userType] || '/register/student');
  };

  const stats = [
    { icon: Shield, number: '10K+', label: 'Certificates Verified' },
    { icon: Users, number: '500+', label: 'Active Institutions' },
    { icon: Clock, number: '99.9%', label: 'Uptime' },
    { icon: Award, number: '50+', label: 'Government Bodies' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Create Your <span className="text-primary-600">Account</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Select your role to start the registration process.
              Each user type has tailored functionality for your specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* User Types Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {userTypes.map((userType, index) => {
              const Icon = userType.icon;
              return (
                <div
                  key={userType.id}
                  className={`card group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${userType.borderColor} ${userType.hoverColor} border-2`}
                  onClick={() => handleUserTypeSelect(userType.id)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 ${userType.iconColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-8 h-8 ${userType.color.split(' ')[1]}`} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {userType.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      {userType.description}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      {userType.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className={`${userType.color.split(' ')[0]} ${userType.color.split(' ')[1]} px-4 py-2 rounded-lg font-medium group-hover:scale-105 transition-transform flex items-center justify-center space-x-2`}>
                      <span>Register Now</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Registration Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to create your account
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Choose Your Role
              </h3>
              <p className="text-gray-600">
                Select the appropriate user type that matches your needs
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fill Your Details
              </h3>
              <p className="text-gray-600">
                Provide the required information for registration
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Get Started
              </h3>
              <p className="text-gray-600">
                Access your account and start using our platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Already have an account?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Sign in to access your dashboard
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/user-type')}
              className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Go to Login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserTypeSelectionRegister;
