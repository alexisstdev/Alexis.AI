import { useEffect, useState } from 'react';
import { Loader, Card } from '../Components/index';
import './Home.css';

function RenderCards({ data, title }) {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return <h2>{title}</h2>;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://alexisdev-ai.onrender.com/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.ok) {
          const result = await res.json();
          setPosts(result.data.reverse());
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className='home'>
      <h1 className='home-title'>Community Images</h1>
      <p className='home-description'>
        Browse throw a collection of visually stunning images generated by DALL-E AI
      </p>
      <div className='search'>
        <input
          type='search'
          placeholder={'Search'}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className='home-loader'>
        {loading ? (
          <Loader />
        ) : (
          <>{searchText && <h2>Showing results for '{searchText}'</h2>}</>
        )}
      </div>
      <div className='home-grid'>
        {searchText.length > 0 ? (
          <RenderCards
            data={posts.filter((post) =>
              post.name.toLowerCase().includes(searchText.toLowerCase())
            )}
            title='No search results'
          />
        ) : (
          <RenderCards data={posts} />
        )}
      </div>
    </div>
  );
}
