import { format } from "date-fns";

type Props = {
  date: Date;
  withTime?: boolean;
};

const DateFormatter = ({ date, withTime = false }: Props) => {
  const dateString = date.toISOString();
  const pattern = withTime ? "LLLL d, yyyy, z h:mma" : "LLLL d, yyyy";
  return <time dateTime={dateString}>{format(date, pattern)}</time>;
};

export default DateFormatter;
