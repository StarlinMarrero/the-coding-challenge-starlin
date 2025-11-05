import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import './App.css';

function ReadmeViewer() {
  const [readmeContent, setReadmeContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/readme')
      .then((response: Response) => {
        console.log('README response status:', response.status);
        if (!response.ok) {
          throw new Error(`Failed to load README: HTTP ${response.status}`);
        }
        return response.text();
      })
      .then((text: string) => {
        console.log('README content loaded, length:', text.length);
        setReadmeContent(text);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.error('Error fetching README:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="readme-container">
        <div className="readme-header">
          <Link to="/welcome" className="readme-back-link">← Back to Welcome</Link>
          <h1>README</h1>
        </div>
        <div className="readme-content">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="readme-container">
        <div className="readme-header">
          <Link to="/welcome" className="readme-back-link">← Back to Welcome</Link>
          <h1>README</h1>
        </div>
        <div className="readme-content">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="readme-container">
      <div className="readme-header">
        <Link to="/welcome" className="readme-back-link">← Back to Welcome</Link>
        <h1>README</h1>
      </div>
      <div className="readme-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{readmeContent}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ReadmeViewer;

