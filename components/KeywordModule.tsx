'use client';

import { Keyword } from '@/lib/types';
import { useState, useCallback } from 'react';
import { ExternalLinkIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface KeywordModuleProps {
  keyword: Keyword;
  config: {
    game_url: string;
    trello_url?: string;
    discord_url?: string;
    wiki_url?: string;
  };
}

const INTENT_COLORS: Record<string, { bg: string; text: string }> = {
  codes: { bg: 'bg-green-100', text: 'text-green-800' },
  trello: { bg: 'bg-blue-100', text: 'text-blue-800' },
  discord: { bg: 'bg-purple-100', text: 'text-purple-800' },
  wiki: { bg: 'bg-cyan-100', text: 'text-cyan-800' },
  tier_list: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  guide: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
  risk: { bg: 'bg-red-100', text: 'text-red-800' },
  other: { bg: 'bg-gray-100', text: 'text-gray-800' },
};

export default function KeywordModule({ keyword, config }: KeywordModuleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = INTENT_COLORS[keyword.intent] || INTENT_COLORS.other;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(keyword.keyword_raw);
    alert('Copied to clipboard!');
  }, [keyword.keyword_raw]);

  const getLinks = () => {
    const links = keyword.links || {};
    const baseConfig = config;

    return {
      game: links.game_url || baseConfig.game_url,
      trello: links.trello_url || baseConfig.trello_url,
      discord: links.discord_url || baseConfig.discord_url,
      wiki: links.wiki_url || baseConfig.wiki_url,
    };
  };

  const links = getLinks();
  const isRiskModule = keyword.intent === 'risk';

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
      {/* Collapsed State */}
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {keyword.keyword_raw}
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}>
                {keyword.intent.replace(/_/g, ' ')}
              </span>
              <span className="text-xs text-gray-500">
                Updated: {keyword.updated_at}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={handleCopy}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition"
              title="Copy keyword"
            >
              Copy
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition flex items-center gap-2"
            >
              {isExpanded ? (
                <>
                  <span>Collapse</span>
                  <ChevronUpIcon size={18} />
                </>
              ) : (
                <>
                  <span>Expand</span>
                  <ChevronDownIcon size={18} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Expanded State */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            {/* AI Summary */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Overview</h4>
              <p className="text-gray-700 leading-relaxed">{keyword.ai_summary}</p>
            </div>

            {/* Key Points */}
            {keyword.ai_points && keyword.ai_points.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Key Points</h4>
                <ul className="space-y-2">
                  {keyword.ai_points.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-gray-700"
                    >
                      <span className="text-blue-500 font-bold flex-shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Risk Warning (for risk modules only) */}
            {isRiskModule && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-semibold">
                  ⚠️ WARNING: This content relates to security and safety.
                </p>
                <p className="text-red-700 mt-2">
                  For more information on Roblox policies, visit:{' '}
                  <a
                    href="https://en.help.roblox.com/hc/en-us/articles/203313410"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-semibold hover:text-red-900"
                  >
                    Roblox Community Standards
                  </a>
                </p>
              </div>
            )}

            {/* External Links */}
            {!isRiskModule && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">External Links</h4>
                <div className="flex flex-wrap gap-3">
                  {links.game && (
                    <a
                      href={links.game}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition"
                    >
                      <span>Play on Roblox</span>
                      <ExternalLinkIcon size={16} />
                    </a>
                  )}
                  {links.trello && (
                    <a
                      href={links.trello}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
                    >
                      <span>Trello</span>
                      <ExternalLinkIcon size={16} />
                    </a>
                  )}
                  {links.discord && (
                    <a
                      href={links.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition"
                    >
                      <span>Discord</span>
                      <ExternalLinkIcon size={16} />
                    </a>
                  )}
                  {links.wiki && (
                    <a
                      href={links.wiki}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md transition"
                    >
                      <span>Wiki</span>
                      <ExternalLinkIcon size={16} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
