'use client';

import { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';

interface Article {
  title: string;
  byline: string;
  published_date: string;
  source: string;
  section: string;
  abstract: string;
  url: string;
  media?: { 'media-metadata': { url: string }[] }[];
}

const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMostPopular();
  }, []);

  const fetchMostPopular = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${process.env.NEXT_PUBLIC_NYTIMES_API_KEY}`
      );
      const data = await res.json();
      console.log(data)
      setArticles(data.results);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      <h1 className="text-3xl font-bold mb-5 mt-16 ">most popular news...</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (

        articles && articles.length > 0 ? (
     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {articles.map((article, index) => (
            <NewsCard
              key={index}
              title={article.title}
              byline={article.byline}
              date={article.published_date}
              source={article.source}
              section={article.section}
              abstract={article.abstract}
              url={article.url}
              imageUrl={article.media ? article.media[0] ? article.media[0]['media-metadata'][2].url : undefined : undefined}
            />
          ))}
        </div>
     ) : (
      <p>No articles available</p>
    )
  )}
    </div>
  );
};

export default HomePage;
