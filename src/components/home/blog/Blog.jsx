import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Blog.css";

const CATEGORIES = ["All", "Typography", "Licensing", "Design Tips", "Trends"];

// Helper untuk memformat tanggal ke bahasa Indonesia
const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 1. Fetch data dari Backend Express
  useEffect(() => {
    const controller = new AbortController();

    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Server responded with ${response.status}`);

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          setPosts(result.data.filter((post) => post && (post.slug || post._id || post.id)));
        } else {
          setError("Gagal memuat artikel blog");
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Error fetching blogs:", err);
        setError("Terjadi kesalahan koneksi ke server");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
    return () => controller.abort();
  }, []);

  // 2. State Loading & Error Handling
  if (loading) {
    return (
      <div className="blog-container">
        <p style={{ textAlign: "center", padding: "40px" }}>Memuat artikel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-container">
        <p style={{ textAlign: "center", color: "red", padding: "40px" }}>{error}</p>
      </div>
    );
  }

  // 3. Filter berdasarkan kategori
  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const featuredPost = posts.find((post) => post.featured);

  const regularPosts =
    activeCategory === "All"
      ? filteredPosts.filter((post) => !post.featured)
      : filteredPosts;

  return (
    <div className="blog-container">
      {/* Header Halaman */}
      <header className="blog-header">
        <span className="blog-overline">Wordcraft & Commerce</span>
        <h1 className="blog-title">The Typography Journal</h1>
        <p className="blog-description">
          Wawasan mendalam seputar dunia font, tips desain UI/UX, tren tipografi global, dan panduan lisensi komersial.
        </p>
      </header>

      {/* Filter Kategori */}
      <div className="blog-categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${activeCategory === cat ? "is-active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Post */}
      {activeCategory === "All" && featuredPost && (
        <article className="featured-card">
          <div className="featured-image-wrapper">
            {/* Gambar bisa diklik ke detail */}
            <Link to={`/blog/${featuredPost.slug || featuredPost._id || featuredPost.id}`}>
              <img src={featuredPost.image} alt={featuredPost.title} loading="lazy" />
            </Link>
          </div>
          <div className="featured-content">
            <span className="featured-pill">Featured Story</span>
            <div className="card-meta">
              <span className="card-tag">{featuredPost.category}</span>
              <span className="card-dot-separator">•</span>
              <span>{featuredPost.readTime}</span>
            </div>
            
            {/* Judul bisa diklik ke detail */}
            <Link to={`/blog/${featuredPost.slug || featuredPost._id || featuredPost.id}`}>
              <h2 className="featured-card-title">{featuredPost.title}</h2>
            </Link>
            
            <p className="featured-card-desc">{featuredPost.excerpt}</p>
            <div className="card-footer">
              <span className="card-date">
                {formatDate(featuredPost.createdAt || featuredPost.date)}
              </span>
              
              {/* Tombol Read Article menggunakan <Link> */}
              <Link 
                to={`/blog/${featuredPost.slug || featuredPost._id || featuredPost.id}`} 
                className="read-more-btn"
                style={{ textDecoration: 'none', display: 'inline-block' }}
              >
                Read Article →
              </Link>
            </div>
          </div>
        </article>
      )}

      {/* Grid Artikel Biasa */}
      <div className="blog-grid">
        {regularPosts.length === 0 ? (
          <div className="blog-empty" role="status">
            <strong>Belum ada artikel di kategori ini.</strong>
            <span>Coba pilih kategori lain untuk melihat tulisan terbaru.</span>
          </div>
        ) : regularPosts.map((post) => {
          const postSlug = post.slug || post._id || post.id;

          return (
            <article key={postSlug} className="blog-card">
              <div className="card-image-wrapper">
                {/* Gambar bisa diklik ke detail */}
                <Link to={`/blog/${postSlug}`}>
                  <img src={post.image} alt={post.title} loading="lazy" />
                </Link>
              </div>
              <div className="card-content">
                <div className="card-meta">
                  <span className="card-tag">{post.category}</span>
                  <span className="card-dot-separator">•</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Judul bisa diklik ke detail */}
                <Link to={`/blog/${postSlug}`}>
                  <h3 className="card-title">{post.title}</h3>
                </Link>

                <p className="card-desc">{post.excerpt}</p>
                <div className="card-footer">
                  <span className="card-date">
                    {formatDate(post.createdAt || post.date)}
                  </span>

                  {/* 🚀 Tombol Read More menggunakan <Link> */}
                  <Link 
                    to={`/blog/${postSlug}`} 
                    className="read-more-link"
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;