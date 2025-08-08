import { EVENT_DIR } from "./constants";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { Event } from "@/interfaces/event";

export function getEventFilenames() {
  return fs.readdirSync(EVENT_DIR);
}

export function getEventBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(EVENT_DIR, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const event = {
    ...data,
    date: new Date(data.date),
    date_end: new Date(data.date_end),
    slug,
    content,
  } as Event;

  return event;
}

export function getAllEvents(): Event[] {
  const filenames = getEventFilenames();
  const events = filenames
    .map(getEventBySlug)
    .filter((event) => event.published) // Only published events
    .sort((event1, event2) => (event1.date > event2.date ? -1 : 1)); // Sort by date, newest first

  return events;
}

export function getAllFutureEvents(): Event[] {
  const events = getAllEvents();
  return events
    .filter((event) => event.date > new Date())
    .reverse(); // Order by date, closest first
}

