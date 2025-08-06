'use client'; // 👈 Important line for Client Component

import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchVideos = async () => {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🎬 YouTube Downloader</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search YouTube video or paste URL"
        style={{ padding: '10px', width: '60%' }}
      />
      <button onClick={searchVideos} style={{ padding: '10px', marginLeft: '10px' }}>
        🔍 Search
      </button>

      <div style={{ marginTop: '30px' }}>
        {results.map((video, i) => (
          <div key={i} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <img src={video.thumbnail} width="100%" alt={video.title} />
            <h3>{video.title}</h3>
            <p>{video.duration} | {video.views} views</p>
            <a href={`/api/download?url=${encodeURIComponent(video.url)}&type=mp3`}>
              <button>🎧 MP3</button>
            </a>
            <a href={`/api/download?url=${encodeURIComponent(video.url)}&type=mp4`} style={{ marginLeft: '10px' }}>
              <button>🎥 MP4</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
