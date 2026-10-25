/**
 * Contact Form & EmailJS Auto-Reply Script
 */

const EMAILJS_CONFIG = {
  serviceId: 'service_7j80e1g',
  ownerTemplateId: 'template_u1ls0t8',
  autoReplyTemplateId: 'template_4jo2p1i',
  publicKey: 'Qva44she0jN5bFa15',
  ownerEmail: 'wasifwasim75@gmail.com',
  ownerName: 'WASIM AKRAM'
};

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initEmailCopy();
});

/**
 * Handle contact form submission, validation, and EmailJS dispatch
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const subjectInput = document.getElementById('messageSubject');
  const messageInput = document.getElementById('senderMessage');
  const submitBtn = document.getElementById('contactSubmitBtn') || form.querySelector('button[type="submit"]');

  let isSubmitting = false;

  // Clear errors on input
  [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
    if (!field) return;
    field.addEventListener('input', () => {
      const parent = field.closest('.form-group');
      if (parent) parent.classList.remove('has-error');
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions while an active request is in flight
    if (isSubmitting) return;

    let isValid = true;
    let firstInvalidField = null;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      showFieldError(nameInput, 'Please enter your name (at least 2 characters).');
      isValid = false;
      if (!firstInvalidField) firstInvalidField = nameInput;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      showFieldError(emailInput, 'Please enter a valid email address.');
      isValid = false;
      if (!firstInvalidField) firstInvalidField = emailInput;
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      showFieldError(subjectInput, 'Please provide a subject for your message.');
      isValid = false;
      if (!firstInvalidField) firstInvalidField = subjectInput;
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 2) {
      showFieldError(messageInput, 'Please enter your message.');
      isValid = false;
      if (!firstInvalidField) firstInvalidField = messageInput;
    }

    if (!isValid) {
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    // Lock submission state & show spinner
    isSubmitting = true;
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" style="animation: spin 1s linear infinite; width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke-width="4" stroke="currentColor" stroke-dasharray="32" stroke-linecap="round"></circle>
      </svg>
      <span>Sending Message...</span>
    `;

    const senderName = nameInput.value.trim();
    const senderEmail = emailInput.value.trim();
    const subjectLine = subjectInput.value.trim();
    const messageBody = messageInput.value.trim();

    // 1. Message payload delivered directly to Owner (Wasim Akram) with all client details
    const ownerParams = {
      to_name: EMAILJS_CONFIG.ownerName,
      to_email: EMAILJS_CONFIG.ownerEmail,
      from_name: senderName,
      from_email: EMAILJS_CONFIG.ownerEmail,
      reply_to: senderEmail,

      // Direct form field mappings
      name: senderName,
      email: senderEmail,
      subject: subjectLine,
      message: messageBody,

      // Aliases matching HTML form IDs & common EmailJS template variables
      senderName: senderName,
      senderEmail: senderEmail,
      messageSubject: subjectLine,
      senderMessage: messageBody,
      user_name: senderName,
      user_email: senderEmail,
      user_subject: subjectLine,
      user_message: messageBody,
      client_name: senderName,
      client_email: senderEmail,
      title: subjectLine,
      inquiry_summary: `New Inquiry from Portfolio Contact Form:\n\n1. Name: ${senderName}\n2. Email: ${senderEmail}\n3. Subject: ${subjectLine}\n\n4. Message:\n${messageBody}`
    };

    // 2. Confirmation auto-reply delivered to Client, greeting them personally by name
    const clientParams = {
      to_name: senderName,
      to_email: senderEmail,
      from_name: EMAILJS_CONFIG.ownerName,
      from_email: EMAILJS_CONFIG.ownerEmail,
      reply_to: EMAILJS_CONFIG.ownerEmail,

      // Direct form field mappings
      name: senderName,
      email: senderEmail,
      subject: subjectLine,
      message: messageBody,

      // Aliases matching HTML form IDs & common EmailJS template variables
      senderName: senderName,
      senderEmail: senderEmail,
      messageSubject: subjectLine,
      senderMessage: messageBody,
      user_name: senderName,
      user_email: senderEmail,
      client_name: senderName,
      client_email: senderEmail,
      title: subjectLine
    };

    try {
      if (!EMAILJS_CONFIG.publicKey) {
        throw new Error('EmailJS Public Key is required.');
      }

      // Dispatch owner notification and client auto-reply using dedicated templates
      await Promise.all([
        sendEmailJS(EMAILJS_CONFIG.ownerTemplateId, ownerParams),
        sendEmailJS(EMAILJS_CONFIG.autoReplyTemplateId, clientParams)
      ]);

      // Reset form and notify user with success toast
      form.reset();
      if (window.showToast) {
        window.showToast(`Thank you, ${senderName}! Your message was sent, and a confirmation email has been sent to ${senderEmail}.`, 'success');
      }
    } catch (err) {
      console.error('EmailJS dispatch failed:', err);
      if (window.showToast) {
        window.showToast(err.message || 'Failed to send message. Please try again or email wasifwasim75@gmail.com directly.', 'error');
      }
    } finally {
      isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}

/**
 * Direct EmailJS API call via REST (Zero SDK dependency required)
 */
async function sendEmailJS(templateId, templateParams) {
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      service_id: EMAILJS_CONFIG.serviceId,
      template_id: templateId,
      user_id: EMAILJS_CONFIG.publicKey,
      template_params: templateParams
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`EmailJS Error (${response.status}): ${errorText || response.statusText}`);
  }

  return response;
}

function showFieldError(field, message) {
  const group = field.closest('.form-group');
  if (!group) return;

  group.classList.remove('has-error');
  // Re-add has-error to restart the shake animation
  void group.offsetWidth;
  group.classList.add('has-error');

  const errorEl = group.querySelector('.form-error-msg');
  if (errorEl) {
    errorEl.textContent = message;
  }
}

/**
 * Copy email address to clipboard with feedback
 */
function initEmailCopy() {
  const copyBtn = document.querySelectorAll('.js-copy-email');
  if (!copyBtn.length) return;

  copyBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'wasifwasim75@gmail.com';

      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          if (window.showToast) {
            window.showToast(`Email copied: ${email}`);
          }
        }).catch(() => {
          fallbackCopyText(email);
        });
      } else {
        fallbackCopyText(email);
      }
    });
  });
}

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    if (window.showToast) {
      window.showToast(`Email copied: ${text}`);
    }
  } catch (err) {
    console.error('Copy fallback failed', err);
  }
  document.body.removeChild(textArea);
}
