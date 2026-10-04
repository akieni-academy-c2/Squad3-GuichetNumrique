import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

import { DOCUMENTATION } from "@/lib/documentation";

export function DocumentationIndex() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {DOCUMENTATION.map((doc) => (
        <li key={doc.slug}>
          <Card size="sm" className="h-full">
            <CardHeader>
              <CardTitle>{doc.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                to={`/cni/documentation/${doc.slug}`}
                className="text-primary inline-flex items-center gap-1 text-sm underline underline-offset-4"
              >
                Lire la page
                <ChevronRightIcon className="size-3.5" />
              </Link>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
