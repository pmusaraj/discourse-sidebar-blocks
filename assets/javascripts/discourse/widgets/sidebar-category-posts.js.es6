import { createWidget } from 'discourse/widgets/widget';
import { getLatestPosts } from 'discourse/plugins/discourse-sidebar-blocks/discourse/helpers/latest-posts-category';
import { categoryBadgeHTML } from 'discourse/helpers/category-link';
import RawHtml from 'discourse/widgets/raw-html'; 
import { h } from 'virtual-dom';

export default createWidget('sidebar-category-posts', {
  tagName: 'div.sidebar-category-posts',
  buildKey: attrs => `sidebar-category-posts-${attrs.category}`,
  defaultState() {
    return { loading: false };
  },
  buildClasses(attrs) {
    const result = [];
    if (attrs.category) { result.push(`sidebar-c-${attrs.category}`); };
    return result;
  },

  refreshTopics() {
    if (this.state.loading) { return; }
    this.state.loading = true
    this.state.topics = 'empty'
    getLatestPosts(this).then((result) => {
      for (var i = result.length - 1; i >= 0; i--) {
        // remove archived posts
        if (result[i].archived) {
          result.splice(i, 1);
        }
      }

      if (result.length) {
        for (var i = result.length - 1; i >= 0; i--) {
          // limit to 6 max
          if (i > 5) {
            result.splice(i, 1);
          }
        }
        this.state.topics = result;
      } else {
        this.state.topics = 'empty'
      }
      this.state.loading = false
      this.scheduleRerender()
    })
  },

  html(attrs, state) {
    if (!state.topics) {
      this.refreshTopics();
    }
    const result = [];
    if (state.loading) {
      result.push(h('div.spinner-container', h('div.spinner')));
    } else if (state.topics !== 'empty') {
      var category = Discourse.Category.findBySlug(attrs.category);
      result.push(h('div', {innerHTML: categoryBadgeHTML(category)}));
      const topicItems = state.topics.map(t => this.attach('sidebar-post-item', t));
      result.push(h('div', [topicItems]));
    } else {
      var category = Discourse.Category.findBySlug(attrs.category);
      result.push(h('div', {innerHTML: categoryBadgeHTML(category)}));
      result.push(h('div.no-messages', 'No posts in this category.'))
    }

    return result;
  },

});
