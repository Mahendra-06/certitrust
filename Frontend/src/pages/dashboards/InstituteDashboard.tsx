import React, { useState, useRef, useEffect } from 'react';
import { 
  Building, Users, FileText, Clock, TrendingUp, CheckCircle, Plus, 
  QrCode, Camera, X, Loader2, Search, Upload, FileSpreadsheet, Check, X as XIcon
} from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

const InstituteDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('verify');
  const [verificationMethod, setVerificationMethod] = useState<'id' | 'file' | 'qr' | 'bulk'>('id');
  const [certificateId, setCertificateId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSingleFile, setSelectedSingleFile] = useState<File | null>(null);
  const [selectedBulkFile, setSelectedBulkFile] = useState<File | null>(null);
  const [showStudentInfo, setShowStudentInfo] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [bulkResults, setBulkResults] = useState<any[]>([]);
  
  const qrScannerRef = useRef<Html5Qrcode | null>(null);
  const qrContainerRef = useRef<HTMLDivElement>(null);

  // Update submit button text based on certificate type
  useEffect(() => {
    const oldCertRadio = document.getElementById('old-certificate') as HTMLInputElement;
    const submitButton = document.getElementById('submit-certificate');

    const updateButtonText = () => {
      if (submitButton) {
        if (oldCertRadio && oldCertRadio.checked) {
          submitButton.textContent = 'Store Certificate';
        } else {
          submitButton.textContent = 'Issue Certificate';
        }
      }
    };

    if (oldCertRadio) {
      oldCertRadio.addEventListener('change', updateButtonText);
    }

    // Initial update
    updateButtonText();

    // Cleanup
    return () => {
      if (oldCertRadio) {
        oldCertRadio.removeEventListener('change', updateButtonText);
      }
    };
  }, []);

  const startQRScanner = async () => {
    setIsScanning(true);
    setScanResult(null);
    
    try {
      // Check if camera permission is available
      const hasCamera = await Html5Qrcode.getCameras();
      if (hasCamera.length === 0) {
        alert('No camera found. Please connect a camera and try again.');
        setIsScanning(false);
        return;
      }
      
      // Initialize QR scanner
      if (qrScannerRef.current) {
        await qrScannerRef.current.stop();
      }
      
      const html5QrCode = new Html5Qrcode('qr-scanner');
      qrScannerRef.current = html5QrCode;
      
      // Start scanning
      await html5QrCode.start(
        { facingMode: 'environment' }, // Use back camera if available
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        async (decodedText) => {
          // QR code successfully scanned
          const qrCodeData = decodedText;
          setScanResult(qrCodeData);
          
          // Stop scanning after successful scan
          await html5QrCode.stop();
          qrScannerRef.current = null;
          setIsScanning(false);
          
          // Verify the certificate
          await verifyCertificate(qrCodeData);
        },
        (errorMessage) => {
          // QR scan error (usually due to no QR code in view)
          // We don't need to show this error as it's normal during scanning
          console.log('QR scan error:', errorMessage);
        }
      ).catch((err) => {
        console.error('Failed to start QR scanner:', err);
        alert('Failed to start camera. Please check camera permissions and try again.');
        setIsScanning(false);
      });
    } catch (error) {
      console.error('Error starting QR scanner:', error);
      alert('Error accessing camera. Please check permissions and try again.');
      setIsScanning(false);
    }
  };

  const stopQRScanner = () => {
    setIsScanning(false);
    if (qrScannerRef.current) {
      qrScannerRef.current.stop().catch(() => {});
      qrScannerRef.current = null;
    }
  };

  // Mock function to verify certificate
  const verifyCertificate = async (id: string) => {
    setIsVerifying(true);
    setVerificationResult(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response
    const result = {
      isValid: Math.random() > 0.2, // 80% chance of being valid for demo
      certificateData: {
        id: id,
        studentName: 'Student ' + Math.floor(1000 + Math.random() * 9000),
        institution: 'Your Institution',
        issueDate: new Date().toISOString().split('T')[0],
        type: ['Degree', 'Transcript', 'Certificate'][Math.floor(Math.random() * 3)]
      }
    };
    
    setVerificationResult(result);
    setIsVerifying(false);
    return result;
  };

  // Blockchain hash verification
  const verifyBlockchainHash = async (hash: string) => {
    setIsVerifying(true);
    setVerificationResult(null);

    // Simulate API call to blockchain
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock blockchain verification
    const result = {
      isValid: Math.random() > 0.1, // 90% chance of being valid for demo
      certificateData: {
        hash: hash,
        studentName: 'Student ' + Math.floor(1000 + Math.random() * 9000),
        institution: 'Your Institution',
        issueDate: new Date().toISOString().split('T')[0],
        type: ['Degree', 'Transcript', 'Certificate'][Math.floor(Math.random() * 3)],
        blockchainVerified: true
      }
    };

    setVerificationResult(result);
    setIsVerifying(false);
    return result;
  };

  // Handle single certificate file selection
  const handleSingleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedSingleFile(e.target.files[0]);
      setShowStudentInfo(true); // Show student info when single file is selected
    } else {
      setSelectedSingleFile(null);
      setShowStudentInfo(false); // Hide student info when no file is selected
    }
  };

  // Handle bulk certificate file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleBulkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBulkFile(e.target.files[0]);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationMethod === 'id' && certificateId) {
      await verifyCertificate(certificateId);
    } else if (verificationMethod === 'file' && selectedFile) {
      // In a real app, you would upload the file for verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      const result = await verifyCertificate('CERT' + Math.floor(10000 + Math.random() * 90000));
      setVerificationResult({
        ...result,
        fileName: selectedFile.name
      });
    } else if (verificationMethod === 'qr' && !isScanning) {
      startQRScanner();
    } else if (verificationMethod === 'bulk' && selectedBulkFile) {
      // Simulate bulk verification
      setIsVerifying(true);
      setBulkResults([]);

      // Generate mock results for demo
      const results = [];
      const count = Math.floor(5 + Math.random() * 10); // 5-15 certificates

      for (let i = 0; i < count; i++) {
        const id = 'CERT' + Math.floor(10000 + Math.random() * 90000);
        const isValid = Math.random() > 0.2; // 80% valid
        results.push({
          id,
          isValid,
          studentName: 'Student ' + (1000 + i),
          type: ['Degree', 'Transcript', 'Certificate'][Math.floor(Math.random() * 3)],
          issueDate: new Date().toISOString().split('T')[0]
        });
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
      setBulkResults(results);
      setIsVerifying(false);
    }
  };

  const resetVerification = () => {
    setVerificationResult(null);
    setCertificateId('');
    setSelectedFile(null);
    setScanResult(null);
    setBulkFile(null);
    setBulkResults([]);
    setSelectedSingleFile(null);
    setSelectedBulkFile(null);
    setShowStudentInfo(false);

    // Stop QR scanner if it's running
    if (qrScannerRef.current) {
      qrScannerRef.current.stop().catch(() => {});
      qrScannerRef.current = null;
    }
    setIsScanning(false);
  };

  const stats = [
    { label: 'Total Students', value: '2,456', change: '+15%', icon: Users },
    { label: 'Certificates Issued', value: '1,890', change: '+22%', icon: FileText },
    { label: 'Pending Verifications', value: '45', change: '-8%', icon: Clock },
    { label: 'Success Rate', value: '98.5%', change: '+2%', icon: TrendingUp }
  ];

  const recentCertificates = [
    { id: 1, student: 'John Doe', type: 'Degree', date: '2023-09-15', status: 'Verified' },
    { id: 2, student: 'Jane Smith', type: 'Transcript', date: '2023-09-14', status: 'Pending' },
    { id: 3, student: 'Alex Johnson', type: 'Certificate', date: '2023-09-13', status: 'Verified' },
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
                    <div className="p-3 bg-green-100 rounded-full">
                      <stat.icon className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Certificates</h2>
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  <Plus className="h-3 w-3 mr-1" /> New Certificate
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentCertificates.map((cert) => (
                      <tr key={cert.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{cert.student}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            cert.status === 'Verified' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {cert.status}
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
      case 'students':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6">Student Management</h2>
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Student management coming soon</h3>
              <p className="mt-1 text-sm text-gray-500">Manage all your students in one place.</p>
            </div>
          </div>
        );
      case 'issue':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Issue Certificates</h2>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    <Plus className="h-4 w-4 mr-1" />
                    Smart Storage
                  </span>
                </div>
              </div>

              {/* Certificate Issuance Form */}
              <form className="space-y-6">
                {/* Certificate Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Certificate Type
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <input
                        id="new-certificate"
                        name="certificate-age"
                        type="radio"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 mt-1"
                        defaultChecked
                      />
                      <label htmlFor="new-certificate" className="ml-2 block text-sm">
                        <span className="font-medium text-gray-900">New Certificates</span>
                        <span className="text-gray-500 ml-1">- Single upload requires student info → Blockchain</span>
                      </label>
                    </div>
                    <div className="flex items-start">
                      <input
                        id="old-certificate"
                        name="certificate-age"
                        type="radio"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 mt-1"
                      />
                      <label htmlFor="old-certificate" className="ml-2 block text-sm">
                        <span className="font-medium text-gray-900">Existing/Old Certificates</span>
                        <span className="text-gray-500 ml-1">- Single upload requires student info → Database</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Upload Options - Different for New vs Old */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Single Certificate Upload */}
                  <div className="border-2 border-gray-300 border-dashed rounded-lg p-4">
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Single Certificate
                      </label>
                      <div className="mt-1 flex justify-center">
                        <div className="space-y-1">
                          <label
                            htmlFor="certificate-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none"
                          >
                            <span>Upload file</span>
                            <input
                              id="certificate-upload"
                              name="certificate-upload"
                              type="file"
                              className="sr-only"
                              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                              onChange={handleSingleFileSelect}
                            />
                          </label>
                          <p className="text-xs text-gray-500">or drag and drop</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, PNG, JPG, DOC up to 10MB
                      </p>
                      {selectedSingleFile && (
                        <p className="text-xs text-green-600 mt-1">
                          ✓ Selected: {selectedSingleFile.name} ({(selectedSingleFile.size / 1024).toFixed(2)} KB)
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bulk Certificate Upload */}
                  <div className="border-2 border-gray-300 border-dashed rounded-lg p-4 bg-blue-50">
                    <div className="text-center">
                      <svg className="mx-auto h-8 w-8 text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bulk Upload
                      </label>
                      <div className="mt-1 flex justify-center">
                        <div className="space-y-1">
                          <label
                            htmlFor="bulk-certificate-upload"
                            className="relative cursor-pointer bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-700 focus-within:outline-none"
                          >
                            <span>Upload CSV/Excel</span>
                            <input
                              id="bulk-certificate-upload"
                              name="bulk-certificate-upload"
                              type="file"
                              className="sr-only"
                              accept=".csv,.xlsx,.xls"
                              onChange={handleBulkFileChange}
                            />
                          </label>
                          <p className="text-xs text-gray-500">or drag and drop</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        CSV or Excel with certificate data
                      </p>
                      <div className="mt-2 text-xs text-blue-600">
                        <span className="text-xs text-green-600">✓ Student information included in file</span>
                      </div>
                      <div className="mt-2 text-xs text-blue-600">
                        <a href="/bulk-certificate-template.csv" className="underline" download>
                          Download template
                        </a>
                      </div>
                      {selectedBulkFile && (
                        <p className="text-xs text-green-600 mt-1">
                          ✓ Selected: {selectedBulkFile.name} ({(selectedBulkFile.size / 1024).toFixed(2)} KB)
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Student Information - Only shown for Single Certificate Uploads */}
                {showStudentInfo && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Student Information (Required for Single Upload)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Student Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                          placeholder="Enter student full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Student ID
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                          placeholder="Enter student ID"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Certificate Type
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                          <option value="">Select certificate type</option>
                          <option value="degree">Degree Certificate</option>
                          <option value="diploma">Diploma Certificate</option>
                          <option value="transcript">Academic Transcript</option>
                          <option value="certificate">Course Completion Certificate</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Issue Date
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Details
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter any additional certificate details, grades, achievements, etc."
                      />
                    </div>
                  </div>
                )}

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Storage Options</h3>
                    <div className="text-sm text-gray-500">
                      Choose based on certificate type
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-300 rounded-lg p-4 bg-blue-50">
                      <div className="flex items-center mb-3">
                        <div className="h-5 w-5 rounded bg-gradient-to-r from-blue-500 to-purple-600 mr-2 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">BC</span>
                        </div>
                        <h4 className="font-medium text-gray-900">Blockchain Upload</h4>
                        <span className="ml-auto px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          New Certificates
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Upload new certificates to blockchain for immutable verification and authenticity.
                      </p>
                      <button
                        type="button"
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Upload to Blockchain
                      </button>
                    </div>

                    <div className="border border-gray-300 rounded-lg p-4 bg-green-50">
                      <div className="flex items-center mb-3">
                        <FileText className="h-5 w-5 text-green-600 mr-2" />
                        <h4 className="font-medium text-gray-900">Database Storage</h4>
                        <span className="ml-auto px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          Old Certificates
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Store existing certificates in institution database with secure access controls.
                      </p>
                      <button
                        type="button"
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Save to Database
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                    id="submit-certificate"
                  >
                    Issue Certificate
                  </button>
                </div>
              </form>

              {/* Bulk Processing Results */}
              <div className="mt-8 bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Bulk Processing Status</h3>
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <p className="text-sm text-gray-500 mb-4">
                    Select certificate type and upload method above to see processing options
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mr-2"></div>
                        <span className="font-medium">New Certificates</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Single upload with student info → Blockchain</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="font-medium">Old Certificates</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Single upload with student info → Database</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Issued Certificates */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Recently Issued Certificates</h3>
                <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Certificate Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Issue Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Storage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">John Doe</div>
                        <div className="text-sm text-gray-500">ID: STU2023001</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Degree Certificate
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2023-09-20
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Issued
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mr-2"></div>
                          <span className="text-xs text-gray-500">Blockchain</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Jane Smith</div>
                        <div className="text-sm text-gray-500">ID: STU2023002</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Transcript
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2023-09-19
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Processing
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-xs text-gray-500">Database</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Mike Johnson</div>
                        <div className="text-sm text-gray-500">ID: STU2023003</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Diploma Certificate
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2023-09-18
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Issued
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mr-2"></div>
                          <span className="text-xs text-gray-500">Blockchain</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6">Analytics</h2>
            <div className="text-center py-12">
              <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Analytics coming soon</h3>
              <p className="mt-1 text-sm text-gray-500">View detailed analytics and reports.</p>
            </div>
          </div>
        );
      case 'verify':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-6">Verify Certificates</h2>
              
              {/* Verification Method Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'id', label: 'Verify by ID', icon: Search },
                    { id: 'file', label: 'Upload Certificate', icon: Upload },
                    { id: 'qr', label: 'QR Code Scan', icon: QrCode },
                    { id: 'bulk', label: 'Bulk Verify', icon: FileSpreadsheet }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setVerificationMethod(tab.id as any);
                        resetVerification();
                      }}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                        verificationMethod === tab.id
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="h-4 w-4 mr-2" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Verification Form */}
              <form onSubmit={handleVerify} className="space-y-6">
                {verificationMethod === 'id' && (
                  <div>
                    <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700 mb-1">
                      Certificate ID
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        id="certificateId"
                        className="focus:ring-green-500 focus:border-green-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                        placeholder="Enter certificate ID"
                        value={certificateId}
                        onChange={(e) => setCertificateId(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                
                {verificationMethod === 'file' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Certificate
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept=".pdf,.png,.jpg,.jpeg"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF, PNG, JPG up to 10MB
                        </p>
                      </div>
                    </div>
                    {selectedFile && (
                      <div className="mt-2 text-sm text-gray-700">
                        Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                      </div>
                    )}
                  </div>
                )}
                
                {verificationMethod === 'qr' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      QR Code Scanner
                    </label>
                    <div className="mt-1 flex justify-center">
                      <div 
                        id="qr-scanner"
                        className="w-full max-w-md h-64 bg-gray-100 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center"
                        style={{ minHeight: '256px' }}
                      >
                        {isScanning ? (
                          <div className="text-center">
                            <Loader2 className="mx-auto h-8 w-8 text-gray-500 animate-spin" />
                            <p className="mt-2 text-sm text-gray-500">Starting camera...</p>
                            <button
                              type="button"
                              onClick={stopQRScanner}
                              className="mt-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <XIcon className="h-3 w-3 mr-1" /> Stop Scanning
                            </button>
                          </div>
                        ) : scanResult ? (
                          <div className="text-center text-green-600">
                            <CheckCircle className="mx-auto h-12 w-12 mb-2" />
                            <p className="text-sm font-medium">QR Code Scanned!</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Certificate ID: {scanResult}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Verification in progress...
                            </p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <QrCode className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500 mb-4">
                              Point your camera at a QR code
                            </p>
                            <button
                              type="button"
                              onClick={startQRScanner}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <Camera className="h-4 w-4 mr-2" />
                              Start Camera
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    {scanResult && !isVerifying && (
                      <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                          QR Code detected: <span className="font-mono">{scanResult}</span>
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setScanResult(null);
                            startQRScanner();
                          }}
                          className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <Camera className="h-3 w-3 mr-1" /> Scan Another Code
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                {verificationMethod === 'bulk' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bulk Verify Certificates
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="bulk-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none"
                          >
                            <span>Upload CSV/Excel</span>
                            <input
                              id="bulk-upload"
                              name="bulk-upload"
                              type="file"
                              className="sr-only"
                              accept=".csv,.xlsx,.xls"
                              onChange={handleBulkFileChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          CSV or Excel file with certificate IDs
                        </p>
                        <p className="text-xs text-gray-500">
                          <a href="/sample-bulk-verify.csv" className="text-green-600 hover:text-green-500" download>
                            Download sample CSV template
                          </a>
                        </p>
                      </div>
                    </div>
                    {bulkFile && (
                      <div className="mt-2 text-sm text-gray-700">
                        Selected: {bulkFile.name} ({(bulkFile.size / 1024).toFixed(2)} KB)
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex justify-end">
                  {(verificationMethod === 'id' && certificateId) ||
                   (verificationMethod === 'file' && selectedFile) ||
                   (verificationMethod === 'qr' && (isScanning || scanResult)) ||
                   (verificationMethod === 'bulk' && bulkFile) ? (
                    <button
                      type="submit"
                      disabled={isVerifying}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                          Verifying...
                        </>
                      ) : (
                        'Verify Certificate'
                      )}
                    </button>
                  ) : (
                    <div className="text-sm text-gray-500">
                      {verificationMethod === 'id' && 'Enter a certificate ID to verify'}
                      {verificationMethod === 'file' && 'Upload a certificate file to verify'}
                      {verificationMethod === 'qr' && 'Click "Start Scanning" to verify a QR code'}
                      {verificationMethod === 'bulk' && 'Upload a CSV/Excel file to verify multiple certificates'}
                    </div>
                  )}
                </div>
              </form>
              
              {/* Verification Result */}
              {verificationResult && verificationMethod !== 'bulk' && (
                <div className={`mt-6 p-4 rounded-md ${
                  verificationResult.isValid ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {verificationResult.isValid ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <XIcon className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className={`text-sm font-medium ${
                        verificationResult.isValid ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {verificationResult.isValid ? 'Certificate is Valid' : 'Certificate is Invalid'}
                      </h3>
                      <div className="mt-2 text-sm text-gray-700">
                        {verificationResult.certificateData && (
                          <div className="space-y-1">
                            <p><span className="font-medium">ID:</span> {verificationResult.certificateData.id}</p>
                            <p><span className="font-medium">Student:</span> {verificationResult.certificateData.studentName}</p>
                            <p><span className="font-medium">Institution:</span> {verificationResult.certificateData.institution}</p>
                            <p><span className="font-medium">Type:</span> {verificationResult.certificateData.type}</p>
                            <p><span className="font-medium">Issue Date:</span> {verificationResult.certificateData.issueDate}</p>
                          </div>
                        )}
                        {verificationResult.fileName && (
                          <p className="mt-2"><span className="font-medium">File:</span> {verificationResult.fileName}</p>
                        )}
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={resetVerification}
                          className="inline-flex items-center text-sm font-medium text-green-700 hover:text-green-600"
                        >
                          Verify another certificate
                          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Bulk Verification Results */}
              {verificationMethod === 'bulk' && (bulkResults.length > 0 || isVerifying) && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Verification Results
                    {bulkResults.length > 0 && (
                      <span className="ml-2 text-sm font-normal text-gray-500">
                        ({bulkResults.filter(r => r.isValid).length} valid, {bulkResults.filter(r => !r.isValid).length} invalid)
                      </span>
                    )}
                  </h3>
                  
                  {isVerifying ? (
                    <div className="text-center py-8">
                      <Loader2 className="mx-auto h-8 w-8 text-gray-500 animate-spin" />
                      <p className="mt-2 text-sm text-gray-500">Verifying certificates...</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {bulkResults.map((result, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{result.id}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.studentName}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.type}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  result.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {result.isValid ? 'Valid' : 'Invalid'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <button
                          type="button"
                          onClick={resetVerification}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <XIcon className="h-3 w-3 mr-1" /> Clear Results
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download Results
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
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
            <h1 className="text-2xl font-bold text-gray-900">Institute Dashboard</h1>
            <p className="text-sm text-gray-500">Manage your institution's certificates and students</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <CheckCircle className="h-4 w-4 mr-1" />
              Active
            </span>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'verify', 'students', 'issue', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'issue' ? 'Issue Certificates' : tab.charAt(0).toUpperCase() + tab.slice(1)}
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

export default InstituteDashboard;
