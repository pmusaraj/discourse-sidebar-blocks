export function getLatestPosts(attrs) {
  const container = Discourse.__container__;
  const store = container.lookup('store:main');
  if (attrs.category)
    var filter = "c/" + attrs.category;
  if (attrs.tag)
    var filter = "tags/" + attrs.tag;

  return store.findFiltered("topicList", {filter: filter}).then((result) => {
    for (var i = result.topic_list.topics.length - 1; i >= 0; i--) {
      // remove archived posts
      if (result.topic_list.topics[i].archived) {
        result.topic_list.topics.splice(i, 1);
      }
    }

    if (result.topic_list.topics.length > 0) {
      // limit list length
      for (var i = result.topic_list.topics.length - 1; i >= 0; i--) {
        if (i >= attrs.count) {
          result.topic_list.topics.splice(i, 1);
        }
      }
    }

    return result.topic_list.topics;
  }).catch(() => {
    console.log('getting topic list failed')
    return [];
  })
}
