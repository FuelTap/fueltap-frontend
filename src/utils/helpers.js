export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(
    value
  );

export function splitName(name) {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
}

export function loadFromLocalStorage(key) {
  try {
    const serialized = localStorage.getItem(key);
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch (err) {
    console.error('Failed to load from localStorage', err);
    return undefined;
  }
}

export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }
}
export const clearFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.log(err);
  }
};

// Restrict input to numbers only and limit to a given length (default: 10)
export const handleNumericInput = (e, field, maxLength = 10) => {
  const numericValue = e.target.value.replace(/\D/g, ''); // remove non-digits
  if (numericValue.length <= maxLength) {
    field.onChange(numericValue);
  }
};

// Prevent certain invalid keys like e, +, -, and .
export const preventInvalidKeys = (e) => {
  const invalidKeys = ['e', 'E', '+', '-', '.'];
  if (invalidKeys.includes(e.key)) {
    e.preventDefault();
  }
};

export async function geocodeAddress(address) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
  );
  const data = await res.json();
  return data[0]; // best match
}
