import { useEffect } from 'react';
import Lottie from 'lottie-react';
import successAnim from '../../public/assets/success.json';

function RegistrationSuccess() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Redirect after 3 seconds
      window.location.href = '/login';
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <Lottie
        animationData={successAnim}
        loop={false} // Play once
        className="h-40 w-40"
      />
      <h2 className="mt-4 text-lg font-semibold text-green-700">
        Registration successful!
      </h2>
      <p className="text-gray-500">Redirecting shortly...</p>
    </div>
  );
}

export default RegistrationSuccess;
