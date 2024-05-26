import { useState } from 'react';
import axios from 'axios';
import { BASE_API_URL } from '@/config';
import MembershipAPI from '@/client/MembershipAPI';

const client = new MembershipAPI(BASE_API_URL);

interface FormErrors {
	[key: string]: string;
}

export function useUpload(token?: string) {
	const [formData, setFormData] = useState<FormData>(new FormData());
	const [error, setError] = useState<string>('');
	const [formErrors, setFormErrors] = useState<FormErrors>({});
	const [loading, setLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const [pdfUrl, setPdfUrl] = useState<string>(''); // Add pdfUrl state

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => {
			const newFormData = new FormData();
			prevFormData.forEach((val, key) => newFormData.append(key, val));
			newFormData.set(name, value);
			return newFormData;
		});
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, files } = e.target;
		if (files && files[0]) {
			setFormData((prevFormData) => {
				const newFormData = new FormData();
				prevFormData.forEach((val, key) =>
					newFormData.append(key, val),
				);
				newFormData.set(name, files[0]);
				return newFormData;
			});
		}
	};

	const handleSubmit = async () => {
		setError('');
		setFormErrors({});
		setLoading(true);
		setSuccess(false);

		if (!token) {
			setError('No token provided');
			setLoading(false);
			return;
		}

		try {
			const response = await client.uploadInformation(token, formData);
			console.log('API Response:', response); // Log the response
			setPdfUrl(response.pdf_url); // Set the pdfUrl state
			setLoading(false);
			setSuccess(true);
		} catch (err: unknown) {
			if (axios.isAxiosError(err) && err.response?.data) {
				if (err.response.data.errors) {
					setFormErrors(err.response.data.errors as FormErrors);
				} else {
					setError(
						err.response.data.detail || 'Failed to upload data.',
					);
				}
			} else {
				setError('Failed to upload data.');
			}
			setLoading(false);
		}
	};

	return {
		formData,
		setFormData,
		handleChange,
		handleFileChange,
		handleSubmit,
		error,
		formErrors,
		loading,
		success,
		pdfUrl,
	};
}
