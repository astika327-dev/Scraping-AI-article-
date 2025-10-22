import Hero from "@/components/Hero";
import ArticleList from "@/components/ArticleList";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <ArticleList />
    </div>
  );
}
