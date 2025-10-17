import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function RoleSelector() {
  const [registerAs, setRegisterAs] = useState('customer');

  const navigate = useNavigate();
  function selectRole(e, role) {
    e.preventDefault();
    setRegisterAs(role);
  }

  function handleSubmit() {
    navigate('/register', { state: { registerAs } });
  }
  return (
    <div>
      <div className="mt-10 flex h-[65dvh] flex-col space-y-2 md:h-[50vh]">
        <Button
          type="button"
          onClick={(e) => selectRole(e, 'customer')}
          size="full"
          variant="secondary"
          className={`text-md-medium transition-colors ${
            registerAs !== 'customer'
              ? 'bg-green-50 text-[#0D9467] hover:text-white'
              : ''
          }`}
        >
          Customer
        </Button>

        <Button
          type="button"
          onClick={(e) => selectRole(e, 'supplier')}
          size="full"
          variant="secondary"
          className={`text-md-medium transition-colors ${
            registerAs === 'supplier'
              ? ''
              : 'bg-green-50 text-[#0D9467] hover:text-white'
          }`}
        >
          Supplier
        </Button>

        <div className="mb-4 bg-white max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:w-full max-sm:p-4 md:mt-10">
          <Button
            type="button"
            size={'full'}
            className={'text-md-medium'}
            onClick={handleSubmit}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelector;
