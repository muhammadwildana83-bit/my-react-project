import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GANTI URL INI dengan endpoint API backend kamu
    fetch(`https://api-kamu.com/api/posts/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil detail artikel:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="py-20 text-center font-medium">Memuat artikel...</div>;
  }

  if (!post) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold mb-4">Artikel tidak ditemukan!</h2>
        <Link to="/blog" className="text-blue-600 hover:underline">
          ← Kembali ke daftar blog
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      {/* Tombol Back */}
      <Link 
        to="/blog" 
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-8 transition-colors"
      >
        ← Kembali ke Blog
      </Link>

      {/* Header Artikel */}
      <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
        {post.title}
      </h1>

      <div className="flex items-center gap-3 text-sm text-gray-400 mb-8">
        <span>{post.created_at || post.date}</span>
        <span>•</span>
        <span>{post.author || 'Admin'}</span>
      </div>

      {/* Featured Image */}
      {post.thumbnail && (
        <img 
          src={post.thumbnail} 
          alt={post.title} 
          className="w-full h-[350px] md:h-[450px] object-cover rounded-2xl mb-10 shadow-sm"
        />
      )}

      {/* Render Isi Konten dari Admin Panel */}
      <div 
        className="prose prose-neutral dark:prose-invert max-w-none text-base leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </main>
  );
}