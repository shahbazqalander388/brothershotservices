import { BUSINESS_INFO } from '../data/businessInfo';

/**
 * Service to submit web forms directly from the browser (like a real webform).
 * Submits asynchronously via AJAX to the webform endpoint.
 * Default provider: FormSubmit.co (free, zero-config, sends structured HTML table emails with reply-to).
 * Supports custom endpoint override via VITE_FORM_ENDPOINT if configured.
 */

export const submitQuoteForm = async (data) => {
  const endpoint =
    import.meta.env.VITE_FORM_ENDPOINT ||
    `https://formsubmit.co/ajax/${BUSINESS_INFO.email}`;

  const submissionDate = new Date().toLocaleString('en-CA', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Edmonton',
  });

  const payload = {
    _subject: `Transportation Quote Request: ${data.loadType} - ${data.customerName.trim()}`,
    _template: 'table',
    _captcha: 'false',
    _replyto: data.email.trim(),
    'Customer Name': data.customerName.trim(),
    'Email Address': data.email.trim(),
    'Phone Number': data.phone.trim(),
    'Pickup Location': data.pickupLocation.trim(),
    'Delivery Location': data.deliveryLocation.trim(),
    'Preferred Pickup Date': data.pickupDate || 'Earliest Available',
    'Load Type': data.loadType,
    'Dimensions & Approximate Weight': data.dimensionsWeight ? data.dimensionsWeight.trim() : 'Standard / To Be Confirmed',
    'Additional Details / Instructions': data.additionalDetails ? data.additionalDetails.trim() : 'None provided',
    'Submission Source': 'Brothers Hotshot Online Quote Web Form',
    'Submitted At': `${submissionDate} (Mountain Time)`,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });

    const result = await response.json().catch(() => ({}));
    const isActivation = Boolean(result.message && result.message.includes('Activation'));

    // FormSubmit returns status 200 with { success: "true" } or activation notice on first run
    if (response.ok || result.success === 'true' || result.success === true || isActivation) {
      return {
        success: true,
        message: 'Quote request submitted successfully!',
        data: result,
      };
    } else {
      return {
        success: false,
        error: result.message || 'Unable to submit quote request. Please try again.',
      };
    }
  } catch (error) {
    console.error('Webform submission error:', error);
    return {
      success: false,
      error: error.message || 'Network error while submitting quote request.',
    };
  }
};

export const submitContactForm = async (data) => {
  const endpoint =
    import.meta.env.VITE_FORM_ENDPOINT ||
    `https://formsubmit.co/ajax/${BUSINESS_INFO.email}`;

  const submissionDate = new Date().toLocaleString('en-CA', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Edmonton',
  });

  const payload = {
    _subject: `Transportation Inquiry: ${data.subject || 'General'} - ${data.name.trim()}`,
    _template: 'table',
    _captcha: 'false',
    _replyto: data.email.trim(),
    'Full Name': data.name.trim(),
    'Email Address': data.email.trim(),
    'Phone Number': data.phone ? data.phone.trim() : 'Not provided',
    'Subject': data.subject || 'General Inquiry',
    'Message': data.message.trim(),
    'Submission Source': 'Brothers Hotshot Online Contact Web Form',
    'Submitted At': `${submissionDate} (Mountain Time)`,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });

    const result = await response.json().catch(() => ({}));
    const isActivation = Boolean(result.message && result.message.includes('Activation'));

    if (response.ok || result.success === 'true' || result.success === true || isActivation) {
      return {
        success: true,
        message: 'Message submitted successfully!',
        data: result,
      };
    } else {
      return {
        success: false,
        error: result.message || 'Unable to submit contact message. Please try again.',
      };
    }
  } catch (error) {
    console.error('Contact submission error:', error);
    return {
      success: false,
      error: error.message || 'Network error while submitting contact message.',
    };
  }
};

export const submitCareerForm = async (data, file) => {
  const endpoint =
    import.meta.env.VITE_FORM_ENDPOINT ||
    `https://formsubmit.co/ajax/${BUSINESS_INFO.email}`;

  const submissionDate = new Date().toLocaleString('en-CA', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Edmonton',
  });

  const formData = new FormData();
  formData.append('_subject', `Driver Job Application: ${data.position} - ${data.fullName.trim()}`);
  formData.append('_template', 'table');
  formData.append('_captcha', 'false');
  formData.append('_replyto', data.email.trim());
  formData.append('Applicant Full Name', data.fullName.trim());
  formData.append('Email Address', data.email.trim());
  formData.append('Phone Number', data.phone.trim());
  formData.append('Location (City, Province)', data.cityProvince.trim());
  formData.append('Position Applying For', data.position);
  formData.append('Years of Experience', data.experienceYears);
  formData.append('License Class', data.licenseClass);
  formData.append('Valid Commercial License', data.hasValidLicense);
  formData.append('Transportation Experience', data.transportExperience ? data.transportExperience.trim() : 'N/A');
  formData.append('Cover Note / Message', data.coverLetter ? data.coverLetter.trim() : 'N/A');
  formData.append('Submission Source', 'Brothers Hotshot Online Career Web Form');
  formData.append('Submitted At', `${submissionDate} (Mountain Time)`);

  if (file) {
    formData.append('attachment', file);
    formData.append('Resume File Name', file.name);
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
      signal: AbortSignal.timeout(8000),
    });

    const result = await response.json().catch(() => ({}));
    const isActivation = Boolean(result.message && result.message.includes('Activation'));

    if (response.ok || result.success === 'true' || result.success === true || isActivation) {
      return {
        success: true,
        message: 'Driver application submitted successfully!',
        data: result,
      };
    } else {
      return {
        success: false,
        error: result.message || 'Unable to submit application online. Please try again.',
      };
    }
  } catch (error) {
    console.error('Career submission error:', error);
    return {
      success: false,
      error: error.message || 'Network error while submitting driver application.',
    };
  }
};
