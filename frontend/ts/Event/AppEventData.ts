class AppEventData
{
	private _data: string;

	constructor(data: string)
	{
		this._data = data;
	}

	public data(): string
	{
		return this._data;
	}
}

export default AppEventData;
