// src/app/[section]/page.tsx



'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import NewsCard from '../../components/NewsCard';

interface Article {
  title: string;
  byline: string;
  published_date: string;
  source: string;
  section: string;
  abstract: string;
  url: string;
  multimedia?: { url: string }[];
}

const SectionPage = () => {
  const params = useParams();
  const section = params.section;
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSectionStories = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${process.env.NEXT_PUBLIC_NYTIMES_API_KEY}`
        );
        const data = await res.json();
        console.log(data);
        setArticles(data.results);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSectionStories();
  }, [section]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 mt-16">{section} most popular news...</h1>
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
                imageUrl={article.multimedia ? article.multimedia[0].url : undefined}
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

export default SectionPage;




{/*}
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import NewsCard from '../../components/NewsCard';

interface Article {
  title: string;
  byline: string;
  published_date: string;
  source: string;
  section: string;
  abstract: string;
  url: string;
  multimedia?: { url: string }[];
}

const SectionPage = () => {
  const params = useParams();
  const section = params.section;
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSectionStories();
  }, [section]);

  const fetchSectionStories = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${process.env.NEXT_PUBLIC_NYTIMES_API_KEY}`
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
    <div>
      <h1 className="text-3xl font-bold mb-4 mt-16"> {section} most popular news...</h1>
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
              imageUrl={article.multimedia ? article.multimedia[0].url : undefined}
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

export default SectionPage;
{*/}