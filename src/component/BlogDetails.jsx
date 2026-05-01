import React from 'react';
import { useParams, NavLink } from 'react-router-dom';

const BlogDetails = () => {
  const { id } = useParams(); // URL se ID nikalne ke liye

  return (
    <div className="page-wrapper animate-fade">
      <div className="glass-panel detail-container">
        <NavLink to="/blog" className="back-link">← Back to Blogs</NavLink>
        <div className="detail-hero"></div>
        <h1 className="gradient-text" style={{fontSize: '3rem'}}>Article ID: {id}</h1>
        <div className="blog-content">
          <p>Yahan aapka mukammal blog content aayegi...</p>
          <p>
            Kyunki aap ek <b>Full Stack Developer</b> hain, aap yahan apni coding 
            journey aur technical tutorials share kar sakte hain.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;