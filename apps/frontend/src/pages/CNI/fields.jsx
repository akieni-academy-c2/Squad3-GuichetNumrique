import { useState } from "react";
import { fr } from "date-fns/locale";
import { CalendarIcon, FileTextIcon, UploadIcon, XIcon } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  describeFichier,
  formatTaille,
  removeFichier,
  setFichier,
  validateFichier,
} from "@/lib/fichiers";
import { getFieldValue, useStore } from "@/store/store";

export function useField(name) {
  const value = useStore((state) => getFieldValue(state, name));
  const error = useStore((state) => state.errors?.[name]);
  const setField = useStore((state) => state.setField);

  return {
    value,
    error,
    set: (next) => setField(name, next),
    invalid: Boolean(error),
  };
}

export function TextField({
  name,
  label,
  description,
  placeholder,
  type = "text",
  autoComplete,
  inputMode,
  maxLength,
  className,
}) {
  const { value, error, set, invalid } = useField(name);
  const id = `field-${name}`;

  return (
    <Field data-invalid={invalid} className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type={type}
        value={value ?? ""}
        onChange={(event) => set(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        aria-invalid={invalid}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{error}</FieldError>
    </Field>
  );
}

export function TextareaField({
  name,
  label,
  description,
  placeholder,
  rows = 4,
  maxLength,
  className,
}) {
  const { value, error, set, invalid } = useField(name);
  const id = `field-${name}`;

  return (
    <Field data-invalid={invalid} className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Textarea
        id={id}
        rows={rows}
        value={value ?? ""}
        onChange={(event) => set(event.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={invalid}
        className="resize-none"
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{error}</FieldError>
    </Field>
  );
}

export function SelectField({
  name,
  label,
  description,
  placeholder = "Sélectionnez une option",
  options,
  className,
}) {
  const { value, error, set, invalid } = useField(name);
  const id = `field-${name}`;

  return (
    <Field data-invalid={invalid} className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Select
        items={options}
        value={value ?? null}
        onValueChange={(next) => set(next)}
      >
        <SelectTrigger id={id} className="w-full" aria-invalid={invalid}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{error}</FieldError>
    </Field>
  );
}

export function RadioField({ name, label, description, options, className }) {
  const { value, error, set, invalid } = useField(name);

  return (
    <Field data-invalid={invalid} className={className}>
      <FieldTitle>{label}</FieldTitle>
      {description && <FieldDescription>{description}</FieldDescription>}
      <RadioGroup
        value={value ?? null}
        onValueChange={(next) => set(next)}
        className="mt-1 gap-2"
      >
        {options.map((option) => {
          const id = `field-${name}-${option.value}`;
          return (
            <Field key={option.value} orientation="horizontal">
              <RadioGroupItem id={id} value={option.value} />
              <FieldLabel htmlFor={id} className="font-normal">
                {option.label}
              </FieldLabel>
              {option.description && (
                <FieldDescription>{option.description}</FieldDescription>
              )}
            </Field>
          );
        })}
      </RadioGroup>
      <FieldError>{error}</FieldError>
    </Field>
  );
}

export function CheckboxField({ name, label, description, className }) {
  const { value, error, set, invalid } = useField(name);
  const id = `field-${name}`;

  return (
    <Field data-invalid={invalid} className={className}>
      <Field orientation="horizontal">
        <Checkbox
          id={id}
          checked={Boolean(value)}
          onCheckedChange={(next) => set(Boolean(next))}
        />
        <FieldLabel htmlFor={id} className="font-normal">
          {label}
        </FieldLabel>
      </Field>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{error}</FieldError>
    </Field>
  );
}

function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function DateField({
  name,
  label,
  description,
  placeholder = "Sélectionnez une date",
  minDate,
  maxDate,
  className,
}) {
  const { value, error, set, invalid } = useField(name);
  const id = `field-${name}`;
  const selected = value ? new Date(`${value}T00:00:00`) : null;

  const formatted = selected
    ? selected.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <Field data-invalid={invalid} className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Popover>
        <PopoverTrigger
          id={id}
          aria-invalid={invalid}
          className={buttonVariants({
            variant: "outline",
            className: "w-full justify-start font-normal",
          })}
        >
          <CalendarIcon />
          {formatted ?? placeholder}
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <Calendar
            mode="single"
            locale={fr}
            selected={selected}
            onSelect={(date) => set(date ? toIsoDate(date) : null)}
            disabled={{
              before: minDate ?? new Date(1900, 0, 1),
              after: maxDate ?? new Date(),
            }}
          />
        </PopoverContent>
      </Popover>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{error}</FieldError>
    </Field>
  );
}

export function FileField({ name, config, description, className }) {
  const { value, error, set, invalid } = useField(name);
  const [localError, setLocalError] = useState(null);
  const inputId = `field-${name}`;

  function handleChange(event) {
    const fichier = event.target.files?.[0];
    if (!fichier) {
      return;
    }
    const message = validateFichier(fichier, config);
    setLocalError(message);
    if (message) {
      event.target.value = "";
      return;
    }
    setFichier(config.key, fichier);
    set(describeFichier(fichier));
  }

  function handleRemove() {
    removeFichier(config.key);
    set(null);
    setLocalError(null);
  }

  const message = error ?? localError;

  return (
    <Field data-invalid={invalid || Boolean(localError)} className={className}>
      <FieldLabel htmlFor={inputId}>{config.label}</FieldLabel>

      {value ? (
        <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/30 px-3 py-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <FileTextIcon className="text-muted-foreground size-4 shrink-0" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{value.nom}</p>
              <p className="text-muted-foreground text-xs">
                {formatTaille(value.taille)} · {value.extension.toUpperCase()}
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={handleRemove}
            aria-label="Retirer le fichier"
          >
            <XIcon />
          </Button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className="flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border border-dashed px-4 py-6 text-center transition-colors hover:bg-muted/40 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50"
        >
          <UploadIcon className="text-muted-foreground size-5" />
          <span className="text-sm font-medium">
            Choisir un fichier ou le glisser ici
          </span>
          <span className="text-muted-foreground text-xs">
            {config.accept} · {config.maxSizeMb} Mo maximum
          </span>
        </label>
      )}

      <input
        id={inputId}
        type="file"
        accept={config.accept}
        className="sr-only"
        onChange={handleChange}
      />

      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{message}</FieldError>
    </Field>
  );
}

export function InfoAlert({ title, children, variant = "default" }) {
  return (
    <Alert variant={variant}>
      <AlertDescription>
        {title && <span className="font-medium">{title} </span>}
        {children}
      </AlertDescription>
    </Alert>
  );
}
