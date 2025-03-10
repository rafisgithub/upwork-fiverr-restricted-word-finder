interface InfoAlertProps {
  isVisible: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
}

export default function InfoAlert({ isVisible, message, type = 'success' }: InfoAlertProps) {
  let bgColor = 'bg-green-100 border-green-200 text-green-700';
  let icon = 'fas fa-check-circle';
  
  if (type === 'error') {
    bgColor = 'bg-red-100 border-red-200 text-red-700';
    icon = 'fas fa-exclamation-circle';
  } else if (type === 'info') {
    bgColor = 'bg-blue-100 border-blue-200 text-blue-700';
    icon = 'fas fa-info-circle';
  }
  
  return (
    <div 
      className={`fixed bottom-5 right-5 ${bgColor} px-4 py-3 rounded-lg shadow-lg flex items-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <i className={`${icon} mr-2`}></i>
      <span>{message}</span>
    </div>
  );
}
