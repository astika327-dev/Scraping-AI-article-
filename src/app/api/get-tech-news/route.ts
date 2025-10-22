import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.NEWS_API_KEY;
  const NEWS_API_ENDPOINT = `https://newsapi.org/v2/everything?q=technology&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'NewsAPI key is not configured.' },
      { status: 500 }
    );
  }

  try {
    const newsResponse = await fetch(NEWS_API_ENDPOINT);
    const newsData = await newsResponse.json();

    if (newsData.status === 'error') {
      return NextResponse.json({ error: newsData.message }, { status: 500 });
    }

    return NextResponse.json(newsData.articles);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: 'An error occurred while fetching tech news.', details: errorMessage },
      { status: 500 }
    );
  }
}
