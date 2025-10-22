import Image from 'next/image';

interface Article {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
}

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <div className="relative w-full h-48">
        <Image
          src={article.urlToImage || '/placeholder.svg'}
          alt={article.title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{article.title}</h3>
        <p className="text-sm mb-4">{article.description}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          Read More
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
