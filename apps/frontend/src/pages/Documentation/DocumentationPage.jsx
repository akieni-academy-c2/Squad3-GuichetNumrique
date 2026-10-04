import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { OFFICIAL_SOURCES, getDocument } from "@/lib/documentation";

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
      <h2 className="text-xl font-semibold tracking-tight">{doc.title}</h2>

      {doc.sections.map((section) => (
        <section key={section.title} className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold tracking-wide">
            {section.title}
          </h3>

          {section.content && (
            <ul className="flex list-disc flex-col gap-2 pl-4">
              {section.content.map((phrase) => (
                <li key={phrase} className="text-sm leading-relaxed">
                  {phrase}
                </li>
              ))}
            </ul>
          )}

          {section.items && (
            <ul className="flex list-disc flex-col gap-2 pl-4">
              {section.items.map((item) => (
                <li key={item} className="text-sm leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          )}

          {section.table && (
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
                  {Object.values(section.table).map((entry) => (
                    <TableRow key={entry.key}>
                      <TableCell>
                        <span className="font-medium">{entry.label}</span>
                        <span className="text-muted-foreground block text-xs">
                          {entry.hint}
                        </span>
                      </TableCell>
                      <TableCell>
                        {entry.obligatoire ? "Oui" : "Selon le cas"}
                      </TableCell>
                      <TableCell className="tabular-nums">
                        {entry.extensions.join(", ")}
                      </TableCell>
                      <TableCell className="tabular-nums">
                        {entry.maxSizeMb} Mo
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      ))}

      <footer className="border-border border-t pt-4">
        {OFFICIAL_SOURCES.map((source) => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground text-xs underline underline-offset-4"
          >
            {source.label}
          </a>
        ))}
      </footer>
    </article>
  );
}
