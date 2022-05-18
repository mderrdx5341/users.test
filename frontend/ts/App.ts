import UsersPanel from './Users/UsersPanel';

class App
{
	private _appContainer: HTMLElement;

	constructor(selector: string)
	{
		this._appContainer = document.querySelector(selector);
	}

	public async run() : Promise<void>
	{
		let usersPanel = new UsersPanel();
		this._appContainer.appendChild(await usersPanel.buildHtmlElement())
	}
}

export default App;
