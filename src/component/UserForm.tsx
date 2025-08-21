// 'use client'

// import { createUser, updateUser } from '@/app/users/action'
// import { useFormState } from 'react-dom'

// export default function UserForm({ user }: { user?: any }) {
//   // const [state, formAction] = useFormState(
//     // user ? updateUser : createUser,
//   //   null
//   // )

//   return (
//     <form action='' className="space-y-4">
//       {user && <input type="hidden" name="id" value={user.id} />}
      
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Username</label>
//         <input 
//           name="username" 
//           defaultValue={user?.username}
//           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
//         />
//       </div>
      
//       {/* Add other fields similarly */}
      
//       <button 
//         type="submit"
//         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//       >
//         {user ? 'Update' : 'Create'} User
//       </button>
//     </form>
//   )
// }