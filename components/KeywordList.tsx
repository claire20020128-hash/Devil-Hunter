'use client';

import { Keyword } from '@/lib/types';
import KeywordModule from './KeywordModule';

interface KeywordListProps {
  keywords: Keyword[];
  config: {
    game_url: string;
    trello_url?: string;
    discord_url?: string;
    wiki_url?: string;
  };
}

export default function KeywordList({ keywords, config }: KeywordListProps) {
  if (keywords.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No keywords found. Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {keywords.map((keyword) => (
        <KeywordModule
          key={keyword.slug}
          keyword={keyword}
          config={config}
        />
      ))}
    </div>
  );
}
