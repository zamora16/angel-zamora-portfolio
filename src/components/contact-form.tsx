'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/lib/hooks/use-language';
import { submitContactForm } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

function SubmitButton({ label, sendingLabel }: { label: string; sendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {pending ? sendingLabel : label}
    </Button>
  );
}

export function ContactForm() {
  const { dictionary } = useLanguage();
  const formDict = dictionary.contact.form;
  const { toast } = useToast();

  const [state, formAction] = useFormState(submitContactForm, null);

  const formSchema = z.object({
    name: z.string().min(2, { message: formDict.error }),
    email: z.string().email({ message: formDict.error }),
    subject: z.string().min(5, { message: formDict.error }),
    message: z.string().min(10, { message: formDict.error }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  useEffect(() => {
    if (state?.status === 'success') {
      toast({
        title: formDict.success,
      });
      form.reset();
    } else if (state?.status === 'error') {
      toast({
        variant: 'destructive',
        title: formDict.error,
        description: state.message,
      });
      if (state.errors) {
        Object.entries(state.errors).forEach(([key, value]) => {
          if (value) {
            form.setError(key as keyof z.infer<typeof formSchema>, {
              type: 'manual',
              message: value.join(', '),
            });
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, toast, form, formDict]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formDict.fields.name.label}</FormLabel>
              <FormControl>
                <Input placeholder={formDict.fields.name.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formDict.fields.email.label}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={formDict.fields.email.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formDict.fields.subject.label}</FormLabel>
              <FormControl>
                <Input placeholder={formDict.fields.subject.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formDict.fields.message.label}</FormLabel>
              <FormControl>
                <Textarea placeholder={formDict.fields.message.placeholder} className="min-h-[120px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton label={formDict.button} sendingLabel={formDict.sending} />
      </form>
    </Form>
  );
}
