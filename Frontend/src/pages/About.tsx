import React from 'react';
import { Shield, Users, Target, Award, CheckCircle, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We prioritize the security and integrity of all certificate data using blockchain technology.'
    },
    {
      icon: Users,
      title: 'User-Centric',
      description: 'Our platform is designed with all stakeholders in mind - from students to government bodies.'
    },
    {
      icon: Target,
      title: 'Transparency',
      description: 'Complete transparency in the verification process ensures trust and reliability.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our certificate verification service.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'CEO & Founder',
      description: '15+ years in cybersecurity and blockchain technology'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      description: 'Expert in distributed systems and cryptographic protocols'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      description: 'UX/UI specialist with focus on educational technology'
    },
    {
      name: 'David Kumar',
      role: 'Lead Developer',
      description: 'Full-stack developer with expertise in blockchain applications'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-primary-600">CERTI-TRUST</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are revolutionizing certificate verification through blockchain technology, 
              ensuring security, transparency, and trust in educational credentials.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                To create a secure, transparent, and efficient ecosystem for certificate 
                verification that eliminates fraud, reduces verification time, and builds 
                trust between all stakeholders in the education and employment sectors.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe that every certificate should be verifiable, every achievement 
                should be recognized, and every verification should be instant and secure.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-primary-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Blockchain Secured</span>
                </div>
                <div className="flex items-center space-x-2 text-primary-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Instant Verification</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-8">
              <div className="text-center">
                <Shield className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Trust & Security
                </h3>
                <p className="text-gray-700">
                  Our platform uses advanced cryptographic techniques and blockchain 
                  technology to ensure that every certificate is tamper-proof and 
                  verifiable in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at CERTI-TRUST
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="text-center group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The experts behind CERTI-TRUST's innovative certificate verification platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-12 h-12 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join us in revolutionizing certificate verification with blockchain technology
          </p>
          <a
            href="/user-type"
            className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2 group"
          >
            <span>Get Started Today</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
