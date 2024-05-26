import axios, { AxiosResponse, AxiosError } from 'axios';

import {
	LoginRequest,
	LoginResponse,
	Information,
	InformationUploadResponse,
} from './types';

class MembershipAPI {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	// Utility function to handle errors
	private async handleRequest<T>(
		requestPromise: Promise<AxiosResponse<T>>,
	): Promise<T> {
		try {
			const response = await requestPromise;
			return response.data;
		} catch (error: any) {
			if (error && error.response) {
				const axiosError = error as AxiosError;
				console.error(
					`Error: ${axiosError.response?.status}`,
					axiosError.response?.data,
				);
			} else {
				console.error('An unknown error occurred:', error);
			}
			throw error;
		}
	}

	async login(req: LoginRequest): Promise<LoginResponse> {
		// Ensure this endpoint matches your backend's login endpoint
		return this.handleRequest(
			axios.post(`${this.baseUrl}/dxf_app/login/`, req),
		);
	}

	async updateUserProfile(
		token: string,
		updatedData: any,
		image?: File | null,
	) {
		const formData = new FormData();
		Object.keys(updatedData).forEach((key) => {
			formData.append(key, updatedData[key]);
		});
		if (image) {
			formData.append('profile_picture', image);
		}
		return this.handleRequest(
			axios.patch(`${this.baseUrl}/profile/`, formData, {
				headers: {
					Authorization: `Token ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			}),
		);
	}

	async getUserProfile(token: string) {
		return this.handleRequest(
			axios.get(`${this.baseUrl}/membership/profile/`, {
				headers: {
					Authorization: `Token ${token}`,
				},
			}),
		);
	}

	async uploadInformation(
		token: string,
		formData: FormData,
	): Promise<{ pdf_url: string }> {
		return this.handleRequest(
			axios.post(`${this.baseUrl}/dxf_app/upload/`, formData, {
				headers: {
					Authorization: `Token ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			}),
		);
	}

	async fetchUserInformation(token: string): Promise<Information[]> {
		return this.handleRequest(
			axios.get(`${this.baseUrl}/dxf_app/information/`, {
				headers: {
					Authorization: `Token ${token}`,
				},
			}),
		);
	}

	async generatePDF(token: string, dxfFile: File): Promise<Blob> {
		const formData = new FormData();
		formData.append('dxf_file', dxfFile);

		return axios
			.post(`${this.baseUrl}/dxf_app/generate-pdf/`, formData, {
				headers: {
					Authorization: `Token ${token}`,
					'Content-Type': 'multipart/form-data',
				},
				responseType: 'blob',
			})
			.then((response) => response.data);
	}
}

export default MembershipAPI;
