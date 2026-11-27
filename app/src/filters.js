// Category, store, discount and signal filters, plus the sort orders the
// toolbar offers. All functions are pure: they take deals in and return a
// new array, so main.js can re-run the whole chain on every control change.

export function filterByCategory(deals, category) {
  if (!category) return deals;
  return deals.filter((deal) => deal.category === category);
}

export function filterByStore(deals, store) {
  if (!store) return deals;
  return deals.filter((deal) => deal.store === store);
}

export function filterByMinimumDiscount(deals, minimumPercent) {
  const minimum = Number(minimumPercent) || 0;
  if (minimum <= 0) return deals;
  return deals.filter((deal) => deal.discount >= minimum);
}

export function filterToNewLows(deals, newLowsOnly) {
  if (!newLowsOnly) return deals;
  return deals.filter((deal) => deal.signal === 'New low');
}

export function applyFilters(deals, state) {
  let out = filterByCategory(deals, state.category);
  out = filterByStore(out, state.store);
  out = filterByMinimumDiscount(out, state.minDiscount);
  out = filterToNewLows(out, state.newLowsOnly);
  return out;
}

export function sortDeals(deals, sortKey) {
  const sorted = [...deals];
  switch (sortKey) {
    case 'price-low':
      sorted.sort((a, b) => a.sale - b.sale || b.discount - a.discount);
      break;
    case 'price-high':
      sorted.sort((a, b) => b.sale - a.sale || b.discount - a.discount);
      break;
    case 'savings':
      sorted.sort((a, b) => (b.usual - b.sale) - (a.usual - a.sale) || b.discount - a.discount);
      break;
    case 'discount':
    default:
      sorted.sort((a, b) => b.discount - a.discount || (b.usual - b.sale) - (a.usual - a.sale));
      break;
  }
  return sorted;
}

export function listCategories(deals) {
  return [...new Set(deals.map((deal) => deal.category))].sort();
}

export function listStores(deals) {
  return [...new Set(deals.map((deal) => deal.store))].sort();
}
