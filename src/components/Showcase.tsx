import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { galleryService, type GalleryItem } from '@/lib/galleryService';

export function Showcase() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<'all' | 'product' | 'interior' | 'video'>('all');
  const [zoomedItem, setZoomedItem] = useState<GalleryItem | null>(null);
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, [activeFilter]);

  async function loadItems() {
    try {
      setLoading(true);
      const data = await galleryService.getItemsByCategory(activeFilter);
      setItems(data);
    } catch (error) {
      console.error('Failed to load gallery items:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredItems = items.filter(item => {
    return item.src &&
           item.src.trim() !== '' &&
           !item.src.includes('undefined') &&
           !item.src.includes('null');
  });

  const handleImageLoad = (itemId: string) => {
    setImageLoaded(prev => ({ ...prev, [itemId]: true }));
  };

  const handleImageError = (itemId: string, src: string) => {
    console.error(`Failed to load image: ${itemId} - Source: ${src}`);
    // Remove failed images from display
    setImageLoaded(prev => ({ ...prev, [itemId]: false }));
  };

  const openZoom = (item: GalleryItem) => {
    setZoomedItem(item);
    document.body.classList.add('zoom-modal-open');
  };

  const closeZoom = () => {
    setZoomedItem(null);
    document.body.classList.remove('zoom-modal-open');
  };

  const filters = [
    { key: 'all' as const, label: t('showcase.filters.allWork') },
    { key: 'product' as const, label: t('showcase.filters.productRenders') },
    { key: 'interior' as const, label: t('showcase.filters.interiorScenes') },
    { key: 'video' as const, label: t('showcase.filters.videos') }
  ];

  return (
    <section id="showcase" className="py-16 md:py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 section-heading">
            {t('showcase.title')}
          </h2>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 md:flex-nowrap md:justify-center">
            {filters.map((filter) => (
              <Button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                variant={activeFilter === filter.key ? "default" : "outline"}
                className={`px-6 py-2 transition-all whitespace-nowrap flex-shrink-0 ${
                  activeFilter === filter.key
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'border-white/20 text-white hover:bg-white/10 hover:border-white/40'
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-gray-400 text-sm">
            {t('showcase.showingResults', {
              count: filteredItems.length,
              total: items.length
            })}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="container mx-auto px-6 md:px-12">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-neutral-400">Loading gallery...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
              {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`cursor-zoom-in transition-transform hover:scale-105 ${
                  imageLoaded[item.id] === false ? 'hidden' : ''
                }`}
                onClick={() => openZoom(item)}
              >
                {item.category === 'video' ? (
                  <div className="relative aspect-square bg-neutral-900 rounded overflow-hidden">
                    <video
                      className="w-full h-full object-cover"
                      muted
                      loop
                      preload="metadata"
                      onLoadedData={() => handleImageLoad(item.id)}
                      onError={() => handleImageError(item.id, item.src)}
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <div className="relative aspect-square bg-neutral-900 rounded overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title || `${item.category} image`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onLoad={() => handleImageLoad(item.id)}
                      onError={() => handleImageError(item.id, item.src)}
                    />
                  </div>
                )}
              </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomedItem && (
        <div className="zoom-modal-container" onClick={closeZoom}>
          <div className="zoom-modal-content" onClick={(e) => e.stopPropagation()}>
            <Button
              onClick={closeZoom}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12"
            >
              <X className="h-6 w-6" />
            </Button>
            
            {zoomedItem.category === 'video' ? (
              <video
                className="zoom-modal-video"
                controls
                autoPlay
                muted
                loop
                onError={() => console.error(`Failed to load video in zoom modal: ${zoomedItem.id} - Source: ${zoomedItem.src}`)}
              >
                <source src={zoomedItem.src} type="video/mp4" />
              </video>
            ) : (
              <img
                src={zoomedItem.src}
                alt={zoomedItem.title || 'Gallery image'}
                className="zoom-modal-image"
                onError={() => console.error(`Failed to load image in zoom modal: ${zoomedItem.id} - Source: ${zoomedItem.src}`)}
              />
            )}
            
            {zoomedItem.title && (
              <p className="text-white text-lg font-medium mt-6 text-center">
                {zoomedItem.title}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}