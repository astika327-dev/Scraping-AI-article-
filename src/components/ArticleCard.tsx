import Image from 'next/image';

interface Article {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
}

const ArticleCard = ({ article, index }: { article: Article; index: number }) => {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg overflow-hidden group transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl animate-fade-in"
      style={{
        background: 'linear-gradient(to bottom, rgb(var(--tile-start-rgb)), rgb(var(--tile-end-rgb)))',
        borderColor: 'rgb(var(--tile-border))',
        borderWidth: '1px',
        animationDelay: `${index * 100}ms`,
        opacity: 0, // Start with opacity 0, animation will make it visible
      }}
    >
      <div className="relative w-full h-48">
        <Image
          src={article.urlToImage || '/placeholder.svg'}
          alt={article.title}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-white mb-2 leading-tight">{article.title}</h3>
        <p className="text-gray-400 text-sm">{article.description}</p>
      </div>
    </a>
  );
};

export default ArticleCard;
