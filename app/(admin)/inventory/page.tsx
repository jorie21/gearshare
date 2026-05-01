import { auth } from "@/auth";
import { getItems, getCategories } from "@/services/lender/query/item.service";
import { InventoryManagement } from "@/components/items/inventory-management";
import { redirect } from "next/navigation";

export default async function InventoryPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/auth/renter-login");
  }

  const [itemsResponse, categoriesResponse] = await Promise.all([
    getItems({ ownerId: session.user.id }),
    getCategories(),
  ]);

  const items = itemsResponse.data || [];
  const categories = categoriesResponse.data || [];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Gear Inventory</h1>
        <p className="text-muted-foreground mt-1">Manage and track all your rental equipment in one place.</p>
      </div>

      <InventoryManagement 
        initialItems={items} 
        initialCategories={categories} 
      />
    </div>
  );
}
