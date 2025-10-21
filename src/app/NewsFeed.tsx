'use client';

import { useState, useEffect } from 'react';

interface Article {
  title: string;
  summary: string;
  sourceUrl: string;
  category: string;
  entities: { word: string; entity_group: string }[];
}

export default function NewsFeed() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('/api/ingest/news-api-worker');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch news');
        }
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) {
    return <div className="text-center">Loading news...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!article) {
    return <div className="text-center">No news to display.</div>;
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}>
        <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
        <p className="mb-4">{article.summary}</p>
        <div className="mb-4">
          <span className="font-semibold">Category:</span>
          <span className="ml-2 px-2 py-1 text-sm rounded" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
            {article.category}
          </span>
        </div>
        <div className="mb-4">
          <p className="font-semibold mb-2">Key Entities:</p>
          <div className="flex flex-wrap gap-2">
            {article.entities.map((entity, index) => (
              <span key={index} className="px-2 py-1 text-sm rounded" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
                {entity.word} ({entity.entity_group})
              </span>
            ))}
          </div>
        </div>
        <a
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 hover:underline"
        >
          Read full article
        </a>
      </div>
    </div>
  );
}
