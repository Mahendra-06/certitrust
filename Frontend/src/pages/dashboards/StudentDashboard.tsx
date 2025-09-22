import React, { useState } from 'react';
import { FileText, CheckCircle, Clock, Users, Award, Upload } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'My Certificates', value: '12', change: '+3', icon: FileText },
    { label: 'Verified', value: '11', change: '+2', icon: CheckCircle },
    { label: 'Pending', value: '1', change: '+1', icon: Clock },
    { label: 'Shared', value: '5', change: '+1', icon: Users }
  ];

  const certificates = [
    { id: 1, name: 'Degree Certificate', status: 'Verified', date: '2023-06-15' },
    { id: 2, name: 'Internship Certificate', status: 'Verified', date: '2023-09-10' },
    { id: 3, name: 'Workshop Certificate', status: 'Pending', date: '2023-09-20' },
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
                      <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change}
                      </p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <stat.icon className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Recent Certificates</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {certificates.map((cert) => (
                      <tr key={cert.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="flex-shrink-0 h-5 w-5 text-gray-400" />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{cert.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            cert.status === 'Verified' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {cert.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {cert.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                          <button className="text-gray-600 hover:text-gray-900">Share</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'certificates':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6">My Certificates</h2>
            <div className="space-y-4">
              {certificates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <Award className="h-5 w-5 text-blue-500 mr-2" />
                        <h3 className="font-medium">{cert.name}</h3>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                        <span>Issued: {cert.date}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          cert.status === 'Verified' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {cert.status}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 text-sm rounded-md flex items-center justify-center">
                          <FileText className="h-4 w-4 mr-1.5" /> View
                        </button>
                        <button className="flex-1 bg-gray-50 text-gray-600 hover:bg-gray-100 px-3 py-1.5 text-sm rounded-md flex items-center justify-center">
                          <Upload className="h-4 w-4 mr-1.5" /> Share
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No certificates yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Your verified certificates will appear here.</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'upload':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6">Upload Certificate</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="space-y-3">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="certificate-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Certificate Type
                </label>
                <select
                  id="certificate-type"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  defaultValue=""
                >
                  <option value="">Select certificate type</option>
                  <option value="degree">Degree Certificate</option>
                  <option value="internship">Internship Certificate</option>
                  <option value="workshop">Workshop Certificate</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="issuer" className="block text-sm font-medium text-gray-700 mb-1">
                  Issuer
                </label>
                <input
                  type="text"
                  id="issuer"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Name of the issuing organization"
                />
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Upload className="-ml-1 mr-2 h-5 w-5" />
                  Upload Certificate
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening with your certificates.</p>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {['overview', 'certificates', 'upload', 'verifications', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="px-6 py-5">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
