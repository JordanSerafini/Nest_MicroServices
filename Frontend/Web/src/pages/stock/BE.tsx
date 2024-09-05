import { useState, useEffect } from "react";
import { fetchBEPaginated } from "../../utils/function/function";
import { useAppDispatch } from "../../hooks/redux";

import BottomNav from "../../components/nav/navBar/BottomNav";

interface BonEntree {
  id: string;
  storehouseid: string;
  numberprefix: string;
  documentid: string;
  quantity: string | number;
  itemid: string;
  descriptionclear: string;
  salepricevatincluded: string | number;
}

function BonEntree() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(50);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<BonEntree[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchBEPaginated(limit, offset, searchQuery);
        setData(result.documents);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, offset, limit, searchQuery]);

  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <div className="text-center h-1/10 flex items-center justify-center bg-green-500 w-full">
        Bon entrée
      </div>
      <div className="w-9.5/10 h-7/10 overflow-auto border">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {data && (
          <ul>
            {data.map((item, index) => (
              <div className="flex w-full overflow-auto h-16 items-center border  text-xs justify-between p-2">
                <div key={index} className="w-8/10">{item.descriptionclear}</div>
                <div className="text-green-500">x{item.quantity}</div>
              </div>
            ))}
          </ul>
        )}
      </div>
      <div>
        <button
          onClick={() => setOffset((prev) => Math.max(0, prev - limit))}
          disabled={offset === 0}
        >
          Previous
        </button>
        <button onClick={() => setOffset((prev) => prev + limit)}>Next</button>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <BottomNav title="Bon Entrée" />
    </div>
  );
}

export default BonEntree;
