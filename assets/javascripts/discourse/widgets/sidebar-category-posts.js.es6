import { createWidget } from 'discourse/widgets/widget';
import { getLatestPosts } from 'discourse/plugins/discourse-sidebar-blocks/discourse/helpers/get-latest-posts';
import { categoryBadgeHTML } from 'discourse/helpers/category-link';
import RawHtml from 'discourse/widgets/raw-html';
import { h } from 'virtual-dom';

export default createWidget('sidebar-category-posts', {
  tagName: 'div.sidebar-category-posts',
  buildKey: attrs => `sidebar-category-${attrs.category || attrs.tag}`,
  defaultState() {
    return { loading: false, topics: [] };
  },
  buildClasses(attrs) {
    const result = [];
    if (attrs.category) { result.push(`sidebar-c-${attrs.category}`); };
    if (attrs.tag) { result.push(`sidebar-tag-${attrs.tag}`); };
    return result;
  },

  refreshTopics(attrs, state) {
    if (state.loading) { return; }
    state.loading = true
    attrs.count = attrs.count || parseInt(this.siteSettings.sidebar_num_results);

    getLatestPosts(attrs).then((result) => {
      state.topics = result.length > 0 ? result : [];
      state.loading = false
      this.scheduleRerender()
    })
  },

  html(attrs, state) {
    if (state.topics.length === 0) {
      this.refreshTopics(attrs, state);
    }
    const result = [];
    var heading = '';
    if (attrs.category) {
      var category = Discourse.Category.findBySlug(attrs.category);
      var heading = categoryBadgeHTML(category);
      result.push(h('div', {innerHTML: heading}));
    }

    if (attrs.tag)
      result.push(h('h3.sidebar-heading', {innerHTML: attrs.tag}));

    if (state.loading) {
      result.push(h('div.spinner-container', h('div.spinner')));
    } else if (state.topics.length > 0) {
      var tpl = attrs.thumbnails ? 'sidebar-post-item-thumbnail' : 'sidebar-post-item';
      const topicItems = state.topics.map(t => this.attach(tpl, t));
      result.push(h('div', [topicItems]));
    } else {
      result.push(h('div.no-messages', 'No posts found.'))
    }

    return result;
  },

});
