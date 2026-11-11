const Store = require('../backend/src/db/store');

async function test() {
  console.log('--- Testing Coupon Store Functions ---');
  const promo = await Store.getActiveCoupons();
  console.log('1. Active Coupons count:', promo.length);
  if (promo.length === 0) throw new Error('No active coupons found');
  console.log('   Sample active coupon:', promo[0].code, promo[0].description);

  const offerCoupon = await Store.getOfferCoupon(1);
  console.log('2. Offer 1 Coupon:', offerCoupon);
  if (!offerCoupon || !offerCoupon.code) throw new Error('Offer coupon missing');

  const activeOfferCoupon = await Store.getOfferCoupon('active');
  console.log('3. Active Offer Coupon:', activeOfferCoupon.code);

  const validation = await Store.validateCoupon('NOIR10', 2500);
  console.log('4. Validation NOIR10 with ₹2500:', validation);
  if (!validation.valid) throw new Error('NOIR10 validation failed');

  console.log('✅ ALL TEST PASSED SUCCESSFULLY!');
}

test().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});

