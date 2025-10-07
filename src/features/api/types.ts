
export type Owner = { login: string; avatar_url: string; html_url: string; };

export type Repo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  subscribers_count: number;
  language: string | null;
  license: { key: string; name: string; } | null;
  topics?: string[];
  html_url: string;
  homepage?: string | null;
  owner: Owner;
  updated_at: string;
  created_at: string;
};

export type SearchResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: Repo[];
};export type Contributor = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
};

