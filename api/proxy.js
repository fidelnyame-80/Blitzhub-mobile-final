export default async function handler(req, res) {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email parameter is required." });
  }

  try {
    const url = `https://script.google.com/macros/s/AKfycbzSyl0cyG416W5mRNz_Xw6kZrnBV7B9DJvf_SCrjqOrnI_YcenmJRub6RMOxUJgzp20vQ/exec?email=${encodeURIComponent(email)}`;
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Failed to fetch data from Apps Script." });
  }
}
