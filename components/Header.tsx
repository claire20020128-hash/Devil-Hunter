'use client';

import { Intent } from '@/lib/types';
import { useState, useCallback } from 'react';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  onFilterChange: (intent: Intent | 'all') => void;
  activeFilter: Intent | 'all';
}

const FILTER_OPTIONS: Array<{ label: string; value: Intent | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'Codes', value: 'codes' },
  { label: 'Trello', value: 'trello' },
  { label: 'Discord', value: 'discord' },
  { label: 'Wiki', value: 'wiki' },
  { label: 'Tier List', value: 'tier_list' },
  { label: 'Guide / How-to', value: 'guide' },
  { label: 'Items / Locations', value: 'other' },
];

export default function Header({
  onSearchChange,
  onFilterChange,
  activeFilter,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      onSearchChange(query);
    },
    [onSearchChange]
  );

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Site Title & Description */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Devil Hunter (Roblox) Hub
          </h1>
          <p className="text-gray-600">
            Your one-stop hub for Devil Hunter codes, guides, Trello boards,
            Discord servers, and more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search keywords (e.g., 'codes', 'guide', 'discord')..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeFilter === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
