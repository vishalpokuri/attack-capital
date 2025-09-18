# Medical AI Intake Assistant

A comprehensive **medical intake AI assistant** built with **Next.js 15**, **OpenMic AI**, and **MongoDB**. This application demonstrates a complete healthcare communication system with AI-powered phone interactions, patient management, and appointment scheduling.

## 🎯 Project Overview

This system implements a **medical domain AI intake agent** using the OpenMic API that can:

- Handle patient calls and collect medical information
- Lookup patient records during conversations
- Schedule appointments automatically
- Process pre-call and post-call webhooks
- Manage medical bots with full CRUD operations

## 🚀 Features

### 🤖 AI Bot Management

- **Create/Update/Delete** medical AI bots
- **Universal ShadCN components** for consistent UI
- **Real-time bot configuration** with OpenMic API integration
- **Advanced settings** for voice, LLM models, and call behavior

### 📞 Call Management & Webhooks

- **Pre-call webhook**: Fetches patient data before conversations
- **Post-call webhook**: Processes call transcripts and metadata
- **Function calls**: Real-time patient lookup during active calls
- **Call logging**: Complete audit trail of all interactions

### 🏥 Medical Features

- **Patient Management**: Complete patient records with medical IDs
- **Appointment Scheduling**: AI-powered booking system
- **Medical Records**: Secure patient data storage
- **Doctor Integration**: Healthcare provider management

### 📊 Dashboard & Analytics

- **Real-time metrics**: Active bots, recent calls, appointments
- **Call logs**: Detailed conversation history
- **API invocation tracking**: Function call monitoring
- **Error handling**: Comprehensive logging system

## 🛠️ Technology Stack

### Frontend

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **ShadCN/UI** components
- **React 19** with modern hooks

### Backend

- **Next.js API Routes** (RESTful)
- **MongoDB** with Mongoose ODM
- **OpenMic AI API** integration
- **Webhook handling** for real-time events

### Development

- **Turbopack** for fast builds
- **ESLint** with TypeScript rules
- **VS Code** optimized configuration

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                    # API Routes
│   │   ├── dashboard/          # Dashboard endpoints
│   │   │   ├── appointments/   # Appointment management
│   │   │   ├── call-logs/     # Call history
│   │   │   └── logs/          # API invocation logs
│   │   ├── functions/          # OpenMic function calls
│   │   │   ├── patient-lookup/    # Patient search
│   │   │   └── appointment-booking/ # Booking system
│   │   └── webhooks/           # OpenMic webhooks
│   │       ├── pre-call/       # Pre-call data fetching
│   │       └── post-call/      # Post-call processing
│   ├── dashboard/              # Dashboard pages
│   ├── login/                  # Authentication
│   └── register/               # User registration
├── components/
│   ├── dashboard/              # Dashboard components
│   │   └── sections/           # Feature sections
│   ├── modals/                 # Modal components
│   │   ├── CreateBotModal.tsx  # Bot creation
│   │   ├── UpdateBotModal.tsx  # Bot editing
│   │   └── DeleteBotModal.tsx  # Bot deletion
│   └── ui/                     # ShadCN components
├── db/
│   ├── config.ts              # MongoDB connection
│   └── models/                # Mongoose schemas
│       ├── Patient.ts         # Patient records
│       ├── Doctor.ts          # Healthcare providers
│       ├── Appointment.ts     # Scheduling
│       ├── CallLog.ts         # Call history
│       └── InvocationLog.ts   # API tracking
└── lib/
    └── utils.ts              # Utility functions
```

## 🔗 API Endpoints

### Bot Management

```http
GET /api/openmic/bots          # List all bots
POST /api/openmic/bots         # Create new bot
PUT /api/openmic/bots/:id      # Update existing bot
DELETE /api/openmic/bots/:id   # Delete bot
```

### Dashboard Data

```http
GET /api/dashboard/appointments    # Get appointments
GET /api/dashboard/call-logs       # Get call history
GET /api/dashboard/logs           # Get API logs
```

### OpenMic Webhooks

```http
POST /api/webhooks/pre-call       # Pre-call data webhook
POST /api/webhooks/post-call      # Post-call processing webhook
```

### Function Calls (During Calls)

```http
POST /api/functions/patient-lookup      # Patient search
POST /api/functions/appointment-booking # Appointment scheduling
```

## 🗄️ Database Schema

### Patient Model

```typescript
{
  medicalId: String (unique),
  name: String,
  age: Number,
  contact: {
    phone: String,
    email: String
  }
}
```

### Appointment Model

```typescript
{
  patient: ObjectId (ref: Patient),
  doctor: ObjectId (ref: Doctor),
  startTime: Date,
  endTime: Date,
  type: String,
  status: String,
  notes: String
}
```

### Call Log Model

```typescript
{
  callId: String,
  botUid: String,
  patientId: String,
  startTime: Date,
  endTime: Date,
  duration: Number,
  transcript: String,
  summary: String,
  status: String
}
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ with npm
- **MongoDB** database
- **OpenMic AI** account and API key
- **ngrok** for webhook testing (optional)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/username/attack-capital.git
cd attack-capital
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**
   Create `.env.local` file:

```env
DATABASE_URL=mongodb://localhost:27017/medical-ai
NEXT_PUBLIC_OPENMIC_API_KEY=your_openmic_api_key_here
```

4. **Start development server**

```bash
npm run dev --turbopack
```

5. **Access the application**

- Main app: http://localhost:3000
- Dashboard: http://localhost:3000/dashboard

### OpenMic AI Setup

1. **Sign up** at https://chat.openmic.ai/signup
2. **Get API key** from http://chat.openmic.ai/api-key-demo-735023852
3. **Configure webhooks** (use ngrok for local testing):
   - Pre-call: `https://your-domain.ngrok.io/api/webhooks/pre-call`
   - Post-call: `https://your-domain.ngrok.io/api/webhooks/post-call`
4. **Add function calls** in OpenMic dashboard:
   - Patient Lookup: `https://your-domain.ngrok.io/api/functions/patient-lookup`
   - Appointment Booking: `https://your-domain.ngrok.io/api/functions/appointment-booking`

## 📱 Usage

### Creating Medical Bots

1. **Navigate to Dashboard** → Manage Bots
2. **Click "Create New Bot"**
3. **Configure bot settings**:
   - Name and system prompt
   - Voice provider (Cartesia/OpenAI/ElevenLabs)
   - LLM model (GPT-4, GPT-3.5)
   - Medical compliance settings (HIPAA)
4. **Save and test** via OpenMic dashboard

### Medical Call Flow

1. **Pre-call**: System fetches patient history
2. **Call starts**: AI introduces itself as medical assistant
3. **ID collection**: Asks for medical ID or patient name
4. **Patient lookup**: Real-time database search
5. **Information gathering**: Collects symptoms, scheduling needs
6. **Appointment booking**: Schedules with available doctors
7. **Post-call**: Saves transcript and updates records

### Dashboard Monitoring

- **Metrics**: View active bots, recent calls, appointments
- **Call Logs**: Review conversation history and transcripts
- **Bot Management**: Create, edit, delete medical bots
- **API Logs**: Monitor function call performance

## 🔧 Development Commands

```bash
# Development
npm run dev --turbopack        # Start with Turbopack (fast)
npm run dev                    # Standard development server

# Production
npm run build --turbopack      # Build with Turbopack
npm run build                  # Standard build
npm start                      # Start production server

# Code Quality
npm run lint                   # Run ESLint
```

## 🏗️ Architecture Decisions

### Frontend Architecture

- **App Router**: Modern Next.js routing with layouts
- **TypeScript**: Full type safety across the application
- **ShadCN Components**: Consistent, accessible UI components
- **Tailwind CSS v4**: Utility-first styling with CSS variables

### Backend Architecture

- **API Routes**: RESTful endpoints with Next.js
- **MongoDB**: Document database for medical records
- **Mongoose**: ODM with schema validation
- **OpenMic Integration**: Real-time AI conversation handling

### State Management

- **React Hooks**: useState, useEffect for local state
- **Server Components**: Reduced client-side JavaScript
- **Real-time Updates**: Webhook-driven data updates

## 🔒 Security & Compliance

### HIPAA Compliance

- **Encrypted data**: Patient information protection
- **Access controls**: Role-based permissions
- **Audit trails**: Complete interaction logging
- **Secure webhooks**: Validated OpenMic communications

### Data Protection

- **Environment variables**: Secure API key storage
- **MongoDB security**: Database access controls
- **Input validation**: Comprehensive data sanitization

## 🧪 Testing

### OpenMic Dashboard Testing

1. **Create test bot** via application
2. **Open OpenMic dashboard**
3. **Use "Test Call" feature**
4. **Verify webhook responses**
5. **Check dashboard updates**

### Local Development Testing

- **ngrok**: Expose local webhooks to OpenMic
- **MongoDB Compass**: Database inspection
- **Browser DevTools**: Network request monitoring

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
