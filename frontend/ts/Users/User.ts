class User {
	protected _id: number;
	protected _name: string;
	protected _email: string;
	protected _address: string;

	constructor(id: number, name: string, email: string, address: string)
	{
		this._id = id;
		this._name = name;
		this._email = email;
		this._address = address;
	}

	public id() : number
	{
		return this._id;
	}

	public name() : string
	{
		return this._name;
	}

	public email() : string
	{
		return this._email;
	}

	public address() : string
	{
		return this._address;
	}
}

export default User;
