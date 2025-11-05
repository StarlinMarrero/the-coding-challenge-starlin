import { Link } from 'react-router-dom';
import './App.css';

function Welcome() {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">The Coding Challenge</h1>
        <p className="welcome-subtitle">Build a portfolio view with mocked live prices, open and historical orders</p>
        <div className="welcome-actions">
          <Link 
            to="/readme" 
            className="welcome-button welcome-button-secondary"
          >
            View README
            <span className="button-arrow">→</span>
          </Link>
          <Link to="/api/viewer" className="welcome-button">
            View API Data
            <span className="button-arrow">→</span>
          </Link>
        </div>
        <div className="welcome-features">
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Live Prices</h3>
            <p>Random Mocked Live Prices</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Open Orders</h3>
            <p>Track Mocked Open Orders</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📜</div>
            <h3>Historical Orders</h3>
            <p>Track Mocked Closed Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;

