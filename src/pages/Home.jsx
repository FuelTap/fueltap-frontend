import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router';

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <p>This is our home page</p>

      <Button variant={'link'}>
        <Link to={'/role-selector'}>Onboarding pages</Link>
      </Button>
    </div>
  );
};

export default Home;
