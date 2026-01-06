export type Intent = 'codes' | 'trello' | 'discord' | 'wiki' | 'tier_list' | 'guide' | 'other' | 'risk';

export interface Keyword {
  keyword_raw: string;
  slug: string;
  intent: Intent;
  updated_at: string; // YYYY-MM-DD
  ai_summary: string;
  ai_points?: string[];
  links?: {
    game_url?: string;
    trello_url?: string;
    discord_url?: string;
    wiki_url?: string;
  };
}

export interface SiteConfig {
  site_title: string;
  site_description: string;
  game_url: string;
  trello_url?: string;
  discord_url?: string;
  wiki_url?: string;
}
