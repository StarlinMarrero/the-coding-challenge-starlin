import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { OrdersResponse, LivePricesResponse } from './types';

// Get backend URL from Vite environment or use default
const BACKEND_URL: string = (import.meta.env.VITE_BACKEND_URL as string | undefined) || 'http://localhost:3000';

function ApiViewer() {
  const [historical, setHistorical] = useState<OrdersResponse>({ Orders: [], NextToken: null, Errors: [] });
  const [openOrders, setOpenOrders] = useState<OrdersResponse>({ Orders: [], NextToken: null, Errors: [] });
  const [livePrices, setLivePrices] = useState<LivePricesResponse>({});
  const [isHistoricalOpen, setIsHistoricalOpen] = useState<boolean>(false);
  const [isOpenOrdersOpen, setIsOpenOrdersOpen] = useState<boolean>(false);
  const [isLivePricesOpen, setIsLivePricesOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/historical-orders')
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: OrdersResponse) => {
        console.log('Historical orders loaded:', data);
        setHistorical(data);
      })
      .catch((error: Error) => {
        console.error('Error fetching historical orders:', error);
        setHistorical({ Orders: [], NextToken: null, Errors: [{ message: error.message }] });
      });

    fetch('/api/open-orders')
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: OrdersResponse) => {
        console.log('Open orders loaded:', data);
        setOpenOrders(data);
      })
      .catch((error: Error) => {
        console.error('Error fetching open orders:', error);
        setOpenOrders({ Orders: [], NextToken: null, Errors: [{ message: error.message }] });
      });

    // Fetch live prices immediately on mount
    fetch('/api/live-prices')
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: LivePricesResponse) => {
        console.log('Live prices loaded:', data);
        setLivePrices(data);
      })
      .catch((error: Error) => {
        console.error('Error fetching live prices:', error);
        setLivePrices({});
      });
  }, []);

  return (
    <div className="readme-container">
      <div className="readme-header">
        <Link to="/welcome" className="readme-back-link">← Back to Welcome</Link>
        <h1>API Data</h1>
      </div>
      <div className="readme-content">
        <div className="api-box">
        <div className="api-header-row">
          <div className="api-header-left">
            <h2>Live Prices (Randomized)</h2>
            <div style={{ color: '#666', fontSize: '14px' }}>{BACKEND_URL}/api/live-prices</div>
          </div>
          <button 
            className="show-hide-button"
            onClick={() => setIsLivePricesOpen(!isLivePricesOpen)}
          >
            {isLivePricesOpen ? 'Hide Response' : 'Show Response'}
          </button>
        </div>
        {isLivePricesOpen && (
          <div className="scrollable-content">
            <pre>{JSON.stringify(livePrices, null, 2)}</pre>
          </div>
        )}
      </div>
      <div className="api-box">
        <div className="api-header-row">
          <div className="api-header-left">
            <h2>Open Orders</h2>
            <div style={{ color: '#666', fontSize: '14px' }}>{BACKEND_URL}/api/open-orders</div>
          </div>
          <button 
            className="show-hide-button"
            onClick={() => setIsOpenOrdersOpen(!isOpenOrdersOpen)}
          >
            {isOpenOrdersOpen ? 'Hide Response' : 'Show Response'}
          </button>
        </div>
        {isOpenOrdersOpen && (
          <div className="scrollable-content">
            <pre>{JSON.stringify(openOrders, null, 2)}</pre>
          </div>
        )}
      </div>
      <div className="api-box">
        <div className="api-header-row">
          <div className="api-header-left">
            <h2>Historical Orders</h2>
            <div style={{ color: '#666', fontSize: '14px' }}>{BACKEND_URL}/api/historical-orders</div>
          </div>
          <button 
            className="show-hide-button"
            onClick={() => setIsHistoricalOpen(!isHistoricalOpen)}
          >
            {isHistoricalOpen ? 'Hide Response' : 'Show Response'}
          </button>
        </div>
        {isHistoricalOpen && (
          <div className="scrollable-content">
            <pre>{JSON.stringify(historical, null, 2)}</pre>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default ApiViewer;

