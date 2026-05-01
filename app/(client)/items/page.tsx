import { getItems, getCategories } from "@/services/lender/query/item.service";
import { ItemGrid } from "@/components/items/item-grid";

export default async function BrowseGearPage() {
  const [itemsResponse, categoriesResponse] = await Promise.all([
    getItems(),
    getCategories(),
  ]);

  const items = itemsResponse.data || [];
  const categories = categoriesResponse.data || [];

  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              Browse <span className="text-primary">Gear</span> 
              <br />
              Shared by your community.
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              Find high-quality equipment for your next project or adventure. 
              Rent from local owners and save up to 70% compared to retail rentals.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <ItemGrid items={items} categories={categories} />
      </main>
    </div>
  );
}
