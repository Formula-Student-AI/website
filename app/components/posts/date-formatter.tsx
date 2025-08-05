import { parseISO, format } from "date-fns";

type Props = {
  date: Date;
};

const DateFormatter = ({ date }: Props) => {
  const dateString = date.toISOString();
  return <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>;
};

export default DateFormatter;