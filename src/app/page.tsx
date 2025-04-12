"use client";
import { useState } from 'react';

export default function AdCopyGenerator() {
  const [product, setProduct] = useState('');
  const [adCopy, setAdCopy] = useState<{ title: string; description: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const generateAdCopy = async () => {
    if (!product) return;
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      });
      const data = await response.json();
      setAdCopy(data);
    } catch (error) {
      console.error('Error generating ad copy:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-2">
            AdCraft <span className="text-blue-600">AI</span>
          </h1>
          <p className="text-xl text-gray-600">Smarter Ad Copy, Instantly</p>
        </div>

        {/* Input Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Description</h2>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Enter your product or promotion details..."
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
          
          <button
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-70"
            onClick={generateAdCopy}
            disabled={loading || !product.trim()}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : 'Generate'}
          </button>
        </div>

        {/* Results Section */}
        {adCopy && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Generated Ad Copy</h2>
              <button 
                onClick={() => setAdCopy(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{adCopy.title}</h3>
              <p className="text-gray-700 whitespace-pre-line">{adCopy.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}