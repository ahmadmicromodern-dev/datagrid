/**
 * منوی اکشن‌های ردیف (ActionDropdown)
 *
 * یک منوی کشویی کوچک برای عملیات روی ردیف:
 * - Edit: باز کردن پاپ‌اور ویرایش با مرجع دکمه
 * - Duplicate: ایجاد کپی از آیتم
 * - Delete: حذف آیتم
 * شامل بستن خودکار با کلیک بیرون از منو
 */
"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { CopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react"
import { DataItem } from "@/components/datagrid/types"

export interface ActionDropdownProps {
  item: DataItem
  onEdit: (item: DataItem, triggerRef?: HTMLButtonElement) => void
  onDuplicate: (item: DataItem) => void
  onDelete: (id: number) => void
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({ item, onEdit, onDuplicate, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative inline-block">
      <Button
        ref={triggerRef}
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreHorizontalIcon className="h-4 w-4" />
      </Button>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute z-50 mt-1 glass-card rounded-md border border-border/50 shadow-lg bg-background/95 backdrop-blur-sm min-w-[160px]"
          style={{ top: "100%", right: 0 }}
        >
          <div className="p-1">
            <button
              onClick={() => {
                onEdit(item, triggerRef.current || undefined)
                setIsOpen(false)
              }}
              className="flex w-full items-center px-2 py-1.5 text-sm rounded-sm hover:bg-muted transition-colors"
            >
              <EditIcon className="h-4 w-4 mr-2" />
              Edit
            </button>
            <button
              onClick={() => {
                onDuplicate(item)
                setIsOpen(false)
              }}
              className="flex w-full items-center px-2 py-1.5 text-sm rounded-sm hover:bg-muted transition-colors"
            >
              <CopyIcon className="h-4 w-4 mr-2" />
              Duplicate
            </button>
            <div className="h-px bg-border/50 my-1" />
            <button
              onClick={() => {
                onDelete(item.id)
                setIsOpen(false)
              }}
              className="flex w-full items-center px-2 py-1.5 text-sm rounded-sm hover:bg-muted transition-colors text-destructive"
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


