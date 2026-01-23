import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { type, timeline, vision, email, customType, customTimeline } = req.body;

    // Validate required fields
    if (!email || !vision) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and vision description are required' 
      });
    }

    // Determine the actual values (use custom if provided)
    const projectType = customType || type;
    const projectTimeline = customTimeline || timeline;

    // Create reusable transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Create email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.TO_ADDRESS,
      subject: `New Consultation Request - ${projectType || 'Unknown Type'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0d0d0d; border-bottom: 2px solid #8c7e6d; padding-bottom: 10px;">
            New Consultation Request
          </h2>
          
          <div style="margin-top: 30px;">
            <h3 style="color: #8c7e6d; margin-bottom: 20px;">Project Details</h3>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 10px; background-color: #f5f2ed; color: #0d0d0d; font-weight: bold; width: 40%;">
                  Project Type:
                </td>
                <td style="padding: 10px; background-color: #1a1a1a; color: #f5f2ed;">
                  ${projectType || 'Not specified'}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f5f2ed; color: #0d0d0d; font-weight: bold;">
                  Timeline:
                </td>
                <td style="padding: 10px; background-color: #1a1a1a; color: #f5f2ed;">
                  ${projectTimeline || 'Not specified'}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f5f2ed; color: #0d0d0d; font-weight: bold;">
                  Email:
                </td>
                <td style="padding: 10px; background-color: #1a1a1a; color: #f5f2ed;">
                  ${email}
                </td>
              </tr>
            </table>
            
            <div style="margin-top: 30px;">
              <h3 style="color: #8c7e6d; margin-bottom: 10px;">Vision Description</h3>
              <div style="padding: 20px; background-color: #1a1a1a; color: #f5f2ed; border-left: 3px solid #8c7e6d; font-style: italic; line-height: 1.6;">
                ${vision.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #8c7e6d; font-size: 12px; color: #b8b0a3;">
            <p>This email was sent from the Vastu consultation form.</p>
            <p>Submitted at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `
New Consultation Request

Project Type: ${projectType || 'Not specified'}
Timeline: ${projectTimeline || 'Not specified'}
Email: ${email}

Vision Description:
${vision}

---
Submitted at: ${new Date().toLocaleString()}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ 
      success: true, 
      message: 'Consultation request sent successfully' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send consultation request. Please try again later.' 
    });
  }
}
