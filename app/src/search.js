// Text search over the deal list: a deal matches when every word of the
// query appears somewhere in its product name, store or category.

export function normalizeSearchText(text) {
  return String(text ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
}

export function dealMatchesQuery(deal, query) {
  const words = normalizeSearchText(query).split(' ').filter(Boolean);
  if (words.length === 0) return true;
  const haystack = normalizeSearchText(`${deal.product} ${deal.store} ${deal.category}`);
  return words.every((word) => haystack.includes(word));
}

export function searchDeals(deals, query) {
  return deals.filter((deal) => dealMatchesQuery(deal, query));
}
