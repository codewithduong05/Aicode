"use client";

import { useState } from "react";
import { ProductRecord, formatPrice, calculateDiscountPercent } from "../lib/fake-db";
import Icon from "./Icon";
import styles from "../page.module.css";

interface CategoryViewProps {
  categoryName: string;
  initialProducts: ProductRecord[];
  onBack: () => void;
  onGoToProduct: (slug: string) => void;
}

type SortType = "best" | "newest" | "price-low";

export default function CategoryView({
  categoryName,
  initialProducts,
  onBack,
  onGoToProduct,
}: CategoryViewProps) {
  const [sortBy, setSortBy] = useState<SortType>("best");
  const [displayCount, setDisplayCount] = useState(3);

  const sortedProducts = [...initialProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.currentPrice - b.currentPrice;
    if (sortBy === "newest") return -1; // Mock sort
    return b.reviewRating - a.reviewRating; // Default to best rating
  });

  const visibleProducts = sortedProducts.slice(0, displayCount);
  const totalProducts = 156; // Mock total from UI design

  return (
    <div className={styles.categoryViewLayout}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <button onClick={onBack} type="button">Trang chủ</button>
        <Icon name="chevron-right" className={styles.breadcrumbDivider} />
        <span>Laptop</span>
        <Icon name="chevron-right" className={styles.breadcrumbDivider} />
        <span className={styles.breadcrumbActive}>{categoryName}</span>
      </nav>

      {/* Category Hero */}
      <header className={styles.categoryHero}>
        <div className={styles.categoryHeroHeading}>
          <h1>{categoryName}</h1>
          <button className={styles.searchIconBtn} aria-label="Tìm kiếm trong danh mục">
            <Icon name="search" className={styles.icon} />
          </button>
        </div>
        <p className={styles.categorySubtitle}>Sức mạnh vượt trội cho mọi đấu trường.</p>
      </header>

      {/* Filter & Sort Bar */}
      <div className={styles.filterBarContainer}>
        <div className={styles.filterBar}>
          <button className={styles.filterMainBtn}>
            <Icon name="tuning" className={styles.filterIcon} />
            <span>Lọc & Sắp xếp</span>
          </button>
          <div className={styles.sortTabs}>
            <button 
              className={sortBy === "best" ? styles.sortTabActive : styles.sortTab}
              onClick={() => setSortBy("best")}
            >
              Bán chạy
            </button>
            <button 
              className={sortBy === "newest" ? styles.sortTabActive : styles.sortTab}
              onClick={() => setSortBy("newest")}
            >
              Mới nhất
            </button>
            <button 
              className={sortBy === "price-low" ? styles.sortTabActive : styles.sortTab}
              onClick={() => setSortBy("price-low")}
            >
              Giá thấp
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className={styles.categoryProductGrid}>
        {visibleProducts.map((product) => {
          const discount = calculateDiscountPercent(product.currentPrice, product.originalPrice);
          return (
            <article 
              key={product.slug} 
              className={styles.catProductCard}
              onClick={() => onGoToProduct(product.slug)}
            >
              <div className={styles.catImageWrap}>
                <img src={product.coverImage} alt={product.name} />
                <div className={styles.catBadgesTop}>
                  <span className={styles.catBadgeGreen}>TRẢ GÓP 0%</span>
                  {discount && <span className={styles.catBadgeRed}>GIẢM {discount}%</span>}
                </div>
              </div>
              
              <div className={styles.catContent}>
                <h3>{product.name}</h3>
                <div className={styles.catSpecTags}>
                  {product.specifications.slice(0, 2).map(spec => (
                    <span key={spec.label} className={styles.catSpecTag}>{spec.value.split('|')[0].trim()}</span>
                  ))}
                </div>
                
                <div className={styles.catPriceRow}>
                  <strong className={styles.catPrice}>{formatPrice(product.currentPrice)}</strong>
                  <p className={styles.catInstallment}>Góp <strong>{formatPrice(Math.round(product.currentPrice / 24))}</strong>/tháng</p>
                </div>

                <button className={styles.catZaloBtn} onClick={(e) => e.stopPropagation()}>
                  Tư vấn Zalo
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Load More */}
      <div className={styles.loadMoreSection}>
        <button 
          className={styles.loadMoreBtn}
          onClick={() => setDisplayCount(prev => prev + 3)}
          disabled={displayCount >= sortedProducts.length}
        >
          {displayCount >= sortedProducts.length ? "Hết sản phẩm" : "Xem thêm 12 sản phẩm"}
        </button>
        <p className={styles.loadMoreStatus}>
          Hiển thị {visibleProducts.length} trong tổng số {totalProducts} sản phẩm
        </p>
      </div>
    </div>
  );
}
