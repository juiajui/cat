export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只允許 POST 請求' });
  }

  const { notifyAt, message, userTag } = req.body;
  const REST_KEY = process.env.ONESIGNAL_REST_KEY; // 這裡會自動去讀你剛剛填的密鑰
  const APP_ID = "a7a8a1b0-bca1-4066-8a01-5bcb5ea204cd";

  try {
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${REST_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        app_id: APP_ID,
        filters: [
          { field: "tag", key: "task_user", relation: "=", value: "yes" }
        ],
        contents: { en: message },
        send_after: notifyAt
      })
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
