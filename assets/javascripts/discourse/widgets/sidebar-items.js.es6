import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';

export default createWidget('sidebar-items', {
  tagName: 'div.sidebar-items',
  buildKey: () => 'sidebar-items',

  html(attrs, state) {
  	var sidebarEnabled = Discourse.SiteSettings.sidebar_enable;
  	if (!sidebarEnabled)
  		return;

    if (Discourse.Mobile.mobileView)
      return;

  	var sidebarLatestReplies = Discourse.SiteSettings.sidebar_latest_replies;
    var sidebarCats = Discourse.SiteSettings.sidebar_post_categories.split("|");
    const result = [];
  	if (sidebarLatestReplies)
    	result.push(this.attach('sidebar-latest-replies'));
    const categoryBlocks = sidebarCats.map(c => this.attach('sidebar-category-posts', {category: c}));
    result.push(categoryBlocks);
    return result;
  },

});
