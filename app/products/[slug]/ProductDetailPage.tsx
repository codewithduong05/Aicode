"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "../../components/Icon";
import { beVietnamPro, inter } from "../../fonts";
import {
  calculateDiscountPercent,
  footerLinks,
  formatPrice,
  type ProductRecord,
} from "../../lib/fake-db";
import styles from "./page.module.css";

type DetailTab = "configuration" | "reviews" | "compare";

interface ProductDetailPageProps {
  product: ProductRecord;
  relatedProducts: ProductRecord[];
}

const badgeToneClassMap = {
  sale: "badgeSale",
  fresh: "badgeFresh",
  good: "badgeGood",
} as const;

export default function ProductDetailPage({
  product,
  relatedProducts,
}: ProductDetailPageProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<DetailTab>("configuration");

  const discount = calculateDiscountPercent(product.currentPrice, product.originalPrice);

  return (
    <main className={`${beVietnamPro.className} ${styles.detailShell}`}>
      <div className={`${inter.className} ${styles.detailFrame}`}>
        <header className={styles.topbar}>
          <div className={styles.topbarInner}>
            <Link aria-label="Quay lại trang chủ" className={styles.backLink} href="/">
              <Icon className={styles.topIcon} name="arrow-left" />
            </Link>
            <span className={styles.brandName}>Laptop Store</span>
          </div>
        </header>

        <section className={styles.gallerySection}>
          <div className={styles.galleryHero}>
            <img alt={product.name} src={product.gallery[activeImageIndex] ?? product.coverImage} />
            <div className={styles.galleryCounter}>
              {activeImageIndex + 1} / {product.gallery.length}
            </div>
          </div>

          <div className={styles.thumbnailRow}>
            {product.gallery.map((image, index) => (
              <button
                aria-label={`Xem ảnh ${index + 1}`}
                className={`${styles.thumbnailButton} ${
                  index === activeImageIndex ? styles.thumbnailButtonActive : ""
                }`}
                key={`${product.slug}-${index + 1}`}
                onClick={() => setActiveImageIndex(index)}
                type="button"
              >
                <img alt={`${product.name} ${index + 1}`} src={image} />
              </button>
            ))}
          </div>
        </section>

        <section className={styles.infoSection}>
          <div className={styles.badgeRow}>
            {product.badges.map((badge) => (
              <span
                className={`${styles.productBadge} ${
                  styles[badgeToneClassMap[badge.tone]]
                }`}
                key={`${product.slug}-${badge.label}`}
              >
                {badge.label}
              </span>
            ))}
          </div>

          <h1 className={styles.productTitle}>{product.name}</h1>

          <div className={styles.priceCard}>
            <div className={styles.priceRow}>
              <span className={styles.currentPrice}>{formatPrice(product.currentPrice)}</span>
              {product.originalPrice ? (
                <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
              ) : null}
              {discount ? <span className={styles.discountChip}>-{discount}%</span> : null}
            </div>
            <div className={styles.financingRow}>
              <Icon className={styles.inlineIcon} name="payments" />
              <span>
                {product.financText}
                
                <span className={styles.financingPrice}>{product.financingText}</span></span>
            </div>
          </div>
        </section>

        <section className={styles.overviewSection}>
          <div className={`${styles.overviewCard} ${styles.overviewPositive}`}>
            <h2 className={styles.overviewTitle}>
              <Icon className={styles.inlineIcon} name="verified" />
              Phù hợp với bạn nếu...
            </h2>
            <ul className={styles.overviewList}>
              {product.fitForYou.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={`${styles.overviewCard} ${styles.overviewCaution}`}>
            <h2 className={styles.overviewTitle}>
              <Icon className={styles.inlineIcon} name="alert" />
              Cân nhắc nếu...
            </h2>
            <ul className={styles.overviewList}>
              {product.cautionNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.highlightsSection}>
          <h2 className={styles.sectionTitle}>Thông số ấn tượng</h2>
          <div className={styles.highlightGrid}>
            {product.highlights.map((item) => (
              <article className={styles.highlightCard} key={`${product.slug}-${item.label}`}>
                <Icon className={styles.highlightIcon} name={item.icon} />
                <p className={styles.highlightLabel}>{item.label}</p>
                <p className={styles.highlightValue}>{item.value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.tabSection}>
          <div className={styles.tabBar}>
            <button
              className={`${styles.tabButton} ${
                activeTab === "configuration" ? styles.tabButtonActive : ""
              }`}
              onClick={() => setActiveTab("configuration")}
              type="button"
            >
              Cấu hình
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "reviews" ? styles.tabButtonActive : ""}`}
              onClick={() => setActiveTab("reviews")}
              type="button"
            >
              Đánh giá ({product.reviewCount})
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "compare" ? styles.tabButtonActive : ""}`}
              onClick={() => setActiveTab("compare")}
              type="button"
            >
              So sánh
            </button>
          </div>

          <div className={styles.tabPanel}>
            {activeTab === "configuration" ? (
              <div className={styles.specList}>
                {product.specifications.map((item) => (
                  <div className={styles.specRow} key={`${product.slug}-${item.label}`}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
                <button className={styles.specCta} type="button">
                  Xem chi tiết thông số
                </button>
              </div>
            ) : null}

            {activeTab === "reviews" ? (
              <div className={styles.reviewPanel}>
                <div className={styles.reviewSummary}>
                  <strong>{product.reviewRating.toFixed(1)}/5</strong>
                  <span>{product.reviewCount} đánh giá xác thực</span>
                </div>
                <div className={styles.reviewPointList}>
                  {product.reviewPoints.map((item) => (
                    <article className={styles.reviewPointCard} key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.detail}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}

            {activeTab === "compare" ? (
              <div className={styles.comparePanel}>
                <div className={styles.compareTips}>
                  {product.comparePoints.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
                <div className={styles.compareLinks}>
                  {relatedProducts.slice(0, 2).map((relatedProduct) => (
                    <Link className={styles.compareLink} href={`/products/${relatedProduct.slug}`} key={relatedProduct.slug}>
                      So với {relatedProduct.brand}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className={styles.relatedSection}>
          <h2 className={styles.sectionTitleLarge}>Sản phẩm tương tự</h2>
          <div className={styles.relatedRow}>
            {relatedProducts.map((relatedProduct) => (
              <Link className={styles.relatedCard} href={`/products/${relatedProduct.slug}`} key={relatedProduct.slug}>
                <div className={styles.relatedImageWrap}>
                  <img alt={relatedProduct.name} src={relatedProduct.coverImage} />
                </div>
                <div className={styles.relatedBody}>
                  <p className={styles.relatedLabel}>{relatedProduct.collectionLabel}</p>
                  <h3>{relatedProduct.name}</h3>
                  <p className={styles.relatedPrice}>{formatPrice(relatedProduct.currentPrice)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <div>
            <p className={styles.footerBrand}>Laptop Store</p>
            <p className={styles.footerText}>
              © 2024 Laptop Store. Bảo hành chính hãng 24 tháng toàn quốc. Giao hàng miễn phí nội thành.
            </p>
          </div>
          <div className={styles.footerLinks}>
            {footerLinks.support.map((item) => (
              <a href="#" key={item}>
                {item}
              </a>
            ))}
            {footerLinks.contact.map((item) => (
              <a href="#" key={item}>
                {item}
              </a>
            ))}
          </div>
        </footer>
      </div>

      <div className={styles.purchaseBar}>
        <div className={styles.purchaseBarInner}>
          <a
            className={styles.zaloButton}
            href="https://zalo.me/19006868"
            rel="noreferrer"
            target="_blank"
          >
            <Icon className={styles.zaloIcon} name="chat" />
            Nhắn tin Zalo tư vấn
          </a>
        </div>
      </div>
    </main>
  );
}
