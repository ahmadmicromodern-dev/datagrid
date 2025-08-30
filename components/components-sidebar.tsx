"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRTLContext } from "@/components/rtl-provider"

interface ComponentItem {
  name: string
  nameEn: string
  children?: ComponentItem[]
  isExpanded?: boolean
  isNew?: boolean
  isUpdated?: boolean
  href?: string
}

const componentsData: ComponentItem[] = [
  {
    name: "حسگرها و مبدل‌ها",
    nameEn: "Sensors & Transducers",
    isExpanded: true,
    children: [
      { name: "سنسور گاز MQ-2", nameEn: "MQ-2 Gas Sensor", isUpdated: true },
      { name: "پراب دما 100K", nameEn: "100K Temperature Probe", isUpdated: true },
      { name: "سنسور رطوبت DHT22", nameEn: "DHT22 Humidity Sensor" },
      { name: "سنسور فشار BMP280", nameEn: "BMP280 Pressure Sensor" },
      { name: "سنسور حرکت PIR", nameEn: "PIR Motion Sensor" },
      { name: "سنسور نور LDR", nameEn: "LDR Light Sensor" },
      { name: "سنسور صدا LM393", nameEn: "LM393 Sound Sensor" },
      { name: "سنسور شتاب MPU6050", nameEn: "MPU6050 Accelerometer" },
    ],
  },
  {
    name: "ارتباطات بی‌سیم",
    nameEn: "Wireless Communication",
    isExpanded: true,
    children: [
      { name: "ماژول وای‌فای ESP-12F", nameEn: "ESP-12F WiFi Module", isUpdated: true },
      { name: "ماژول ESP32-WROOM-32E", nameEn: "ESP32-WROOM-32E Module", isUpdated: true },
      { name: "ماژول GSM سیم‌کام SIM800C", nameEn: "SIM800C GSM Module" },
      { name: "ماژول بلوتوث HC-05", nameEn: "HC-05 Bluetooth Module" },
      { name: "ماژول LoRa SX1278", nameEn: "SX1278 LoRa Module" },
      { name: "ماژول ZigBee XBee", nameEn: "XBee ZigBee Module" },
      { name: "ماژول NFC PN532", nameEn: "PN532 NFC Module" },
      { name: "ماژول RFID RC522", nameEn: "RC522 RFID Module" },
    ],
  },
  {
    name: "منابع تغذیه",
    nameEn: "Power Supplies",
    isExpanded: true,
    children: [
      { name: "ماژول AC-DC HLK-PM12", nameEn: "HLK-PM12 AC-DC Module", isUpdated: true },
      { name: "رگولاتور LM7805", nameEn: "LM7805 Regulator" },
      { name: "رگولاتور LM317", nameEn: "LM317 Regulator" },
      { name: "مبدل DC-DC LM2596", nameEn: "LM2596 DC-DC Converter" },
      { name: "شارژر باتری TP4056", nameEn: "TP4056 Battery Charger" },
      { name: "محافظ ولتاژ TVS", nameEn: "TVS Voltage Protector" },
      { name: "فیوز قابل تنظیم", nameEn: "Adjustable Fuse" },
      { name: "کابل تغذیه USB-C", nameEn: "USB-C Power Cable" },
    ],
  },
  {
    name: "میکروکنترلرها",
    nameEn: "Microcontrollers",
    isExpanded: true,
    children: [
      { name: "میکروکنترلر ATMEGA64A", nameEn: "ATMEGA64A Microcontroller", isUpdated: true },
      { name: "میکروکنترلر STM32F103", nameEn: "STM32F103 Microcontroller" },
      { name: "میکروکنترلر PIC16F877A", nameEn: "PIC16F877A Microcontroller" },
      { name: "میکروکنترلر MSP430", nameEn: "MSP430 Microcontroller" },
      { name: "میکروکنترلر ESP8266", nameEn: "ESP8266 Microcontroller" },
      { name: "میکروکنترلر ESP32", nameEn: "ESP32 Microcontroller" },
      { name: "میکروکنترلر Arduino Nano", nameEn: "Arduino Nano" },
      { name: "میکروکنترلر Raspberry Pi Pico", nameEn: "Raspberry Pi Pico" },
    ],
  },
  {
    name: "قطعات الکترونیکی",
    nameEn: "Electronic Components",
    isExpanded: true,
    children: [
      { name: "مقاومت 470 اهم", nameEn: "470Ω Resistor", isUpdated: true },
      { name: "خازن سرامیکی 100nF", nameEn: "100nF Ceramic Capacitor" },
      { name: "خازن الکترولیتی 1000µF", nameEn: "1000µF Electrolytic Capacitor" },
      { name: "دیود 1N4007", nameEn: "1N4007 Diode" },
      { name: "ترانزیستور BC547", nameEn: "BC547 Transistor" },
      { name: "آی‌سی 74HC595", nameEn: "74HC595 IC" },
      { name: "آی‌سی MAX232", nameEn: "MAX232 IC" },
      { name: "آی‌سی LM358", nameEn: "LM358 IC" },
    ],
  },
  {
    name: "نمایشگرها و LED",
    nameEn: "Displays & LEDs",
    isExpanded: true,
    children: [
      { name: "نمایشگر LCD 16x2", nameEn: "16x2 LCD Display" },
      { name: "نمایشگر OLED 0.96 اینچ", nameEn: "0.96\" OLED Display" },
      { name: "نمایشگر TFT 2.4 اینچ", nameEn: "2.4\" TFT Display" },
      { name: "LED RGB قابل تنظیم", nameEn: "Adjustable RGB LED" },
      { name: "نوار LED قابل تنظیم", nameEn: "Adjustable LED Strip" },
      { name: "نمایشگر 7-Segment", nameEn: "7-Segment Display" },
      { name: "نمایشگر Dot Matrix", nameEn: "Dot Matrix Display" },
      { name: "نمایشگر E-Paper", nameEn: "E-Paper Display" },
    ],
  },
  {
    name: "موتورها و درایورها",
    nameEn: "Motors & Drivers",
    isExpanded: true,
    children: [
      { name: "موتور DC 12V", nameEn: "12V DC Motor" },
      { name: "موتور پله‌ای 28BYJ-48", nameEn: "28BYJ-48 Stepper Motor" },
      { name: "موتور سروو SG90", nameEn: "SG90 Servo Motor" },
      { name: "درایور موتور L298N", nameEn: "L298N Motor Driver" },
      { name: "درایور موتور پله‌ای A4988", nameEn: "A4988 Stepper Driver" },
      { name: "درایور موتور سروو PCA9685", nameEn: "PCA9685 Servo Driver" },
      { name: "موتور خطی", nameEn: "Linear Motor" },
      { name: "موتور ویبره", nameEn: "Vibration Motor" },
    ],
  },
  {
    name: "سنسورهای محیطی",
    nameEn: "Environmental Sensors",
    isExpanded: true,
    children: [
      { name: "سنسور کیفیت هوا MQ135", nameEn: "MQ135 Air Quality Sensor" },
      { name: "سنسور خاک", nameEn: "Soil Sensor" },
      { name: "سنسور باران", nameEn: "Rain Sensor" },
      { name: "سنسور باد", nameEn: "Wind Sensor" },
      { name: "سنسور UV", nameEn: "UV Sensor" },
      { name: "سنسور CO2", nameEn: "CO2 Sensor" },
      { name: "سنسور متان", nameEn: "Methane Sensor" },
      { name: "سنسور آمونیاک", nameEn: "Ammonia Sensor" },
    ],
  },
  {
    name: "قطعات مکانیکی",
    nameEn: "Mechanical Parts",
    isExpanded: true,
    children: [
      { name: "شاسی آلومینیومی", nameEn: "Aluminum Chassis" },
      { name: "پیچ و مهره M3", nameEn: "M3 Screws & Nuts" },
      { name: "واشر فنری", nameEn: "Spring Washer" },
      { name: "پایه پلاستیکی", nameEn: "Plastic Base" },
      { name: "کاور محافظ", nameEn: "Protective Cover" },
      { name: "پایه نصب", nameEn: "Mounting Base" },
      { name: "اتصال‌دهنده", nameEn: "Connector" },
      { name: "کابل رابط", nameEn: "Interface Cable" },
    ],
  },
  {
    name: "ابزار و لوازم جانبی",
    nameEn: "Tools & Accessories",
    isExpanded: true,
    children: [
      { name: "هویه لحیم‌کاری", nameEn: "Soldering Iron" },
      { name: "سیم لحیم", nameEn: "Solder Wire" },
      { name: "بردبورد", nameEn: "Breadboard" },
      { name: "سیم رابط", nameEn: "Jumper Wires" },
      { name: "پروگرمر USBasp", nameEn: "USBasp Programmer" },
      { name: "مولتی‌متر", nameEn: "Multimeter" },
      { name: "اسیلوسکوپ", nameEn: "Oscilloscope" },
      { name: "منبع تغذیه متغیر", nameEn: "Variable Power Supply" },
    ],
  },
]

export function ComponentsSidebar() {
  const { isRTL } = useRTLContext()
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(["حسگرها و مبدل‌ها", "Sensors & Transducers"]))
  const [selectedItem, setSelectedItem] = useState<string>("")

  const toggleExpanded = (itemName: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName)
    } else {
      newExpanded.add(itemName)
    }
    setExpandedItems(newExpanded)
  }

  const renderItem = (item: ComponentItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.name) || expandedItems.has(item.nameEn)
    const isSelected = selectedItem === item.name || selectedItem === item.nameEn

    const itemContent = (
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 text-sm cursor-pointer hover:bg-white/5 transition-colors",
          level > 0 && "pl-8",
          isSelected && "bg-primary/10 text-primary font-medium",
        )}
        onClick={() => {
          if (hasChildren) {
            toggleExpanded(item.name)
            toggleExpanded(item.nameEn)
          } else if (!item.href) {
            setSelectedItem(isRTL ? item.name : item.nameEn)
          }
        }}
      >
        {hasChildren ? (
          isExpanded ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}

        <span className="flex-1">{isRTL ? item.name : item.nameEn}</span>

        {item.isUpdated && (
          <span className="px-1.5 py-0.5 text-xs bg-orange-500 text-white rounded font-medium">
            {isRTL ? "به‌روزرسانی" : "UPDATED"}
          </span>
        )}

        {item.isNew && (
          <span className="px-1.5 py-0.5 text-xs bg-green-500 text-white rounded font-medium">
            {isRTL ? "جدید" : "NEW"}
          </span>
        )}
      </div>
    )

    return (
      <div key={item.name}>
        {item.href ? (
          <Link href={item.href} className="block">
            {itemContent}
          </Link>
        ) : (
          itemContent
        )}

        {hasChildren && isExpanded && <div>{item.children?.map((child) => renderItem(child, level + 1))}</div>}
      </div>
    )
  }

  return (
    <div className="w-80 bg-background/95 backdrop-blur-sm border-r border-border/50 overflow-hidden flex flex-col h-full">
      {/* Header - Only visible on desktop */}
      <div className="hidden lg:flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30 flex-shrink-0">
        <h2 className="font-semibold text-foreground">
          {isRTL ? "محصولات الکترونیکی" : "Electronic Products"}
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
        <div className="py-2">{componentsData.map((item) => renderItem(item))}</div>
      </div>
    </div>
  )
}
