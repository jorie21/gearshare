import React from 'react'
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, Eye } from 'lucide-react'

const inventory = [
  { id: 1, name: "Canon EOS R5", category: "Cameras", status: "Rented", price: "$120/day", stock: "0/1" },
  { id: 2, name: "DJI Mavic 3", category: "Drones", status: "Available", price: "$85/day", stock: "1/1" },
  { id: 3, name: "Sony A7IV", category: "Cameras", status: "Available", price: "$110/day", stock: "2/2" },
  { id: 4, name: "Aputure 600d", category: "Lighting", status: "Maintenance", price: "$75/day", stock: "0/1" },
  { id: 5, name: "Rode VideoMic Pro", category: "Audio", status: "Available", price: "$25/day", stock: "5/5" },
]

export default function InventoryPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gear Inventory</h1>
          <p className="text-muted-foreground mt-1">Manage and track all your rental equipment in one place.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl font-bold transition-all shadow-lg shadow-accent/20">
          <Plus size={20} />
          Add New Item
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, category, or ID..." 
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-xl text-sm font-medium transition-colors border border-border flex-1 sm:flex-none">
              <Filter size={16} />
              Filters
            </button>
            <select className="bg-muted hover:bg-muted/80 border border-border rounded-xl px-4 py-2 text-sm font-medium focus:outline-none transition-colors cursor-pointer flex-1 sm:flex-none">
              <option>All Status</option>
              <option>Available</option>
              <option>Rented</option>
              <option>Maintenance</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/30 text-muted-foreground text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Gear Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Availability</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-6 py-4 font-bold text-sm">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    <span className="px-2 py-1 bg-muted rounded-lg text-xs">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                      item.status === 'Available' ? 'bg-emerald-500/10 text-emerald-500' :
                      item.status === 'Rented' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-amber-500/10 text-amber-500'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{item.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            item.stock.startsWith('0') ? 'bg-destructive' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${(parseInt(item.stock.split('/')[0]) / parseInt(item.stock.split('/')[1])) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">{item.stock}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg text-destructive hover:bg-destructive/10 transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="p-4 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-medium">Showing 5 of 24 items</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-muted rounded-lg text-xs font-bold opacity-50 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-lg text-xs font-bold transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
