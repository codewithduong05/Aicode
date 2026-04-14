"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "../components/BottomNav";
import Icon from "../components/Icon";
import { beVietnamPro, inter } from "../fonts";
import { formatPrice, getProductsBySlugs } from "../lib/fake-db";
import { useCompareSelection } from "../lib/useCompareSelection";
import styles from "./page.module.css";

const bottomNavItems = [
  { id: "home", icon: "home", label: "Trang chủ" },
  { id: "categories", icon: "grid", label: "Danh mục" },
  { id: "compare", icon: "compare", label: "So sánh" },
  { id: "promotions", icon: "tag", label: "Khuyến mãi" },
  { id: "account", icon: "user", label: "Tài khoản" },
];

export default function ComparePage() {
  const router = useRouter();
  const { selection, removeSelection, clearSelection } = useCompareSelection();
  const selectedProducts = getProductsBySlugs(selection);
  const compareCategories = [...new Set(selectedProducts.map((product) => product.category))];
  const specLabels = [...new Set(selectedProducts.flatMap((product) => product.specifications.map((item) => item.label)))];

  const handleBottomNavSelect = (itemId: string) => {
    if (itemId === "compare") {
      return;
    }

    if (itemId === "categories") {
      router.push("/?section=categories-section");
      return;
    }

    if (itemId === "promotions") {
      router.push("/?section=flash-sale-section");
      return;
    }

    if (itemId === "account") {
      router.push("/?sheet=account");
      return;
    }

    router.push("/");
  };

  return (
    <main className={`${beVietnamPro.className} ${styles.pageShell}`}>
      <div className={`${inter.className} ${styles.phoneFrame}`}>
        <header className={styles.topbar}>
          <div className={styles.brandRow}>
            <Link aria-label="Về trang chủ" className={styles.backButton} href="/">
              <Icon className={styles.topIcon} name="arrow-left" />
            </Link>
            <div>
              <p className={styles.brandName}>Laptop Store</p>
              <h1 className={styles.pageTitle}>So sánh laptop</h1>
            </div>
          </div>

          {selectedProducts.length > 0 ? (
            <button className={styles.clearButton} onClick={clearSelection} type="button">
              Xóa hết
            </button>
          ) : null}
        </header>

        <section className={styles.contentSection}>
          {selectedProducts.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIconWrap}>
                <Icon className={styles.emptyIcon} name="compare" />
              </div>
              <h2>Chưa có sản phẩm để so sánh</h2>
              <p>Chọn checkbox `So sánh` ở trang chủ. Hệ thống sẽ giữ tối đa 2 laptop để đối chiếu.</p>
              <Link className={styles.primaryButton} href="/?section=best-seller-section">
                Chọn laptop ngay
              </Link>
            </div>
          ) : (
            <>
              <section className={styles.summaryCard}>
                <div className={styles.summaryIconWrap}>
                  <Icon className={styles.summaryIcon} name="compare" />
                </div>
                <div className={styles.summaryCopy}>
                  <strong>Đã chọn {selectedProducts.length}</strong>
                  <span>
                    {compareCategories.length === 1
                      ? `So sánh Laptop ${compareCategories[0]}`
                      : compareCategories.join(" / ")}
                  </span>
                </div>
                <Link className={styles.summaryButton} href="/?section=best-seller-section">
                  Thêm sản phẩm
                </Link>
              </section>

              <section className={styles.compareProductSection}>
                <div
                  className={styles.compareProductGrid}
                  style={{
                    gridTemplateColumns: `repeat(${Math.max(selectedProducts.length, 2)}, minmax(0, 1fr))`,
                  }}
                >
                  {selectedProducts.map((product) => (
                    <article className={styles.compareProductCard} key={product.slug}>
                      <Link className={styles.compareProductLink} href={`/products/${product.slug}`}>
                        <div className={styles.compareImageWrap}>
                          <img alt={product.name} src={product.coverImage} />
                        </div>
                        <div className={styles.compareBody}>
                          <p className={styles.compareBrand}>{product.collectionLabel}</p>
                          <h2>{product.name}</h2>
                          <p className={styles.comparePrice}>{formatPrice(product.currentPrice)}</p>
                          <p className={styles.compareRating}>
                            {product.reviewRating.toFixed(1)} sao · {product.reviewCount} đánh giá
                          </p>
                        </div>
                      </Link>
                      <button
                        className={styles.removeButton}
                        onClick={() => removeSelection(product.slug)}
                        type="button"
                      >
                        Bỏ khỏi so sánh
                      </button>
                    </article>
                  ))}

                  {selectedProducts.length < 2 ? (
                    <Link className={styles.addProductCard} href="/?section=best-seller-section">
                      <span className={styles.addIcon}>+</span>
                      <strong>Thêm 1 laptop</strong>
                      <span>Quay về danh sách bán chạy</span>
                    </Link>
                  ) : null}
                </div>
              </section>

              <section className={styles.tableSection}>
                <h2 className={styles.sectionTitle}>Đối chiếu thông số</h2>
                <div className={styles.tableRows}>
                  {specLabels.map((label) => (
                    <article className={styles.tableRowCard} key={label}>
                      <p className={styles.tableLabel}>{label}</p>
                      <div
                        className={styles.tableValues}
                        style={{
                          gridTemplateColumns: `repeat(${selectedProducts.length}, minmax(0, 1fr))`,
                        }}
                      >
                        {selectedProducts.map((product) => {
                          const specification = product.specifications.find((item) => item.label === label);

                          return (
                            <div className={styles.tableValueCard} key={`${product.slug}-${label}`}>
                              <strong>{product.collectionLabel}</strong>
                              <span>{specification?.value ?? "Không có dữ liệu"}</span>
                            </div>
                          );
                        })}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className={styles.tableSection}>
                <h2 className={styles.sectionTitle}>Điểm đáng chú ý</h2>
                <div
                  className={styles.noteGrid}
                  style={{
                    gridTemplateColumns: `repeat(${selectedProducts.length}, minmax(0, 1fr))`,
                  }}
                >
                  {selectedProducts.map((product) => (
                    <article className={styles.noteCard} key={`${product.slug}-notes`}>
                      <h3>{product.collectionLabel}</h3>
                      <div className={styles.noteList}>
                        {product.comparePoints.map((item) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </>
          )}
        </section>
      </div>

      <BottomNav
        activeItem="compare"
        items={bottomNavItems.map((item) => ({
          ...item,
          badge: item.id === "compare" && selection.length > 0 ? selection.length : undefined,
        }))}
        onSelect={handleBottomNavSelect}
      />
    </main>
  );
}
