import { BUSINESS_INFO } from '../data/businessInfo';

/**
 * Service to submit web forms directly from the browser using Web3Forms.
 * Submits asynchronously via AJAX (fetch) to https://api.web3forms.com/submit
 * Form submissions are delivered directly to info.brothershotshot@gmail.com.
 * Requires a hidden access_key field (configured via VITE_WEB3FORMS_ACCESS_KEY or fallback).
 */

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
  BUSINESS_INFO.web3FormsAccessKey ||
  'YOUR_ACCESS_KEY_HERE';

export const FORM_ENDPOINT =
  import.meta.env.VITE_FORM_ENDPOINT ||
  WEB3FORMS_ENDPOINT;

/**
 * Submit Quote Request Form directly via Web3Forms
 */
export const submitQuoteForm = async (data) => {
  const submissionDate = new Date().toLocaleString('en-CA', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Edmonton',
  });

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `Transportation Quote Request: ${data.loadType} - ${data.customerName.trim()}`,
    from_name: data.customerName.trim(),
    replyto: data.email.trim(),
    botcheck: false,
    'Customer Name': data.customerName.trim(),
    'Email Address': data.email.trim(),
    'Phone Number': data.phone.trim(),
    'Pickup Location': data.pickupLocation.trim(),
    'Delivery Location': data.deliveryLocation.trim(),
    'Preferred Pickup Date': data.pickupDate || 'Earliest Available',
    'Service / Load Type': data.loadType,
    'Dimensions & Weight': data.dimensionsWeight ? data.dimensionsWeight.trim() : 'Standard / To Be Confirmed',
    'Additional Details / Message': data.additionalDetails ? data.additionalDetails.trim() : 'None provided',
    'Submission Source': 'Brothers Hotshot Online Quote Web Form',
    'Submitted At': `${submissionDate} (Mountain Time)`,
  };

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12000),
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok && (result.success === true || result.success === 'true')) {
      return {
        success: true,
        message: result.message || 'Quote request submitted successfully!',
        data: result,
      };
    } else {
      return {
        success: false,
        error: result.message || 'Unable to submit quote request. Please try again or call dispatch directly.',
      };
    }
  } catch (error) {
    console.error('Web3Forms quote submission error:', error);
    return {
      success: false,
      error: error.message || 'Network error while submitting quote request. Please check your connection or call dispatch.',
    };
  }
};

/**
 * Submit Contact / Inquiry Form directly via Web3Forms
 */
export const submitContactForm = async (data) => {
  const submissionDate = new Date().toLocaleString('en-CA', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Edmonton',
  });

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `Transportation Inquiry: ${data.subject || 'General'} - ${data.name.trim()}`,
    from_name: data.name.trim(),
    replyto: data.email.trim(),
    botcheck: false,
    'Customer Name': data.name.trim(),
    'Email Address': data.email.trim(),
    'Phone Number': data.phone ? data.phone.trim() : 'Not provided',
    'Subject': data.subject || 'General Inquiry',
    'Message / Inquiry Details': data.message.trim(),
    'Submission Source': 'Brothers Hotshot Online Contact Web Form',
    'Submitted At': `${submissionDate} (Mountain Time)`,
  };

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12000),
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok && (result.success === true || result.success === 'true')) {
      return {
        success: true,
        message: result.message || 'Message submitted successfully!',
        data: result,
      };
    } else {
      return {
        success: false,
        error: result.message || 'Unable to submit contact message. Please try again or call dispatch directly.',
      };
    }
  } catch (error) {
    console.error('Web3Forms contact submission error:', error);
    return {
      success: false,
      error: error.message || 'Network error while submitting contact message. Please check your connection or call dispatch.',
    };
  }
};

/**
 * Submit Driver Application / Career Form directly via Web3Forms
 */
export const submitCareerForm = async (data, file) => {
  const submissionDate = new Date().toLocaleString('en-CA', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Edmonton',
  });

  const formData = new FormData();
  formData.append('access_key', WEB3FORMS_ACCESS_KEY);
  formData.append('subject', `Driver Job Application: ${data.position} - ${data.fullName.trim()}`);
  formData.append('from_name', data.fullName.trim());
  formData.append('replyto', data.email.trim());
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
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
      signal: AbortSignal.timeout(15000),
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok && (result.success === true || result.success === 'true')) {
      return {
        success: true,
        message: result.message || 'Driver application submitted successfully!',
        data: result,
      };
    } else {
      return {
        success: false,
        error: result.message || 'Unable to submit application online. Please try again or call recruitment directly.',
      };
    }
  } catch (error) {
    console.error('Web3Forms career submission error:', error);
    return {
      success: false,
      error: error.message || 'Network error while submitting driver application. Please check your connection or call recruitment.',
    };
  }
};
