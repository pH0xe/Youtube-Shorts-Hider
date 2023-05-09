import { TypeValue } from './enums/storageValue';

export class Config {
  private static readonly DEFAULT_THUMBNAIL =
    'ytd-thumbnail-overlay-time-status-renderer span[aria-label="Shorts"]';

  static readonly DEFAULT_CSS_SELECTOR = `
    ytd-rich-item-renderer:has(${this.DEFAULT_THUMBNAIL}),
    ytd-item-section-renderer:has(${this.DEFAULT_THUMBNAIL})
    `;

  static readonly DEFAULT_TYPE = TypeValue.DARKEN;

  static readonly STYLE_ID = 'youtube-shorts-hider-style';
  static readonly DEFAULT_DARKEN_CSS = 'opacity: 0.1 !important;';
  static readonly DEFAULT_HIDE_CSS = 'display: none !important;';
}
