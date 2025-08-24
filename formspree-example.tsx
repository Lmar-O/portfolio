// Example of using Formspree for contact form
// 1. Sign up at https://formspree.io
// 2. Create a new form and get your form ID
// 3. Replace the handleSubmit function in Contact.tsx:

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formData.name || !formData.email || !formData.message) {
    alert('Please fill in all fields.');
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });

    if (response.ok) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    alert('There was an error sending your message. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
