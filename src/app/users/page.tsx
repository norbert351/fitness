
import { RegisterTable } from '@/db/schema'
import { db } from '@/db'
import UserTable from '@/component/UserTable'

export default async function UsersPage() {
  const allUsers = await db.select().from(RegisterTable)

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
      </div>
      <UserTable users={allUsers} />
    </div>
  )
}