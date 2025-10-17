import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { galleryService, type GalleryItem } from '@/lib/galleryService';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Plus, Trash2, Save, RefreshCw, Image as ImageIcon, Video } from 'lucide-react';
import { toast } from 'sonner';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableGalleryItem } from '@/components/admin/SortableGalleryItem';
import { UploadDialog } from '@/components/admin/UploadDialog';
import { ReplaceDialog } from '@/components/admin/ReplaceDialog';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'product' | 'interior' | 'video'>('all');
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [replaceDialogOpen, setReplaceDialogOpen] = useState(false);
  const [itemToReplace, setItemToReplace] = useState<GalleryItem | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const { signOut } = useAuth();
  const navigate = useNavigate();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, activeCategory]);

  async function loadItems() {
    try {
      setLoading(true);
      const data = await galleryService.getAllItems();
      setItems(data);
    } catch (error: any) {
      toast.error('Failed to load gallery items');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function filterItems() {
    if (activeCategory === 'all') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.category === activeCategory));
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFilteredItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const reordered = arrayMove(items, oldIndex, newIndex);

        const updatedWithOrder = reordered.map((item, index) => ({
          ...item,
          display_order: index,
        }));

        setItems(prevItems => {
          const categoryItems = updatedWithOrder;
          const otherItems = prevItems.filter(item =>
            activeCategory === 'all' ? false : item.category !== activeCategory
          );
          return [...categoryItems, ...otherItems].sort((a, b) => a.display_order - b.display_order);
        });

        setHasChanges(true);
        return updatedWithOrder;
      });
    }
  }

  async function handleSaveOrder() {
    try {
      const updates = filteredItems.map((item, index) => ({
        id: item.id,
        display_order: index,
      }));

      await galleryService.updateDisplayOrder(updates);
      setHasChanges(false);
      toast.success('Gallery order saved successfully');
    } catch (error: any) {
      toast.error('Failed to save order');
      console.error(error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await galleryService.deleteItem(id);
      setItems(items.filter(item => item.id !== id));
      toast.success('Item deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete item');
      console.error(error);
    }
  }

  async function handleBulkDelete() {
    if (selectedItems.size === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedItems.size} items?`)) return;

    try {
      await galleryService.bulkDelete(Array.from(selectedItems));
      setItems(items.filter(item => !selectedItems.has(item.id)));
      setSelectedItems(new Set());
      toast.success(`${selectedItems.size} items deleted successfully`);
    } catch (error: any) {
      toast.error('Failed to delete items');
      console.error(error);
    }
  }

  function handleSelectItem(id: string) {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  function handleReplace(item: GalleryItem) {
    setItemToReplace(item);
    setReplaceDialogOpen(true);
  }

  async function handleSignOut() {
    await signOut();
    navigate('/admin/login');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-neutral-800 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Gallery Management</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="border-neutral-700 text-white hover:bg-neutral-800"
              >
                View Site
              </Button>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="border-neutral-700 text-white hover:bg-neutral-800"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <Button
              onClick={() => setUploadDialogOpen(true)}
              className="bg-white text-black hover:bg-neutral-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload New
            </Button>
            <Button
              onClick={loadItems}
              variant="outline"
              className="border-neutral-700 text-white hover:bg-neutral-800"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            {selectedItems.size > 0 && (
              <Button
                onClick={handleBulkDelete}
                variant="destructive"
                className="bg-red-900 hover:bg-red-800"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected ({selectedItems.size})
              </Button>
            )}
          </div>
          {hasChanges && (
            <Button
              onClick={handleSaveOrder}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Order
            </Button>
          )}
        </div>

        <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as any)}>
          <TabsList className="bg-neutral-900 border border-neutral-800">
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-black">
              All ({items.length})
            </TabsTrigger>
            <TabsTrigger value="product" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <ImageIcon className="h-4 w-4 mr-2" />
              Products ({items.filter(i => i.category === 'product').length})
            </TabsTrigger>
            <TabsTrigger value="interior" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <ImageIcon className="h-4 w-4 mr-2" />
              Interiors ({items.filter(i => i.category === 'interior').length})
            </TabsTrigger>
            <TabsTrigger value="video" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <Video className="h-4 w-4 mr-2" />
              Videos ({items.filter(i => i.category === 'video').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeCategory} className="mt-6">
            {filteredItems.length === 0 ? (
              <Card className="bg-neutral-900 border-neutral-800">
                <CardContent className="py-12 text-center">
                  <p className="text-neutral-400">No items in this category</p>
                </CardContent>
              </Card>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={filteredItems.map(item => item.id)}
                  strategy={rectSortingStrategy}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {filteredItems.map((item) => (
                      <SortableGalleryItem
                        key={item.id}
                        item={item}
                        isSelected={selectedItems.has(item.id)}
                        onSelect={handleSelectItem}
                        onDelete={handleDelete}
                        onReplace={handleReplace}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <UploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onUploadComplete={loadItems}
      />

      <ReplaceDialog
        open={replaceDialogOpen}
        onOpenChange={setReplaceDialogOpen}
        item={itemToReplace}
        onReplaceComplete={loadItems}
      />
    </div>
  );
}
