import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Calendar, Clock, Tag, ChevronRight, ArrowUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  getAllPosts,
  getPostsByCategory,
  getPostsByTag,
  searchPosts,
  getAllCategories,
  getAllTags,
  formatDate,
  calculateReadingTime,
  type BlogPost,
  type BlogCategory,
  type BlogTag,
} from '@/lib/blogUtils';

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const categoryFilter = searchParams.get('category');
  const tagFilter = searchParams.get('tag');
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    loadData();
  }, [categoryFilter, tagFilter, searchQuery]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [categoriesData, tagsData] = await Promise.all([
        getAllCategories(),
        getAllTags(),
      ]);
      setCategories(categoriesData);
      setTags(tagsData);

      let postsData: BlogPost[];
      if (searchQuery) {
        postsData = await searchPosts(searchQuery);
      } else if (categoryFilter) {
        postsData = await getPostsByCategory(categoryFilter);
      } else if (tagFilter) {
        postsData = await getPostsByTag(tagFilter);
      } else {
        postsData = await getAllPosts();
      }
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ search: searchTerm.trim() });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchTerm('');
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const activeFilterLabel = categoryFilter
    ? categories.find(c => c.slug === categoryFilter)?.name
    : tagFilter
    ? tags.find(t => t.slug === tagFilter)?.name
    : searchQuery
    ? `Search: "${searchQuery}"`
    : null;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-neutral-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
            <ChevronRight className="h-4 w-4 rotate-180" />
            <span className="text-xs uppercase tracking-widest">Back to Home</span>
          </Link>
        </div>
      </div>

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 tracking-tight">
              Insights & Stories
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 font-light">
              Explore the latest in furniture visualization, 3D rendering techniques, and industry insights
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-6 bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500 focus:border-emerald-400"
              />
            </form>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <button
              onClick={clearFilters}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-all ${
                !categoryFilter && !tagFilter && !searchQuery
                  ? 'bg-white text-black'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              All Posts
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSearchParams({ category: category.slug })}
                className={`px-4 py-2 text-xs uppercase tracking-widest transition-all ${
                  categoryFilter === category.slug
                    ? 'bg-emerald-400 text-black'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {activeFilterLabel && (
            <div className="flex items-center justify-center gap-3 mb-12">
              <span className="text-sm text-neutral-400">Showing results for:</span>
              <Badge variant="outline" className="border-emerald-400 text-emerald-400">
                {activeFilterLabel}
              </Badge>
              <button
                onClick={clearFilters}
                className="text-xs text-neutral-500 hover:text-white transition-colors"
              >
                Clear
              </button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-neutral-900 animate-pulse">
                  <div className="aspect-video bg-neutral-800" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-neutral-800 rounded w-3/4" />
                    <div className="h-4 bg-neutral-800 rounded w-1/2" />
                    <div className="space-y-2">
                      <div className="h-3 bg-neutral-800 rounded" />
                      <div className="h-3 bg-neutral-800 rounded" />
                      <div className="h-3 bg-neutral-800 rounded w-5/6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-neutral-500 mb-4">No posts found</p>
              <button
                onClick={clearFilters}
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                View all posts
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-neutral-900 hover:bg-neutral-800 transition-all duration-300"
                >
                  {post.featured_image && (
                    <div className="aspect-video overflow-hidden bg-neutral-800">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {post.category && (
                      <Badge
                        variant="outline"
                        className="mb-3 border-emerald-400 text-emerald-400 text-xs"
                      >
                        {post.category.name}
                      </Badge>
                    )}
                    <h2 className="text-xl font-light mb-3 group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-neutral-400 text-sm font-light mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-neutral-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(post.publish_date)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{calculateReadingTime(post.content)} min read</span>
                      </div>
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <button
                            key={tag.id}
                            onClick={(e) => {
                              e.preventDefault();
                              setSearchParams({ tag: tag.slug });
                            }}
                            className="flex items-center gap-1 text-xs text-neutral-500 hover:text-emerald-400 transition-colors"
                          >
                            <Tag className="h-3 w-3" />
                            {tag.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-neutral-500 text-sm">
                Showing {posts.length} {posts.length === 1 ? 'post' : 'posts'}
              </p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-white text-black p-3 rounded-full shadow-lg transition-opacity duration-300 hover:bg-neutral-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none ${
          showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}
