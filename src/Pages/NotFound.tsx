import React from 'react';
import {Link} from "react-router-dom";
import './NotFound.scss';

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>Sorry, That page cannot be found</h2>
            <Link to="/">Back to the homepage</Link>
        </div>
    );
};

export default NotFound;