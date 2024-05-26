// pages/api/[...all].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'POST') {
		try {
			const response = await axios.post(
				'http://your-django-backend-url/api/information-upload/',
				req.body,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${req.headers.authorization}`, // Include the auth token if necessary
					},
				},
			);
			res.status(response.status).json(response.data);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Failed to upload information' });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
