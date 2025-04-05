import { useState } from 'preact/hooks'

export default function Configuracion() {
  // Estados para manejar los datos del formulario
  const [fullName, setFullName] = useState('Daniel Martinez') // Nombre del usuario
  const [currentPassword, setCurrentPassword] = useState('') // Contraseña actual
  const [newPassword, setNewPassword] = useState('') // Nueva contraseña
  const [confirmPassword, setConfirmPassword] = useState('') // Confirmación de contraseña
  const [taskReminders, setTaskReminders] = useState(true) // Preferencia de recordatorios
  const [theme, setTheme] = useState<'light' | 'dark'>('light') // Tema de la aplicación
  const [showDeleteModal, setShowDeleteModal] = useState(false) // Control del modal

  // Maneja el envío del formulario
  const handleSubmit = (e: Event) => {
    e.preventDefault()
    alert('Cambios guardados correctamente') // Simulación de guardado
  }

  // Maneja la eliminación de cuenta
  const handleDeleteAccount = () => {
    alert('Cuenta eliminada (simulación)') // Simulación de eliminación
    setShowDeleteModal(false) // Cierra el modal
  }

  // Alterna entre tema claro y oscuro
  const toggleTheme = () => {
    setTheme((prev) => prev === 'light' ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', theme === 'light')
  }

  // Alterna los recordatorios de tareas
  const toggleTaskReminders = () => {
    setTaskReminders(!taskReminders)
  }

  return (
    <div class={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-400'}`}>
      <h1 title='Configuración de Usuario' />

      <main class='container mx-auto px-4 py-8 max-w-4xl'>
        <form onSubmit={handleSubmit} class='space-y-6'>
          {/* Sección de información personal */}
          <div class={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 class={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>
              Información Personal
            </h2>
            <div class='mb-4'>
              <label class={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                Nombre completo
              </label>
              <input
                type='text'
                value={fullName}
                onInput={(e) => setFullName(e.currentTarget.value)}
                class={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}`}
              />
            </div>
          </div>

          {/* Sección de seguridad - Cambio de contraseña */}
          <div class={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 class={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>Seguridad</h2>
            <div class='space-y-4'>
              <div>
                <label class={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                  Contraseña actual
                </label>
                <input
                  type='password'
                  value={currentPassword}
                  onInput={(e) => setCurrentPassword(e.currentTarget.value)}
                  class={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}`}
                />
              </div>
              {/* Campos similares para nueva contraseña y confirmación */}
            </div>
          </div>

          {/* Sección de preferencias de usuario */}
          <div class={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 class={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>Preferencias</h2>

            {/* Interruptor de recordatorios */}
            <div class='flex items-center justify-between'>
              <div>
                <label class={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                  Recibir recordatorios de tareas
                </label>
                <p class={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Notificaciones por email de tareas pendientes
                </p>
              </div>
              <button
                type='button'
                onClick={toggleTaskReminders}
                class={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  taskReminders ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  class={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    taskReminders ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Selector de tema */}
            <div>
              <label class={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                Tema de la aplicación
              </label>
              <div class='flex space-x-4'>
                <button
                  type='button'
                  onClick={() => {
                    setTheme('light')
                    document.documentElement.classList.remove('dark')
                  }}
                  class={`px-4 py-2 rounded-lg border ${
                    theme === 'light' ? 'bg-blue-100 border-blue-500' : 'bg-gray-100 border-transparent'
                  }`}
                >
                  Claro
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setTheme('dark')
                    document.documentElement.classList.add('dark')
                  }}
                  class={`px-4 py-2 rounded-lg border ${
                    theme === 'dark' ? 'bg-blue-900 border-blue-500' : 'bg-gray-100 border-transparent'
                  }`}
                >
                  Oscuro
                </button>
              </div>
            </div>
          </div>

          {/* Sección dedicada a eliminar la cuenta */}
          <div
            class={`rounded-lg shadow p-6 border ${
              theme === 'dark' ? 'bg-gray-800 border-red-900' : 'bg-white border-red-200'
            }`}
          >
            <h2 class={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
              Eliminar cuenta
            </h2>
            <p class={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Esta acción eliminará permanentemente tu cuenta y todos tus datos.
            </p>
            <button
              type='button'
              onClick={() => setShowDeleteModal(true)}
              class='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
            >
              Eliminar mi cuenta
            </button>
          </div>

          {/* Botón para guardar cambios */}
          <div class='flex justify-end'>
            <button
              type='submit'
              class='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </main>

      {/* Modal de confirmación para eliminar cuenta */}
      {showDeleteModal && (
        <div class='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div class={`p-6 rounded-lg max-w-md w-full mx-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 class={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>
              ¿Eliminar cuenta permanentemente?
            </h3>
            <p class={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Todos tus datos serán eliminados y no podrás recuperarlos. ¿Estás seguro?
            </p>
            <div class='flex justify-end space-x-4'>
              <button
                onClick={() => setShowDeleteModal(false)}
                class={`px-4 py-2 border rounded-lg ${theme === 'dark' ? 'text-white' : ''}`}
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteAccount}
                class='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700'
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
