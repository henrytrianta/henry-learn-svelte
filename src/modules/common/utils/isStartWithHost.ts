const isStartWithHost = (string: string | null) => {
	const pattern = /^https?:\/\/(.*)/;
	if (!string) return false;
	return pattern.test(string);
};

export default isStartWithHost;
