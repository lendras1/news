// src/components/NewsCard.tsx
import Image from 'next/image';

interface NewsCardProps {
  title: string;
  byline: string;
  date: string;
  source: string;
  section: string;
  abstract: string;
  url: string;
  imageUrl?: string;
}

const NewsCard = ({
  title,
  byline,
  date,
  source,
  section,
  abstract,
  url,
  imageUrl,
}: NewsCardProps) => {
  return (
    <div className="border p-4 rounded-md shadow-2xl">
      {imageUrl && <Image src={imageUrl} alt={title} width={440} height={293} className="w-full h-48 object-cover rounded-md mb-4" />}
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">By: {byline}</p>
      <p className="text-gray-600 text-xs">Published: {date}</p>
      <p className="text-gray-600 text-xs">Source: {source}</p>
      <p className="text-gray-600 text-xs">Section: {section}</p>
      <p className="mb-4">{abstract}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
        Read more ...
      </a>
    </div>
  );
};

export default NewsCard;
