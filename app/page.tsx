'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import KeywordList from '@/components/KeywordList';
import Footer from '@/components/Footer';
import { processKeywords } from '@/lib/utils/filter';
import { Keyword, Intent, SiteConfig } from '@/lib/types';
import configData from '@/public/data/config.json';
import keywordsData from '@/public/data/keywords.json';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<Intent | 'all'>('all');

  const config = configData as SiteConfig;
  const keywords = keywordsData as Keyword[];

  const filteredKeywords = useMemo(() => {
    return processKeywords(keywords, searchQuery, activeFilter);
  }, [searchQuery, activeFilter, keywords]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header
        onSearchChange={setSearchQuery}
        onFilterChange={setActiveFilter}
        activeFilter={activeFilter}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Info Banner */}
        {filteredKeywords.length > 0 && (
          <div className="mb-6 text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredKeywords.length}</span> of{' '}
            <span className="font-semibold">{keywords.length}</span> keywords
          </div>
        )}

        {/* Keyword List */}
        <KeywordList keywords={filteredKeywords} config={config} />

        {/* Adsterra Ad Container */}
        <div className="my-8 flex justify-center">
          <div id="container-a3abe7bd5a25fc325cc119d993ad6bd9"></div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
