import React, { useEffect, useState } from 'react';
import { useUpload } from '@/hooks/dxf/useUpload';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	VStack,
	Heading,
	useToast,
	Tooltip,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const MotionBox = motion(Box);

const UploadPage: React.FC = () => {
	const router = useRouter();
	const { token } = useAuth();
	const {
		formData,
		handleChange,
		handleFileChange,
		handleSubmit,
		error,
		formErrors,
		loading,
		success,
		pdfUrl, // Add pdfUrl to the destructured values
	} = useUpload(token || '');

	const toast = useToast();
	const [localFormErrors, setLocalFormErrors] = useState<{
		[key: string]: string;
	}>({});

	useEffect(() => {
		if (!token) {
			router.push('/login');
		}
	}, [token, router]);

	const validateForm = () => {
		const errors: { [key: string]: string } = {};
		if (!formData.get('source_base')) {
			const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
			if (!formData.get('source_base')?.toString().match(urlRegex)) {
				errors.source_base = 'Source Base must be a valid URL';
			}
		}
		if (!formData.get('source_endpoint')) {
			const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
			if (!formData.get('source_endpoint')?.toString().match(urlRegex)) {
				errors.source_endpoint = 'Source Endpoint must be a valid URL';
			}
		}
		if (
			!formData
				.get('location_city')
				?.toString()
				.match(/^[a-zA-Z\s]+$/)
		) {
			errors.location_city = 'City must be a string';
		}
		if (
			!formData
				.get('location_country_code')
				?.toString()
				.match(/^[A-Z]{2}$/)
		) {
			errors.location_country_code =
				'Country Code must be two capital letters';
		}
		if (
			!formData
				.get('location_zip_code')
				?.toString()
				.match(/^\d{5}$/)
		) {
			errors.location_zip_code = 'Zip Code must be exactly 5 digits';
		}
		if (!formData.get('description_short')) {
			errors.description_short = 'Short Description is required';
		}
		if (
			!formData.get('description_long') ||
			(formData.get('description_long')?.toString().length || 0) < 255
		) {
			errors.description_long =
				'Long Description must be at least 255 characters';
		}
		if (!formData.get('dxf_file')) {
			errors.dxf_file = 'DXF File is required';
		}
		if (!formData.get('image_file')) {
			errors.image_file = 'Image File is required';
		}

		setLocalFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (validateForm()) {
			await handleSubmit();
			if (success) {
				toast({
					title: 'Success',
					description: 'Data uploaded successfully.',
					status: 'success',
					duration: 5000,
					isClosable: true,
				});
			} else {
				toast({
					title: 'Error',
					description: error,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
		} else {
			toast({
				title: 'Error',
				description: 'Please fix the errors in the form',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const fieldData = [
		{
			label: 'Source Base',
			name: 'source_base',
			type: 'text',
			tooltip: 'The base URL of the source. Source Base is required.',
			placeholder: 'https://www.example.com',
		},
		{
			label: 'Source Endpoint',
			name: 'source_endpoint',
			type: 'text',
			tooltip:
				'The endpoint URL of the source. Source Endpoint must be a valid URL.',
			placeholder: 'https://www.example.com/image.png',
		},
		{
			label: 'City',
			name: 'location_city',
			type: 'text',
			tooltip:
				'The city where the source is located. City must be a string.',
			placeholder: 'Berlin',
		},
		{
			label: 'Country Code',
			name: 'location_country_code',
			type: 'text',
			tooltip:
				'The 2-letter country code (e.g., US). Country Code must be two capital letters.',
			placeholder: 'DE',
		},
		{
			label: 'Zip Code',
			name: 'location_zip_code',
			type: 'text',
			tooltip: 'The postal zip code. Zip Code must be exactly 5 digits.',
			placeholder: '10115',
		},
		{
			label: 'Short Description',
			name: 'description_short',
			type: 'text',
			tooltip:
				'A short description of the source. Short Description is required.',
			placeholder: 'Short description here...',
		},
	];

	return (
		<Box
			minH="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
			bgGradient="linear(to-r, brand.purple, brand.black)"
		>
			<MotionBox
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				bg="brand.white"
				p={8}
				rounded="md"
				shadow="lg"
				maxW="lg"
				w="full"
			>
				<Heading
					as="h1"
					size="xl"
					mb={6}
					textAlign="center"
					color="brand.black"
				>
					Upload Information
				</Heading>
				<form onSubmit={onSubmit}>
					<VStack spacing={4}>
						{fieldData.map(
							({ label, name, type, tooltip, placeholder }) => (
								<FormControl
									key={name}
									id={name}
									isInvalid={
										!!(
											localFormErrors[name] ||
											formErrors[name]
										)
									}
								>
									<FormLabel color="brand.black">
										{label}
										<Tooltip label={tooltip} fontSize="md">
											<span
												style={{
													marginLeft: '8px',
													cursor: 'pointer',
													color: 'brand.blue',
												}}
											>
												<FontAwesomeIcon
													icon={faInfoCircle}
													color="#E01E5A"
													size="1x"
												/>
											</span>
										</Tooltip>
									</FormLabel>
									<Input
										type={type}
										name={name}
										placeholder={placeholder}
										onChange={handleChange}
										borderColor="brand.blue"
										focusBorderColor="brand.red"
									/>
									{(localFormErrors[name] ||
										formErrors[name]) && (
										<Box color="red.500">
											{localFormErrors[name] ||
												formErrors[name]}
										</Box>
									)}
								</FormControl>
							),
						)}
						<FormControl
							id="description_long"
							isInvalid={
								!!(
									localFormErrors.description_long ||
									formErrors.description_long
								)
							}
						>
							<FormLabel color="brand.black">
								Long Description
								<Tooltip
									label="A detailed description of the source. Long Description is required."
									fontSize="md"
								>
									<span
										style={{
											marginLeft: '8px',
											cursor: 'pointer',
											color: 'brand.blue',
										}}
									>
										<FontAwesomeIcon
											icon={faInfoCircle}
											color="#E01E5A"
											size="1x"
										/>
									</span>
								</Tooltip>
							</FormLabel>
							<Textarea
								name="description_long"
								placeholder="Long description here (at least 255 characters)..."
								onChange={handleChange}
								borderColor="brand.blue"
								focusBorderColor="brand.red"
							/>
							{(localFormErrors.description_long ||
								formErrors.description_long) && (
								<Box color="red.500">
									{localFormErrors.description_long ||
										formErrors.description_long}
								</Box>
							)}
						</FormControl>
						<FormControl
							id="dxf_file"
							isInvalid={
								!!(
									localFormErrors.dxf_file ||
									formErrors.dxf_file
								)
							}
						>
							<FormLabel color="brand.black">
								DXF File
								<Tooltip
									label="Upload the DXF file. DXF File is required."
									fontSize="md"
								>
									<span
										style={{
											marginLeft: '8px',
											cursor: 'pointer',
											color: 'brand.blue',
										}}
									>
										<FontAwesomeIcon
											icon={faInfoCircle}
											color="#E01E5A"
											size="1x"
										/>
									</span>
								</Tooltip>
							</FormLabel>
							<Input
								type="file"
								name="dxf_file"
								accept=".dxf"
								onChange={handleFileChange}
								borderColor="brand.blue"
								focusBorderColor="brand.red"
							/>
							{(localFormErrors.dxf_file ||
								formErrors.dxf_file) && (
								<Box color="red.500" padding={4}>
									{localFormErrors.dxf_file ||
										formErrors.dxf_file}
								</Box>
							)}
						</FormControl>
						<FormControl
							id="image_file"
							isInvalid={
								!!(
									localFormErrors.image_file ||
									formErrors.image_file
								)
							}
						>
							<FormLabel color="brand.black">
								Image File
								<Tooltip
									label="Upload the image file. Image File is required."
									fontSize="md"
								>
									<span
										style={{
											marginLeft: '8px',
											cursor: 'pointer',
											color: 'brand.blue',
										}}
									>
										<FontAwesomeIcon
											icon={faInfoCircle}
											color="#E01E5A"
											size="1x"
										/>
									</span>
								</Tooltip>
							</FormLabel>
							<Input
								type="file"
								name="image_file"
								accept="image/*"
								onChange={handleFileChange}
								borderColor="brand.blue"
								focusBorderColor="brand.red"
							/>
							{(localFormErrors.image_file ||
								formErrors.image_file) && (
								<Box color="red.500">
									{localFormErrors.image_file ||
										formErrors.image_file}
								</Box>
							)}
						</FormControl>
						<Button
							type="submit"
							bg="brand.blue"
							color="brand.white"
							_hover={{ bg: 'brand.red' }}
							size="lg"
							width="full"
							isLoading={loading}
						>
							Submit
						</Button>
						{error && <Box color="red.500">{error}</Box>}
						{pdfUrl && (
							<Box mt={4}>
								<a
									href={pdfUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Button colorScheme="blue">View PDF</Button>
								</a>
							</Box>
						)}
					</VStack>
				</form>
			</MotionBox>
		</Box>
	);
};

export default UploadPage;
