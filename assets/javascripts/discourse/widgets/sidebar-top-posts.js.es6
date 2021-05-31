import { createWidget } from 'discourse/widgets/widget';
import { getTopPosts } from 'discourse/plugins/discourse-sidebar-blocks/discourse/helpers/top-posts';
import { h } from 'virtual-dom';

export default createWidget('sidebar-top-posts', {
  tagName: 'div.sidebar-top-posts',
  buildKey: attrs => 'sidebar-top-posts',
  defaultState() {
    return { loading: false };
  },

  refreshPosts() {
    if (this.state.loading) { return; }
    this.state.loading = true
    this.state.posts = 'empty'
    getTopPosts(this).then((result) => {
      if (result.length) {
        for (var i = result.length - 1; i >= 0; i--) {
          // limit to 5 max
          if (i > 4) {
            result.splice(i, 1);
          }
        }
        this.state.posts = result;
      } else {
        this.state.posts = 'empty'
      }
      this.state.loading = false
      this.scheduleRerender()
    })
  },

  html(attrs, state) {
    const messageBus = Discourse.__container__.lookup('message-bus:main')
    messageBus.subscribe("/top", data => {
      this.refreshPosts();
    });

    if (!state.posts) {
      this.refreshPosts();
    }
    const result = [];
    if (state.loading) {
      result.push(h('div.spinner-container', h('div.spinner')));
    } else if (state.posts !== 'empty') {
      result.push(h('h3.sidebar-heading', I18n.t('sidebar_blocks.top_posts')));
      const posts = state.posts.map(t => this.attach('sidebar-post-item', t));
      result.push(posts);
    } else {
      result.push(h('div.no-messages', 'No Top Posts'))
    }

    return result;
  },

});
