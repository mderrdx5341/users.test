import User from './User';

class UserListTemplate
{
	private _user: User;

	constructor(user: User)
	{
		this._user = user;
	}

	public buildHtmlElement(): HTMLElement
	{
		let html = document.createElement('div');
		html.innerHTML = 
			`
			<div>
				${this._user.id()}
				${this._user.name()}
				${this._user.email()}
				${this._user.address()}
				<a href="/user/${this._user.id()}/">Edit</a>
				<input type="checkbox" name="userDelete" value="${this._user.id()}">
			</div>
			`
		return html;
	}
}

export default UserListTemplate;
