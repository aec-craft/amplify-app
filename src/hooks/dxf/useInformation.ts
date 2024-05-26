// useInformation.ts

import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_API_URL } from '@/config';
import MembershipAPI from '@/client/MembershipAPI';
import { Information } from '@/client/types';

const client = new MembershipAPI(BASE_API_URL);

export function useInformation(token?: string) {
	const [information, setInformation] = useState<Information[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		if (token) {
			setLoading(true);
			client
				.fetchUserInformation(token)
				.then((data) => {
					setInformation(data);
					setLoading(false);
				})
				.catch((err) => {
					if (axios.isAxiosError(err) && err.response?.data) {
						setError(
							err.response.data.detail || 'Failed to fetch data.',
						);
					} else {
						setError('Failed to fetch data.');
					}
					setLoading(false);
				});
		}
	}, [token]);

	return { information, loading, error };
}
