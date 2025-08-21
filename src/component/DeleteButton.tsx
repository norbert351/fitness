
'use client'

import { deleteUser } from '@/app/users/action'
import { useState } from 'react'


interface DeleteButtonProps {
  userId: number
  username: string
}

export default function DeleteButton({ userId, username }: DeleteButtonProps) {
  const [showDialog, setShowDialog] = useState(false)

    const handleDelete = async (formData: FormData) => {
    await deleteUser(userId)
    setShowDialog(false)
  }

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        className="text-red-600 hover:text-red-900"
      >
        Delete
      </button>

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete user <span className="font-semibold">{username}</span>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <form action={handleDelete}>
                <input type="hidden" name="userId" value={userId} />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}