import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { galleryService } from '@/lib/galleryService';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadComplete: () => void;
}

export function UploadDialog({ open, onOpenChange, onUploadComplete }: UploadDialogProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'product' | 'interior' | 'video'>('product');
  const [uploading, setUploading] = useState(false);

  const handleManualAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      toast.error('Please enter a title');
      return;
    }

    const manualPath = (document.getElementById('manual-path') as HTMLInputElement)?.value;
    if (!manualPath) {
      toast.error('Please enter a file path');
      return;
    }

    setUploading(true);

    try {
      const maxOrder = await galleryService.getAllItems().then(items =>
        Math.max(...items.map(i => i.display_order), -1)
      );

      await galleryService.createItem({
        title,
        src: manualPath,
        category,
        display_order: maxOrder + 1,
      });

      toast.success('Item added successfully');
      onUploadComplete();
      onOpenChange(false);
      resetForm();
    } catch (error: any) {
      console.error('Add error:', error);
      toast.error('Failed to add item');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setCategory('product');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-900 border-neutral-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Gallery Item</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Add a new image or video to your gallery
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <form onSubmit={handleManualAdd} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter item title"
                required
                className="bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={(v: any) => setCategory(v)}>
                <SelectTrigger className="bg-neutral-800 border-neutral-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="interior">Interior</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="manual-path">File Path</Label>
              <Input
                id="manual-path"
                placeholder="/assets/interiors/image.jpg"
                required
                className="bg-neutral-800 border-neutral-700"
              />
              <p className="text-xs text-neutral-500">
                Place your file in the public folder and enter its path (e.g., /assets/interiors/myimage.jpg)
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-neutral-200"
              disabled={uploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? 'Adding...' : 'Add to Gallery'}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
