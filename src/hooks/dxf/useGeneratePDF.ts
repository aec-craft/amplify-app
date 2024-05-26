// hooks/dxf/useGeneratePDF.ts
import { useState } from 'react';
import axios from 'axios';
import { BASE_API_URL } from '@/config';
import MembershipAPI from '@/client/MembershipAPI';

const client = new MembershipAPI(BASE_API_URL);

export function useGeneratePDF(token?: string) {
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const handleGeneratePDF = async (dxfFile: File) => {
		setLoading(true);
		setError('');
		try {
			const response = await client.generatePDF(token || '', dxfFile);
			return new Blob([response], { type: 'application/pdf' });
		} catch (err) {
			if (axios.isAxiosError(err) && err.response?.data) {
				setError(err.response.data.detail || 'Failed to generate PDF.');
			} else {
				setError('Failed to generate PDF.');
			}
		} finally {
			setLoading(false);
		}
		return null;
	};

	return {
		error,
		loading,
		handleGeneratePDF,
	};
}
