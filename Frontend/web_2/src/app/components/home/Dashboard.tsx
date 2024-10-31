import { useState } from "react";

function Dashboard() {
  const [active, setActive] = useState('Dashboard');

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start text-gray-500 text-lg border bg-white tracking-wide">
      <h3 className="text-black font-bold text-xl p-4 pb-20">
        Solution Logique
      </h3>
      <div className="flex flex-col items-center justify-start w-full gap-8">
        {['Dashboard', 'Planing', 'Articles', 'Clients', 'Documents'].map((tab) => (
          <p
            key={tab}
            onClick={() => setActive(tab)}
            className={`cursor-pointer ${
              active === tab
                ? 'text-gray-900 font-bold w-4/5 py-2 text-center bg-gray-100 rounded-md tracking-widest'
                : 'text-gray-500'
            }`}
          >
            {tab}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
