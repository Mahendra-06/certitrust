import React, { useState, FC, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Building, GraduationCap, Users, Search, 
  Shield, CheckCircle, AlertTriangle, TrendingUp, 
  FileText, Download, Upload, Settings, 
  Bell, LogOut, Plus, Filter, Trash2,
  BarChart3, Calendar, Clock, Award, Eye
} from 'lucide-react';

// Define TypeScript interfaces
interface Institute {
  id: string;
  name: string;
  address: string;
  contact: string;
  date: string;
}

interface Report {
  id: string;
  name: string;
  type: string;
  date: string;
  status: string;
}

interface StatItem {
  label: string;
  value: string;
  change: string;
  icon: FC<{ className?: string }>;
}

const userTypeConfig = {
  government: {
    title: 'Admin Dashboard',
    icon: Building,
    color: 'bg-blue-50 text-blue-600',
    iconColor: 'bg-blue-100',
    tabs: ['overview', 'requests', 'institutions', 'reports', 'verify-certificate'],
    stats: [
      { label: 'Total Institutes', value: '1,245', change: '+12%', icon: Building },
      { label: 'Total Students', value: '245,678', change: '+8.5%', icon: Users },
      { label: 'Active Verifiers', value: '1,234', change: '+3%', icon: Shield },
      { label: 'Fraud Cases', value: '45', change: '-2', icon: AlertTriangle }
    ]
  },
  institute: {
    title: 'Institute Dashboard',
    icon: GraduationCap,
    color: 'bg-green-50 text-green-600',
    iconColor: 'bg-green-100',
    tabs: ['overview', 'students', 'certificates', 'analytics'],
    stats: [
      { label: 'Total Students', value: '2,456', change: '+15%', icon: Users },
      { label: 'Certificates Issued', value: '1,890', change: '+22%', icon: FileText },
      { label: 'Pending Verifications', value: '45', change: '-8%', icon: Clock },
      { label: 'Success Rate', value: '98.5%', change: '+2%', icon: TrendingUp }
    ]
  },
  student: {
    title: 'Student Portal',
    icon: Users,
    color: 'bg-purple-50 text-purple-600',
    iconColor: 'bg-purple-100',
    tabs: ['overview', 'my-certificates', 'verifications', 'settings'],
    stats: [
      { label: 'My Certificates', value: '12', change: '+3', icon: FileText },
      { label: 'Verified', value: '11', change: '+2', icon: CheckCircle },
      { label: 'Pending', value: '1', change: '+1', icon: Clock },
      { label: 'Shared', value: '5', change: '+1', icon: Users }
    ]
  },
  recruiter: {
    title: 'Recruiter Portal',
    icon: Search,
    color: 'bg-orange-50 text-orange-600',
    iconColor: 'bg-orange-100',
    tabs: ['overview', 'verify', 'candidates', 'reports'],
    stats: [
      { label: 'Verifications Today', value: '89', change: '+18%', icon: Search },
      { label: 'Successful', value: '84', change: '+12%', icon: CheckCircle },
      { label: 'Fraud Detected', value: '5', change: '-2', icon: AlertTriangle },
      { label: 'Avg. Response Time', value: '2.3s', change: '-0.5s', icon: Clock }
    ]
  }
};

interface UserTypeConfig {
  title: string;
  icon: FC<{ className?: string }>;
  color: string;
  iconColor: string;
  tabs: string[];
  stats: StatItem[];
}

interface DashboardProps {
  userType?: string;
}

const Dashboard: FC<DashboardProps> = (props) => {
  const params = useParams<{ userType?: string }>();
  const userType = params.userType || props.userType || 'government';
  const [activeTab, setActiveTab] = useState('overview');
  
  // Get the config based on user type
  const config = userTypeConfig[userType as keyof typeof userTypeConfig] || userTypeConfig.government;
  const Icon = config.icon;
  
  // Render tab content based on active tab
  const renderTabContent = useCallback(() => {
    if (userType === 'government') {
      switch(activeTab) {
        case 'overview':
          return renderGovernmentOverview();
        case 'requests':
          return renderRequestsTab();
        case 'institutions':
          return renderInstitutionsTab();
        case 'reports':
          return renderReportsTab();
        case 'verify-certificate':
          return renderVerifyCertificate();
        default:
          return renderGovernmentOverview();
      }
    } else {
      switch (activeTab) {
        case 'overview':
          return (
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Welcome to {config.title}</h2>
              <p className="text-gray-600">Select an option from the menu to get started.</p>
            </div>
          );
        case 'certificates':
          return renderCertificates();
        default:
          return (
            <div className="card text-center py-12">
              <div className={`w-16 h-16 ${config.iconColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon className={`w-8 h-8 ${config.color.split(' ')[1]}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
              </h3>
              <p className="text-gray-600">
                This section is under development. More features coming soon!
              </p>
            </div>
          );
      }
    }
  }, [activeTab, userType, config]);
  
  // Render functions for each tab
  const renderGovernmentOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
          {config.stats.map((stat) => {
            const StatIcon = stat.icon;
            return (
              <div key={stat.label} className="card group hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    {stat.change && (
                      <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                        {stat.change}
                      </p>
                    )}
                  </div>
                  <div className={`w-12 h-12 ${config.iconColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <StatIcon className={`w-6 h-6 ${config.color.split(' ')[1]}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  
  const renderVerifyCertificate = () => (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Verify Certificate</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700 mb-1">
              Certificate ID
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="certificateId"
                name="certificateId"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter Certificate ID"
              />
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Search className="h-4 w-4 mr-2" />
                Verify
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Verification Result</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-center text-gray-500">Enter a Certificate ID and click Verify to check its validity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div className="space-y-6">
      <div className="card">
        <p>Certificates content will be displayed here.</p>
      </div>
    </div>
  );
  
  const renderRequestsTab = () => (
    <div className="space-y-8">
      {/* Institution Requests */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Institution Registration Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { id: 'INST-REQ-001', name: 'Global Tech Institute', email: 'admin@gti.edu', date: '2024-03-01', status: 'Pending' },
                { id: 'INST-REQ-002', name: 'Metro College', email: 'info@metro.edu', date: '2024-03-05', status: 'Pending' },
                { id: 'INST-REQ-003', name: 'Sunrise University', email: 'contact@sunrise.edu', date: '2024-03-10', status: 'Under Review' },
              ].map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      request.status === 'Rejected' ? 'bg-red-900 text-white' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">View Details</button>
                    <button className="text-green-600 hover:text-green-900">Approve</button>
                    <button className="text-white bg-red-800 hover:bg-red-900 px-3 py-1 rounded-md text-sm">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verifier/Recruiter Requests */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Verifier/Recruiter Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { 
                  id: 'VR-REQ-001', 
                  name: 'John Smith', 
                  email: 'john.smith@company.com', 
                  type: 'Recruiter',
                  company: 'Tech Corp',
                  date: '2024-03-03', 
                  status: 'Pending' 
                },
                { 
                  id: 'VR-REQ-002', 
                  name: 'Sarah Johnson', 
                  email: 's.johnson@verify.org', 
                  type: 'Verifier',
                  company: 'EduVerify Inc.',
                  date: '2024-03-07', 
                  status: 'Under Review' 
                },
                { 
                  id: 'VR-REQ-003', 
                  name: 'Michael Brown', 
                  email: 'michael@hr-connect.com', 
                  type: 'Recruiter',
                  company: 'HR Connect',
                  date: '2024-03-12', 
                  status: 'Pending' 
                },
              ].map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{request.name}</div>
                    <div className="text-xs text-gray-500">{request.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.type === 'Verifier' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {request.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      request.status === 'Rejected' ? 'bg-red-900 text-white' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">View</button>
                    <button className="text-green-600 hover:text-green-900">Approve</button>
                    <button className="text-white bg-red-800 hover:bg-red-900 px-3 py-1 rounded-md text-sm">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
  const renderInstitutionsTab = () => (
    <div className="space-y-8">
      {/* Registered Institutions */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Registered Institutions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { id: 'I001', name: 'ABC University', email: 'contact@abc.edu', location: 'Mumbai', status: 'Active' },
                { id: 'I002', name: 'XYZ College', email: 'info@xyz.edu', location: 'Delhi', status: 'Active' },
                { id: 'I003', name: 'PQR Institute', email: 'admin@pqr.edu', location: 'Bangalore', status: 'Active' },
              ].map((institute) => (
                <tr key={institute.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{institute.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{institute.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{institute.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{institute.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {institute.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                    <button className="text-yellow-600 hover:text-yellow-900 mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Deactivate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Non-Registered Institutions */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Pending Registration Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { id: 'P001', name: 'LMN College', email: 'contact@lmn.edu', requestDate: '2024-01-10', status: 'Pending' },
                { id: 'P002', name: 'RST University', email: 'info@rst.edu', requestDate: '2024-01-12', status: 'Pending' },
              ].map((institute) => (
                <tr key={institute.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{institute.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{institute.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{institute.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{institute.requestDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {institute.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900 mr-4">Approve</button>
                    <button className="text-white bg-red-800 hover:bg-red-900 px-3 py-1 rounded-md text-sm">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
  const renderReportsTab = () => (
    <div className="space-y-6">
      <div className="card">
        <p>Reports content will be displayed here.</p>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Tabs */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full flex flex-col items-center">
              <div className="flex items-center mb-4">
                <div className={`p-2 rounded-lg ${config.iconColor || 'bg-gray-100'}`}>
                  <Icon className={`w-6 h-6 ${config.color?.split(' ')[1] || 'text-gray-600'}`} />
                </div>
                <h1 className="ml-3 text-2xl font-bold text-gray-900">
                  {config.title || 'Dashboard'}
                </h1>
              </div>
              <nav className="w-full flex justify-center">
                <div className="flex space-x-1">
                  {config.tabs.map((tab) => (
                    <Link
                      key={tab}
                      to={`/dashboard/${userType}`}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        activeTab === tab
                          ? `${config.color} text-white`
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab === 'overview' && <Icon className="mr-3 h-5 w-5" />}
                      {tab === 'requests' && <FileText className="mr-3 h-5 w-5" />}
                      {tab === 'institutions' && <Building className="mr-3 h-5 w-5" />}
                      {tab === 'reports' && <BarChart3 className="mr-3 h-5 w-5" />}
                      {tab === 'verify-certificate' && <CheckCircle className="mr-3 h-5 w-5" />}
                      {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
