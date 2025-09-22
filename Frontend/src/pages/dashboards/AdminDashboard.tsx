import React, { useState, useRef, useEffect } from 'react';
import {
  Building, FileText, BarChart3, CheckCircle, QrCode, Camera, X, Loader2, Search,
  Users, MapPin, Phone, Mail, ExternalLink, ChevronDown, Filter, Plus, Upload, FileSpreadsheet, Check
} from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { Link } from 'react-router-dom';

interface Institution {
  id: string;
  name: string;
  type: string;
  location: string;
  email: string;
  phone: string;
  students: number;
  status: 'active' | 'pending' | 'suspended';
  registrationDate: string;
}

interface VerificationResult {
  isValid: boolean;
  message: string;
  certificateData?: {
    id: string;
    studentName: string;
    institution: string;
    issueDate: string;
    type: string;
  };
  fileName?: string;
}

const AdminDashboard: React.FC = () => {
  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [certificateId, setCertificateId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [bulkResults, setBulkResults] = useState<any[]>([]);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<'id' | 'file' | 'qr' | 'bulk'>('id');
  const [institutions] = useState<Institution[]>([
    {
      id: 'INST001',
      name: 'Delhi Technological University',
      type: 'Government',
      location: 'New Delhi',
      email: 'admin@dtu.ac.in',
      phone: '+91 11 27871007',
      students: 12500,
      status: 'active',
      registrationDate: '2023-01-15'
    },
    {
      id: 'INST002',
      name: 'Indian Institute of Technology Delhi',
      type: 'Autonomous',
      location: 'New Delhi',
      email: 'office@iitd.ac.in',
      phone: '+91 11 26591753',
      students: 9800,
      status: 'active',
      registrationDate: '2023-02-20'
    },
    {
      id: 'INST003',
      name: 'Netaji Subhas University of Technology',
      type: 'State University',
      location: 'New Delhi',
      email: 'registrar@nsut.ac.in',
      phone: '+91 11 25099050',
      students: 8500,
      status: 'pending',
      registrationDate: '2023-03-10'
    },
    {
      id: 'INST004',
      name: 'Jamia Millia Islamia',
      type: 'Central University',
      location: 'New Delhi',
      email: 'vc@jmi.ac.in',
      phone: '+91 11 26981717',
      students: 15600,
      status: 'active',
      registrationDate: '2023-01-28'
    },
    {
      id: 'INST005',
      name: 'Guru Gobind Singh Indraprastha University',
      type: 'State University',
      location: 'New Delhi',
      email: 'registrar@ipu.ac.in',
      phone: '+91 11 25302167',
      students: 7200,
      status: 'active',
      registrationDate: '2023-02-05'
    },
    {
      id: 'INST006',
      name: 'Indira Gandhi Delhi Technical University for Women',
      type: 'State University',
      location: 'New Delhi',
      email: 'admin@igdtuw.ac.in',
      phone: '+91 11 23900261',
      students: 3200,
      status: 'active',
      registrationDate: '2023-03-15'
    },
    {
      id: 'INST007',
      name: 'National Institute of Technology Delhi',
      type: 'Autonomous',
      location: 'New Delhi',
      email: 'director@nitdelhi.ac.in',
      phone: '+91 11 27787501',
      students: 4100,
      status: 'pending',
      registrationDate: '2023-04-02'
    },
    {
      id: 'INST008',
      name: 'Ambedkar Institute of Advanced Communication Technologies and Research',
      type: 'Government',
      location: 'New Delhi',
      email: 'principal@aiactr.ac.in',
      phone: '+91 11 28520894',
      students: 1800,
      status: 'active',
      registrationDate: '2023-02-18'
    }
  ]);

  const qrScannerRef = useRef<Html5Qrcode | null>(null);

  // Stats for the overview tab
  const stats = [
    { label: 'Total Institutes', value: '1,245', change: '+12%', icon: Building },
    { label: 'Total Students', value: '245,678', change: '+8.5%', icon: Users },
    { label: 'Active Verifiers', value: '1,234', change: '+3%', icon: CheckCircle },
    { label: 'Fraud Cases', value: '45', change: '-2', icon: FileText }
  ];

  // Clean up QR Scanner on unmount
  useEffect(() => {
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop().catch(() => {});
        qrScannerRef.current = null;
      }
    };
  }, []);

  // Mock function to verify certificate by ID
  const verifyCertificateById = async (id: string): Promise<VerificationResult> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response - in a real app, this would be an API call
    if (id === 'CERT12345') {
      return {
        isValid: true,
        message: 'Certificate is valid',
        certificateData: {
          id: 'CERT12345',
          studentName: 'John Doe',
          institution: 'Delhi Technological University',
          issueDate: '2023-05-15',
          type: 'Degree Certificate'
        }
      };
    }
    return {
      isValid: false,
      message: 'Certificate not found or invalid'
    };
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Mock function to verify certificate by file
  const verifyCertificateByFile = async (file: File): Promise<VerificationResult> => {
    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would upload the file to your backend for verification
    return {
      isValid: true,
      message: 'Certificate verified successfully',
      certificateData: {
        id: 'CERT' + Math.floor(10000 + Math.random() * 90000),
        studentName: 'Jane Smith',
        institution: 'Indian Institute of Technology Delhi',
        issueDate: '2023-06-20',
        type: 'Transcript'
      }
    };
  };

  // Enhanced form submission with bulk verification
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationMethod === 'id' && certificateId) {
      await verifyCertificateById(certificateId);
    } else if (verificationMethod === 'file' && selectedFile) {
      // In a real app, you would upload the file for verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      const result = await verifyCertificateById('CERT' + Math.floor(10000 + Math.random() * 90000));
      setVerificationResult({
        ...result,
        fileName: selectedFile.name
      });
    } else if (verificationMethod === 'qr' && !isScanning) {
      startQRScanner();
    } else if (verificationMethod === 'bulk' && bulkFile) {
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
          institution: 'Various Institutions',
          type: ['Degree', 'Transcript', 'Certificate'][Math.floor(Math.random() * 3)],
          issueDate: new Date().toISOString().split('T')[0]
        });
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
      setBulkResults(results);
      setIsVerifying(false);
    }
  };

  // Reset verification state
  const resetVerification = () => {
    setVerificationResult(null);
    setCertificateId('');
    setSelectedFile(null);
    setScanResult(null);
    setBulkFile(null);
    setBulkResults([]);

    // Stop QR scanner if it's running
    if (qrScannerRef.current) {
      qrScannerRef.current.stop().catch(() => {});
      qrScannerRef.current = null;
    }
    setIsScanning(false);
  };

  // Handle bulk file upload
  const handleBulkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBulkFile(e.target.files[0]);
    }
  };

  // Enhanced QR scanner with real camera integration
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
          await verifyCertificateById(qrCodeData);
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-full">
                      <stat.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'verifications':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-6">Certificate Verification</h2>

              {/* Verification Method Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'id' as const, label: 'Verify by ID', icon: Search },
                    { id: 'file' as const, label: 'Upload Certificate', icon: Upload },
                    { id: 'qr' as const, label: 'QR Code Scan', icon: QrCode },
                    { id: 'bulk' as const, label: 'Bulk Verify', icon: FileSpreadsheet }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setVerificationMethod(tab.id);
                        resetVerification();
                      }}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                        verificationMethod === tab.id
                          ? 'border-blue-500 text-blue-600'
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
                        className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
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
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
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
                              onClick={() => {
                                if (qrScannerRef.current) {
                                  qrScannerRef.current.stop().catch(() => {});
                                  qrScannerRef.current = null;
                                }
                                setIsScanning(false);
                              }}
                              className="mt-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <X className="h-3 w-3 mr-1" /> Stop Scanning
                            </button>
                          </div>
                        ) : scanResult ? (
                          <div className="text-center text-blue-600">
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
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                          className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
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
                          <a href="/sample-bulk-verify.csv" className="text-blue-600 hover:text-blue-500" download>
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
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      {verificationMethod === 'qr' && 'Click "Start Camera" to verify a QR code'}
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
                        <X className="h-5 w-5 text-red-400" />
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
                          className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-600"
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {bulkResults.map((result, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{result.id}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.studentName}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.institution}</td>
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
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <X className="h-3 w-3 mr-1" /> Clear Results
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

      case 'institutions':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Registered Institutions</h2>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Plus className="h-4 w-4 mr-2" />
                Add Institution
              </button>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex-1 max-w-lg">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search institutions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Institutions Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Institution Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registration Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {institutions.map((institution) => (
                      <tr key={institution.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <Building className="h-5 w-5 text-blue-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {institution.name}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {institution.location}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {institution.email}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {institution.phone}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">
                            {institution.students.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            enrolled students
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            institution.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : institution.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {institution.status.charAt(0).toUpperCase() + institution.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(institution.registrationDate).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 flex items-center">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Suspend
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">{institutions.length}</span> of{' '}
                      <span className="font-medium">{institutions.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Previous
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Active Institutions</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {institutions.filter(inst => inst.status === 'active').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Users className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Pending Approval</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {institutions.filter(inst => inst.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {institutions.reduce((sum, inst) => sum + inst.students, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'verifications', 'institutions', 'reports'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
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

export default AdminDashboard;
