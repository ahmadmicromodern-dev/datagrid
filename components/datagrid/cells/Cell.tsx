/**
 * سلول نمایشی DataGrid (Cell)
 *
 * این کامپوننت مقدار هر ستون را بر اساس نوع ستون رندر می‌کند:
 * - cost: نمایش قالب‌بندی‌شده قیمت
 * - inStock: نمایش درصد موجودی + Progress
 * - discontinued: نمایش وضعیت با Badge رنگی
 * - category: نمایش دسته‌بندی با Badge
 * - سایر ستون‌ها: نمایش ساده متن
 *
 * ورودی‌ها:
 * - item: شیء ردیف داده از نوع `DataItem`
 * - column: نام ستون برای تعیین نوع نمایش
 * - sparkDataProvider: تابع تولید داده برای نمودار کوچک
 */
"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useRTLContext } from "@/components/rtl-provider"
import { DataItem } from "@/components/datagrid/types"

export interface CellProps {
  item: DataItem
  column: keyof DataItem
  sparkDataProvider: (seed: number, base: number) => { value: number }[]
}

export const Cell: React.FC<CellProps> = ({ item, column, sparkDataProvider }) => {
  const { isRTL } = useRTLContext()
  const value = item[column]

  switch (column) {
    case "cost":
      return <span className="font-mono">${Number(value as number).toFixed(2)}</span>
    case "inStock": {
      const stockPercentage = Math.min((item.unitsInStock / 100) * 100, 100)
      
      return (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span>{isRTL ? 'موجود:' : 'In stock:'} {item.unitsInStock}</span>
            <span>{stockPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={stockPercentage} className="h-2 glass flex-1" />
        </div>
      )
    }
    case "discontinued":
      return (
        <Badge
          className={
            value
              ? "glass border-blue-500/20 bg-blue-500/15 text-blue-700 dark:text-blue-300"
              : "glass border-emerald-500/20 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
          }
        >
          {value ? (isRTL ? "متوقف شده" : "Discontinued") : (isRTL ? "فعال" : "Active")}
        </Badge>
      )
    case "category":
      return (
        <Badge variant="outline" className="glass">
          {value as string}
        </Badge>
      )
    default:
      return <span>{String(value)}</span>
  }
}


