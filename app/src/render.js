// Rendering: turns deal records into the summary strip and the deal cards.
// Everything is built with DOM calls (no HTML string injection), so product
// names from deal data can never break the page markup.

const SIGNAL_CLASSES = {
  'New low': 'badge-newlow',
  'Strong price': 'badge-strong',
  'Routine sale': 'badge-routine',
};

export function formatMoney(amount) {
  const rounded = Math.round(amount * 100) / 100;
  return Number.isInteger(rounded) ? `$${rounded.toLocaleString('en-US')}` : `$${rounded.toFixed(2)}`;
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function renderSummary(deals, targets) {
  const stores = new Set(deals.map((deal) => deal.store));
  const biggest = deals.reduce((max, deal) => Math.max(max, deal.discount), 0);
  targets.count.textContent = String(deals.length);
  targets.stores.textContent = String(stores.size);
  targets.biggest.textContent = `${biggest}% off`;
  targets.checked.textContent = 'Fri 27 Nov 2026';
}

export function buildDealCard(deal) {
  const card = element('article', 'deal-card');

  const top = element('div', 'card-top');
  top.append(element('span', 'store-chip', deal.store));
  top.append(element('span', 'discount-badge', `-${deal.discount}%`));
  card.append(top);

  card.append(element('h3', 'product-name', deal.product));
  card.append(element('p', 'category-line', deal.category));

  const priceRow = element('div', 'price-row');
  priceRow.append(element('span', 'sale-price', formatMoney(deal.sale)));
  priceRow.append(element('span', 'usual-price', formatMoney(deal.usual)));
  card.append(priceRow);

  card.append(element('p', 'saving-line', `You save ${formatMoney(deal.usual - deal.sale)}`));

  const badgeRow = element('p');
  const badge = element('span', `badge ${SIGNAL_CLASSES[deal.signal] ?? 'badge-routine'}`, deal.signal);
  badgeRow.append(badge);
  card.append(badgeRow);

  card.append(element('p', 'evidence-line', deal.evidence));
  card.append(element('p', 'checked-line', `Checked ${deal.checked} - price read at ${deal.source}`));

  const link = element('a', 'store-link', `View at ${deal.store}`);
  link.href = deal.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  card.append(link);

  return card;
}

export function renderDealGrid(deals, grid, noResults) {
  grid.replaceChildren(...deals.map(buildDealCard));
  noResults.hidden = deals.length !== 0;
}

export function renderResultCount(shown, total, countNode) {
  countNode.textContent = shown === total
    ? `Showing all ${total} checked deals.`
    : `Showing ${shown} of ${total} checked deals.`;
}
