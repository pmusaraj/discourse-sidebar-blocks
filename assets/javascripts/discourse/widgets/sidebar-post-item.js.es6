import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';

createWidget('sidebar-post-item', {
  tagName: 'div.sidebar-post-item',

  html(attrs) {
    var url = Discourse.getURL("/t/") + attrs.slug + "/" + attrs.id;
    return [
      h('a.item-title', {
        attributes: { href: url}
      }, attrs.title),
      h('span.comment_count', {}, attrs.posts_count - 1),
    ]
  },
});
