"use client";

import { useEffect, useRef, useState } from "react";

// Web3Forms emails each sign-up to cs-fsai@bristol.ac.uk. The access key only
// identifies that inbox, so it is safe to keep in the page's code. To get a
// new one, enter cs-fsai@bristol.ac.uk at https://web3forms.com.
const WEB3FORMS_ACCESS_KEY = "9ccd095a-6816-4ab3-bfbb-217914c846a8";
const CONTACT_EMAIL = "cs-fsai@bristol.ac.uk";

const TEAMS = {
  APC: {
    name: "Autonomous Platform Cup",
    description:
      "Design and build our first car of our own: a low-voltage autonomous EV.",
    subteams: ["Mechanical Design", "Powertrains", "Braking Systems", "Electrical Systems"],
  },
  DDT: {
    name: "Dynamic Driving Task",
    description:
      "Develop the perception, SLAM and control software that drives the ADS-DV, and present our work to the judges at Silverstone.",
    subteams: ["Perception", "Planning & Control", "SLAM", "Systems Integration", "Statics"],
  },
} as const;
type TeamKey = keyof typeof TEAMS;
const TEAM_KEYS = Object.keys(TEAMS) as TeamKey[];

const YEARS = [
  "1st year",
  "2nd year",
  "3rd year",
  "4th year",
  "Year in industry or abroad",
  "Postgraduate",
];

const COURSES = [
  "Aerospace Engineering",
  "Civil Engineering",
  "Computer Science",
  "Computer Science and Electronics",
  "Electrical and Electronic Engineering",
  "Electronic and Computer Engineering",
  "Engineering Design",
  "Engineering Mathematics",
  "Mathematics",
  "Mechanical Engineering",
  "Mechanical and Electrical Engineering",
  "Physics",
];

type Fields = {
  name: string;
  email: string;
  course: string;
  year: string;
  team: TeamKey | "";
  subteams: string[];
};
type FieldKey = keyof Fields;
type Errors = Partial<Record<FieldKey, string>>;

const FIELD_ORDER: FieldKey[] = ["name", "email", "course", "year", "team", "subteams"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = "Enter your name.";
  if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = "Enter a valid email address.";
  if (!fields.course.trim()) errors.course = "Enter your course.";
  if (!fields.year) errors.year = "Choose your year.";
  if (!fields.team) errors.team = "Choose APC or DDT.";
  else if (fields.subteams.length === 0) errors.subteams = "Pick at least one subteam.";
  return errors;
}

// The site header is fixed, so anything we move focus to is scrolled to the
// middle of the screen instead of the top, where the header would cover it.
function focusInView(element: HTMLElement | null, scrollTarget?: Element | null) {
  if (!element) return;
  element.focus({ preventScroll: true });
  (scrollTarget ?? element).scrollIntoView({ block: "center" });
}

const inputClass = (hasError: boolean) =>
  `mt-2 block w-full rounded-lg border bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 transition focus:border-university-red focus:outline-2 focus:outline-offset-2 focus:outline-university-red ${
    hasError ? "border-university-red" : "border-gray-300"
  }`;

// Visible focus outline for the team cards and subteam tiles.
const choiceFocus =
  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-university-red";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-university-red">
      {message}
    </p>
  );
}

export default function JoinForm() {
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    course: "",
    year: "",
    team: "",
    subteams: [],
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // After a successful sign-up, move focus to the confirmation so it is seen
  // and read out by screen readers.
  useEffect(() => {
    if (status === "sent") focusInView(successHeadingRef.current);
  }, [status]);

  const clearError = (...keys: FieldKey[]) =>
    setErrors((prev) => {
      const next = { ...prev };
      keys.forEach((key) => delete next[key]);
      return next;
    });

  const setField = <K extends FieldKey>(key: K, value: Fields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    clearError(key);
  };

  const chooseTeam = (team: TeamKey) => {
    // Subteams belong to one team, so switching team clears them.
    setFields((prev) => ({ ...prev, team, subteams: prev.team === team ? prev.subteams : [] }));
    clearError("team", "subteams");
  };

  const toggleSubteam = (subteam: string) => {
    setFields((prev) => ({
      ...prev,
      subteams: prev.subteams.includes(subteam)
        ? prev.subteams.filter((s) => s !== subteam)
        : [...prev.subteams, subteam],
    }));
    clearError("subteams");
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const found = validate(fields);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((key) => found[key]);
    if (firstInvalid) {
      const input = formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`);
      focusInView(input ?? null, input?.closest("fieldset") ?? input?.parentElement);
      return;
    }

    // Hidden spam trap: people never tick it, so pretend it worked and send nothing.
    const trap = formRef.current?.querySelector<HTMLInputElement>('input[name="botcheck"]');
    if (trap?.checked) {
      setStatus("sent");
      return;
    }

    const team = fields.team as TeamKey;
    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New sign-up: ${fields.name.trim()} (${team})`,
          from_name: "Bristol FSAI website",
          name: fields.name.trim(),
          email: fields.email.trim(),
          course: fields.course.trim(),
          year_of_study: fields.year,
          team: `${team} (${TEAMS[team].name})`,
          subteams: fields.subteams.join(", "),
        }),
      });
      const result = await response.json().catch(() => null);
      setStatus(response.ok && result?.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    const firstName = fields.name.trim().split(/\s+/)[0];
    const team = fields.team ? TEAMS[fields.team] : null;
    return (
      <div className="space-y-5">
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 focus:outline-none"
        >
          You&apos;re in{firstName ? `, ${firstName}` : ""}.
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Thanks for signing up{team ? ` to ${team.name} (${fields.team})` : ""}. Your details
          have gone to the committee, and we&apos;ll email you at{" "}
          <strong className="font-semibold text-gray-900">{fields.email.trim()}</strong> about
          what happens next.
        </p>
        <p className="leading-relaxed text-gray-700">
          Questions in the meantime? Email{" "}
          <a className="font-semibold text-university-red hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>{" "}
          or follow us on{" "}
          <a
            className="font-semibold text-university-red hover:underline"
            href="https://instagram.com/bristol_fsai"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          .
        </p>
      </div>
    );
  }

  const selectedTeam = fields.team ? TEAMS[fields.team] : null;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-7">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Sign up</h2>
        <p className="mt-3 text-lg leading-relaxed text-gray-600">
          Takes about a minute. Choose the team you want to join and we&apos;ll be in touch.
        </p>
      </div>

      <div>
        <label htmlFor="join-name" className="block font-semibold text-gray-900">
          Full name
        </label>
        <input
          id="join-name"
          data-field="name"
          type="text"
          autoComplete="name"
          value={fields.name}
          onChange={(e) => setField("name", e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "join-name-error" : undefined}
          className={inputClass(!!errors.name)}
        />
        <FieldError id="join-name-error" message={errors.name} />
      </div>

      <div>
        <label htmlFor="join-email" className="block font-semibold text-gray-900">
          Email
        </label>
        <input
          id="join-email"
          data-field="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="ab12345@bristol.ac.uk"
          value={fields.email}
          onChange={(e) => setField("email", e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={`join-email-hint${errors.email ? " join-email-error" : ""}`}
          className={inputClass(!!errors.email)}
        />
        <p id="join-email-hint" className="mt-2 text-sm text-gray-500">
          Your Bristol email is best. That&apos;s where we&apos;ll send the details.
        </p>
        <FieldError id="join-email-error" message={errors.email} />
      </div>

      <div>
        <label htmlFor="join-course" className="block font-semibold text-gray-900">
          Course
        </label>
        <input
          id="join-course"
          data-field="course"
          type="text"
          autoComplete="off"
          list="join-course-options"
          value={fields.course}
          onChange={(e) => setField("course", e.target.value)}
          aria-invalid={!!errors.course}
          aria-describedby={errors.course ? "join-course-error" : undefined}
          className={inputClass(!!errors.course)}
        />
        <datalist id="join-course-options">
          {COURSES.map((course) => (
            <option key={course} value={course} />
          ))}
        </datalist>
        <FieldError id="join-course-error" message={errors.course} />
      </div>

      <div>
        <label htmlFor="join-year" className="block font-semibold text-gray-900">
          Year of study
        </label>
        <select
          id="join-year"
          data-field="year"
          value={fields.year}
          onChange={(e) => setField("year", e.target.value)}
          aria-invalid={!!errors.year}
          aria-describedby={errors.year ? "join-year-error" : undefined}
          className={`${inputClass(!!errors.year)} ${fields.year ? "" : "text-gray-500"}`}
        >
          <option value="" disabled>
            Choose one
          </option>
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <FieldError id="join-year-error" message={errors.year} />
      </div>

      <fieldset aria-describedby={errors.team ? "join-team-error" : undefined}>
        <legend className="font-semibold text-gray-900">Which team do you want to join?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {TEAM_KEYS.map((key, i) => {
            const team = TEAMS[key];
            const checked = fields.team === key;
            return (
              <label
                key={key}
                className={`flex cursor-pointer flex-col rounded-xl border-2 bg-white p-4 transition ${choiceFocus} ${
                  checked
                    ? "border-university-red shadow-sm"
                    : errors.team
                      ? "border-university-red/60 hover:border-university-red"
                      : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-xl font-bold text-gray-900">{key}</span>
                  <input
                    type="radio"
                    name="team"
                    value={key}
                    data-field={i === 0 ? "team" : undefined}
                    checked={checked}
                    onChange={() => chooseTeam(key)}
                    className="h-5 w-5 shrink-0 cursor-pointer accent-university-red"
                  />
                </span>
                <span className="mt-1 text-sm font-semibold text-gray-700">{team.name}</span>
                <span className="mt-2 text-sm leading-relaxed text-gray-600">{team.description}</span>
              </label>
            );
          })}
        </div>
        <FieldError id="join-team-error" message={errors.team} />
      </fieldset>

      {selectedTeam && (
        <fieldset aria-describedby={`join-subteams-hint${errors.subteams ? " join-subteams-error" : ""}`}>
          <legend className="font-semibold text-gray-900">
            Which {fields.team} subteams interest you?{" "}
            <span className="font-normal text-gray-500">(pick one or more)</span>
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {selectedTeam.subteams.map((subteam, i) => {
              const checked = fields.subteams.includes(subteam);
              return (
                <label
                  key={subteam}
                  className={`flex cursor-pointer select-none items-center gap-2.5 rounded-lg border bg-white px-3 py-2.5 text-sm font-medium text-gray-900 transition ${choiceFocus} ${
                    checked
                      ? "border-university-red bg-university-red/5"
                      : errors.subteams
                        ? "border-university-red/60 hover:border-university-red"
                        : "border-gray-300 hover:border-gray-500"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="subteams"
                    value={subteam}
                    data-field={i === 0 ? "subteams" : undefined}
                    checked={checked}
                    onChange={() => toggleSubteam(subteam)}
                    className="h-4 w-4 shrink-0 cursor-pointer accent-university-red"
                  />
                  {subteam}
                </label>
              );
            })}
          </div>
          <p id="join-subteams-hint" className="mt-3 text-sm text-gray-500">
            Nothing binding. It just helps us put you in touch with the right people.
          </p>
          <FieldError id="join-subteams-error" message={errors.subteams} />
        </fieldset>
      )}

      {/* Spam trap: hidden from people (and screen readers), so only bots tick it. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {status === "error" && (
        <p role="alert" className="rounded-lg border border-university-red/30 bg-university-red/5 px-4 py-3 text-sm text-gray-800">
          Sorry, your sign-up didn&apos;t send. Please try again, or email your details to{" "}
          <a className="font-semibold text-university-red hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-lg bg-university-red px-6 py-4 text-lg font-semibold text-white transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-university-red disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Sending…" : "Join Bristol FSAI"}
        </button>
        <p className="mt-4 text-sm text-gray-500">
          We use your details to contact you about joining Bristol FSAI and nothing else.
        </p>
      </div>
    </form>
  );
}
