import React from 'react';
import styles from './ProductInfo.css';
import FreePerfumeProduct from './free_perfume_product.png';

const ProductInfo = () => (
  <div className={styles.container}>
    <div className={styles.image}>
      <img height='309px' src={FreePerfumeProduct}/>
    </div>
    <div className={styles.wrap}>
      <div className={styles.item}>
        <div>Monthly subscription</div>
        <div>$14.95</div>
      </div>
      <div className={styles.item}>
        <div>Shipping</div>
        <div>FREE</div>
      </div>
      <div className={styles.item}>
        <div>Tax</div>
        <div>$0.00</div>
      </div>
      <div className={styles.item}>
        <div>Subscription discount</div>
        <div>- 25%</div>
      </div>
      <div className={[styles.item, styles.total].join(' ')}>
        <div>TOTAL</div>
        <div>$11.21</div>
      </div>
      <div className={[styles.item, styles.coupon].join(' ')}>
        <div>Have a coupon code?</div>
      </div>
    </div>
  </div>
)

export default ProductInfo;
