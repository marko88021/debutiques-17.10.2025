import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Tag,
  ChevronRight,
  ArrowUp,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  getPostBySlug,
  getAllPosts,
  formatDate,
  calculateReadingTime,
  type BlogPost,
} from '@/lib/blogUtils';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadPost = async () => {
    setLoading(true);
    try {
      const postData = await getPostBySlug(slug!);
      if (!postData) {
        navigate('/blog');
        return;
      }
      setPost(postData);

      const allPosts = await getAllPosts(4);
      const filtered = allPosts
        .filter((p) => p.id !== postData.id)
        .slice(0, 3);
      setRelatedPosts(filtered);
    } catch (error) {
      console.error('Error loading post:', error);
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post?.title || '';

  const handleShare = async (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);

    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(shareUrl);
          toast({
            title: 'Link copied!',
            description: 'The link has been copied to your clipboard.',
          });
          setShowShareMenu(false);
          return;
        } catch (error) {
          toast({
            title: 'Failed to copy',
            description: 'Please try again.',
            variant: 'destructive',
          });
          return;
        }
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      setShowShareMenu(false);
    }
  };

  const renderMarkdown = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    let inCodeBlock = false;
    let codeLines: string[] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 mb-6 text-neutral-300">
            {currentList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    const flushCodeBlock = () => {
      if (codeLines.length > 0) {
        elements.push(
          <pre key={`code-${elements.length}`} className="bg-neutral-900 p-4 rounded mb-6 overflow-x-auto">
            <code className="text-sm text-neutral-300">{codeLines.join('\n')}</code>
          </pre>
        );
        codeLines = [];
      }
    };

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock();
        } else {
          flushList();
        }
        inCodeBlock = !inCodeBlock;
        return;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        return;
      }

      if (line.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={index} className="text-4xl font-light mb-6 mt-8">
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={index} className="text-3xl font-light mb-4 mt-6">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={index} className="text-2xl font-light mb-3 mt-5">
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        currentList.push(line.substring(2));
      } else if (line.trim() === '') {
        flushList();
        elements.push(<div key={index} className="h-4" />);
      } else {
        flushList();
        elements.push(
          <p key={index} className="mb-4 text-neutral-300 leading-relaxed">
            {line}
          </p>
        );
      }
    });

    flushList();
    flushCodeBlock();

    return elements;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-neutral-800">
          <div className="container mx-auto px-6 py-4">
            <div className="h-4 bg-neutral-800 rounded w-32 animate-pulse" />
          </div>
        </div>
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl">
            <div className="space-y-4 animate-pulse">
              <div className="h-8 bg-neutral-800 rounded w-3/4" />
              <div className="h-4 bg-neutral-800 rounded w-1/2" />
              <div className="aspect-video bg-neutral-800 rounded" />
              <div className="space-y-3">
                <div className="h-4 bg-neutral-800 rounded" />
                <div className="h-4 bg-neutral-800 rounded" />
                <div className="h-4 bg-neutral-800 rounded w-5/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-neutral-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            <span className="text-xs uppercase tracking-widest">Back to Blog</span>
          </Link>
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span className="text-xs uppercase tracking-widest hidden sm:inline">Share</span>
            </button>
            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded shadow-lg">
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-neutral-800 transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                  <span className="text-sm">Facebook</span>
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-neutral-800 transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="text-sm">Twitter</span>
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-neutral-800 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="text-sm">LinkedIn</span>
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-neutral-800 transition-colors border-t border-neutral-800"
                >
                  <Link2 className="h-4 w-4" />
                  <span className="text-sm">Copy Link</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <article className="pt-24 pb-16">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="mb-8">
            {post.category && (
              <Link to={`/blog?category=${post.category.slug}`}>
                <Badge variant="outline" className="mb-4 border-emerald-400 text-emerald-400">
                  {post.category.name}
                </Badge>
              </Link>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publish_date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{calculateReadingTime(post.content)} min read</span>
              </div>
              <div>
                <span>By {post.author}</span>
              </div>
            </div>
          </div>

          {post.featured_image && (
            <div className="mb-12 rounded overflow-hidden">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none mb-12">
            {renderMarkdown(post.content)}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-neutral-800">
              {post.tags.map((tag) => (
                <Link key={tag.id} to={`/blog?tag=${tag.slug}`}>
                  <Badge
                    variant="outline"
                    className="border-neutral-700 text-neutral-400 hover:border-emerald-400 hover:text-emerald-400 transition-colors"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          )}

          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-light mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group bg-neutral-900 hover:bg-neutral-800 transition-all"
                  >
                    {relatedPost.featured_image && (
                      <div className="aspect-video overflow-hidden bg-neutral-800">
                        <img
                          src={relatedPost.featured_image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-light mb-2 group-hover:text-emerald-400 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-neutral-400 text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-neutral-800 text-center">
            <Link to="/blog">
              <Button
                className="bg-emerald-500 text-white hover:bg-emerald-600 transition-colors px-6 py-2"
              >
                <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </article>

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
