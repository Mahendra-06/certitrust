import React, { useState, useRef, useEffect } from 'react';
import { 
  Building, Users, FileText, Clock, TrendingUp, CheckCircle, Plus, 
  QrCode, Camera, X, Loader2, Search, Upload, FileSpreadsheet, Check, X as XIcon, UserCheck, BarChart3
} from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

const RecruiterDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('verify');
  const [verificationMethod, setVerificationMethod] = useState<'id' | 'file' | 'qr' | 'bulk' | 'blockchain'>('id');
  const [certificateId, setCertificateId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [bulkResults, setBulkResults] = useState<any[]>([]);
  const [blockchainHash, setBlockchainHash] = useState('');

  const qrScannerRef = useRef<Html5Qrcode | null>(null);
  const qrContainerRef = useRef<HTMLDivElement>(null);

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
        institution: 'Various Institutions',
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
        institution: 'Blockchain Verified Institution',
        issueDate: new Date().toISOString().split('T')[0],
        type: ['Degree', 'Transcript', 'Certificate'][Math.floor(Math.random() * 3)],
        blockchainVerified: true
      }
    };

    setVerificationResult(result);
    setIsVerifying(false);
    return result;
  };

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
    } else if (verificationMethod === 'blockchain' && blockchainHash) {
      await verifyBlockchainHash(blockchainHash);
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
    setBlockchainHash('');

    // Stop QR scanner if it's running
    if (qrScannerRef.current) {
      qrScannerRef.current.stop().catch(() => {});
      qrScannerRef.current = null;
    }
    setIsScanning(false);
  };

  const recentVerifications = [
    { id: 'CERT-2023-001', name: 'John Doe', date: '2023-09-15', status: 'Verified', result: 'Valid' },
    { id: 'CERT-2023-002', name: 'Jane Smith', date: '2023-09-15', status: 'Verified', result: 'Valid' },
    { id: 'CERT-2023-003', name: 'Alex Johnson', date: '2023-09-14', status: 'Verified', result: 'Invalid' },
  ];

  const stats = [
    { label: 'Total Verifications', value: '1,234', change: '+12%', icon: Search },
    { label: 'Valid Certificates', value: '1,089', change: '+8%', icon: CheckCircle },
    { label: 'Pending Reviews', value: '23', change: '-15%', icon: Clock },
    { label: 'Success Rate', value: '96.2%', change: '+3%', icon: TrendingUp }
  ];
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat: { label: string; value: string; change: string; icon: React.ComponentType<{ className?: string }> }, index: number) => (
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
                    <div className="p-3 bg-orange-100 rounded-full">
                      <stat.icon className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Recent Verifications</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentVerifications.map((item: { id: string; name: string; date: string; status: string; result: string }) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.result === 'Valid'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.result}
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
      case 'verify':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-6">Verify Certificates</h2>

              {/* Verification Method Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'id' as const, label: 'Verify by ID', icon: Search },
                    { id: 'file' as const, label: 'Upload Certificate', icon: Upload },
                    { id: 'qr' as const, label: 'QR Code Scan', icon: QrCode },
                    { id: 'blockchain' as const, label: 'Blockchain Hash', icon: CheckCircle },
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
                          ? 'border-orange-500 text-orange-600'
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
                        className="focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
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
                            className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none"
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
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
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
                          className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                          <Camera className="h-3 w-3 mr-1" /> Scan Another Code
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {verificationMethod === 'blockchain' && (
                  <div>
                    <label htmlFor="blockchainHash" className="block text-sm font-medium text-gray-700 mb-1">
                      Blockchain Hash
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        id="blockchainHash"
                        className="focus:ring-orange-500 focus:border-orange-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                        placeholder="Enter blockchain hash for verification"
                        value={blockchainHash}
                        onChange={(e) => setBlockchainHash(e.target.value)}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Enter the blockchain transaction hash to verify certificate authenticity
                    </p>
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
                            className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none"
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
                          <a href="/sample-bulk-verify.csv" className="text-orange-600 hover:text-orange-500" download>
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
                   (verificationMethod === 'blockchain' && blockchainHash) ||
                   (verificationMethod === 'bulk' && bulkFile) ? (
                    <button
                      type="submit"
                      disabled={isVerifying}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      {verificationMethod === 'blockchain' && 'Enter a blockchain hash to verify'}
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
                        {verificationResult.certificateData?.blockchainVerified && ' (Blockchain Verified)'}
                      </h3>
                      <div className="mt-2 text-sm text-gray-700">
                        {verificationResult.certificateData && (
                          <div className="space-y-1">
                            {verificationResult.certificateData.hash && (
                              <p><span className="font-medium">Hash:</span> {verificationResult.certificateData.hash}</p>
                            )}
                            <p><span className="font-medium">ID:</span> {verificationResult.certificateData.id}</p>
                            <p><span className="font-medium">Student:</span> {verificationResult.certificateData.studentName}</p>
                            <p><span className="font-medium">Institution:</span> {verificationResult.certificateData.institution}</p>
                            <p><span className="font-medium">Type:</span> {verificationResult.certificateData.type}</p>
                            <p><span className="font-medium">Issue Date:</span> {verificationResult.certificateData.issueDate}</p>
                            {verificationResult.certificateData.blockchainVerified && (
                              <p className="flex items-center mt-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-green-700 font-medium">Blockchain Verified</span>
                              </p>
                            )}
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
                          className="inline-flex items-center text-sm font-medium text-orange-700 hover:text-orange-600"
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
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                          <XIcon className="h-3 w-3 mr-1" /> Clear Results
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
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
      case 'candidates':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6">Candidate Management</h2>
            <div className="text-center py-12">
              <UserCheck className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Candidate management coming soon</h3>
              <p className="mt-1 text-sm text-gray-500">Manage all your candidates in one place.</p>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6">Verification Reports</h2>
            <div className="text-center py-12">
              <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Reports coming soon</h3>
              <p className="mt-1 text-sm text-gray-500">View detailed verification reports and analytics.</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Recruiter Portal</h1>
            <p className="text-sm text-gray-500">Verify candidate certificates and manage your hiring pipeline</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'verify', 'candidates', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-orange-500 text-orange-600'
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

export default RecruiterDashboard;
