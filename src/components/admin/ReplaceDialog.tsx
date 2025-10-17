import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { galleryService, type GalleryItem } from '@/lib/galleryService';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';

interface ReplaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: GalleryItem | null;
  onReplaceComplete: () => void;
}

export function ReplaceDialog({ open, onOpenChange, item, onReplaceComplete }: ReplaceDialogProps) {
  const [title, setTitle] = useState('');
  const [newPath, setNewPath] = useState('');
  const [replacing, setReplacing] = useState(false);

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setNewPath('');
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!item) return;

    if (!newPath) {
      toast.error('Please enter a new file path');
      return;
    }

    setReplacing(true);

    try {
      await galleryService.updateItem(item.id, {
        title,
        src: newPath,
      });

      toast.success('Item replaced successfully');
      onReplaceComplete();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Replace error:', error);
      toast.error('Failed to replace item');
    } finally {
      setReplacing(false);
    }
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-900 border-neutral-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Replace Gallery Item</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Replace the image/video file for this item
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="aspect-square bg-neutral-800 rounded overflow-hidden">
            {item.category === 'video' ? (
              <video src={item.src} className="w-full h-full object-cover" muted loop />
            ) : (
              <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="replace-title">Title</Label>
              <Input
                id="replace-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter item title"
                required
                className="bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="space-y-2">
              <Label>Current Path</Label>
              <p className="text-sm text-neutral-400 bg-neutral-800 p-2 rounded break-all">
                {item.src}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-path">New File Path</Label>
              <Input
                id="new-path"
                value={newPath}
                onChange={(e) => setNewPath(e.target.value)}
                placeholder="/assets/interiors/newimage.jpg"
                required
                className="bg-neutral-800 border-neutral-700"
              />
              <p className="text-xs text-neutral-500">
                Place your new file in the public folder and enter its path
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 border-neutral-700 text-white hover:bg-neutral-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-white text-black hover:bg-neutral-200"
                disabled={replacing}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {replacing ? 'Replacing...' : 'Replace'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
