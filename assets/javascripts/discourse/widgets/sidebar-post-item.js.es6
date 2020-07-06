import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';
import getURL from "discourse-common/lib/get-url";

createWidget('sidebar-post-item', {
  tagName: 'div.sidebar-post-item',

  html(attrs) {
    var url = getURL("/t/") + attrs.slug + "/" + attrs.id;
    return [
      h('a.item-title', {
        attributes: { href: url}
      }, attrs.title),
      h('span.comment_count', {}, attrs.posts_count - 1),
      // h('span', this.attach('featured-link', {topic: attrs}))
    ]
  },
});
