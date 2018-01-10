import { ajax } from 'discourse/lib/ajax';

export function getLeaderboardList(context) {
	const period = Discourse.SiteSettings.sidebar_leaderboard_period;
	const count = Discourse.SiteSettings.sidebar_leaderboard_count;
  return ajax('/directory_items.json?period='+period+'&order=likes_received').then(function (result) {
		// console.log("Leaderboard list :", result);
  	return result.directory_items.splice(0,count);
  }).catch(() => {
    // console.log('getting user list failed')
    return [];
  })
}
