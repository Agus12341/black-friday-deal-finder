// TagDrop deal finder: wires the toolbar controls to the search, filter,
// sort and render modules and draws the first view. The starting state can
// also come from the URL query string (for example ?category=TVs&min=40),
// which is how the screenshots were taken and how a shopper can share a
// filtered view.

import { DEALS } from '../data/deals.js';
import { searchDeals } from './search.js';
import { applyFilters, sortDeals, listCategories, listStores } from './filters.js';
import { renderSummary, renderDealGrid, renderResultCount } from './render.js';

const controls = {
  search: document.getElementById('search-input'),
  category: document.getElementById('category-select'),
  store: document.getElementById('store-select'),
  discount: document.getElementById('discount-select'),
  sort: document.getElementById('sort-select'),
  newLows: document.getElementById('newlow-toggle'),
  grid: document.getElementById('deal-grid'),
  noResults: document.getElementById('no-results'),
  resultCount: document.getElementById('result-count'),
};

function fillSelectOptions(select, values) {
  for (const value of values) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.append(option);
  }
}

function readStateFromControls() {
  return {
    query: controls.search.value,
    category: controls.category.value,
    store: controls.store.value,
    minDiscount: Number(controls.discount.value) || 0,
    sort: controls.sort.value,
    newLowsOnly: controls.newLows.checked,
  };
}

function refreshDealList() {
  const state = readStateFromControls();
  const searched = searchDeals(DEALS, state.query);
  const filtered = applyFilters(searched, state);
  const ordered = sortDeals(filtered, state.sort);
  renderDealGrid(ordered, controls.grid, controls.noResults);
  renderResultCount(ordered.length, DEALS.length, controls.resultCount);
}

function applyUrlPresets() {
  const params = new URLSearchParams(location.search);
  const query = params.get('q');
  const category = params.get('category');
  const store = params.get('store');
  const min = params.get('min');
  const sort = params.get('sort');
  if (query) controls.search.value = query;
  if (category && [...controls.category.options].some((o) => o.value === category)) controls.category.value = category;
  if (store && [...controls.store.options].some((o) => o.value === store)) controls.store.value = store;
  if (min && [...controls.discount.options].some((o) => o.value === min)) controls.discount.value = min;
  if (sort && [...controls.sort.options].some((o) => o.value === sort)) controls.sort.value = sort;
  if (params.get('signal') === 'new-low') controls.newLows.checked = true;
}

function initDealFinder() {
  fillSelectOptions(controls.category, listCategories(DEALS));
  fillSelectOptions(controls.store, listStores(DEALS));
  renderSummary(DEALS, {
    count: document.getElementById('stat-count'),
    stores: document.getElementById('stat-stores'),
    biggest: document.getElementById('stat-biggest'),
    checked: document.getElementById('stat-checked'),
  });
  applyUrlPresets();
  for (const control of [controls.search, controls.category, controls.store, controls.discount, controls.sort, controls.newLows]) {
    control.addEventListener('input', refreshDealList);
    control.addEventListener('change', refreshDealList);
  }
  refreshDealList();
}

initDealFinder();
