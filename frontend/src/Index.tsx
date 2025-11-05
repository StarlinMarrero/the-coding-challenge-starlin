import { Link } from 'react-router-dom';
import './App.css';

function Index() {
  return (
    <div className="container">
      <div style={{ paddingBottom: '32px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <h2>Quick Links</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '16px' }}>
          <Link to="/welcome" style={{ color: '#646cff', textDecoration: 'none' }}>Welcome</Link>
          <Link to="/api/viewer" style={{ color: '#646cff', textDecoration: 'none' }}>API Viewer</Link>
          <Link to="/readme" style={{ color: '#646cff', textDecoration: 'none' }}>README</Link>
        </div>
      </div>
      <h2>Portfolio View</h2>
      <p>Start building your portfolio view here!</p>
      <p>
        This is where you should implement your portfolio view that displays:
      </p>
      <ul>
        <li><strong>Assets</strong> - The name/symbol of the asset</li>
        <li><strong>Quantity</strong> - The number of shares/units held</li>
        <li><strong>Cost Basis</strong> - The total cost of acquiring the position</li>
        <li><strong>Unrealized P/L</strong> - The current profit or loss (in dollars)</li>
        <li><strong>Unrealized P/L %</strong> - The current profit or loss (as a percentage)</li>
      </ul>
      <p>
        Use the <Link to="/api/viewer" style={{ color: '#646cff', textDecoration: 'none' }}>API endpoints</Link> to fetch the data you need for your portfolio view.
      </p>
    </div>
  );
}

export default Index;

