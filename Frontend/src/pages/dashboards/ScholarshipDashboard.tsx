import React, { useState } from 'react';
import { Award, Users, CheckCircle, Clock, TrendingUp, FileText, Plus } from 'lucide-react';

const ScholarshipDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Applications', value: '1,245', change: '+12%', icon: FileText },
    { label: 'Approved', value: '1,120', change: '+15%', icon: CheckCircle },
    { label: 'Pending Review', value: '85', change: '-3', icon: Clock },
    { label: 'Scholarship Budget', value: '₹25,00,000', change: '+5%', icon: TrendingUp }
  ];

  const recentApplications = [
    { id: 'SCH-2023-001', name: 'Rahul Sharma', program: 'B.Tech', status: 'Approved', amount: '₹50,000' },
    { id: 'SCH-2023-002', name: 'Priya Patel', program: 'M.Tech', status: 'Pending', amount: '₹75,000' },
    { id: 'SCH-2023-003', name: 'Amit Kumar', program: 'B.Sc', status: 'Approved', amount: '₹25,000' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-semibold">{stat.value}</p>
                      <p className={`text-sm ${
                        stat.change.startsWith('+') 
                          ? 'text-green-500' 
                          : stat.change.startsWith('-')
                            ? 'text-red-500'
                            : 'text-gray-500'
                      }`}>
                        {stat.change}
                      </p>
                    </div>
                    <div className="p-3 bg-indigo-100 rounded-full">
                      <stat.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Applications</h2>
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Plus className="h-3 w-3 mr-1" /> New Application
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentApplications.map((app) => (
                      <tr key={app.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.program}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            app.status === 'Approved' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'applications':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6">Scholarship Applications</h2>
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Application management coming soon</h3>
              <p className="mt-1 text-sm text-gray-500">Manage all scholarship applications in one place.</p>
            </div>
          </div>
        );
      case 'students':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6">Scholarship Recipients</h2>
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Student management coming soon</h3>
              <p className="mt-1 text-sm text-gray-500">View and manage scholarship recipients.</p>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6">Scholarship Reports</h2>
            <div className="text-center py-12">
              <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Reports coming soon</h3>
              <p className="mt-1 text-sm text-gray-500">View detailed scholarship reports and analytics.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Scholarship Portal</h1>
            <p className="text-sm text-gray-500">Manage scholarship programs and applications</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              <Award className="h-4 w-4 mr-1" />
              Active
            </span>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'applications', 'students', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="py-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDashboard;
