const Verification_Email_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 0; margin: 0; background-color: rgb(29,28,28); color: white;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1d1c1c; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.3); color: white;">
          <tr>
            <td style="padding: 20px; text-align: center; font-size: 24px; font-weight: bold; border-bottom: 1px solid #444;">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 8px;">
                <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"/>
                <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"/>
                <path d="m2.3 2.3 7.286 7.286"/>
                <circle cx="11" cy="11" r="2"/>
              </svg>
              Writly-Dot
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px; margin-bottom: 16px;">Hello <strong>{username}</strong>,</p>
              <p style="font-size: 16px; margin-bottom: 24px;">Thanks for signing up! Please use the verification code below to complete your registration:</p>
              <p style="font-size: 28px; font-weight: bold; text-align: center; background-color: #2f2e2e; padding: 15px; border-radius: 6px; letter-spacing: 2px; color: #4f46e5;">
                {verificationCode}
              </p>
              <p style="font-size: 14px; margin-top: 30px; color: #aaa;">If you did not request this, please ignore this email.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #1d1c1c; padding: 15px; text-align: center; font-size: 12px; color: #666;">
              &copy; ${new Date().getFullYear()} @neyuj_11. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

module.exports = Verification_Email_Template;
