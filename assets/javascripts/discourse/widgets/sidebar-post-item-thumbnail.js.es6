import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";
import getURL from "discourse-common/lib/get-url";

createWidget("sidebar-post-item-thumbnail", {
  tagName: "div.sidebar-post-item-thumbnail",

  html(attrs) {
    var url = getURL("/t/") + attrs.slug + "/" + attrs.id;
    return [
      h(
        "a.item-title",
        {
          attributes: { href: url },
        },
        attrs.title
      ),
      h("span.comment_count", {}, attrs.posts_count - 1),
      attrs.thumbnails
        ? h(
            "a.item-thumbnail",
            {
              attributes: { href: url },
            },
            h("img.item-thumbnail", {
              src: attrs.thumbnails.retina || attrs.thumbnails.normal,
            })
          )
        : null,
    ];
  },
});
