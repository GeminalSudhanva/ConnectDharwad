import AdminShell from './AdminShell';

export const metadata = { title: 'Admin — Connect Dharwad' };

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
