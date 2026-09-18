/**
 * Utility functions for Google Maps URL generation
 * No Google Maps API Key or billing required.
 * Generates search and direction URLs formatted with encodeURIComponent.
 */

/**
 * Format venue name and address into a search query string
 * @param {string} venueName 
 * @param {string} venueAddress 
 * @returns {string} combined query string
 */
export const buildLocationQuery = (venueName, venueAddress) => {
  const parts = [];
  if (venueName && venueName.trim()) {
    parts.push(venueName.trim());
  }
  if (venueAddress && venueAddress.trim()) {
    parts.push(venueAddress.trim());
  }
  return parts.join(', ');
};

/**
 * Generates Google Maps Search URL
 * @param {string} venueName 
 * @param {string} venueAddress 
 * @returns {string|null} Google Maps search URL or null if neither exists
 */
export const generateGoogleMapsUrl = (venueName, venueAddress) => {
  const query = buildLocationQuery(venueName, venueAddress);
  if (!query) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};

/**
 * Generates Google Maps Directions URL
 * @param {string} venueName 
 * @param {string} venueAddress 
 * @returns {string|null} Google Maps directions URL or null if neither exists
 */
export const generateGoogleDirectionsUrl = (venueName, venueAddress) => {
  const destination = buildLocationQuery(venueName, venueAddress);
  if (!destination) return null;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
};
