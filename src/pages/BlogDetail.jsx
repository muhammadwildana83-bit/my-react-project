import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import "./BlogDetail.css";

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
};

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contentRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        let res = await fetch(`http://localhost:5000/api/blogs/${slug}`);

        if (res.status === 404) {
          res = await fetch(`http://localhost:5000/api/blogs/slug/${slug}`);
        }

        if (res.status === 404) {
          res = await fetch(`http://localhost:5000/api/blogs/id/${slug}`);
        }

        if (!res.ok) throw new Error(`Server responded with ${res.status}`);

        const data = await res.json();
        if (data && (data.success || data.data)) {
          setPost(data.data || data);
        } else {
          setError("Artikel tidak ditemukan.");
        }
      } catch (err) {
        console.error("Gagal mengambil detail artikel:", err);
        setError("Terjadi kesalahan saat memuat artikel.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      const scrolled = el.scrollTop;
      const pct = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0;
      setProgress(pct);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) return <div className="bd-loading">Memuat artikel...</div>;

  if (error || !post)
    return (
      <div className="bd-empty">
        <h2>Artikel tidak ditemukan</h2>
        <p>{error || "Silakan kembali dan pilih artikel lainnya."}</p>
        <Link to="/blog" className="bd-back">
          ← Kembali ke Blog
        </Link>
      </div>
    );

  const rawContent = post.content || post.body || post.description || post.excerpt || "";

  return (
    <div className="bd-root">
      <div className="bd-progress" style={{ width: `${progress}%` }} />

      <header
        className="bd-hero"
        style={{ backgroundImage: post.image ? `url(${post.image})` : "none" }}
      >
        <div className="bd-hero-overlay">
          <div className="bd-hero-inner">
            <Link to="/blog" className="bd-back bd-back-hero">
              ← Back
            </Link>
            <span className="bd-category">{post.category}</span>
            <h1 className="bd-title">{post.title}</h1>
            <div className="bd-meta">
              <span>{formatDate(post.createdAt || post.date || post.created_at)}</span>
              <span className="bd-dot">•</span>
              <span>{post.author || "Admin"}</span>
              {post.readTime && (
                <>
                  <span className="bd-dot">•</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="bd-main">
        <article className="bd-article" ref={contentRef}>
          <div
            className="bd-content"
            dangerouslySetInnerHTML={{ __html: rawContent.replace(/\n/g, "<br />") }}
          />
        </article>

        <aside className="bd-sidebar">
          <div className="bd-card">
            <h4>About the author</h4>
            <p>{post.author || "Admin"}</p>
          </div>
          <div className="bd-card">
            <h4>Category</h4>
            <p>{post.category || "-"}</p>
          </div>
          <div className="bd-card">
            <h4>Share</h4>
            <div className="bd-share">
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer">Twitter</a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer">Facebook</a>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
