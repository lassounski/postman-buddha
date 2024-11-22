import { SubscribeForm } from "@/app/ui/SubscribeForm" 

export default function SubscribePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="text-4xl text-yellow-800 font-bold mb-4">Postman Buddha</div>
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Subscribe to daily mindful e-mails</h1>
        <SubscribeForm />
      </div>
    </div>
  )
}