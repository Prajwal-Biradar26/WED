/**
 * Google Maps URL Generator Service
 * Zero API keys or billing required.
 * Generates search and direction URLs formatted with encodeURIComponent.
 */

export const buildLocationQuery = (venueName, venueAddress) => {
  const parts = [];
  if (venueName && venueName.trim()) parts.push(venueName.trim());
  if (venueAddress && venueAddress.trim()) parts.push(venueAddress.trim());
  return parts.join(', ');
};

export const generateGoogleMapsUrl = (venueName, venueAddress) => {
  const query = buildLocationQuery(venueName, venueAddress);
  if (!query) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};

export const generateGoogleDirectionsUrl = (venueName, venueAddress) => {
  const destination = buildLocationQuery(venueName, venueAddress);
  if (!destination) return null;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
};
