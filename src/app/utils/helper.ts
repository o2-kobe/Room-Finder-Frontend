export function convertToTitleCase(word: string | undefined) {
  return (
    word &&
    word
      .split(" ")
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join(" ")
  );
}
