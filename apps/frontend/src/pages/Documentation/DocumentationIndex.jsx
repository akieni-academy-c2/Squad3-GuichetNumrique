import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

import { DOCUMENTATION, SOURCES_OFFICIELLES } from "@/lib/documentation";

export function DocumentationIndex() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {DOCUMENTATION.map((doc) => (
          <Card key={doc.slug} size="sm">
            <CardHeader>
              <CardTitle>{doc.titre}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p className="text-muted-foreground text-sm">{doc.resume}</p>
              <Link
                to={`/cni/documentation/${doc.slug}`}
                className="text-primary inline-flex items-center gap-1 text-sm underline underline-offset-4"
              >
                Lire la page
                <ChevronRightIcon className="size-3.5" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold tracking-wide uppercase">
          Sources officielles
        </h2>
        <ul className="flex list-disc flex-col gap-1.5 pl-4">
          {SOURCES_OFFICIELLES.map((source) => (
            <li key={source.url} className="text-muted-foreground text-sm">
              {source.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
