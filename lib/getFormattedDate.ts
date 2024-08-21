export default function getFormattedDate(dateString: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
      new Date(dateString),
    );
  } catch(err) {
    return "";
  }
}
