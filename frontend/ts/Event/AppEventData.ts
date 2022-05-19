class AppEventData
{
	private _data: string;
	private _id: number;

	constructor(data: string, id: number = 0)
	{
		this._data = data;
		this._id = id;
	}

	public data(): string
	{
		return this._data;
	}

	public id(): number
	{
		return this._id;
	}
}

export default AppEventData;
