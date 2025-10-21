import NewsFeed from './NewsFeed';

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-start p-12"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <header className="w-full max-w-5xl text-center mb-12">
        <h1 className="text-5xl font-bold">U2 News Aggregator</h1>
        <p className="text-xl mt-2">Your AI-powered news feed</p>
      </header>
      <NewsFeed />
    </main>
  );
}
