"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Navbar } from "../navbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { SearchUnithash } from "./components/SearchUnithash";

const staticProduct = [
  {
    unitshash: "8FA39C1B",
    name: 'Limited Edition Hoodie',
    manufacturer: 'VerifiTech Labs',
    status: 'Verified',
    tx: '0x9a4e...ff1d',
    created: '2025-10-09 14:32 UTC',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400'
  },
  {
    unitshash: "2E9B47FA",
    name: "Signature Leather Wallet",
    manufacturer: "Arden & Co.",
    status: "Verified",
    tx: "0xb17f...c9a3",
    created: "2025-10-08 09:21 UTC",
    image: "https://images.unsplash.com/photo-1593032465171-8b7b91a1dbe3?w=400"
  },
  {
    unitshash: "C5A13FD8",
    name: "Handcrafted Ceramic Mug",
    manufacturer: "BluePeak Studio",
    status: "Verified",
    tx: "0x94e2...b7f2",
    created: "2025-10-07 16:44 UTC",
    image: "https://images.unsplash.com/photo-1606813902779-5cc5b7c0c8be?w=400"
  },
  {
    unitshash: "E13A9B72",
    name: "Carbon Fiber Watch",
    manufacturer: "Chronos Design",
    status: "Verified",
    tx: "0xdf43...a10e",
    created: "2025-10-05 22:08 UTC",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400"
  },
  {
    unitshash: "9B84C01E",
    name: "Artisan Coffee Beans",
    manufacturer: "Sierra Origin Co.",
    status: "Verified",
    tx: "0xa8b2...3c9e",
    created: "2025-10-04 07:53 UTC",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400"
  },
  {
    unitshash: "A76E21D4",
    name: "Limited Print Canvas",
    manufacturer: "NeoGallery Collective",
    status: "Verified",
    tx: "0x6b9c...e412",
    created: "2025-10-02 18:17 UTC",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=400"
  },
  {
    unitshash: "3FD7B8A9",
    name: "Smart Fitness Band",
    manufacturer: "PulseX Innovations",
    status: "Verified",
    tx: "0xec13...9c02",
    created: "2025-10-01 11:40 UTC",
    image: "https://images.unsplash.com/photo-1603791452906-cde5163ea14a?w=400"
  },
  {
    unitshash: "7CDAE14F",
    name: "Rare Vinyl Record",
    manufacturer: "EchoSound Archives",
    status: "Verified",
    tx: "0xf91b...d321",
    created: "2025-09-29 23:55 UTC",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400"
  },
]

export default function SearchBar() {

  const [searchUnithash, setSearchUnithash] = useState('');

  // idle = belum search, loading = proses search, found = unithash ditemukan, not_found = unithash tidak ditemukan
  const [searchResult, setSearchResult] = useState('idle');

  const [unithashData, setUnithashData] = useState<any | null>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchUnithash) {
      alert("Please enter a Unitshash.");
      return;
    }

    if (searchUnithash.length < 8) {
      alert("Unitshash must be 8 characters long.");
      return;
    }

    setSearchResult('loading');

    setTimeout(() => {
      const foundProduct = staticProduct.find(p => p.unitshash === searchUnithash.toUpperCase());
      if (foundProduct) {
        setUnithashData(foundProduct);
        setSearchResult('found');
      } else {
        setUnithashData(null);
        setSearchResult('not_found');
      }
    });
  }

  const resetSearch = () => {
    setSearchUnithash('');
    setSearchResult('idle');
    setUnithashData(null);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-slate-100">
      <Navbar />

      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="mt-17 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-400 flex items-center justify-center shadow-lg">
            <span className="font-extrabold">V3</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold">Transparent Creative Supply Chain</h1>
            <p className="text-sm text-slate-300">Anti-counterfeit tracking for creative goods • Web3 + IPFS</p>
          </div>
        </div>
          
        <div className="mt-17">
          <ConnectButton />
        </div>
      </header>

      <SearchUnithash 
      onSearch={handleSearch}
      searchResult={searchResult}
      searchQuery={searchUnithash}
      searching={searchResult}
      setSearchQuery={setSearchUnithash}
      />

      {/* Search Result */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        {searchResult === 'idle' && (
          <section className="text-center text-slate-400 py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <FaSearch className="w-16 h-16 mx-auto mb-4 text-slate-500" />
            <p className="text-lg">Enter your Unithash to begin verification</p>
            <p className="text-sm text-slate-500 mt-2">Tip: Try entering "ABC123" to see a verified product</p>
          </section>
        )}

        {searchResult === 'loading' && (
          <section className="text-center py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <div className="w-16 h-16 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <p className="text-lg text-slate-300">Verifying on blockchain...</p>
            <p className="text-sm text-slate-500 mt-2">Please wait</p>
          </section>
        )}

        {searchResult === 'found' && unithashData && (
          <section>
            <div>
              <h2 className="text-2xl font-semibold text-white">Verification Result</h2>
            </div>

            <div>
              <img
                src={unithashData.image}
                alt={unithashData.name}
                className="w-full md:w-1/3 rounded-lg object-cover h-48 md:h-auto"
              />

              <div className="flex-1 space-y-3">
                <div>
                  <span className="text-slate-400 text-sm">Product</span>
                  <p className="text-white font-medium text-lg">{unithashData.name}</p>
                </div>
                
                <div>
                  <span className="text-slate-400 text-sm">Manufacturer</span>
                  <p className="text-white">{unithashData.manufacturer}</p>
                </div>
                
                <div>
                  <span className="text-slate-400 text-sm">Status</span>
                  <p className="text-green-400 font-medium flex items-center gap-2">
                    {/* <CheckCircle2 className="w-4 h-4" /> */}
                    {unithashData.status} on Blockchain
                  </p>
                </div>
                
                <div>
                  <span className="text-slate-400 text-sm">Blockchain TX</span>
                  <p>
                    <a
                      href="#"
                      className="text-indigo-400 hover:text-indigo-300 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {unithashData.tx}
                    </a>
                  </p>
                </div>
                
                <div>
                  <span className="text-slate-400 text-sm">Created</span>
                  <p className="text-white">{unithashData.created}</p>
                </div>
              </div>
            </div>

            <button
              onClick={resetSearch}
              className="mt-6 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Search Again
            </button>
          </section>
        )}

        {searchResult === 'not_found' && (
           <section className="text-center py-16 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl">
            <p className="text-xl text-red-300">No product found for this hash</p>
            <p className="text-slate-400 mt-2">Please check the Unithash and try again</p>
            <button
              onClick={resetSearch}
              className="mt-6 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </section>
        )}
      </div>

    </main>
  )
}