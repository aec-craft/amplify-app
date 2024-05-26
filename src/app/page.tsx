// src/app/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Heading } from '@chakra-ui/react';

const HomePage: React.FC = () => {
	const router = useRouter();

	useEffect(() => {
		router.push('/login');
	}, [router]);

	return null;
};

export default HomePage;
