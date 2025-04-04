const generateNgoTagNotificationHTML = (ngoName, ngoEmail, ngoLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NGO Tag Notification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .header {
      padding: 10px 0;
      border-bottom: 2px solid #f4f4f4;
    }
    .header h1 {
      color: #007bff;
      margin: 0;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
      color: #555555;
    }
    .footer {
      font-size: 12px;
      color: #777777;
      margin-top: 20px;
      border-top: 2px solid #f4f4f4;
      padding-top: 10px;
    }
    .button {
      display: inline-block;
      background-color: #007bff;
      color: #ffffff;
      padding: 10px 20px;
      margin: 20px 0;
      border-radius: 5px;
      text-decoration: none;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>NGO Assistance Needed</h1>
    </div>
    <div class="content">
      <p>Hello <strong>${ngoName}</strong>,</p>
      <p>We wanted to inform you that your NGO has been tagged in a post, and your assistance might be needed.</p>
      <p>You can view all tagged posts related to your NGO by clicking the button below:</p>
      <a href="${ngoLink}" target="_blank" class="button">View Tagged Posts</a>
      <p>If you have any questions or need support, feel free to reach out to us.</p>
    </div>
    <div class="footer">
      <p>NGO Email: <strong>${ngoEmail}</strong></p>
      <p>Need assistance? Contact us at support@codescorer.com</p>
    </div>
  </div>
</body>
</html>
`;

export default generateNgoTagNotificationHTML;
