export function getLatestPosts(context) {
  const store = context.container.lookup('store:main');
  var filter = "c/" + context.attrs.category;
  return store.findFiltered("topicList", {filter: filter}).then((result) => {
    return result.topic_list.topics;
  }).catch(() => {
    console.log('getting topic list failed')
    return [];
  })
}
