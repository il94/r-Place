import Cookies from "js-cookie";

interface AxiosHeadersInterface {
	headers: {
	  Authorization: string;
	};
  }
  
export class AxiosHeaders implements AxiosHeadersInterface {
	headers: {
		Authorization: string;
	}

	constructor() {
		this.headers = {
			'Authorization': `Bearer ${Cookies.get("access_token")}`
		}
	}
}

export const config = {
	penPrice: 0,
	bombPrice: 15,
	screenPrice: 9999,

	penGive: 1,

	bombZone: 11
}