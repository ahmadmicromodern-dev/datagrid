/**
 * توابع کمکی گرید (utils)
 *
 * - generateSparklineData: تولید داده ساختگی برای نمودار کوچک (sparkline)
 * - centerEditPopover: مرکزدهی پاپ‌اور ویرایش روی صفحه و بالا بردن z-index
 */
export const generateSparklineData = (seed: number, base: number) => {
  const points = 12
  const data: { value: number }[] = []
  for (let i = 0; i < points; i++) {
    const noise = ((seed + i) % 7) - 3
    const trend = Math.sin(i / 2) * 5
    const value = Math.max(0, Math.min(100, base + trend + noise))
    data.push({ value })
  }
  return data
}

export const centerEditPopover = () => {
  const popoverWrappers = document.querySelectorAll('[data-radix-popper-content-wrapper]')
  let editPopover: HTMLElement | null = null
  for (const wrapper of popoverWrappers) {
    const title = (wrapper as HTMLElement).querySelector('h3')
    if (title && title.textContent === 'Edit Product') {
      editPopover = wrapper as HTMLElement
      break
    }
  }
  if (editPopover) {
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const popoverRect = editPopover.getBoundingClientRect()
    const popoverWidth = popoverRect.width || 400
    const popoverHeight = popoverRect.height || 500
    const centerX = Math.max(10, (viewportWidth - popoverWidth) / 2)
    const centerY = Math.max(10, (viewportHeight - popoverHeight) / 2)
    editPopover.style.position = 'fixed'
    editPopover.style.top = `${centerY}px`
    editPopover.style.left = `${centerX}px`
    editPopover.style.transform = 'none'
    editPopover.style.zIndex = '9999'
    editPopover.style.margin = '0'
  }
}


