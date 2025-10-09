// Type for ad placeholder
export type AdPlaceholder = { type: 'ad'; position?: number };

/**
 * Utility function to inject ad placeholders into an array at specified positions
 * @param items - Array of items to inject ads into
 * @param adPositions - Array of positions where ads should be injected (0-based, after item at that index)
 * @returns Array with ad placeholders injected
 */
export function injectAds<T>(
  items: T[],
  adPositions: number[] = [4] // Default: after 4th item (5th position)
): Array<T | AdPlaceholder> {
  const result: Array<T | AdPlaceholder> = [];
  
  // Sort positions to process in order
  const sortedPositions = [...adPositions].sort((a, b) => a - b);
  let offset = 0;
  
  items.forEach((item, index) => {
    result.push(item);
    
    // Check if we need to insert an ad after this item
    if (sortedPositions.includes(index)) {
      result.push({ type: 'ad', position: index + offset } as AdPlaceholder);
      offset++;
    }
  });
  
  return result;
}

/**
 * Simple version: inject a single ad at a specific position
 */
export function injectAdAtPosition<T>(
  items: T[],
  position: number = 4
): Array<T | AdPlaceholder> {
  const result: Array<T | AdPlaceholder> = [...items];
  result.splice(position, 0, { type: 'ad' } as AdPlaceholder);
  return result;
}

/**
 * Type guard to check if an item is an ad placeholder
 */
export function isAdPlaceholder(item: unknown): item is AdPlaceholder {
  return typeof item === 'object' && item !== null && 'type' in item && item.type === 'ad';
}

