export class Config {
  private static readonly DEFAULT_THUMBNAIL =
    'ytd-thumbnail-overlay-time-status-renderer span[aria-label="Shorts"]';

  static readonly DEFAULT_CSS_SELECTOR = `
    ytd-rich-item-renderer:has(${this.DEFAULT_THUMBNAIL}),
    ytd-item-section-renderer:has(${this.DEFAULT_THUMBNAIL})
    `;

  static readonly DEFAULT_TYPE = 'darken';
}
