
// import UserForm from '@/component/UserForm'
// import { db } from '@/db'
// import { RegisterTable } from '@/db/schema'
// import { eq } from 'drizzle-orm'
// import { notFound } from 'next/navigation'

// interface Params {
//   id: string
// }

// export default async function UserDetailPage({ params }: { params: Params }) {
//   // Safely convert and validate the ID
//   const userId = parseInt(params.id, 10)
  
//   if (isNaN(userId)) {
//     return notFound()
//   }

//   // Fetch user data
//   const user = await db.query.RegisterTable.findFirst({
//     where: eq(RegisterTable.id, userId)
//   })

//   if (!user) {
//     return notFound()
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Edit User</h1>
//       <UserForm user={user} />
//     </div>
//   )
// }