import baseApi from './baseApi';

const search = async (text) => {
  const token = `X4XsklGpZ2PNKqqaMR01n53ee5Pyv9ZpatIvcs9DhQ5PrYfhM8z8c6jm`;
  
  try {
    const response = await baseApi.get('/search?', {
      params: {
        query:text,
        per_page:80
		},
      headers: {
        Authorization: `${token}`,
      },
    });
	
  return response;
    // console.log(JSON.stringify(response.data, null, 2));  // Beautified JSON output
  } catch (error) {
    console.error(error);  // Used console.error for error logging
  }
};

export default search;
