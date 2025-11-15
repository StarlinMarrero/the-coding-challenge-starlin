import React from "react";
import { Link } from "react-router-dom";

export const QuickLinks: React.FC = () => {
    return (
        <div className="quick-links-container">
            <h2>Quick Links</h2>
            <div className="quick-links-list">
                <Link to="/welcome" className="quick-link">
                    Welcome
                </Link>
                <Link to="/api/viewer" className="quick-link">
                    API Viewer
                </Link>
                <Link to="/readme" className="quick-link">
                    README
                </Link>
            </div>
        </div>
    );
};
