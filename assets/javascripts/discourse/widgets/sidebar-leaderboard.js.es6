import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';
import { getLeaderboardList } from 'discourse/plugins/discourse-sidebar-blocks/discourse/helpers/leaderboard-list';
import { iconNode } from "discourse-common/lib/icon-library";

createWidget('sidebar-leaderboard', {
  tagName: 'div.sidebar-leaderboard',
	buildKey: attrs => 'sidebar-leaderboard',
	defaultState() {
		return { loading: false };
	},
	refreshUsers() {
		if (this.state.loading) { return; }
		this.state.loading = true
		this.state.users = 'empty'
		getLeaderboardList(this).then((result) => {
			// console.log("refreshUsers List : ", result);
			if (result.length) {
				this.state.users = result;
			} else {
				this.state.users = 'empty'
			}
			this.state.loading = false
			this.scheduleRerender()
		})
	},

	leaderboardRow(user){
		// console.log("user : ", user);
		return h("tr",
			{
				"attributes": {
					"data-user-card": user.user.username
				}
			},
			[
				h('td', [
					h('div.useravatar', this.attach('topic-participant', user.user)),
					h('div.username.trigger-data-card', user.user.username)
				]),
				h('td', h('span.points', user.likes_received+''))
			]);
	},

	leaderboardHeader(){
		return h(
			'h3.sidebar-heading', h(
				'a', {
					'attributes':{
						'href':'/u',
						'title':'Leaderboard'
					}
				},
				'Leaderboard'
			)
		);
	},

	html(attrs, state) {
		if (!state.users) {
			this.refreshUsers();
		}
		const result = [];
		if (state.loading) {
			result.push(h('div.spinner-container', h('div.spinner')));
		} else if (state.users !== 'empty') {
			result.push(this.leaderboardHeader());

			const users = state.users.map( user => this.leaderboardRow(user))

			result.push(
				h("div.directory",
					h("table", [
					  h("tbody", [
					    h("tr", [
					      h("th", 'User'),
					      h("th", [
									iconNode('heart'),
									h('span','Received')
								])
					    ]),
					    users
					  ])
					])
				)
			);
		} else {
			result.push(h('div.no-messages', 'No users loaded.'))
		}

		return result;
	},

});
