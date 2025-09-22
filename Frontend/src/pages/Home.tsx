import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, Users, Building, GraduationCap, Search, ArrowRight, Star, Award } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Verification',
      description: 'Blockchain-powered certificate verification ensures authenticity and prevents fraud.'
    },
    {
      icon: CheckCircle,
      title: 'Instant Validation',
      description: 'Verify certificates in real-time with our advanced verification system.'
    },
    {
      icon: Users,
      title: 'Multi-User Support',
      description: 'Support for Government, Institutes, Students, and Recruiters.'
    },
    {
      icon: Search,
      title: 'Easy Search',
      description: 'Quick and efficient certificate search and verification process.'
    }
  ];

  const userTypes = [
    {
      icon: Building,
      title: 'Admin',
      description: 'Manage and verify official certificates',
      color: 'bg-blue-50 text-blue-600',
      iconColor: 'bg-blue-100'
    },
    {
      icon: GraduationCap,
      title: 'Institute',
      description: 'Issue and manage student certificates',
      color: 'bg-green-50 text-green-600',
      iconColor: 'bg-green-100'
    },
    {
      icon: Users,
      title: 'Student',
      description: 'View and share your certificates',
      color: 'bg-purple-50 text-purple-600',
      iconColor: 'bg-purple-100'
    },
    {
      icon: Search,
      title: 'Recruiter/Verifier',
      description: 'Verify candidate certificates',
      color: 'bg-orange-50 text-orange-600',
      iconColor: 'bg-orange-100'
    },
    {
      icon: Award,
      title: 'Scholarship Agency',
      description: 'Manage scholarship programs',
      color: 'bg-teal-50 text-teal-600',
      iconColor: 'bg-teal-100'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 to-red-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
              Secure Certificate
              <span className="text-red-200 block">Verification Platform</span>
            </h1>
            
            <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto animate-slide-up">
              CERTI-TRUST provides a blockchain-powered solution for secure, 
              instant, and reliable certificate verification across all sectors.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link
                to="/user-type"
                className="bg-white text-red-700 hover:bg-red-50 font-medium text-lg px-8 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 group"
              >
                <span>Login</span>
              </Link>
              <Link
                to="/register-type"
                className="bg-red-700 text-white hover:bg-red-600 font-medium text-lg px-8 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 group border-2 border-white"
              >
                <span>Register</span>
              </Link>
              <Link
                to="/user-type"
                className="text-white hover:text-red-200 font-medium text-lg px-8 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Role
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select your user type to access the appropriate features and dashboard
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {userTypes.map((userType, index) => {
              const Icon = userType.icon;
              return (
                <div
                  key={userType.title}
                  className="group card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 ${userType.iconColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${userType.color.split(' ')[1]}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {userType.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {userType.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose CERTI-TRUST?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform offers cutting-edge features for secure certificate management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="text-center group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of organizations already using CERTI-TRUST for secure certificate verification
          </p>
          <Link
            to="/user-type"
            className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2 group"
          >
            <span>Choose Your Role</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
