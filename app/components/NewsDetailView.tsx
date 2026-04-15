"use client";

import { Article, getAuthorById, getProductsBySlugs, formatPrice } from "../lib/fake-db";
import Icon from "./Icon";
import styles from "../page.module.css";

interface NewsDetailViewProps {
  article: Article;
  onBack: () => void;
  onGoToProduct: (slug: string) => void;
}

export default function NewsDetailView({ article, onBack, onGoToProduct }: NewsDetailViewProps) {
  const author = getAuthorById(article.authorId);
  const relatedProducts = getProductsBySlugs(article.relatedProductSlugs || []);

  return (
    <div className={styles.newsDetailLayout}>
      <header className={styles.newsDetailTopBar}>
        <button className={styles.newsTopIconBtn} onClick={onBack} type="button" aria-label="Quay lại">
          <Icon name="chevron-left" className={styles.newsTopIcon} />
        </button>
        <h2 className={styles.newsBrand}>The Digital Curator</h2>
        <div className={styles.newsDetailTopRight}>
          <button className={styles.newsTopIconBtn} type="button">
            <Icon name="search" className={styles.newsTopIcon} />
          </button>
          <button className={styles.newsTopIconBtn} type="button">
            <Icon name="menu" className={styles.newsTopIcon} />
          </button>
        </div>
      </header>

      <div className={styles.articleHeroImage}>
        <img src={article.coverImage} alt={article.title} />
      </div>

      <main className={styles.articleContainer}>
        <div className={styles.articleMetadata}>
          <span
            className={styles.newsBadge}
            style={{ backgroundColor: article.categoryBadgeColor, color: article.categoryBadgeColor === "#ffdad6" ? "#93000a" : "inherit" }}
          >
            {article.category}
          </span>
          <span className={styles.newsReadTime}>{article.readTime}</span>
        </div>

        <h1 className={styles.articleHeading}>{article.title}</h1>

        {author && (
          <div className={styles.articleAuthorSection}>
            <div className={styles.articleAuthorAvatar}>
              <img src={author.avatar} alt={author.name} />
            </div>
            <div className={styles.articleAuthorText}>
              <strong>{author.name}</strong>
              <span>{author.role} • {article.publishedAt}</span>
            </div>
          </div>
        )}

        <div className={styles.articleExcerpt}>
          <p>{article.summary}</p>
        </div>

        <div className={styles.articleContentBody}>
          {article.content.split("\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {relatedProducts.length > 0 && (
          <section className={styles.articleRelatedProducts}>
            <div className={styles.sectionHeaderLine}>
              <h3>Sản phẩm tư vấn trong bài</h3>
            </div>
            <div className={styles.relatedProductsGrid}>
              {relatedProducts.map((product) => (
                <article
                  key={product.slug}
                  className={styles.articleProductCard}
                  onClick={() => onGoToProduct(product.slug)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onGoToProduct(product.slug);
                    }
                  }}
                >
                  <div className={styles.articleProductImg}>
                    <img src={product.coverImage} alt={product.name} />
                  </div>
                  <div className={styles.articleProductMeta}>
                    <p className={styles.articleProductCat}>{product.category}</p>
                    <h4>{product.name}</h4>
                    <p className={styles.articleProductPrice}>{formatPrice(product.currentPrice)}</p>
                    <span className={styles.articleProductLink}>XEM CHI TIẾT</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className={styles.newsFooter}>
        <h2 className={styles.newsBrandFooter}>The Digital Curator</h2>
        <p className={styles.copyNote}>© 2024 The Digital Curator. BY LAPTOP STORE VN</p>
        <p className={styles.copyNoteSub}>Tất cả bản quyền được bảo hộ.</p>
        <div className={styles.newsFooterLinks}>
          <a href="#">Về chúng tôi</a>
          <a href="#">Chính sách bảo mật</a>
          <div className={styles.linkDivider} />
          <a href="#">Trở thành người viết</a>
          <a href="#">Liên hệ hợp tác</a>
        </div>
      </footer>
    </div>
  );
}
