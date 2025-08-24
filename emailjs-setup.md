# EmailJS Setup for Contact Form

## Steps:

1. **Install EmailJS:**

   ```bash
   npm install @emailjs/browser
   ```

2. **Sign up at EmailJS.com** and create:

   - An email service (Gmail, Outlook, etc.)
   - An email template
   - Get your Service ID, Template ID, and Public Key

3. **Update Contact.tsx imports:**

   ```typescript
   import emailjs from "@emailjs/browser";
   ```

4. **Replace the handleSubmit function:**

   ```typescript
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();

     if (!formData.name || !formData.email || !formData.message) {
       alert("Please fill in all fields.");
       return;
     }

     setIsSubmitting(true);

     try {
       await emailjs.send(
         "YOUR_SERVICE_ID",
         "YOUR_TEMPLATE_ID",
         {
           from_name: formData.name,
           from_email: formData.email,
           message: formData.message,
         },
         "YOUR_PUBLIC_KEY"
       );

       setIsSubmitted(true);
       setFormData({ name: "", email: "", message: "" });
     } catch (error) {
       console.error("EmailJS error:", error);
       alert("There was an error sending your message. Please try again.");
     } finally {
       setIsSubmitting(false);
     }
   };
   ```

## Environment Variables (Recommended):

Create a `.env` file:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Then use: `import.meta.env.VITE_EMAILJS_SERVICE_ID`
