import { useState } from 'react';
import { BASE_API_URL } from '@/config';
import { useAuth } from '@/contexts/AuthContext';
import MembershipAPI from '@/client/MembershipAPI';

const client = new MembershipAPI(BASE_API_URL);

export function useLogin() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const { setToken, setProfile } = useAuth();

	const handleSubmit = async () => {
		setError('');
		setLoading(true);
		if (!email || !password) {
			setError('Please enter both email and password');
			setLoading(false);
			return false;
		}

		try {
			const res = await client.login({ username: email, password });
			setToken(res.token);
			setProfile(res.profile);
			localStorage.setItem('authToken', res.token);
			localStorage.setItem('authProfile', JSON.stringify(res.profile));
			setLoading(false);
			return true;
		} catch (err) {
			setError('Invalid email or password');
			setLoading(false);
			return false;
		}
	};

	return {
		email,
		setEmail,
		password,
		setPassword,
		error,
		handleSubmit,
		loading,
	};
}
