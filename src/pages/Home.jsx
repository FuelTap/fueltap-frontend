import { Button } from '@/components/ui/button';
import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <p>This is our home page</p>

      <Button variant={'destructive'} onClick={() => alert('how much bruv?')}>
        Buy fuel
      </Button>
    </div>
  );
};

export default Home;
