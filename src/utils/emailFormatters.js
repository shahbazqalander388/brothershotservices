import { BUSINESS_INFO } from '../data/businessInfo';

/**
 * Utility to format quote inquiries, contact messages, and applications
 * into professionally organized emails with clearly separated sections
 * (both plain text with RFC-compliant CRLF breaks and styled HTML).
 */

/**
 * Format a quote inquiry into clean plain text and HTML with separated sections.
 */
export function formatQuoteInquiry(data) {
  const customerName = (data.customerName || '').trim() || 'Valued Customer';
  const email = (data.email || '').trim() || 'Not provided';
  const phone = (data.phone || '').trim() || 'Not provided';
  const pickupLocation = (data.pickupLocation || '').trim() || 'Not specified';
  const deliveryLocation = (data.deliveryLocation || '').trim() || 'Not specified';
  const loadType = (data.loadType || '').trim() || 'Hotshot Delivery Services';
  const pickupDate = (data.pickupDate || '').trim() || 'Earliest Available';
  const dimensionsWeight = (data.dimensionsWeight || '').trim() || 'N/A - To be confirmed';
  const additionalDetails = (data.additionalDetails || '').trim() || 'None provided';

  const subject = `Transportation Quote Request: ${loadType} — ${customerName}`;

  const plainText = [
    'TRANSPORTATION QUOTE INQUIRY',
    'Brothers Hotshot Services',
    '',
    '1. CUSTOMER INFORMATION',
    `Customer / Company: ${customerName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    '',
    '2. ROUTE & PICKUP DETAILS',
    `Pickup Location: ${pickupLocation}`,
    `Delivery Location: ${deliveryLocation}`,
    `Preferred Pickup Date: ${pickupDate}`,
    '',
    '3. CARGO SPECIFICATIONS',
    `Service / Load Type: ${loadType}`,
    `Dimensions & Weight: ${dimensionsWeight}`,
    '',
    '4. ADDITIONAL DETAILS',
    additionalDetails,
    '',
    '----------------------------------------',
    'Submitted via Brothers Hotshot Web Portal',
    `Direct Dispatch: ${BUSINESS_INFO.phone}`,
    `Dispatch Email: ${BUSINESS_INFO.email}`,
    `Operations Hub: ${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.province}`,
  ].join('\r\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0b0d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e5e7eb;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0b0b0d; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 640px; background-color: #131317; border: 1px solid #d4af37; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.6);">
          <!-- Header -->
          <tr>
            <td style="background-color: #17171e; padding: 24px 20px; border-bottom: 2px solid #d4af37; text-align: center;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">BROTHERS HOTSHOT SERVICES</h1>
              <p style="margin: 6px 0 0 0; font-size: 12px; font-weight: 700; color: #d4af37; text-transform: uppercase; letter-spacing: 1.5px;">Online Transportation Quote Inquiry</p>
              <p style="margin: 6px 0 0 0; font-size: 11px; color: #9ca3af;">Red Deer, AB Hub &bull; Direct Phone: ${BUSINESS_INFO.phone} &bull; 24/7 Dispatch</p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 24px 20px;">
              <!-- 1. Customer Information -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 18px; background-color: #0e0e12; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; overflow: hidden;">
                <tr>
                  <td colspan="2" style="background-color: #17171c; padding: 10px 16px; border-bottom: 1px solid rgba(212,175,55,0.3); font-size: 12px; font-weight: 700; color: #d4af37; text-transform: uppercase; letter-spacing: 0.5px;">
                    1. Customer Information
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #9ca3af; width: 38%; border-bottom: 1px solid rgba(255,255,255,0.04);">Customer / Company:</td>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #ffffff; border-bottom: 1px solid rgba(255,255,255,0.04);">${escapeHtml(customerName)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #9ca3af; border-bottom: 1px solid rgba(255,255,255,0.04);">Email Address:</td>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #d4af37; border-bottom: 1px solid rgba(255,255,255,0.04);"><a href="mailto:${escapeHtml(email)}" style="color: #d4af37; text-decoration: none;">${escapeHtml(email)}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #9ca3af;">Phone Number:</td>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #ffffff;"><a href="tel:${escapeHtml(phone)}" style="color: #ffffff; text-decoration: none;">${escapeHtml(phone)}</a></td>
                </tr>
              </table>

              <!-- 2. Route & Location Details -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 18px; background-color: #0e0e12; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; overflow: hidden;">
                <tr>
                  <td colspan="2" style="background-color: #17171c; padding: 10px 16px; border-bottom: 1px solid rgba(212,175,55,0.3); font-size: 12px; font-weight: 700; color: #d4af37; text-transform: uppercase; letter-spacing: 0.5px;">
                    2. Route & Location Details
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #9ca3af; width: 38%; border-bottom: 1px solid rgba(255,255,255,0.04);">Pickup Location (Origin):</td>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #ffffff; border-bottom: 1px solid rgba(255,255,255,0.04);">${escapeHtml(pickupLocation)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #9ca3af; border-bottom: 1px solid rgba(255,255,255,0.04);">Delivery Location (Destination):</td>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #ffffff; border-bottom: 1px solid rgba(255,255,255,0.04);">${escapeHtml(deliveryLocation)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #9ca3af;">Preferred Pickup Date:</td>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #d4af37;">${escapeHtml(pickupDate)}</td>
                </tr>
              </table>

              <!-- 3. Cargo & Shipment Specifications -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 18px; background-color: #0e0e12; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; overflow: hidden;">
                <tr>
                  <td colspan="2" style="background-color: #17171c; padding: 10px 16px; border-bottom: 1px solid rgba(212,175,55,0.3); font-size: 12px; font-weight: 700; color: #d4af37; text-transform: uppercase; letter-spacing: 0.5px;">
                    3. Cargo & Shipment Specifications
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #9ca3af; width: 38%; border-bottom: 1px solid rgba(255,255,255,0.04);">Requested Service / Load:</td>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 700; color: #d4af37; border-bottom: 1px solid rgba(255,255,255,0.04);">${escapeHtml(loadType)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #9ca3af;">Dimensions & Weight:</td>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #ffffff;">${escapeHtml(dimensionsWeight)}</td>
                </tr>
              </table>

              <!-- 4. Additional Details & Handling Instructions -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 18px; background-color: #0e0e12; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="background-color: #17171c; padding: 10px 16px; border-bottom: 1px solid rgba(212,175,55,0.3); font-size: 12px; font-weight: 700; color: #d4af37; text-transform: uppercase; letter-spacing: 0.5px;">
                    4. Additional Details & Handling Instructions
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 16px; font-size: 13px; color: #e5e7eb; line-height: 1.6; white-space: pre-wrap;">
${escapeHtml(additionalDetails)}
                  </td>
                </tr>
              </table>

              <!-- Dispatch Direct Action Bar -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding: 14px; background-color: #17171e; border-radius: 10px; border: 1px dashed rgba(212,175,55,0.4);">
                    <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                      Direct Dispatch Action: <a href="mailto:${escapeHtml(email)}" style="color: #d4af37; font-weight: 700; text-decoration: none;">Reply to Customer</a> &bull; Call: <a href="tel:${escapeHtml(phone)}" style="color: #ffffff; font-weight: 700; text-decoration: none;">${escapeHtml(phone)}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0b0b0d; padding: 16px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); font-size: 11px; color: #6b7280; line-height: 1.5;">
              Brothers Hotshot Services &bull; ${BUSINESS_INFO.address.full}<br>
              Phone: ${BUSINESS_INFO.phone} &bull; Email: ${BUSINESS_INFO.email} &bull; 24/7 Dispatch Coordination
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const mailtoUrl = generateMailtoUrl(BUSINESS_INFO.email, subject, plainText);

  return {
    subject,
    plainText,
    html,
    mailtoUrl,
  };
}

/**
 * Format a contact inquiry message into organized sections.
 */
export function formatContactInquiry(data) {
  const name = (data.name || '').trim() || 'Valued Contact';
  const email = (data.email || '').trim() || 'Not provided';
  const phone = (data.phone || '').trim() || 'Not provided';
  const subjectText = (data.subject || '').trim() || 'Transportation Inquiry';
  const message = (data.message || '').trim() || 'No message provided';

  const subject = `Inquiry: ${subjectText} — ${name}`;

  const plainText = [
    'CONTACT INQUIRY',
    'Brothers Hotshot Services',
    '',
    '1. CONTACT DETAILS',
    `Contact Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    '',
    '2. INQUIRY DETAILS',
    `Subject: ${subjectText}`,
    '',
    'Message:',
    message,
    '',
    '----------------------------------------',
    'Submitted via Brothers Hotshot Contact Webform',
    `Direct Dispatch: ${BUSINESS_INFO.phone}`,
    `Dispatch Email: ${BUSINESS_INFO.email}`,
  ].join('\r\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0b0d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e5e7eb;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0b0b0d; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #131317; border: 1px solid #d4af37; border-radius: 16px; overflow: hidden;">
          <tr>
            <td style="background-color: #17171e; padding: 20px; border-bottom: 2px solid #d4af37; text-align: center;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #ffffff;">BROTHERS HOTSHOT SERVICES</h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; font-weight: 700; color: #d4af37; text-transform: uppercase;">Direct Contact Message</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 16px; background-color: #0e0e12; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; overflow: hidden;">
                <tr><td colspan="2" style="background-color: #17171c; padding: 8px 14px; font-size: 12px; font-weight: 700; color: #d4af37;">1. Contact Details</td></tr>
                <tr><td style="padding: 8px 14px; font-size: 12px; color: #9ca3af; width: 35%;">Name:</td><td style="padding: 8px 14px; font-size: 13px; font-weight: 600; color: #ffffff;">${escapeHtml(name)}</td></tr>
                <tr><td style="padding: 8px 14px; font-size: 12px; color: #9ca3af;">Email:</td><td style="padding: 8px 14px; font-size: 13px; font-weight: 600; color: #d4af37;"><a href="mailto:${escapeHtml(email)}" style="color: #d4af37; text-decoration: none;">${escapeHtml(email)}</a></td></tr>
                <tr><td style="padding: 8px 14px; font-size: 12px; color: #9ca3af;">Phone:</td><td style="padding: 8px 14px; font-size: 13px; font-weight: 600; color: #ffffff;">${escapeHtml(phone)}</td></tr>
              </table>

              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0e0e12; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; overflow: hidden;">
                <tr><td style="background-color: #17171c; padding: 8px 14px; font-size: 12px; font-weight: 700; color: #d4af37;">2. Message — Subject: ${escapeHtml(subjectText)}</td></tr>
                <tr><td style="padding: 14px; font-size: 13px; color: #e5e7eb; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color: #0b0b0d; padding: 14px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); font-size: 11px; color: #6b7280;">
              Brothers Hotshot Services &bull; ${BUSINESS_INFO.phone} &bull; ${BUSINESS_INFO.email}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const mailtoUrl = generateMailtoUrl(BUSINESS_INFO.email, subject, plainText);

  return {
    subject,
    plainText,
    html,
    mailtoUrl,
  };
}

/**
 * Format a driver job application with separated applicant & license qualifications.
 */
export function formatDriverApplication(data, resumeFile) {
  const fullName = (data.fullName || '').trim() || 'Applicant';
  const email = (data.email || '').trim() || 'Not provided';
  const phone = (data.phone || '').trim() || 'Not provided';
  const cityProvince = (data.cityProvince || '').trim() || 'Not provided';
  const position = (data.position || '').trim() || 'Hotshot Driver';
  const experienceYears = (data.experienceYears || '').trim() || 'Not specified';
  const licenseClass = (data.licenseClass || '').trim() || 'Class 1 Commercial';
  const hasValidLicense = (data.hasValidLicense || '').trim() || 'Yes';
  const transportExperience = (data.transportExperience || '').trim() || 'None provided';
  const coverLetter = (data.coverLetter || '').trim() || 'None provided';

  const subject = `Driver Job Application: ${position} — ${fullName}`;

  const plainText = [
    'DRIVER JOB APPLICATION',
    'Brothers Hotshot Services',
    '',
    '1. APPLICANT INFORMATION',
    `Full Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `City & Province: ${cityProvince}`,
    '',
    '2. DRIVING QUALIFICATIONS',
    `Position: ${position}`,
    `Experience: ${experienceYears}`,
    `License Class: ${licenseClass}`,
    `Valid License: ${hasValidLicense}`,
    '',
    '3. PREVIOUS EXPERIENCE',
    transportExperience,
    '',
    '4. RESUME ATTACHMENT',
    resumeFile
      ? `Attached File: ${resumeFile.name} (${(resumeFile.size / 1024).toFixed(1)} KB)`
      : 'No file attached in browser.',
    '* Note: Please ensure your resume file is attached in this email.',
    '',
    '5. COVER NOTE / REMARKS',
    coverLetter,
    '',
    '----------------------------------------',
    'Submitted via Brothers Hotshot Recruitment Portal',
    `Recruitment Phone: ${BUSINESS_INFO.phone}`,
    `Recruitment Email: ${BUSINESS_INFO.email}`,
  ].join('\r\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0b0d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e5e7eb;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0b0b0d; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #131317; border: 1px solid #d4af37; border-radius: 16px; overflow: hidden;">
          <tr>
            <td style="background-color: #17171e; padding: 20px; border-bottom: 2px solid #d4af37; text-align: center;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #ffffff;">BROTHERS HOTSHOT SERVICES</h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; font-weight: 700; color: #d4af37; text-transform: uppercase;">Driver Recruitment Application</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 16px; background-color: #0e0e12; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; overflow: hidden;">
                <tr><td colspan="2" style="background-color: #17171c; padding: 8px 14px; font-size: 12px; font-weight: 700; color: #d4af37;">1. Applicant Details</td></tr>
                <tr><td style="padding: 8px 14px; font-size: 12px; color: #9ca3af; width: 35%;">Name:</td><td style="padding: 8px 14px; font-size: 13px; font-weight: 600; color: #ffffff;">${escapeHtml(fullName)}</td></tr>
                <tr><td style="padding: 8px 14px; font-size: 12px; color: #9ca3af;">Email:</td><td style="padding: 8px 14px; font-size: 13px; font-weight: 600; color: #d4af37;">${escapeHtml(email)}</td></tr>
                <tr><td style="padding: 8px 14px; font-size: 12px; color: #9ca3af;">Phone:</td><td style="padding: 8px 14px; font-size: 13px; font-weight: 600; color: #ffffff;">${escapeHtml(phone)}</td></tr>
                <tr><td style="padding: 8px 14px; font-size: 12px; color: #9ca3af;">Location:</td><td style="padding: 8px 14px; font-size: 13px; font-weight: 600; color: #ffffff;">${escapeHtml(cityProvince)}</td></tr>
              </table>

              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 16px; background-color: #0e0e12; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; overflow: hidden;">
                <tr><td colspan="2" style="background-color: #17171c; padding: 8px 14px; font-size: 12px; font-weight: 700; color: #d4af37;">2. Driving Qualifications</td></tr>
                <tr><td style="padding: 8px 14px; font-size: 12px; color: #9ca3af; width: 35%;">Position:</td><td style="padding: 8px 14px; font-size: 13px; font-weight: 700; color: #d4af37;">${escapeHtml(position)}</td></tr>
                <tr><td style="padding: 8px 14px; font-size: 12px; color: #9ca3af;">Experience:</td><td style="padding: 8px 14px; font-size: 13px; font-weight: 600; color: #ffffff;">${escapeHtml(experienceYears)}</td></tr>
                <tr><td style="padding: 8px 14px; font-size: 12px; color: #9ca3af;">License Class:</td><td style="padding: 8px 14px; font-size: 13px; font-weight: 600; color: #ffffff;">${escapeHtml(licenseClass)}</td></tr>
                <tr><td style="padding: 8px 14px; font-size: 12px; color: #9ca3af;">Valid License:</td><td style="padding: 8px 14px; font-size: 13px; font-weight: 600; color: #ffffff;">${escapeHtml(hasValidLicense)}</td></tr>
              </table>

              ${resumeFile ? `
              <div style="padding: 12px; background-color: rgba(212,175,55,0.1); border: 1px solid #d4af37; border-radius: 8px; margin-bottom: 16px; font-size: 12px; color: #f5e6b3;">
                <strong>Resume to attach:</strong> ${escapeHtml(resumeFile.name)} (${(resumeFile.size / 1024).toFixed(1)} KB)<br>
                <em>Please remember to attach this file in your email before sending.</em>
              </div>` : ''}

              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0e0e12; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; overflow: hidden;">
                <tr><td style="background-color: #17171c; padding: 8px 14px; font-size: 12px; font-weight: 700; color: #d4af37;">3. Cover Note / Experience Details</td></tr>
                <tr><td style="padding: 14px; font-size: 13px; color: #e5e7eb; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(transportExperience)}\n\n${escapeHtml(coverLetter)}</td></tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const mailtoUrl = generateMailtoUrl(BUSINESS_INFO.email, subject, plainText);

  return {
    subject,
    plainText,
    html,
    mailtoUrl,
  };
}

/**
 * Encodes a mailto link with strict RFC CRLF (%0D%0A) preserving all section breaks.
 */
export function generateMailtoUrl(to, subject, body) {
  // Normalize all newlines to \r\n then encode
  const normalizedBody = body.replace(/\r?\n/g, '\r\n');
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(normalizedBody)}`;
}

/**
 * Safe HTML string escaper
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
