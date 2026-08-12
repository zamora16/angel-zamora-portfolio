import { z } from 'zod';

// Client-side only: this site is statically exported (GitHub Pages has no
// server runtime), so this mock submission just validates and logs — no
// email is actually sent. Wire up a real backend (e.g. Formspree) if needed.
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long.'),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.string().min(5, 'Subject must be at least 5 characters long.'),
  message: z.string().min(10, 'Message must be at least 10 characters long.'),
});

type ContactFormState = {
  message: string;
  status: 'success' | 'error';
  errors?: Record<string, string[] | undefined> | null;
} | null;

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Please correct the errors below.',
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // In a real application, you would send an email or save to a database here.
  // For this example, we'll just log the data and simulate success.
  console.log('New contact form submission:');
  console.log('Name:', validatedFields.data.name);
  console.log('Email:', validatedFields.data.email);
  console.log('Subject:', validatedFields.data.subject);
  console.log('Message:', validatedFields.data.message);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    message: 'Your message has been sent successfully!',
    status: 'success',
    errors: null,
  };
}
