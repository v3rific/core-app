import { SearchView } from "../SearchView";

export default function SearchResultPage({ params }: { params: { unitshash: string } }) {
  return <SearchView initialUnitshash={params.unitshash} />;
}
