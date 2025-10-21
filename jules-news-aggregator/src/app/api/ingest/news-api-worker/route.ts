import { NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import { processArticle } from '@/services/aiProcessingService';

/**
 * An end-to-end worker that simulates the full pipeline:
 * 1. Fetches headlines from NewsAPI.
 * 2. Takes the first article URL.
 * 3. Scrapes the full content of the article.
 * 4. Processes the content through the AI pipeline.
 * 5. Returns the enriched data.
 *
 * This simulates a single message passing through the queue.
 */
export async function GET() {
  // 1. Fetch headlines from NewsAPI
  const API_KEY = process.env.NEWS_API_KEY;
  const NEWS_API_ENDPOINT = `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=${API_KEY}`;

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

    if (!newsData.articles || newsData.articles.length === 0) {
      return NextResponse.json({ message: 'No articles found.' });
    }

    // 2. Take the first article URL
    const targetUrl = newsData.articles[0].url;

    // 3. Scrape the full content
    const articleHtml = await fetch(targetUrl).then((res) => res.text());
    const doc = new JSDOM(articleHtml, { url: targetUrl });
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    if (!article || !article.textContent) {
      return NextResponse.json(
        { error: 'Failed to extract article content.' },
        { status: 500 }
      );
    }

    // 4. Process the content through the AI pipeline
    // We'll use a slice of the text to stay within free tier limits
    const textToProcess = article.textContent.slice(0, 1500);
    const processedData = await processArticle(textToProcess);

    // 5. Return the enriched data
    return NextResponse.json({
      sourceUrl: targetUrl,
      title: article.title,
      ...processedData,
    });
  } catch (error) {
    // Log the actual error to the console for debugging
    console.error("Pipeline Error:", error);

    // Return a generic error message to the client
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
        { error: 'An error occurred during the ingestion pipeline.', details: errorMessage },
        { status: 500 }
    );
  }
}
