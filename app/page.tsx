"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "./components/BottomNav";
import CategoryView from "./components/CategoryView";
import Icon from "./components/Icon";
import NewsDetailView from "./components/NewsDetailView";
import NewsView from "./components/NewsView";
import SectionTitle from "./components/SectionTitle";
import { beVietnamPro, inter } from "./fonts";
import {
  accountShortcuts,
  articlesTable,
  calculateDiscountPercent,
  categoryCards,
  footerLinks,
  formatPrice,
  getArticleBySlug,
  getProductsBySlugs,
  homeCollections,
  needs,
  productsTable,
  testimonials,
  trustItems,
} from "./lib/fake-db";
import { useCompareSelection } from "./lib/useCompareSelection";
import styles from "./page.module.css";

type NavId = "home" | "categories" | "compare" | "news";
type SheetId = "cart" | "account" | null;
type ViewId = "home" | "category" | "news" | "news-detail";

const bottomNavItems = [
  { id: "home" as const, icon: "home", label: "Trang chủ", targetId: "hero-section" },
  { id: "categories" as const, icon: "grid", label: "Danh mục", targetId: "categories-section" },
  { id: "compare" as const, icon: "compare", label: "So sánh" },
  { id: "news" as const, icon: "news", label: "Tin tức" },
];

const bestSellerProducts = getProductsBySlugs(homeCollections.bestSellerSlugs);
const cartProducts = getProductsBySlugs(homeCollections.cartSlugs);
const expertArticles = articlesTable.slice(0, 3);

const priceFilters = [
  { id: "p1", label: "Dưới 15tr", min: 0, max: 15000000 },
  { id: "p2", label: "15 - 25tr", min: 15000000, max: 25000000 },
  { id: "p3", label: "25 - 35tr", min: 25000000, max: 35000000 },
  { id: "p4", label: "Trên 35tr", min: 35000000, max: 999999999 },
];

export default function LaptopStorePage() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<ViewId>("home");
  const [activeArticleSlug, setActiveArticleSlug] = useState<string | null>(null);
  const [openSheet, setOpenSheet] = useState<SheetId>(null);
  const [sectionNav, setSectionNav] = useState<NavId>("home");
  const [selectedNeed, setSelectedNeed] = useState(needs[0]?.title ?? "");
  const [selectedPriceId, setSelectedPriceId] = useState(priceFilters[0].id);
  const { selection: compareSelection, toggleSelection } = useCompareSelection();

  // Flash Sale Timer & Product State
  const [timeLeft, setTimeLeft] = useState(8095); // Matches 02:14:55
  const [activeFlashSlugs, setActiveFlashSlugs] = useState(homeCollections.flashSaleSlugs);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Swap products when timer ends
          const availableProducts = productsTable.filter(p => !activeFlashSlugs.includes(p.slug));
          const newSlugs = availableProducts
            .sort(() => 0.5 - Math.random())
            .slice(0, 2)
            .map(p => p.slug);

          setActiveFlashSlugs(newSlugs);
          return 8095; // Restart countdown
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeFlashSlugs]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const flashSaleProducts = getProductsBySlugs(activeFlashSlugs);

  const activePriceFilter = priceFilters.find((f) => f.id === selectedPriceId)!;
  const filteredNewProducts = productsTable.filter(
    (p) => p.currentPrice >= activePriceFilter.min && p.currentPrice < activePriceFilter.max
  ).slice(0, 4);

  useEffect(() => {
    if (activeView !== "home") return;

    const sectionPairs: Array<{ id: string; nav: NavId }> = [
      { id: "hero-section", nav: "home" },
      { id: "flash-sale-section", nav: "home" },
      { id: "categories-section", nav: "categories" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio);

        const topEntry = visibleEntries[0];

        if (!topEntry) {
          return;
        }

        const matched = sectionPairs.find((item) => item.id === topEntry.target.id);

        if (matched) {
          setSectionNav(matched.nav);
        }
      },
      {
        threshold: [0.15, 0.35, 0.6],
        rootMargin: "-20% 0px -55% 0px",
      },
    );

    sectionPairs.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [activeView]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sectionId = query.get("section");
    const sheetId = query.get("sheet");
    const viewId = query.get("view");

    if (sheetId === "account" || sheetId === "cart") {
      setOpenSheet(sheetId);
    }

    if (viewId === "category") {
      setActiveView("category");
    }

    if (viewId === "news") {
      setActiveView("news");
    }

    if (!sectionId) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const activeNav: NavId =
    openSheet === "account" ? "news" :
      activeView === "category" ? "categories" :
        activeView === "news" || activeView === "news-detail" ? "news" :
          sectionNav === "compare" ? "compare" :
            sectionNav as NavId;

  const comparedProducts = getProductsBySlugs(compareSelection);
  const cartTotal = cartProducts.reduce((total, product) => total + product.currentPrice, 0);
  const compareCategories = [...new Set(comparedProducts.map((product) => product.category))];
  const compareSummaryLabel =
    compareCategories.length === 1
      ? `So sánh Laptop ${compareCategories[0]}`
      : compareCategories.length > 1
        ? `So sánh ${compareCategories.join(" / ")}`
        : "So sánh laptop đã chọn";

  const scrollToSection = (sectionId: string) => {
    setOpenSheet(null);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goToComparePage = () => {
    setOpenSheet(null);
    router.push("/compare");
  };

  const goToProduct = (slug: string) => {
    setOpenSheet(null);
    router.push(`/products/${slug}`);
  };

  const handleProductKeyDown = (event: KeyboardEvent<HTMLElement>, slug: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToProduct(slug);
    }
  };

  const goToArticle = (slug: string) => {
    setActiveArticleSlug(slug);
    setActiveView("news-detail");
    window.scrollTo(0, 0);
  };

  const handleArticleKeyDown = (event: KeyboardEvent<HTMLElement>, slug: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToArticle(slug);
    }
  };

  const handleBottomNavSelect = (itemId: string) => {
    const navId = itemId as NavId;

    if (navId === "home") {
      setActiveView("home");
      scrollToSection("hero-section");
      return;
    }

    if (navId === "categories") {
      setActiveView("category");
      window.scrollTo(0, 0);
      return;
    }

    if (navId === "compare") {
      goToComparePage();
      return;
    }

    if (navId === "news") {
      setActiveView("news");
      window.scrollTo(0, 0);
      return;
    }

    const item = bottomNavItems.find((entry) => entry.id === navId);
    if (item?.targetId) {
      if (activeView !== "home") setActiveView("home");
      setTimeout(() => scrollToSection(item.targetId!), 0);
    }
  };

  const renderSheetContent = () => {
    if (openSheet === "cart") {
      return (
        <>
          <div className={styles.sheetHeader}>
            <div>
              <p className={styles.sheetKicker}>Giỏ hàng</p>
              <h3 className={styles.sheetTitle}>{cartProducts.length} sản phẩm đang chờ bạn</h3>
              <p className={styles.sheetSubtitle}>Giữ giá và ưu đãi giao nhanh trong hôm nay.</p>
            </div>
            <div>
              <button
                aria-label="Đóng giỏ hàng"
                className={styles.closeSheetButton}
                onClick={() => setOpenSheet(null)}
                type="button"
              >
                Đóng
              </button>
            </div>

          </div>

          <div className={styles.sheetList}>
            {cartProducts.map((product) => (
              <article className={styles.sheetListItem} key={product.slug}>
                <button
                  className={styles.sheetItemButton}
                  onClick={() => goToProduct(product.slug)}
                  type="button"
                >
                  <div className={styles.sheetMeta}>
                    <h4>{product.name}</h4>
                    <p>{product.cardSpecs}</p>
                    <span className={styles.sheetPill}>{product.cartNote}</span>
                  </div>
                  <strong className={styles.sheetPrice}>{formatPrice(product.currentPrice)}</strong>
                </button>
              </article>
            ))}
          </div>

          <div className={styles.sheetFooter}>
            <div className={styles.sheetSummary}>
              <div className={styles.sheetSummaryRow}>
                <span>Tạm tính</span>
                <strong>{formatPrice(cartTotal)}</strong>
              </div>
              <div className={styles.sheetSummaryRow}>
                <span>Giao nhanh</span>
                <strong>Miễn phí</strong>
              </div>
            </div>
            <div className={styles.sheetActions}>
              <button className={styles.secondaryAction} onClick={() => setOpenSheet(null)} type="button">
                Tiếp tục xem
              </button>
              <button className={styles.primaryAction} onClick={() => goToProduct(cartProducts[0].slug)} type="button">
                Thanh toán
              </button>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div className={styles.sheetHeader}>
          <div>
            <p className={styles.sheetKicker}>Tài khoản</p>
            <h3 className={styles.sheetTitle}>Dịch vụ sau mua</h3>
            <p className={styles.sheetSubtitle}>Theo dõi đơn hàng, bảo hành và hỗ trợ cấu hình tại một nơi.</p>
          </div>
          <button
            aria-label="Đóng bảng tài khoản"
            className={styles.closeSheetButton}
            onClick={() => setOpenSheet(null)}
            type="button"
          >
            Đóng
          </button>
        </div>

        <div className={styles.accountGrid}>
          {accountShortcuts.map((item) => (
            <article className={styles.accountTile} key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.sheetFooter}>
          <div className={styles.sheetSummary}>
            <div className={styles.sheetSummaryRow}>
              <span>Hotline tư vấn</span>
              <strong>1900 6868</strong>
            </div>
          </div>
          <div className={styles.sheetActions}>
            <button className={styles.secondaryAction} onClick={() => setOpenSheet(null)} type="button">
              Để sau
            </button>
            <button
              className={styles.primaryAction}
              onClick={() => scrollToSection("support-section")}
              type="button"
            >
              Nhờ chuyên gia
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <main
      className={`${beVietnamPro.className} ${styles.pageShell} ${compareSelection.length > 0 ? styles.pageShellWithCompare : ""
        }`}
    >
      <div className={`${inter.className} ${styles.phoneFrame}`}>
        {activeView !== "news" ? (<>
          <header className={styles.topbar}>
            <div className={styles.brand}>
              <button
                aria-label="Mở danh mục nhanh"
                className={styles.iconButton}
                onClick={() => scrollToSection("categories-section")}
                type="button"
              >
                <Icon name="menu" className={styles.icon} />
              </button>
              <button className={styles.brandButton} onClick={() => setActiveView("home")} type="button">
                <span className={styles.brandName}>Laptop Store</span>
              </button>
            </div>

            <button
              aria-expanded={openSheet === "cart"}
              aria-label="Mở giỏ hàng"
              className={`${styles.iconButton} ${styles.cartButton}`}
              onClick={() => setOpenSheet((current) => (current === "cart" ? null : "cart"))}
              type="button"
            >
              <Icon name="cart" className={styles.icon} />
              <span className={styles.cartCount}>{cartProducts.length}</span>
            </button>
          </header>

        </>) : <div></div>}

        {activeView === "home" ? (
          <>
            <section className={styles.hero} id="hero-section">
              <div className={styles.herobutton}>
                <span className={styles.heroIconWrap}>
                  <Icon name="aigen" className={styles.heroIcon} />
                </span>
                <p>GIẢI PHÁP CÔNG NGHỆ TỐI ƯU</p>

              </div>
              <div className={styles.heroCopy}>

                <h1>Bạn cần laptop cho
                  nhu cầu gì?</h1>

                <p className={styles.heroText}>
                  Chúng tôi giúp bạn tìm chiếc máy hoàn hảo, tối ưu cho nhu cầu thực tế và ngân sách của bạn.
                </p>
              </div>

              <div className={styles.needGrid}>
                {needs.map((item) => (
                  <button
                    aria-pressed={selectedNeed === item.title}
                    className={`${styles.needCard} ${selectedNeed === item.title ? styles.needCardActive : ""}`}
                    key={item.title}
                    onClick={() => setSelectedNeed(item.title)}
                    type="button"
                  >
                    <span className={styles.needIconWrap}>
                      <Icon name={item.icon} className={styles.needIcon} />
                    </span>
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>

              <button className={styles.primaryCta} onClick={() => scrollToSection("support-section")} type="button">
                <Icon name="spark" className={styles.buttonIcon} />
                Để tôi tư vấn
              </button>

              <div className={`${styles.heroOrb} ${styles.heroOrbPrimary}`} />
              <div className={`${styles.heroOrb} ${styles.heroOrbSecondary}`} />
            </section>

            <section className={styles.trustStrip}>
              {trustItems.map((item) => (
                <div className={styles.trustItem} key={item.label}>
                  <Icon name={item.icon} className={styles.trustIcon} />
                  <span>{item.label}</span>
                </div>
              ))}
            </section>

            <section className={styles.contentSection}>
              <h2 className={styles.budgetTitle}>Laptop theo ngân sách</h2>
              <div className={styles.priceFilterRow}>
                {priceFilters.map((filter) => (
                  <button
                    key={filter.id}
                    className={`${styles.priceFilterBtn} ${selectedPriceId === filter.id ? styles.priceFilterBtnActive : ""
                      }`}
                    onClick={() => setSelectedPriceId(filter.id)}
                    type="button"
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </section>

            <section className={styles.contentSection}>
              <SectionTitle title="Sản phẩm mới về" rightLabel="Xem tất cả" />
              <div className={styles.newArrivalsGrid}>
                {filteredNewProducts.map((product) => (
                  <article
                    key={product.slug}
                    className={styles.newArrivalCard}
                    onClick={() => goToProduct(product.slug)}
                  >
                    <div className={styles.newArrivalImage}>
                      <img src={product.coverImage} alt={product.name} />
                    </div>
                    <div className={styles.newArrivalInfo}>
                      <h3>{product.name}</h3>
                      <p className={styles.newArrivalPrice}>{formatPrice(product.currentPrice)}</p>
                      <div className={styles.newArrivalBadges}>
                        {product.badges.map((b) => (
                          <span
                            key={b.label}
                            className={`${styles.miniBadge} ${b.tone === "good" ? styles.miniBadgeGreen : styles.miniBadgeBlue
                              }`}
                          >
                            {b.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.contentSection} id="flash-sale-section">
              <SectionTitle
                title="Flash Sale"
                rightLabel="Xem tất cả"
                accent={
                  <>
                    <Icon name="spark" className={styles.flashIcon} />
                    <span className={styles.timerPill}>{formatTime(timeLeft)}</span>
                  </>
                }
              />

              <div className={styles.flashGrid}>
                {flashSaleProducts.map((product) => {
                  const discount = calculateDiscountPercent(product.currentPrice, product.originalPrice);

                  return (
                    <article
                      aria-label={`Xem chi tiết ${product.name}`}
                      className={`${styles.productCard} ${styles.compactCard} ${styles.clickableCard}`}
                      key={product.slug}
                      onClick={() => goToProduct(product.slug)}
                      onKeyDown={(event) => handleProductKeyDown(event, product.slug)}
                      role="link"
                      tabIndex={0}
                    >
                      <div className={`${styles.imageWrap} ${styles.square}`}>
                        <img alt={product.name} src={product.coverImage} />
                        {discount ? <span className={styles.saleBadge}>-{discount}%</span> : null}
                      </div>
                      <h3>{product.name}</h3>
                      <p className={styles.price}>{formatPrice(product.currentPrice)}</p>
                      {product.originalPrice ? (
                        <p className={styles.oldPrice}>{formatPrice(product.originalPrice)}</p>
                      ) : null}
                      <span className={`${styles.pill} ${styles.pillMuted}`}>Góp 0%</span>
                    </article>
                  );
                })}
              </div>
            </section>
            <section className={styles.contentSection}>
              <SectionTitle title="Góc nhìn từ Chuyên gia" rightLabel="Xem tất cả" />
              <div className={styles.expertHorizontalScroll}>
                {expertArticles.map((article) => (
                  <article
                    aria-label={`Đọc bài viết ${article.title}`}
                    className={styles.expertArticleCard}
                    key={article.slug}
                    onClick={() => goToArticle(article.slug)}
                    onKeyDown={(event) => handleArticleKeyDown(event, article.slug)}
                    role="link"
                    tabIndex={0}
                  >
                    <div className={styles.expertArticleImage}>
                      <img alt={article.title} src={article.coverImage} />
                    </div>
                    <div className={styles.expertArticleContent}>
                      <h3>{article.title}</h3>
                      <div className={styles.expertArticleFooter}>
                        <span className={styles.readTime}>{article.readTime}</span>
                        <span className={styles.detailLink}>Xem chi tiết →</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>


            </section>
            <section className={styles.contentSection} id="best-seller-section">
              <SectionTitle title="Bán chạy nhất" />
              <div className={styles.stackList}>
                {bestSellerProducts.map((product) => (
                  <article
                    aria-label={`Xem chi tiết ${product.name}`}
                    className={`${styles.productCard} ${styles.rowCard} ${compareSelection.includes(product.slug) ? styles.rowCardSelected : ""
                      } ${styles.clickableCard}`}
                    key={product.slug}
                    onClick={() => goToProduct(product.slug)}
                    onKeyDown={(event) => handleProductKeyDown(event, product.slug)}
                    role="link"
                    tabIndex={0}
                  >
                    <div className={`${styles.imageWrap} ${styles.thumb}`}>
                      <img alt={product.name} src={product.coverImage} />
                    </div>
                    <div className={styles.rowContent}>
                      <div>
                        <div className={styles.rowTop}>
                          <h3>{product.name}</h3>
                          <label
                            className={styles.compareToggle}
                            onClick={(event) => event.stopPropagation()}
                            onKeyDown={(event) => event.stopPropagation()}
                          >
                            <input
                              checked={compareSelection.includes(product.slug)}
                              onChange={() => toggleSelection(product.slug)}
                              type="checkbox"
                            />
                            <span>So sánh</span>
                          </label>
                        </div>
                        <p className={styles.specs}>{product.cardSpecs}</p>
                        <div className={styles.ratingRow}>
                          <Icon name="star" className={styles.starIcon} />
                          <strong>{product.reviewRating.toFixed(1)}</strong>
                          <span>({product.reviewCount} đánh giá)</span>
                        </div>
                      </div>
                      <p className={styles.price}>{formatPrice(product.currentPrice)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.contentSection} id="categories-section">
              <SectionTitle title="Danh mục phổ biến" />
              <div className={styles.categoryGrid}>
                {categoryCards.map((category) => (
                  <article className={styles.categoryCard} key={category.title}>
                    <img alt={category.title} src={category.image} />
                    <div className={styles.categoryOverlay} />
                    <div className={styles.categoryCopy}>
                      <h3>{category.title}</h3>
                      <p>{category.count}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={`${styles.contentSection} ${styles.reviewsSection}`}>
              <SectionTitle title="Trải nghiệm khách hàng" />
              <div className={styles.reviewRow}>
                {testimonials.map((item) => (
                  <article className={styles.reviewCard} key={item.name}>
                    <div className={styles.reviewUser}>
                      <div className={styles.reviewUserStar}>
                        <img alt={item.name} src={item.avatar} />
                        <div>
                          <h3>{item.name}</h3>
                          <div className={styles.starsWrapper}>
                            {[...Array(5)].map((_, i) => (
                              <Icon
                                key={i}
                                name="star"
                                className={i < item.star ? styles.starIconFilled : styles.starIconEmpty}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className={styles.reviewDate}>
                        <p>{item.date}</p>
                      </div>
                    </div>
                    <blockquote>{`"${item.quote}"`}</blockquote>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.contentSection} id="support-section">
              <div className={styles.expertCard}>
                <div className={styles.expertCopy}>
                  <p className={`${styles.eyebrow} ${styles.eyebrowLight}`}>Hỗ trợ cấu hình</p>
                  <h2>Nhờ chuyên gia tư vấn</h2>
                  <p>Bạn vẫn chưa tìm được máy? Để chuyên gia của chúng tôi gọi lại hỗ trợ ngay.</p>
                  <div className={styles.phoneForm}>
                    <input placeholder="Số điện thoại của bạn" type="text" />
                    <button aria-label="Gọi tư vấn" type="button">
                      <Icon name="call" className={styles.buttonIcon} />
                    </button>
                  </div>
                </div>
                <div className={styles.expertMark}>
                  <Icon name="support" className={styles.supportIcon} />
                </div>
              </div>
            </section>

            <footer className={styles.footer} id="footer-section">
              <div>
                <h3>Laptop Store</h3>
                <p>Hệ thống phân phối laptop chuyên nghiệp hàng đầu Việt Nam.</p>
              </div>
              <div>
                <h4>Hỗ trợ</h4>
                {footerLinks.support.map((item) => (
                  <a href="#" key={item}>
                    {item}
                  </a>
                ))}
              </div>
              <div>
                <h4>Liên hệ</h4>
                {footerLinks.contact.map((item) => (
                  <a href="#" key={item}>
                    {item}
                  </a>
                ))}
              </div>
              <p className={styles.footerNote}>© 2024 Laptop Store. Bảo hành chính hãng.</p>
            </footer>
          </>
        ) : activeView === "category" ? (
          <CategoryView
            categoryName="Laptop Gaming"
            initialProducts={productsTable.filter((p) => p.category === "Gaming")}
            onBack={() => setActiveView("home")}
            onGoToProduct={goToProduct}
          />
        ) : activeView === "news" ? (
          <NewsView
            onBack={() => setActiveView("home")}
            onSelectArticle={(slug) => {
              setActiveArticleSlug(slug);
              setActiveView("news-detail");
              window.scrollTo(0, 0);
            }}
          />
        ) : (
          <NewsDetailView
            article={getArticleBySlug(activeArticleSlug!)!}
            onBack={() => setActiveView("news")}
            onGoToProduct={goToProduct}
          />
        )}
      </div>

      {compareSelection.length > 0 ? (
        <div className={styles.compareDock}>
          <button
            aria-label="Mở trang so sánh"
            className={styles.compareDockInfo}
            onClick={goToComparePage}
            type="button"
          >
            <span className={styles.compareDockIconWrap}>
              <Icon className={styles.compareDockIcon} name="compare" />
            </span>
            <span className={styles.compareDockCopy}>
              <strong>Đã chọn {compareSelection.length}</strong>
              <span>{compareSummaryLabel}</span>
            </span>
          </button>
          <button className={styles.compareDockButton} onClick={goToComparePage} type="button">
            So sánh ngay
          </button>
        </div>
      ) : null}

      <BottomNav
        activeItem={activeNav}
        items={bottomNavItems.map((item) => ({
          ...item,
          badge: item.id === "compare" && compareSelection.length > 0 ? compareSelection.length : undefined,
        }))}
        onSelect={handleBottomNavSelect}
      />

      {openSheet ? (
        <>
          <button
            aria-label="Đóng bảng thông tin"
            className={styles.sheetBackdrop}
            onClick={() => setOpenSheet(null)}
            type="button"
          />
          <aside aria-modal="true" className={styles.bottomSheet} role="dialog">
            <span className={styles.sheetHandle} />
            {renderSheetContent()}
          </aside>
        </>
      ) : null}
    </main>
  );
}
