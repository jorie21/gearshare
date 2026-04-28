import React from 'react'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  Search
} from 'lucide-react'

const stats = [
  {
    name: 'Total Revenue',
    value: '$12,845.00',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-emerald-500/10 text-emerald-500'
  },
  {
    name: 'Active Rentals',
    value: '24',
    change: '+3',
    trend: 'up',
    icon: Package,
    color: 'bg-blue-500/10 text-blue-500'
  },
  {
    name: 'Total Renters',
    value: '156',
    change: '+18',
    trend: 'up',
    icon: Users,
    color: 'bg-purple-500/10 text-purple-500'
  },
  {
    name: 'Average Rating',
    value: '4.9',
    change: '0.0%',
    trend: 'neutral',
    icon: TrendingUp,
    color: 'bg-amber-500/10 text-amber-500'
  }
]

const recentBookings = [
  { id: 1, item: "Canon EOS R5", renter: "Sarah Miller", date: "Oct 24, 2023", status: "Active", amount: "$120.00" },
  { id: 2, item: "DJI Mavic 3", renter: "John Doe", date: "Oct 23, 2023", status: "Completed", amount: "$85.00" },
  { id: 3, item: "Sony A7IV", renter: "Emma Wilson", date: "Oct 22, 2023", status: "Pending", amount: "$150.00" },
  { id: 4, item: "Aputure 600d", renter: "Michael Chen", date: "Oct 21, 2023", status: "Completed", amount: "$200.00" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lender Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Alex. Here&apos;s what&apos;s happening with your gear today.</p>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-muted/50 border border-border px-4 py-2 rounded-xl w-full max-w-md focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Search size={18} className="text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search gear, bookings, or renters..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-xl text-sm font-medium transition-colors border border-border">
              Download Report
            </button>
            <button className="px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl text-sm font-bold transition-all shadow-lg shadow-accent/20">
              + Add New Gear
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${
                stat.trend === 'up' ? 'text-emerald-500' : 
                stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
              }`}>
                {stat.change}
                {stat.trend === 'up' && <ArrowUpRight size={14} />}
                {stat.trend === 'down' && <ArrowDownRight size={14} />}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground font-medium">{stat.name}</p>
              <h3 className="text-2xl font-bold mt-1 tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-bold text-lg">Recent Bookings</h2>
            <button className="text-accent text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-muted/30 text-muted-foreground text-[10px] uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Renter</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-sm">{booking.item}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{booking.renter}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{booking.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                        booking.status === 'Active' ? 'bg-blue-500/10 text-blue-500' :
                        booking.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                        'bg-amber-500/10 text-amber-500'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-right">{booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Activity */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lg mb-4">Upcoming Returns</h2>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4 items-start p-3 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Rode VideoMic Pro</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Due in 4 hours • James L.</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 bg-muted hover:bg-muted/80 rounded-xl text-sm font-bold transition-colors">
              View Calendar
            </button>
          </div>

          <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
              <CheckCircle2 size={120} />
            </div>
            <h2 className="font-bold text-lg relative z-10">Verification Status</h2>
            <p className="text-primary-foreground/70 text-sm mt-2 relative z-10">Your identity is verified. You have access to premium insurance on all gear.</p>
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold relative z-10">
              <ShieldCheck size={14} />
              TRUSTED LENDER
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ShieldCheck({ size }: { size: number }) {
  return <CheckCircle2 size={size} className="text-emerald-400" />
}
