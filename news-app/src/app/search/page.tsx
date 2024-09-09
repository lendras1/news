// src/app/search/page.tsx

'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import NewsCard from '../../components/NewsCard';

interface Article {
  headline: { main: string };
  byline: { original: string };
  pub_date: string;
  source: string;
  section_name: string;
  abstract: string;
  web_url: string;
  multimedia?: { url: string }[];
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      searchArticles(query);
    }
  }, [query]);

  const searchArticles = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${process.env.NEXT_PUBLIC_NYTIMES_API_KEY}`
      );
      const data = await res.json();
  

      setArticles(data.response.docs);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense> 
    <div>
      <h1 className="text-3xl font-bold mb-4 mt-16">Most Popular News</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <NewsCard
              key={index}
              title={article.headline.main}
              byline={article.byline?.original || 'Unknown'}
              date={article.pub_date}
              source={article.source}
              section={article.section_name}
              abstract={article.abstract}
              url={article.web_url}
              imageUrl={
                article.multimedia && article.multimedia.length > 0
                  ? `https://www.nytimes.com/${article.multimedia[0].url}`
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </div>

    </Suspense>
  );
};

export default SearchPage;
