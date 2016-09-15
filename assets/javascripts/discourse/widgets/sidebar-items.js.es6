import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';

export default createWidget('sidebar-items', {
  tagName: 'div.sidebar-items',
  buildKey: () => 'sidebar-items',

  html(attrs, state) {
  	if (!Discourse.SiteSettings.sidebar_enable || this.site.mobileView)
  		return;

    var sidebarBlocks = Discourse.SiteSettings.sidebar_block_order.split("|");

    const result = [];
    var self = this;

    sidebarBlocks.map(function(item) {
      if (item == 'latest_replies') {
        result.push(self.attach('sidebar-latest-replies'));
      } else if (item == 'custom_html') {
        result.push(self.attach('sidebar-custom-content'));
      } else {
        result.push(self.attach('sidebar-category-posts', {category: item}));
      }
    });

    return result;
  },

});
