/* eslint-disable no-mixed-spaces-and-tabs */
class RequestManager {
	constructor(baseURL) {
		this.baseURL = baseURL;
		this.accessToken = null;
	}

	setAccessToken(token) {
		this.accessToken = token;
	}

	async sendRequest(endpoint, method, data = null) {
		const url = `${this.baseURL}${endpoint}`;

		// eslint-disable-next-line no-useless-catch
		try {
			const options = {
				method: method,
				headers: {
					'Content-Type': 'application/json',
					Authorization: this.accessToken ? `Bearer ${this.accessToken}` : '',
				},
				// Check if data is FormData, if so, set it directly as the body
				body: data instanceof FormData ? data : JSON.stringify(data),
				mode: 'cors',
			};

			// If data is FormData, set 'Content-Type' to undefined (let the browser set it)
			if (data instanceof FormData) {
				delete options.headers['Content-Type'];
			}

			// If data is FormData, set 'Content-Type' to undefined (let the browser set it)
			if (method === 'GET' || method === 'DELETE') {
				delete options.body;
			}

			const response = await fetch(url, options);

			if (!response.ok) {
				throw new Error(`Erro na solicitação: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			throw error;
		}
	}
}

// eslint-disable-next-line no-undef
export default RequestManager;
