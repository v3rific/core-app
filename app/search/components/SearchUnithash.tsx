import { motion } from "framer-motion";
import { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchUnithashProps {
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  searchResult: string;
  searchQuery: string;
  searching: string;
  setSearchQuery: (value: string) => void;
  errorMessage?: string | null;
}

export function SearchUnithash({
  onSearch,
  searchResult,
  searchQuery,
  searching,
  setSearchQuery,
  errorMessage,
}: SearchUnithashProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const sanitized = event.target.value.replace(/[^0-9a-z]/gi, "").slice(0, 10).toLowerCase();
    setSearchQuery(sanitized);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="text-center max-w-3xl mx-auto px-6 py-16"
    >
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-xl">
        <h1 className="text-4xl font-bold text-white mb-3">
          Verify Product Authenticity
        </h1>
        <p className="text-slate-400 mb-8 text-lg">
          Enter your UnitHash to check whether this product is verified and recorded securely on blockchain.
        </p>

        <form
          onSubmit={onSearch}
          className="flex flex-col items-center gap-4 max-w-xl mx-auto"
        >
          <input
            id="unithash"
            type="text"
            value={searchQuery.toUpperCase()}
            onChange={handleChange}
            disabled={searching === 'loading'}
            placeholder="Enter unitshash (e.g. preview00)"
            autoComplete="off"
            className="w-full px-5 py-3 text-white bg-white/10 placeholder-gray-400 rounded-full border border-white/10
              focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400/40 focus:outline-none transition-all"
            aria-label="Enter Unithash to verify product"
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 
            hover:from-indigo-600 hover:to-violet-600 text-white font-medium 
            disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-indigo-600/20"
          >

            {searchResult === 'loading' ? (
                <>
                <div className="w-9 h-9 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </>
            ) : (
                <>
                <FaSearch className="w-5 h-5" />
                Search
                </>
            )}
          </button>

          {errorMessage && (
            <p className="text-sm text-rose-300">{errorMessage}</p>
          )}
        </form>
      </div>
    </motion.section>
  );
}
