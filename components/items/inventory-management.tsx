"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Filter, Edit2, Trash2, Loader2, AlertCircle } from "lucide-react";
import { Item, Category } from "@/services/lender/query/item.service";
import { useInventoryStore } from "@/services/lender/hooks/use-inventory-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface InventoryManagementProps {
  initialItems: Item[];
  initialCategories: Category[];
}

export function InventoryManagement({ initialItems, initialCategories }: InventoryManagementProps) {
  const { 
    items, 
    categories, 
    setItems, 
    setCategories, 
    addItem, 
    deleteItem, 
    isLoading, 
    error,
    setError 
  } = useInventoryStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize store with server data
  useEffect(() => {
    setItems(initialItems);
    setCategories(initialCategories);
  }, [initialItems, initialCategories, setItems, setCategories]);

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      pricePerDay: formData.get("pricePerDay"),
      categoryId: formData.get("categoryId") as string,
      imageUrl: formData.get("imageUrl") as string,
      status: "available",
    };

    const success = await addItem(values);
    if (success) {
      setIsAddModalOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteItem(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search your gear..." 
            className="pl-10 h-11"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="h-11 px-6 font-bold gap-2">
              <Plus size={20} />
              Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Gear</DialogTitle>
              <DialogDescription>List a new item in your inventory.</DialogDescription>
            </DialogHeader>
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-center gap-2 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            <form onSubmit={handleAddItem} className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input name="name" placeholder="e.g. Sony A7III" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  name="description" 
                  className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Tell us about your gear..."
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price / Day ($)</label>
                  <Input name="pricePerDay" type="number" step="0.01" placeholder="45.00" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select 
                    name="categoryId" 
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input name="imageUrl" placeholder="https://..." />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full font-bold" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Gear
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/30 text-muted-foreground text-[10px] uppercase font-bold tracking-wider border-b">
              <tr>
                <th className="px-6 py-4">Gear Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/10 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-sm">{item.name}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-tight">
                        {categories.find(c => c.id === item.categoryId)?.name || "Unknown"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={item.status === 'available' ? 'default' : 'secondary'} className="text-[10px] font-bold uppercase">
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">${item.pricePerDay}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <Edit2 size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(item.id)}
                          disabled={isLoading}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                    {items.length === 0 ? "No gear listed yet. Add your first item!" : "No matches found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
