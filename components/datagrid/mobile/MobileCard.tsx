/**
 * کارت موبایل برای نمایش آیتم‌ها (MobileCard)
 *
 * نسخه سازگار با موبایل از ردیف‌های جدول:
 * - نمایش اطلاعات کلیدی محصول در قالب کارت
 * - انتخاب آیتم با Checkbox
 * - اکشن‌ها با `ActionDropdown` (ویرایش/کپی/حذف)
 */
"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DataItem } from "@/components/datagrid/types"
import { ActionDropdown } from "@/components/datagrid/ActionDropdown"

export interface MobileCardProps {
  item: DataItem
  selected: boolean
  onSelect: (id: number, checked: boolean) => void
  onEdit: (item: DataItem, triggerRef?: HTMLButtonElement) => void
  onDuplicate: (item: DataItem) => void
  onDelete: (id: number) => void
}

export const MobileCard: React.FC<MobileCardProps> = ({ item, selected, onSelect, onEdit, onDuplicate, onDelete }) => {
  return (
    <Card key={item.id} className="glass-card p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Checkbox checked={selected} onCheckedChange={(checked) => onSelect(item.id, checked as boolean)} className="glass flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm truncate">{item.productName}</h3>
            <p className="text-xs text-muted-foreground">{item.category}</p>
          </div>
        </div>
        <ActionDropdown item={item} onEdit={onEdit} onDuplicate={onDuplicate} onDelete={onDelete} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-muted-foreground text-xs">Cost</span>
          <p className="font-mono font-medium">${item.cost.toFixed(2)}</p>
        </div>
        <div>
          <span className="text-muted-foreground text-xs">Status</span>
          <div className="mt-1">
            <Badge variant={item.discontinued ? "destructive" : "secondary"} className="glass text-xs">
              {item.discontinued ? "Discontinued" : "Active"}
            </Badge>
          </div>
        </div>
      </div>

      <div>
        <span className="text-muted-foreground text-xs">Quantity per Unit</span>
        <p className="text-sm">{item.quantityPerUnit}</p>
      </div>
    </Card>
  )
}


