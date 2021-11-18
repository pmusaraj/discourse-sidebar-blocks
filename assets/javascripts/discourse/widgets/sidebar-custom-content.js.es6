import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';

createWidget('sidebar-custom-content', {
  tagName: 'div.sidebar-custom-content',

  html(attrs) {
    return h('div', {innerHTML: this.siteSettings.sidebar_custom_content});
  },
});
