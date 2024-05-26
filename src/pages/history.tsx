// History.tsx

import React, { useEffect } from 'react';
import { useInformation } from '@/hooks/dxf/useInformation';
import {
	Box,
	Heading,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Spinner,
	Alert,
	AlertIcon,
	VStack,
	Text,
	Button,
	useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faDownload } from '@fortawesome/free-solid-svg-icons';

const MotionBox = motion(Box);

const History: React.FC = () => {
	const router = useRouter();
	const { token } = useAuth();
	const { information, loading, error } = useInformation(token || '');
	const toast = useToast();

	useEffect(() => {
		if (!token) {
			router.push('/login');
		}
	}, [token, router]);

	return (
		<Box
			minH="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
			bgGradient="linear(to-r, brand.purple, brand.black)"
			p={8}
		>
			<MotionBox
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				bg="brand.white"
				p={8}
				rounded="md"
				shadow="lg"
				maxW="6xl"
				w="full"
			>
				<Heading
					as="h1"
					size="xl"
					mb={6}
					textAlign="center"
					color="brand.black"
				>
					Uploaded Information
				</Heading>
				{loading ? (
					<Spinner size="xl" />
				) : error ? (
					<Alert status="error">
						<AlertIcon />
						{error}
					</Alert>
				) : (
					<VStack spacing={4} align="stretch">
						{information.map((info) => (
							<Box
								key={info.id}
								borderWidth="1px"
								borderRadius="lg"
								overflow="hidden"
								p={4}
								bg="brand.lightGray"
								shadow="sm"
							>
								<Text fontSize="lg" fontWeight="bold" mb={2}>
									{info.description_short}
								</Text>
								<Text fontSize="sm" color="gray.500">
									Uploaded At:{' '}
									{new Date(
										info.uploaded_at,
									).toLocaleString()}
								</Text>
								<Text fontSize="sm" color="gray.500">
									Location: {info.location_city},{' '}
									{info.location_country_code} -{' '}
									{info.location_zip_code}
								</Text>
								<Text fontSize="sm" color="gray.500">
									Source Base: {info.source_base}
								</Text>
								<Text fontSize="sm" color="gray.500" mb={2}>
									Source Endpoint: {info.source_endpoint}
								</Text>
								<Text fontSize="md" mb={4}>
									{info.description_long}
								</Text>
								<VStack spacing={2} align="flex-start">
									<Button
										leftIcon={
											<FontAwesomeIcon icon={faFileAlt} />
										}
										colorScheme="blue"
										as="a"
										href={info.pdf_file}
										target="_blank"
										rel="noopener noreferrer"
									>
										View PDF
									</Button>
									<Button
										leftIcon={
											<FontAwesomeIcon
												icon={faDownload}
											/>
										}
										colorScheme="teal"
										as="a"
										href={info.dxf_file}
										download
									>
										Download DXF
									</Button>
									<Button
										leftIcon={
											<FontAwesomeIcon icon={faFileAlt} />
										}
										colorScheme="orange"
										as="a"
										href={info.image_file}
										target="_blank"
										rel="noopener noreferrer"
									>
										View Image
									</Button>
								</VStack>
							</Box>
						))}
					</VStack>
				)}
			</MotionBox>
		</Box>
	);
};

export default History;
