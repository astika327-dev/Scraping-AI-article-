import { NextResponse } from 'next/server';

/**
 * API Endpoint to get the current trending articles.
 *
 * In a real-world scenario, this endpoint would fetch data from a
 * low-latency cache like Redis or Vercel KV. For this initial version,
 * it returns a hardcoded dummy data object that mimics the expected
 * structure of a processed article.
 */
export async function GET() {
  const dummyTrendingData = [
    {
      id: 'd9b2b5f0-6c9f-4f9e-8b1a-3e2c6d7e8f0a',
      sourceUrl: 'https://www.example.com/article-1',
      title: 'AI Revolutionizes Software Development',
      summary: 'A new AI model is now capable of writing complex software, potentially changing the landscape of the tech industry forever.',
      category: 'Technology',
      entities: [
        { entity_group: 'ORG', score: 0.98, word: 'Tech Industry' },
        { entity_group: 'MISC', score: 0.95, word: 'AI model' },
      ],
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'c8a1a4e9-5b8e-4e8d-9a0c-2d1b5c6d7e9f',
      sourceUrl: 'https://www.example.com/article-2',
      title: 'Global Markets React to New Regulations',
      summary: 'New international trade regulations have caused a stir in global markets, with experts predicting a period of high volatility.',
      category: 'Business',
      entities: [
        { entity_group: 'LOC', score: 0.99, word: 'Global Markets' },
        { entity_group: 'MISC', score: 0.91, word: 'international trade regulations' },
      ],
      publishedAt: new Date(Date.now() - 3600 * 1000).toISOString(), // 1 hour ago
    },
  ];

  return NextResponse.json(dummyTrendingData);
}
