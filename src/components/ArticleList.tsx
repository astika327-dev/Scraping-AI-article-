'use client';

import { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import SkeletonCard from './SkeletonCard';

interface Article {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
}

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/get-tech-news');
        if (!response.ok) {
          throw new Error('Failed to fetch articles.');
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) return <div className="text-center py-10 text-red-400">Error: Could not fetch articles. Please check your NEWS_API_KEY.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} index={index} />
      ))}
    </div>
  );
};

export default ArticleList;
