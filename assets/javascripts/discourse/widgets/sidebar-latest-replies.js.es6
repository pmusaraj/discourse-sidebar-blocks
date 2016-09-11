import { createWidget } from 'discourse/widgets/widget';
import { getLatestReplies } from 'discourse/plugins/discourse-sidebar-blocks/discourse/helpers/recent-replies';
import { h } from 'virtual-dom';

export default createWidget('sidebar-latest-replies', {
  tagName: 'div.sidebar-latest-replies',
  buildKey: attrs => 'sidebar-latest-replies',
  defaultState() {
    return { loading: false };
  },

  refreshPosts() {
    if (this.state.loading) { return; }
    this.state.loading = true
    this.state.posts = 'empty'
    getLatestReplies(this).then((result) => {
      if (result.length) {
        for (var i = result.length - 1; i >= 0; i--) {
          // remove first post in a topic (not a reply)
          if (result[i].post_number < 2) {
            result.splice(i, 1);
          }
        }

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
    if (!state.posts) {
      this.refreshPosts();
    }
    const result = [];
    if (state.loading) {
      result.push(h('div.spinner-container', h('div.spinner')));
    } else if (state.posts !== 'empty') {
      result.push(h('h3.sidebar-heading', I18n.t('sidebar_blocks.recent_replies')));
      const replies = state.posts.map(t => this.attach('sidebar-reply-item', t));
      result.push(replies);
    } else {
      result.push(h('div.no-messages', 'No recent replies.'))
    }

    return result;
  },

});
