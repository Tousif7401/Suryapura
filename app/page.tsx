import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to default locale
  redirect('/hi');
}

// Ensure metadata is generated
export const metadata = {
  title: "Suryapura - Redirecting...",
};
