export type User = {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
};

export type Profile = {
	id: number;
	user: User;
	biography?: string | null;
	is_disabled: boolean;
};

export type LoginRequest = {
	username: string;
	password: string;
};

export type LoginResponse = {
	profile: Profile;
	token: string;
};

export type Information = {
	id: number;
	dxf_file: string;
	pdf_file: string;
	uploaded_at: string;
	example_id: string;
	source_base: string;
	source_endpoint: string;
	location_city: string;
	location_country_code: string;
	location_zip_code: string;
	location_latitude: number;
	location_longitude: number;
	description_short: string;
	description_long: string;
	image_file: string;
};

export type InformationUploadRequest = {
	author: number;
	source_base: string;
	source_endpoint: string;
	location_city: string;
	location_country_code: string;
	location_latitude: number;
	location_longitude: number;
	location_zip_code: string;
	description_short: string;
	description_long: string;
	dxf_file: File;
	image_file: File;
};

export type InformationUploadResponse = {
	id: number;
	graph: string;
};
