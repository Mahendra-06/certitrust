import React from 'react';
import { Shield, Clock, Users, DollarSign, CheckCircle, ArrowRight, Building, GraduationCap, Search, Award } from 'lucide-react';

const Benefits: React.FC = () => {
  const generalBenefits = [
    {
      icon: Shield,
      title: 'Enhanced Security',
      description: 'Blockchain technology ensures certificates cannot be tampered with or forged.',
      details: ['Immutable records', 'Cryptographic verification', 'Fraud prevention']
    },
    {
      icon: Clock,
      title: 'Instant Verification',
      description: 'Verify certificates in real-time without waiting for manual processes.',
      details: ['Real-time validation', 'No waiting periods', 'Immediate results']
    },
    {
      icon: Users,
      title: 'Multi-Stakeholder Support',
      description: 'Designed for all parties involved in certificate verification.',
      details: ['Government bodies', 'Educational institutes', 'Students & Recruiters']
    },
    {
      icon: DollarSign,
      title: 'Cost Effective',
      description: 'Reduce administrative costs and eliminate manual verification processes.',
      details: ['Reduced paperwork', 'Lower operational costs', 'Efficient processes']
    }
  ];

  const userSpecificBenefits = [
    {
      userType: 'Admin',
      icon: Building,
      color: 'bg-blue-50 text-blue-600',
      iconColor: 'bg-blue-100',
      benefits: [
        'Centralized certificate management',
        'Real-time fraud detection',
        'Compliance monitoring',
        'Public trust enhancement'
      ]
    },
    {
      userType: 'Institute',
      icon: GraduationCap,
      color: 'bg-green-50 text-green-600',
      iconColor: 'bg-green-100',
      benefits: [
        'Digital certificate issuance',
        'Student record management',
        'Verification analytics',
        'Brand reputation protection'
      ]
    },
    {
      userType: 'Student',
      icon: Users,
      color: 'bg-purple-50 text-purple-600',
      iconColor: 'bg-purple-100',
      benefits: [
        'Digital wallet for certificates',
        'Easy sharing with employers',
        'Lifetime access to records',
        'Portfolio management'
      ]
    },
    {
      userType: 'Recruiter/Verifier',
      icon: Search,
      color: 'bg-orange-50 text-orange-600',
      iconColor: 'bg-orange-100',
      benefits: [
        'Instant candidate verification',
        'Fraud detection alerts',
        'Bulk verification tools',
        'Detailed verification reports'
      ]
    }
  ];

  const stats = [
    { number: '99.9%', label: 'Accuracy Rate', icon: Award },
    { number: '10x', label: 'Faster Verification', icon: Clock },
    { number: '95%', label: 'Cost Reduction', icon: DollarSign },
    { number: '24/7', label: 'Availability', icon: Shield }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Benefits of <span className="text-primary-600">CERTI-TRUST</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how our blockchain-powered platform transforms certificate 
              verification for all stakeholders in the education ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* General Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Universal Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key advantages that benefit all users of our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {generalBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="card group hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {benefit.description}
                  </p>
                  <ul className="space-y-1">
                    {benefit.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* User-Specific Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Benefits by User Type
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tailored advantages for each stakeholder in the certificate ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {userSpecificBenefits.map((user, index) => {
              const Icon = user.icon;
              return (
                <div
                  key={user.userType}
                  className="card group hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-12 h-12 ${user.iconColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${user.color.split(' ')[1]}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {user.userType}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {user.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ROI Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Return on Investment
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Organizations using CERTI-TRUST report significant improvements in 
                efficiency, cost savings, and security. Here's what you can expect:
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Up to 95% reduction in verification time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">60% decrease in administrative costs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">99.9% accuracy in fraud detection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Complete elimination of paper-based processes</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Quick Start
              </h3>
              <p className="text-gray-700 mb-6 text-center">
                Get started with CERTI-TRUST in just a few simple steps
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <span className="text-gray-700">Choose your user type</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <span className="text-gray-700">Complete registration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <span className="text-gray-700">Start verifying certificates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Experience the Benefits Today
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of organizations already benefiting from CERTI-TRUST
          </p>
          <a
            href="/user-type"
            className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2 group"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Benefits;
