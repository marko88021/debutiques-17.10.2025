import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GalleryItem } from '@/lib/galleryService';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { GripVertical, Trash2, RefreshCw } from 'lucide-react';

interface SortableGalleryItemProps {
  item: GalleryItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onReplace: (item: GalleryItem) => void;
}

export function SortableGalleryItem({
  item,
  isSelected,
  onSelect,
  onDelete,
  onReplace,
}: SortableGalleryItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className={`bg-neutral-900 border-neutral-800 overflow-hidden group relative ${
        isSelected ? 'ring-2 ring-white' : ''
      }`}>
        <div className="absolute top-2 left-2 z-10">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onSelect(item.id)}
            className="bg-black/50 border-white"
          />
        </div>

        <div
          className="absolute top-2 right-2 z-10 cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <div className="bg-black/50 p-2 rounded hover:bg-black/70">
            <GripVertical className="h-5 w-5 text-white" />
          </div>
        </div>

        <CardContent className="p-0">
          <div className="aspect-square relative bg-neutral-800">
            {item.category === 'video' ? (
              <video
                src={item.src}
                className="w-full h-full object-cover"
                muted
                loop
              />
            ) : (
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            )}

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onReplace(item)}
                className="bg-white text-black hover:bg-neutral-200"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Replace
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(item.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-3 bg-neutral-900">
            <p className="text-sm font-medium text-white truncate">{item.title}</p>
            <p className="text-xs text-neutral-400 capitalize">{item.category}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
