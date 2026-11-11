// Real-time Product Synchronization Utility across Admin Panel and Customer Website

const CHANNEL_NAME = 'perfume_product_sync_channel';
const STORAGE_KEY = 'perfume_product_sync_event';

let channel = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    channel = new BroadcastChannel(CHANNEL_NAME);
  }
} catch (e) {
  console.warn('BroadcastChannel not supported:', e);
}

/**
 * Broadcast an updated product (e.g. image changed) to all tabs and active views
 */
export function broadcastProductUpdate({
  productId,
  imageUrl,
  product = null,
  image_url_1,
  image_url_2,
  image_url_3,
  images
}) {
  const finalImg1 = image_url_1 || (product && (product.image_url_1 || product.image_url)) || imageUrl;
  const finalImg2 = image_url_2 || (product && product.image_url_2);
  const finalImg3 = image_url_3 || (product && product.image_url_3);
  const finalImages = images || (product && Array.isArray(product.gallery_urls) ? product.gallery_urls : [finalImg1, finalImg2, finalImg3].filter(Boolean));

  const payload = {
    type: 'PRODUCT_IMAGE_UPDATED',
    productId: Number(productId),
    imageUrl: finalImg1 || imageUrl,
    image_url_1: finalImg1,
    image_url_2: finalImg2,
    image_url_3: finalImg3,
    images: finalImages,
    product,
    timestamp: Date.now()
  };

  // 1. Same-window / same-tab dispatch
  try {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('perfume_product_updated', { detail: payload }));
    }
  } catch (_) {}

  // 2. Cross-tab localStorage storage event
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    }
  } catch (_) {}

  // 3. BroadcastChannel for modern zero-latency tab communication
  try {
    if (channel) {
      channel.postMessage(payload);
    }
  } catch (_) {}
}

/**
 * Subscribe to real-time product updates
 * @param {Function} callback ({ productId, imageUrl, product, timestamp }) => void
 * @returns {Function} unsubscribe cleanup function
 */
export function subscribeToProductUpdates(callback) {
  if (typeof window === 'undefined') return () => {};

  // Handler for same-tab custom event
  const handleCustomEvent = (event) => {
    if (event && event.detail) {
      callback(event.detail);
    }
  };

  // Handler for cross-tab storage event
  const handleStorageEvent = (event) => {
    if (event.key === STORAGE_KEY && event.newValue) {
      try {
        const data = JSON.parse(event.newValue);
        callback(data);
      } catch (_) {}
    }
  };

  // Handler for BroadcastChannel
  const handleBroadcastMessage = (event) => {
    if (event && event.data && event.data.type === 'PRODUCT_IMAGE_UPDATED') {
      callback(event.data);
    }
  };

  window.addEventListener('perfume_product_updated', handleCustomEvent);
  window.addEventListener('storage', handleStorageEvent);
  if (channel) {
    channel.addEventListener('message', handleBroadcastMessage);
  }

  // Return unsubscribe cleanup
  return () => {
    window.removeEventListener('perfume_product_updated', handleCustomEvent);
    window.removeEventListener('storage', handleStorageEvent);
    if (channel) {
      channel.removeEventListener('message', handleBroadcastMessage);
    }
  };
}

