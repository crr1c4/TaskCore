# TaskCore 🚀  

![Deno Version](https://img.shields.io/badge/Deno-2.2.4+-black?logo=deno&logoColor=white)  
![License](https://img.shields.io/badge/License-MIT-green)

Plataforma colaborativa de gestión de proyectos con autenticación, paneles interactivos y notificaciones en tiempo real.  

## 🌟 Características

✅ **Gestión de Proyectos**  
- Creación y edición de proyectos  
- Asignación de miembros  
- Paneles visuales interactivos  

🔐 **Autenticación Segura**  
- JWT con verificación de correo  
- Roles (admin/miembro)  

📊 **Sistema de Tareas**  
- Asignación de responsables  
- Seguimiento de progreso  
- Comentarios colaborativos  

🔔 **Notificaciones**  
- Web Push Notifications  

## 🛠️ Tecnologías  

- **Frontend**: Fresh (Preact + Tailwind)  
- **Backend**: Deno  
- **Base de datos**: Deno KV  
- **Autenticación**: JWT + Bcrypt  
- **Notificaciones**: Web Push API  

## 🚀 Instalación  

1. Clonar repositorio:  
```bash  
git clone https://github.com/crr1c4/TaskCore.git  
cd TaskCore  
```  

2. Configurar entorno:  
```bash  
cp .env.example .env  
# Editar variables en .env  
```  

3. Iniciar servidor:  
```bash  
deno task start  
```  

4. Iniciar servicio de notificiones para tareas por vencer:
```bash  
deno run -A --unstable-cron cron.ts
```  

## 🧪 Testing  

Ejecutar pruebas unitarias:  
```bash  
deno task test_db  # Pruebas de base de datos  
deno task test     # Pruebas generales  
```  

## 🌿 Ramas y Contribución  

Flujo de trabajo Git:  

**¡Siempre crear Pull Requests para revisión!**  

## 📄 Licencia  

MIT License - Ver [LICENSE](LICENSE) para detalles.  

