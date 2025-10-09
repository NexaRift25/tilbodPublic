# Utility Functions

## Ad Injection Utilities (`injectAds.ts`)

Utilities for dynamically injecting ad placeholders into arrays of content items.

---

## 📦 Exports

### Types
```typescript
type AdPlaceholder = { type: 'ad'; position?: number }
```

### Functions
- `injectAdAtPosition<T>` - Inject a single ad at specific position
- `injectAds<T>` - Inject multiple ads at multiple positions
- `isAdPlaceholder` - Type guard to check if item is an ad placeholder

---

## 🚀 Usage Examples

### Example 1: Single Ad at Position 5
```tsx
import { injectAdAtPosition, isAdPlaceholder } from "@/utils/injectAds";
import AdCard from "@/components/ui/AdCard";

function MyPage() {
  const itemsWithAd = injectAdAtPosition(myItems, 4); // 5th position (0-based)

  return (
    <div className="grid grid-cols-3 gap-6">
      {itemsWithAd.map((item, index) => {
        if (isAdPlaceholder(item)) {
          return <AdCard key={`ad-${index}`} />;
        }
        return <ItemCard key={item.id} item={item} />;
      })}
    </div>
  );
}
```

### Example 2: Multiple Ads at Different Positions
```tsx
import { injectAds, isAdPlaceholder } from "@/utils/injectAds";

function MyPage() {
  // Inject ads at positions 5, 9, and 13
  const itemsWithAds = injectAds(myItems, [4, 8, 12]);

  return (
    <div className="grid grid-cols-3 gap-6">
      {itemsWithAds.map((item, index) => {
        if (isAdPlaceholder(item)) {
          return <AdCard key={`ad-${index}`} />;
        }
        return <ItemCard key={item.id} item={item} />;
      })}
    </div>
  );
}
```

### Example 3: Ad After Every N Items
```tsx
import { injectAds, isAdPlaceholder } from "@/utils/injectAds";

function MyPage() {
  // Insert ad after every 6 items
  const adPositions = Array.from(
    { length: Math.floor(myItems.length / 6) },
    (_, i) => (i + 1) * 6 - 1
  );
  
  const itemsWithAds = injectAds(myItems, adPositions);

  return (
    <div className="grid grid-cols-3 gap-6">
      {itemsWithAds.map((item, index) => {
        if (isAdPlaceholder(item)) {
          return <AdCard key={`ad-${index}`} />;
        }
        return <ItemCard key={item.id} item={item} />;
      })}
    </div>
  );
}
```

### Example 4: Conditional Ad Injection
```tsx
import { injectAdAtPosition, isAdPlaceholder } from "@/utils/injectAds";

function MyPage() {
  // Only inject ad if we have enough items
  const shouldInjectAd = myItems.length > 8;
  const itemsToRender = shouldInjectAd 
    ? injectAdAtPosition(myItems, 4)
    : myItems;

  return (
    <div className="grid grid-cols-3 gap-6">
      {itemsToRender.map((item, index) => {
        if (isAdPlaceholder(item)) {
          return <AdCard key={`ad-${index}`} />;
        }
        return <ItemCard key={item.id} item={item} />;
      })}
    </div>
  );
}
```

---

## 📝 Function Reference

### `injectAdAtPosition<T>`

Injects a single ad placeholder at a specific position.

**Parameters:**
- `items: T[]` - Array of items to inject ad into
- `position: number` - Position where ad should be inserted (0-based, default: 4)

**Returns:**
- `Array<T | AdPlaceholder>` - Array with ad placeholder injected

**Example:**
```tsx
const items = [1, 2, 3, 4, 5, 6];
const result = injectAdAtPosition(items, 2);
// Result: [1, 2, {type: 'ad'}, 3, 4, 5, 6]
```

---

### `injectAds<T>`

Injects multiple ad placeholders at specified positions.

**Parameters:**
- `items: T[]` - Array of items to inject ads into
- `adPositions: number[]` - Array of positions where ads should be inserted (default: [4])

**Returns:**
- `Array<T | AdPlaceholder>` - Array with ad placeholders injected

**Example:**
```tsx
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = injectAds(items, [2, 5, 8]);
// Result: [1, 2, {type: 'ad'}, 3, 4, 5, {type: 'ad'}, 6, 7, 8, {type: 'ad'}, 9, 10]
```

---

### `isAdPlaceholder`

Type guard function to check if an item is an ad placeholder.

**Parameters:**
- `item: unknown` - Item to check

**Returns:**
- `boolean` - True if item is AdPlaceholder, false otherwise

**Example:**
```tsx
if (isAdPlaceholder(item)) {
  return <AdCard />;
}
```

---

## 🎯 Position Indexing

**Important:** Positions are 0-based (like array indices).

```
Position:  0    1    2    3    4    5    6
Item:     [A] -> [B] -> [C] -> [D] -> [E] -> [F] -> [G]
                                 ↑
                         position: 4 = 5th item
```

**Common Positions:**
- Position `0` = 1st position
- Position `4` = 5th position
- Position `8` = 9th position

---

## ✅ TypeScript Support

The utilities are fully typed and provide:
- Type inference for your item types
- Type guards for safe type narrowing
- Auto-complete in your IDE

---

## 🔧 Best Practices

1. **Always use `isAdPlaceholder` type guard** for rendering logic
2. **Provide unique keys** for ad components (e.g., `key={ad-${index}}`)
3. **Consider responsive layouts** when choosing ad positions
4. **Test with different item counts** to ensure ads appear correctly

---

## 📊 Grid Position Calculator

For a 3-column grid, ads appear in these visual positions:

```
Position 4 (5th):
[1] [2] [3]
[4] [AD] [5]  ← Ad in middle of row 2
[6] [7] [8]

Position 8 (9th):
[1] [2] [3]
[4] [5] [6]
[7] [8] [AD]  ← Ad at end of row 3

Position 2, 5, 8 (multiple):
[1] [2] [AD]  ← Ad at end of row 1
[3] [4] [5]
[AD] [6] [7]  ← Ad at start of row 3
[8] [AD] [9]  ← Ad in middle of row 4
```

Use this to visualize where ads will appear in your layout!

