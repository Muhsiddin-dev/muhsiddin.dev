import { AdminShell } from '@/components/Admin/AdminShell'
import { AuthGuard } from '@/components/Admin/AuthGuard'



export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <AdminShell>{children}</AdminShell>
    </AuthGuard>
  )
}
