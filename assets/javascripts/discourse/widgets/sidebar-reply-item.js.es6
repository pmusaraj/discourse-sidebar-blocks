import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';
import { dateNode } from 'discourse/helpers/node';

createWidget('sidebar-reply-item', {
  tagName: 'div.sidebar-reply-item',

  html(attrs) {
    var url = Discourse.getURL("/t/") + attrs.topic_slug + "/" + attrs.topic_id + "/" + attrs.id;

    var limit = 125;
    var excerpt = $(attrs.cooked).text();
    if (excerpt.length > limit) {
      excerpt = $('<div>').html(attrs.cooked);
      excerpt.find("img,aside").remove();
      excerpt = excerpt.text().substring(0, limit).trim(this) + "...";
    }

    const createdAt = new Date(attrs.created_at);

    return [
      h('span.avatar', this.attach('post-avatar', attrs)),
      h('span.reply-date', {}, dateNode(createdAt)),
      h('span.excerpt', excerpt),
      h('a.item-title', {
        attributes: { href: url}
      }, attrs.topic_title)
    ]
  },
});
