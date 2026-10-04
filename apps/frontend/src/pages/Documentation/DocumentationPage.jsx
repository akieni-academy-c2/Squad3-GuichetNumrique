import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SOURCES_OFFICIELLES, getDocument } from "@/lib/documentation";

export function DocumentationPage({ slug }) {
  const doc = getDocument(slug);

  if (!doc) {
    return (
      <p className="text-muted-foreground text-sm">
        Cette page de documentation n'existe pas.
      </p>
    );
  }

  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold tracking-tight">{doc.titre}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {doc.resume}
        </p>
      </header>

      {doc.sections.map((section) => (
        <section key={section.titre} className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold tracking-wide uppercase">
            {section.titre}
          </h3>

          {section.contenu && (
            <ul className="flex list-disc flex-col gap-2 pl-4">
              {section.contenu.map((phrase) => (
                <li key={phrase} className="text-sm leading-relaxed">
                  {phrase}
                </li>
              ))}
            </ul>
          )}

          {section.liste && (
            <ul className="flex list-disc flex-col gap-2 pl-4">
              {section.liste.map((item) => (
                <li key={item} className="text-sm leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          )}

          {section.tableau && (
            <div className="border-border overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Obligatoire</TableHead>
                    <TableHead>Formats acceptés</TableHead>
                    <TableHead>Poids maximal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.values(section.tableau).map((entree) => (
                    <TableRow key={entree.key}>
                      <TableCell>
                        <span className="font-medium">{entree.label}</span>
                        <span className="text-muted-foreground block text-xs">
                          {entree.hint}
                        </span>
                      </TableCell>
                      <TableCell>
                        {entree.obligatoire ? "Oui" : "Selon le cas"}
                      </TableCell>
                      <TableCell className="tabular-nums">
                        {entree.extensions.join(", ")}
                      </TableCell>
                      <TableCell className="tabular-nums">
                        {entree.maxSizeMb} Mo
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      ))}

      <footer className="border-border text-muted-foreground flex flex-col gap-1 border-t pt-4 text-xs">
        <span>Sources :</span>
        {SOURCES_OFFICIELLES.map((source) => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            {source.label}
          </a>
        ))}
      </footer>
    </article>
  );
}
