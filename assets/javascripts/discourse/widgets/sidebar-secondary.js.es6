import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';

export default createWidget('sidebar-secondary', {
  tagName: 'div.sidebar-secondary',
  buildKey: () => 'sidebar-secondary',

  html(attrs, state) {
  	if (!Discourse.SiteSettings.sidebar_enable_second_col || this.site.mobileView)
  		return;

    var sidebarBlocks = Discourse.SiteSettings.sidebar_block_order_second_col.split("|");

    const result = [];
    var self = this;
    var thumbnails = false;

    sidebarBlocks.map(function(item) {
      if (item == 'latest_replies') {
        result.push(self.attach('sidebar-latest-replies'));
      } else if (item == 'custom_html') {
        result.push(self.attach('sidebar-custom-content'));
      } else if (item.includes('tag:')) {
        item = item.split(":");
        if (item[2] && item[2] == 'thumbnails') {
          thumbnails = true;
        }
        result.push(self.attach('sidebar-category-posts', {tag: item[1], thumbnails: thumbnails}));
      } else {
        if (item.includes(':')) {
          item = item.split(":");

          if (item[1] && item[1] == 'thumbnails')
            thumbnails = true;

          item = item[0];
        }
        result.push(self.attach('sidebar-category-posts', {category: item, thumbnails: thumbnails}));
      }
    });

    return result;
  },

});
