import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, GraduationCap, Users, Search, ArrowRight, Shield, CheckCircle, Clock, Award, Award as Scholarship, ArrowUp } from 'lucide-react';

const UserTypeSelectionLogin: React.FC = () => {
  const navigate = useNavigate();

  const userTypes = [
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage and verify official certificates',
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
      ],
      nextStep: 'login'
    },
    {
      id: 'institute',
      title: 'Institute',
      description: 'Issue and manage student certificates',
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
      ],
      nextStep: 'login'
    },
    {
      id: 'student',
      title: 'Student',
      description: 'View and share your certificates',
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
      ],
      nextStep: 'login'
    },
    {
      id: 'recruiter',
      title: 'Recruiter/Verifier',
      description: 'Verify candidate certificates',
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
      ],
      nextStep: 'login'
    },
    {
      id: 'scholarship',
      title: 'Scholarship Agency',
      description: 'Manage scholarship programs and verify applicants',
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
      ],
      nextStep: 'login'
    }
  ];

  const handleUserTypeSelect = (userType: string) => {
    navigate(`/login/${userType}`);
  };

  const stats = [
    { icon: Shield, number: '10K+', label: 'Certificates Verified' },
    { icon: Users, number: '500+', label: 'Active Institutions' },
    { icon: Clock, number: '99.9%', label: 'Uptime' },
    { icon: Award, number: '50+', label: 'Government Bodies' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welcome Back!
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Select your account type to log in to your personalized dashboard
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {userTypes.map((userType, index) => {
              const Icon = userType.icon;
              return (
                <div
                  key={userType.id}
                  className={`bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border ${userType.borderColor} hover:border-${userType.id}-300`}
                  onClick={() => handleUserTypeSelect(userType.id)}
                >
                  <div className="text-center">
                    <div className={`w-14 h-14 ${userType.iconColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-6 h-6 ${userType.color.split(' ')[1]}`} />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {userType.title} Login
                    </h3>
                    
                    <p className="text-sm text-gray-500 mb-4 h-12 line-clamp-2">
                      {userType.description}
                    </p>
                    
                    <div className="mt-4 space-y-2">
                      <button 
                        className={`w-full py-2 px-4 rounded-md text-sm font-medium ${userType.color} hover:bg-opacity-90 transition-colors`}
                      >
                        Login as {userType.title}
                      </button>
                      <p className="text-xs text-gray-500">
                        Don't have an account?{' '}
                        <a 
                          href={`/register-type`}
                          className="text-primary-600 hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/register-type');
                          }}
                        >
                          Register
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="py-8 text-center text-sm text-gray-500">
        <p>Need help? <a href="#" className="text-primary-600 hover:underline">Contact support</a></p>
      </div>
    </div>
  );
};

export default UserTypeSelectionLogin;
