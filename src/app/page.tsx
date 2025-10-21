
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50 text-gray-800">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Jules News Aggregator</h1>
        <p className="text-xl mb-8">
          Welcome to the backend service for the Jules News Aggregator.
        </p>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Available API Endpoints:</h2>
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg">
              Test the full ingestion and processing pipeline:
            </p>
            <Link href="/api/ingest/news-api-worker"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                /api/ingest/news-api-worker
            </Link>
            <p className="text-lg">
              Get dummy trending data:
            </p>
            <Link href="/api/get-trending"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
                /api/get-trending
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
