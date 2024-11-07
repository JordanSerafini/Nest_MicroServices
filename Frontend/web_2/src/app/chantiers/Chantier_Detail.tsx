import { use, useEffect, useState } from "react"

import { getChantierById, getChantierDocmumentByChantierId, getChantiersDocLineByChantierId }

import { ConstructionSite, ConstructionSiteReferenceDocument, ConstructionSiteReferenceDocumentLine } from "@/@types/chantiers/chantier.type"

function Chantier_Detail({chantier_id}: {chantier_id: string}) {

  const [chantier, setChantier] = useState<ConstructionSite | null>(null)
  const [chantier_docuements, setChantierDocuments] = useState<ConstructionSiteReferenceDocument[]>([])
  const [chantier_documents_lines, setChantierDocumentsLines] = useState<ConstructionSiteReferenceDocumentLine[]>([])

  useEffect(() => {
    

  return (
    <div>Chantier_Detail {chantier_id}</div>
  )
}

export default Chantier_Detail