'use client';

import { Card, CardContent } from '@/components/ui/card';

export default function DashboardPreview() {
  return (
    <div className="rounded-xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
      <div className="h-8 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <Card>
            <CardContent className="p-4 flex flex-col justify-center">
              <span className="text-xs text-blue-600 font-medium">Total Sales</span>
              <span className="text-2xl font-semibold text-foreground">SAR 12,450</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col justify-center">
              <span className="text-xs text-emerald-600 font-medium">Active Orders</span>
              <span className="text-2xl font-semibold text-foreground">142</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col justify-center">
              <span className="text-xs text-slate-500 font-medium">Available Products</span>
              <span className="text-2xl font-semibold text-foreground">8,402</span>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
