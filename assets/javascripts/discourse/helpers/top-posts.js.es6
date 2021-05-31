import { ajax } from 'discourse/lib/ajax';

export function getTopPosts(context) {
  return ajax('/top.json').then(function (result) {
  	return result.topic_list.topics;
  }).catch(() => {
    console.log('getting topic list failed')
    return [];
  })
}