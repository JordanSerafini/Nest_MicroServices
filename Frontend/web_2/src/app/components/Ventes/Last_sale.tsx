import { useDashboardContext } from "@/app/context/DashboardContext"

function Last_sale() {
  const { dashboardSearchQuery: SearchQuery } = useDashboardContext();
  

  return (
    <div>Last_sale</div>
  )
}

export default Last_sale