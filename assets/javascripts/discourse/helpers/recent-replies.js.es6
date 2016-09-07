import { ajax } from 'discourse/lib/ajax';

export function getLatestReplies(context) {
  return ajax('/posts.json').then(function (result) {
  	return result.latest_posts;
  }).catch(() => {
    console.log('getting topic list failed')
    return [];
  })
}
