export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow specific HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Respond to OPTIONS request with no content
  }

  // Extract the email parameter from the query
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email parameter is required.' }); // Return error if email is missing
  }

  try {
    // Forward the request to the Apps Script API
    const url = `https://script.google.com/macros/s/AKfycbzSyl0cyG416W5mRNz_Xw6kZrnBV7B9DJvf_SCrjqOrnI_YcenmJRub6RMOxUJgzp20vQ/exec?email=${encodeURIComponent(email)}`;
    const response = await fetch(url);
    const data = await response.json();

    // Return the fetched data to the client
    return res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);

    // Return an error response if something goes wrong
    return res.status(500).json({ error: 'Failed to fetch data from Apps Script.' });
  }
}
