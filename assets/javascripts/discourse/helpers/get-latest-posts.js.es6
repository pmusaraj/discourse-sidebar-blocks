export function getLatestPosts(context) {
  const container = Discourse.__container__;
  const store = container.lookup('store:main');
  if (context.attrs.category)
    var filter = "c/" + context.attrs.category;
  if (context.attrs.tag)
    var filter = "tags/" + context.attrs.tag;
  return store.findFiltered("topicList", {filter: filter}).then((result) => {
    return result.topic_list.topics;
  }).catch(() => {
    console.log('getting topic list failed')
    return [];
  })
}
