import nodemailer from "nodemailer";

interface EnquiryEmailData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  city?: string;
  requirementType: string;
  quantity?: string;
  productInterested?: string;
  preferredMaterial?: string;
  preferredFinish?: string;
  message: string;
  referenceFileUrl?: string;
}

export async function sendEnquiryNotificationEmail(data: EnquiryEmailData) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;
  const receiverEmail =
    process.env.CONTACT_RECEIVER_EMAIL || gmailUser || "admin@experiencelife.design";

  if (!gmailUser || !gmailPassword) {
    console.log(
      "⚠️ [Nodemailer] Gmail credentials not set in environment variables. Logging enquiry to console:"
    );
    console.log(JSON.stringify(data, null, 2));
    return {
      success: true,
      simulated: true,
      message: "Enquiry logged (Gmail SMTP not configured).",
    };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPassword,
    },
  });

  const mailOptions = {
    from: `"Experience Life Enquiries" <${gmailUser}>`,
    to: receiverEmail,
    replyTo: data.email,
    subject: `New Project Enquiry: ${data.requirementType} — ${data.name}${
      data.company ? ` (${data.company})` : ""
    }`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 650px; margin: 0 auto; background: #FAF8F5; border: 1px solid #E5E0D8; padding: 32px; border-radius: 8px; color: #121212;">
        <div style="border-bottom: 2px solid #121212; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="margin: 0; font-size: 22px; letter-spacing: 0.1em; text-transform: uppercase;">EXPERIENCE LIFE</h1>
          <p style="margin: 4px 0 0 0; color: #78716C; font-size: 13px;">New Project & Product Enquiry Received</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA; color: #78716C; width: 35%;">Client Name:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA; font-weight: 600;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA; color: #78716C;">Email Address:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA;"><a href="mailto:${data.email}" style="color: #A87C4F;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA; color: #78716C;">Phone:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA;"><a href="tel:${data.phone}" style="color: #A87C4F;">${data.phone}</a></td>
          </tr>
          ${
            data.company
              ? `<tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA; color: #78716C;">Company / Org:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA; font-weight: 600;">${data.company}</td>
                </tr>`
              : ""
          }
          ${
            data.city
              ? `<tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA; color: #78716C;">City:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA;">${data.city}</td>
                </tr>`
              : ""
          }
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA; color: #78716C;">Requirement Type:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA; font-weight: 600; color: #A87C4F;">${data.requirementType}</td>
          </tr>
          ${
            data.quantity
              ? `<tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA; color: #78716C;">Quantity:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA;">${data.quantity}</td>
                </tr>`
              : ""
          }
          ${
            data.productInterested
              ? `<tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA; color: #78716C;">Product Interested In:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA;">${data.productInterested}</td>
                </tr>`
              : ""
          }
          ${
            data.preferredMaterial
              ? `<tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA; color: #78716C;">Preferred Material:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA;">${data.preferredMaterial}</td>
                </tr>`
              : ""
          }
          ${
            data.preferredFinish
              ? `<tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA; color: #78716C;">Preferred Finish:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA;">${data.preferredFinish}</td>
                </tr>`
              : ""
          }
          ${
            data.referenceFileUrl
              ? `<tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA; color: #78716C;">Reference File:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E7E2DA;"><a href="${data.referenceFileUrl}" target="_blank" style="color: #A87C4F;">View Uploaded File</a></td>
                </tr>`
              : ""
          }
        </table>

        <div style="margin-top: 24px; padding: 20px; background: #FFFFFF; border-left: 3px solid #121212; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; color: #78716C; letter-spacing: 0.05em;">Client Message</h4>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>

        <div style="margin-top: 32px; font-size: 12px; color: #A8A29E; text-align: center; border-top: 1px solid #E7E2DA; padding-top: 16px;">
          EXPERIENCE LIFE — Modern Furniture for Every Space<br/>
          Confidential Client Enquiry Notice
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send email via Gmail:", error);
    return { success: false, error };
  }
}
